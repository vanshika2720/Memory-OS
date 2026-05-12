import { inngest } from "./client";
import prisma from "@/lib/prisma";
import openai from "@/lib/ai";

export const weeklyReview = inngest.createFunction(
  { id: "weekly-review" },
  { cron: "0 21 * * 0" }, // Every Sunday at 9 PM
  async ({ step }) => {
    const users = await step.run("fetch-users", async () => {
      return prisma.user.findMany({ where: { onboardingDone: true } });
    });

    for (const user of users) {
      await step.run(`generate-weekly-${user.id}`, async () => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        const memories = await prisma.memory.findMany({
          where: {
            userId: user.id,
            timestampOriginal: { gte: weekAgo }
          }
        });

        if (memories.length === 0) return;

        // Generate Mirror Insight and Patterns
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `Analyze the user's past 7 days of memories and compare them against their history. 
              Return a JSON object with:
              - mirrorInsight: One uncomfortable/deep truth about their behavior this week.
              - patterns: Array of { type, description, example }
              - emotionArc: Array of scores for each day
              - promiseAudit: { kept, total }`
            },
            {
              role: "user",
              content: memories.map(m => `[${m.timestampOriginal.toISOString()}] ${m.summary}`).join("\n")
            }
          ],
          response_format: { type: "json_object" }
        });

        const analysis = JSON.parse(response.choices[0].message.content || "{}");

        await prisma.lifeReview.create({
          data: {
            userId: user.id,
            weekStartDate: weekAgo,
            emotionArc: analysis.emotionArc,
            patterns: analysis.patterns,
            promiseAudit: analysis.promiseAudit,
            mirrorInsight: analysis.mirrorInsight,
          }
        });

        // Email sending logic with Resend would go here
      });
    }
  }
);
