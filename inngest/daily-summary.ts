import { inngest } from "./client";
import prisma from "@/lib/prisma";
import openai from "@/lib/ai";

export const dailySummary = inngest.createFunction(
  { id: "daily-summary" },
  { cron: "0 0 * * *" },
  async ({ step }) => {
    const users = await step.run("fetch-active-users", async () => {
      return prisma.user.findMany({
        where: { onboardingDone: true }
      });
    });

    for (const user of users) {
      await step.run(`process-user-${user.id}`, async () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const memories = await prisma.memory.findMany({
          where: {
            userId: user.id,
            timestampOriginal: {
              gte: today
            }
          }
        });

        if (memories.length === 0) return;

        // Generate AI summary
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "Generate a 2-sentence summary of the user's day based on these memories. Also identify the dominant emotion (POSITIVE, NEGATIVE, NEUTRAL, ANXIOUS, EXCITED, SAD, ANGRY)."
            },
            {
              role: "user",
              content: memories.map(m => m.summary).join("\n")
            }
          ],
          response_format: { type: "json_object" }
        });

        const analysis = JSON.parse(response.choices[0].message.content || "{}");

        await prisma.dailySummary.create({
          data: {
            userId: user.id,
            date: today,
            dominantEmotion: analysis.dominantEmotion || "NEUTRAL",
            memoryCount: memories.length,
            aiSummary: analysis.summary,
            importanceScore: memories.reduce((acc, m) => acc + m.importanceScore, 0) / memories.length,
            topTopics: Array.from(new Set(memories.flatMap(m => m.topics))).slice(0, 5)
          }
        });
      });
    }
  }
);
