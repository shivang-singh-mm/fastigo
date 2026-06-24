import { prisma } from "../../config/prisma";
import { redis } from "../../config/redis";
import { aiClient } from "../../config/ai";

export const generateTaskInsights =
    async (taskId: any) => {

        const cacheKey =
            `task-insight:${taskId}`;

        const cached =
            await redis.get(cacheKey);

        if (cached) {
            return JSON.parse(cached);
        }

        const task =
            await prisma.task.findUnique({
                where: {
                    id: taskId
                },
                include: {
                    assignee: true,
                    project: true
                }
            });

        if (!task) {
            throw new Error("Task not found");
        }

        const prompt = `
Analyze the task below.

Title:
${task.title}

Description:
${task.description || ""}

Status:
${task.status}

Priority:
${task.priority}

Return valid JSON only.

{
  "summary":"",
  "risks":[],
  "recommendations":[],
  "estimatedComplexity":""
}
`;

        const response =
            await aiClient.chat.completions.create({
                model:
                    "qwen/qwen3-30b-a3b",

                messages: [
                    {
                        role: "system",
                        content:
                            "You are a senior engineering manager."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            });

        const content =
            response.choices[0].message.content;

        let parsed;

        try {
            parsed = JSON.parse(content || "{}");
        } catch {
            parsed = {
                summary: content,
                risks: [],
                recommendations: [],
                estimatedComplexity: "Unknown"
            };
        }

        await redis.set(
            cacheKey,
            JSON.stringify(parsed),
            "EX",
            3600
        );

        return parsed;
    };