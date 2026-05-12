import { openai } from '@ai-sdk/openai';
import { streamText, Message } from 'ai';
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const maxDuration = 30;

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { messages }: { messages: Message[] } = await req.json();
  const userId = (session.user as any).id;

  // Fetch last 500 memories for context
  const memories = await prisma.memory.findMany({
    where: { userId },
    orderBy: { timestampOriginal: 'desc' },
    take: 500,
    select: {
      summary: true,
      timestampOriginal: true,
      sourceType: true,
      rawContent: true,
    }
  });

  const memoryContext = memories.map(m => 
    `[${m.timestampOriginal.toISOString()}] (${m.sourceType}): ${m.summary}\nFull Content: ${m.rawContent.substring(0, 100)}...`
  ).join('\n---\n');

  const systemPrompt = `You are MemoryOS, a personal AI with access to this user's complete memory database. 
  You have access to their emails, messages, calendar events, voice notes, and decisions. 
  Answer questions about their past in a warm, direct, honest tone. Cite specific dates and quotes. 
  Never make up memories. If you don't have data, say so. Always end with one follow-up question.
  
  USER MEMORIES:
  ${memoryContext}`;

  const result = await streamText({
    model: openai('gpt-4o'),
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
