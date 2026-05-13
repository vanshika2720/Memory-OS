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
    select: {
      id: true,
      email: true,
      name: true,
      bio: true,
      planTier: true,
      onboardingDone: true,
      privacyAccepted: true,
      privacyAnswers: true,
      passwordHash: true,
    },
  });

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({
    id: user.id,
    email: user.email,
    name: user.name,
    bio: user.bio,
    planTier: user.planTier,
    onboardingDone: user.onboardingDone,
    privacyAccepted: user.privacyAccepted,
    privacyAnswers: user.privacyAnswers,
    hasPassword: Boolean(user.passwordHash),
  });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id as string;
  const body = await req.json().catch(() => ({} as any));

  const name = typeof body?.name === "string" ? body.name.trim() : undefined;
  const bio = typeof body?.bio === "string" ? body.bio.trim() : undefined;

  if (name !== undefined && name.length > 80) {
    return NextResponse.json({ error: "Name is too long" }, { status: 400 });
  }
  if (bio !== undefined && bio.length > 1000) {
    return NextResponse.json({ error: "Bio is too long" }, { status: 400 });
  }

  const data: { name?: string; bio?: string | null } = {};
  if (name !== undefined) data.name = name;
  if (bio !== undefined) data.bio = bio.length ? bio : null;

  const user = await (prisma as any).user.update({
    where: { id: userId },
    data,
    select: { id: true, email: true, name: true, bio: true, planTier: true, onboardingDone: true },
  });

  return NextResponse.json(user);
}

