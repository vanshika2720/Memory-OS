import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      
      // Simulate polling ingestion status
      let processed = 0;
      const interval = setInterval(() => {
        processed += Math.floor(Math.random() * 50);
        const data = JSON.stringify({
          processed,
          extracted: Math.floor(processed * 0.8),
          people: Math.floor(processed * 0.1),
          status: processed < 2412 ? "INGESTING" : "COMPLETE"
        });
        
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        
        if (processed >= 2412) {
          clearInterval(interval);
          controller.close();
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
