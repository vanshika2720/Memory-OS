import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const LIMITS_BY_PLAN: Record<string, number> = {
  FREE: 100,
  PERSONAL: 1000,
  PRO: 10000,
  TEAMS: 20000,
  ENTERPRISE: 100000,
};

const PRICE_BY_PLAN: Record<string, string> = {
  FREE: "$0",
  PERSONAL: "$19",
  PRO: "$49",
  TEAMS: "$99",
  ENTERPRISE: "Custom",
};

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id as string;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { planTier: true },
  });

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const planTier = user.planTier;
  const memoryCount = await prisma.memory.count({ where: { userId } });

  const subscription = await prisma.subscription.findFirst({
    where: { userId },
    orderBy: { currentPeriodEnd: "desc" },
    select: {
      status: true,
      planTier: true,
      currentPeriodEnd: true,
      cancelAtPeriodEnd: true,
    },
  });

  const memoryLimit = LIMITS_BY_PLAN[planTier] ?? LIMITS_BY_PLAN.FREE;
  const usagePercent = memoryLimit > 0 ? (memoryCount / memoryLimit) * 100 : 0;

  return NextResponse.json({
    planTier,
    pricePerMonth: PRICE_BY_PLAN[planTier] ?? null,
    memoryCount,
    memoryLimit,
    usagePercent,
    subscription: subscription
      ? {
          status: subscription.status,
          currentPeriodEnd: subscription.currentPeriodEnd,
          cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
        }
      : null,
  });
}

