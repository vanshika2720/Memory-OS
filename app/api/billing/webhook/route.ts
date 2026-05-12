import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia" as any,
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const userId = session.metadata?.userId;
    const planTier = session.metadata?.planTier;

    if (userId && planTier) {
      await prisma.user.update({
        where: { id: userId },
        data: { planTier: planTier as any },
      });

      await prisma.subscription.create({
        data: {
          userId,
          stripeCustomerId: session.customer as string,
          stripeSubId: session.subscription as string,
          planTier: planTier as any,
          status: "active",
        },
      });
    }
  }

  return NextResponse.json({ received: true });
}
