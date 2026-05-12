import { inngest } from "./client";
import prisma from "@/lib/prisma";
import { extractMemory } from "@/lib/ai";

export const processMemory = inngest.createFunction(
  { id: "process-memory" },
  { event: "memory/ingested" },
  async ({ event, step }) => {
    const { memoryId } = event.data;

    const memory = await step.run("fetch-memory", async () => {
      return prisma.memory.findUnique({
        where: { id: memoryId },
      });
    });

    if (!memory) return;

    const analysis = await step.run("ai-analysis", async () => {
      return extractMemory(memory.rawContent);
    });

    await step.run("update-memory", async () => {
      return prisma.memory.update({
        where: { id: memoryId },
        data: {
          summary: analysis.summary,
          importanceScore: analysis.importanceScore,
          emotionalTone: analysis.emotionalTone,
          memoryType: analysis.memoryType,
          isPromise: analysis.isPromise,
          promiseTo: analysis.promiseTo,
          inferredDueDate: analysis.inferredDueDate ? new Date(analysis.inferredDueDate) : null,
          topics: analysis.topics,
        },
      });
    });

    return { success: true };
  }
);
