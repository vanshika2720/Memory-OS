import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

const BOT_PERSONALITY = "warm, direct, slightly dry";

function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - 20) + "... See more: memoryos.app";
}

function buildTwilioResponse(message: string): NextResponse {
  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${message}</Message></Response>`,
    {
      status: 200,
      headers: {
        "Content-Type": "text/xml",
      },
    }
  );
}

async function handleLogCommand(userId: string, text: string) {
  const memory = await prisma.memory.create({
    data: {
      userId,
      rawContent: text,
      summary: text.slice(0, 100),
      sourceType: "MANUAL",
      timestampOriginal: new Date(),
    },
  });
  return "Memory saved. 📝";
}

async function handleBriefCommand(userId: string) {
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

  const promises = await prisma.memory.findMany({
    where: {
      userId,
      isPromise: true,
      promiseFulfilled: false,
    },
    take: 3,
    orderBy: { timestampOriginal: "desc" },
  });

  const todayEvents = await prisma.memory.findMany({
    where: {
      userId,
      timestampOriginal: { gte: startOfDay, lte: endOfDay },
    },
    take: 5,
  });

  let reply = "☀️ *Morning Brief*\n\n";
  reply += "*Top Promises:*\n";
  if (promises.length === 0) {
    reply += "No open promises. Nice!\n";
  } else {
    promises.forEach((p, i) => {
      reply += `${i + 1}. ${p.summary}\n`;
    });
  }
  reply += "\n*Today:*\n";
  if (todayEvents.length === 0) {
    reply += "No memories captured yet today.\n";
  } else {
    todayEvents.forEach((e, i) => {
      reply += `${i + 1}. ${e.summary.slice(0, 50)}\n`;
    });
  }
  return truncate(reply, 500);
}

async function handlePromisesCommand(userId: string) {
  const promises = await prisma.memory.findMany({
    where: {
      userId,
      isPromise: true,
      promiseFulfilled: false,
    },
    take: 5,
    orderBy: { timestampOriginal: "desc" },
  });

  let reply = "📋 *Your Promises*\n\n";
  if (promises.length === 0) {
    reply += "No open promises.";
  } else {
    promises.forEach((p, i) => {
      reply += `${i + 1}. ${p.summary}\n`;
    });
  }
  return truncate(reply, 500);
}

async function handleWeekCommand(userId: string) {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const memories = await prisma.memory.findMany({
    where: { userId, timestampOriginal: { gte: weekAgo } },
    orderBy: { timestampOriginal: "desc" },
  });

  let reply = "📊 *Week in Review*\n\n";
  reply += `Memories captured: ${memories.length}\n`;
  if (memories.length > 0) {
    reply += `Emotional tone: ${memories[0].emotionalTone}\n`;
  }
  return truncate(reply, 500);
}

async function handleAIQuery(userId: string, query: string) {
  const { default: OpenAI } = await import("openai");
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const memories = await prisma.memory.findMany({
    where: { userId },
    take: 10,
    orderBy: { timestampOriginal: "desc" },
  });

  const context = memories.map((m) => m.summary).join("\n");

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are MemoryOS bot. ${BOT_PERSONALITY}. Keep responses under 5 lines. End with a follow-up question when appropriate.`,
      },
      {
        role: "user",
        content: `Context:\n${context}\n\nQuestion: ${query}`,
      },
    ],
  });

  let reply = response.choices[0]?.message?.content || "I couldn't process that.";
  
  if (reply.length > 400) {
    const lastQuestionMark = reply.lastIndexOf("?");
    if (lastQuestionMark > 300) {
      const questionPart = reply.slice(lastQuestionMark);
      reply = reply.slice(0, lastQuestionMark) + "\n\n" + questionPart;
    }
  }
  
  return truncate(reply, 500);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const from = (formData.get("From") as string || "").replace("whatsapp:", "");
    const body = (formData.get("Body") || "").toString().trim();

    const connectedSource = await prisma.connectedSource.findFirst({
      where: {
        user: { phone: from },
        type: "WHATSAPP",
      },
      include: { user: true },
    });

    if (!connectedSource?.user) {
      return buildTwilioResponse("Please sign up at memoryos.app first.");
    }

    const userId = connectedSource.user.id;
    let response: string;

    if (body.toLowerCase().startsWith("log:")) {
      response = await handleLogCommand(userId, body.slice(4).trim());
    } else if (body.toLowerCase() === "brief") {
      response = await handleBriefCommand(userId);
    } else if (body.toLowerCase() === "promises") {
      response = await handlePromisesCommand(userId);
    } else if (body.toLowerCase() === "week") {
      response = await handleWeekCommand(userId);
    } else {
      response = await handleAIQuery(userId, body);
    }

    return buildTwilioResponse(response);
  } catch (error) {
    console.error("WhatsApp bot error:", error);
    return buildTwilioResponse("Something went wrong. Try again.");
  }
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const mode = params.get("hub.mode");
  const token = params.get("hub.verify_token");
  const challenge = params.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.TWILIO_WEBHOOK_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}
