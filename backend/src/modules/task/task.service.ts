import { prisma } from "../../config/prisma";
import { getIO } from "../../sockets/socket";

export const createTaskService = async (
    data: any
) => {

    const task =
        await prisma.task.create({
            data,
            include: {
                assignee: true,
                project: true
            }
        });

    getIO().emit(
        "taskCreated",
        task
    );

    return task;
};

export const getTasksService = async (
    projectId?: string
) => {

    return prisma.task.findMany({
        where: {
            ...(projectId && {
                projectId
            })
        },

        include: {
            assignee: true
        },

        orderBy: {
            createdAt: "desc"
        }
    });
};

export const getTaskByIdService = async (
    id: string
) => {

    return prisma.task.findUnique({
        where: { id },

        include: {
            assignee: true,
            project: true
        }
    });
};


export const updateTaskService = async (
    taskId: string,
    data: any
) => {

    const task =
        await prisma.task.update({
            where: {
                id: taskId
            },

            data,

            include: {
                assignee: true,
                project: true
            }
        });

    getIO().emit(
        "taskUpdated",
        task
    );

    return task;
};


export const deleteTaskService = async (
    taskId: string
) => {

    await prisma.task.delete({
        where: {
            id: taskId
        }
    });

    getIO().emit(
        "taskDeleted",
        {
            taskId
        }
    );

    return {
        message: "Task deleted"
    };
};

export const searchTasksService = async (
    query: string
) => {

    return prisma.task.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: query,
                        mode: "insensitive"
                    }
                },
                {
                    description: {
                        contains: query,
                        mode: "insensitive"
                    }
                }
            ]
        }
    });
};