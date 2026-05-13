import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id as string;
  const body = await req.json().catch(() => ({} as any));

  const sourceType = body?.sourceType as string | undefined;
  if (!sourceType) {
    return NextResponse.json({ error: "Missing sourceType" }, { status: 400 });
  }

  // Triggering the actual ingestion pipeline isn't implemented in this repo yet,
  // but we still update the ConnectedSource status so the UI can reflect real-time state.
  const connectedSource = await prisma.connectedSource.upsert({
    where: {
      userId_sourceType: {
        userId,
        sourceType: sourceType as any,
      },
    },
    update: {
      status: "syncing",
      lastSyncAt: new Date(),
    },
    create: {
      userId,
      sourceType: sourceType as any,
      memoryCount: 0,
      status: "syncing",
      lastSyncAt: new Date(),
    },
    select: {
      sourceType: true,
      status: true,
      lastSyncAt: true,
      memoryCount: true,
    },
  });

  return NextResponse.json({ success: true, connectedSource });
}

