import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const userId = (session.user as any).id as string;

      const interval = setInterval(async () => {
        try {
          const [memoryCount, peopleCount, sources] = await Promise.all([
            prisma.memory.count({ where: { userId } }),
            prisma.person.count({ where: { userId } }),
            prisma.connectedSource.findMany({
              where: { userId },
              select: {
                sourceType: true,
                memoryCount: true,
                lastSyncAt: true,
                status: true,
              },
              orderBy: { sourceType: "asc" },
            }),
          ]);

          const isSyncing = sources.some((s) => String(s.status).toLowerCase().includes("sync"));

          const status = sources.length === 0 ? "NO_CONNECTIONS" : isSyncing ? "SYNCING" : "ACTIVE";

          const data = JSON.stringify({
            processed: memoryCount,
            extracted: memoryCount, // We don't have a separate "extracted" metric stored yet.
            people: peopleCount,
            status,
            sources: sources.map((s) => ({
              sourceType: s.sourceType,
              memoryCount: s.memoryCount,
              lastSyncAt: s.lastSyncAt,
              statusText: s.status,
            })),
          });

          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        } catch (e) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: "Failed to fetch ingestion status" })}\n\n`));
        }
      }, 1000);

      req.signal.onabort = () => {
        clearInterval(interval);
        controller.close();
      };
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
