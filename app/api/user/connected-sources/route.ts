import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id as string;

  const sources = await prisma.connectedSource.findMany({
    where: { userId },
    select: {
      sourceType: true,
      memoryCount: true,
      lastSyncAt: true,
      status: true,
    },
    orderBy: { sourceType: "asc" },
  });

  return NextResponse.json({ sources });
}

