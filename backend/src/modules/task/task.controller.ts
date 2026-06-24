import { Request, Response } from "express";

import * as taskService
    from "./task.service";

export const createTask = async (
    req: Request,
    res: Response
) => {

    const task =
        await taskService.createTaskService(
            req.body
        );

    res.status(201).json(task);
};

export const getTasks = async (
    req: Request,
    res: Response
) => {

    const tasks =
        await taskService.getTasksService(
            req.query.projectId as string
        );

    res.json(tasks);
};

export const getTaskById = async (
    req: Request,
    res: Response
) => {

    const task =
        await taskService.getTaskByIdService(
            (req as any).params.id
        );

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.json(task);
};

export const updateTask = async (
    req: Request,
    res: Response
) => {

    const task =
        await taskService.updateTaskService(
            (req as any).params.id,
            req.body
        );

    res.json(task);
};

export const deleteTask = async (
    req: Request,
    res: Response
) => {

    const result =
        await taskService.deleteTaskService(
            (req as any).params.id
        );

    res.json(result);
};

export const searchTasks = async (
    req: Request,
    res: Response
) => {

    const tasks =
        await taskService.searchTasksService(
            req.query.q as string
        );

    res.json(tasks);
};