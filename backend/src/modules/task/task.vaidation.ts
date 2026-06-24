import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string().min(3),
    description: z.string().optional(),

    projectId: z.string(),

    assigneeId: z.string().optional(),

    priority: z.enum([
        "LOW",
        "MEDIUM",
        "HIGH"
    ]).optional()
});

export const updateTaskSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),

    status: z.enum([
        "TODO",
        "IN_PROGRESS",
        "DONE"
    ]).optional(),

    priority: z.enum([
        "LOW",
        "MEDIUM",
        "HIGH"
    ]).optional(),

    assigneeId: z.string().optional()
});