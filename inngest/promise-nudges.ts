import { inngest } from "./client";
import prisma from "@/lib/prisma";

export const promiseNudges = inngest.createFunction(
  { id: "promise-nudges" },
  { cron: "0 8 * * *" }, // Every day at 8 AM
  async ({ step }) => {
    const fortyEightHoursFromNow = new Date();
    fortyEightHoursFromNow.setHours(fortyEightHoursFromNow.getHours() + 48);

    const duePromises = await step.run("fetch-due-promises", async () => {
      return prisma.memory.findMany({
        where: {
          isPromise: true,
          promiseFulfilled: { not: true },
          inferredDueDate: {
            lte: fortyEightHoursFromNow,
            gte: new Date()
          }
        },
        include: { user: true }
      });
    });

    for (const promise of duePromises) {
      await step.run(`nudge-promise-${promise.id}`, async () => {
        // Send in-app notification
        await prisma.notification.create({
          data: {
            userId: promise.userId,
            type: "PROMISE_NUDGE",
            title: "Upcoming Promise",
            body: `Don't forget: ${promise.summary}`,
          }
        });

        // WhatsApp/Twilio logic would go here if user has connected WhatsApp
      });
    }
  }
);
