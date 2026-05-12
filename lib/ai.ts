import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const extractMemory = async (content: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are MemoryOS, an AI that extracts structured memories from raw text. 
        Analyze the input and return a JSON object with:
        - summary: A 1-sentence summary
        - importanceScore: 1-10
        - emotionalTone: POSITIVE, NEGATIVE, NEUTRAL, ANXIOUS, EXCITED, SAD, ANGRY
        - memoryType: DECISION, CONVERSATION, EVENT, COMMITMENT, EMOTION, LEARNING, PROMISE
        - isPromise: boolean
        - promiseTo: string (if applicable)
        - inferredDueDate: ISO string (if applicable)
        - topics: string[]`
      },
      {
        role: "user",
        content
      }
    ],
    response_format: { type: "json_object" }
  });

  return JSON.parse(response.choices[0].message.content || "{}");
};

export default openai;
