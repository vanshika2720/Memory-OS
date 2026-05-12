import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { extractMemory } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { content, sourceType, timestampOriginal } = await req.json();
    
    // Process memory with AI
    const aiAnalysis = await extractMemory(content);

    const memory = await prisma.memory.create({
      data: {
        userId: (session.user as any).id,
        rawContent: content,
        summary: aiAnalysis.summary,
        sourceType: sourceType || "MANUAL",
        timestampOriginal: new Date(timestampOriginal || Date.now()),
        importanceScore: aiAnalysis.importanceScore,
        emotionalTone: aiAnalysis.emotionalTone,
        memoryType: aiAnalysis.memoryType,
        isPromise: aiAnalysis.isPromise,
        promiseTo: aiAnalysis.promiseTo,
        inferredDueDate: aiAnalysis.inferredDueDate ? new Date(aiAnalysis.inferredDueDate) : null,
        topics: aiAnalysis.topics,
        wordCount: content.split(/\s+/).length,
      },
    });

    return NextResponse.json(memory);
  } catch (error) {
    console.error("Error creating memory:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "20");
  
  const memories = await prisma.memory.findMany({
    where: {
      userId: (session.user as any).id,
    },
    orderBy: {
      timestampOriginal: "desc",
    },
    take: limit,
    include: {
      peopleMentioned: {
        include: {
          person: true,
        },
      },
    },
  });

  return NextResponse.json(memories);
}
