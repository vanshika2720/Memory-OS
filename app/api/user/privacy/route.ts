import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id as string;
  const user = await (prisma as any).user.findUnique({
    where: { id: userId },
    select: { privacyAccepted: true, privacyAnswers: true },
  });

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({
    privacyAccepted: user.privacyAccepted,
    privacyAnswers: user.privacyAnswers,
  });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id as string;
  const body = await req.json().catch(() => ({} as any));

  const privacyAccepted = Boolean(body?.privacyAccepted);
  const privacyAnswers = body?.privacyAnswers ?? null;

  await (prisma as any).user.update({
    where: { id: userId },
    data: {
      privacyAccepted,
      privacyAnswers,
    },
  });

  return NextResponse.json({ success: true });
}

