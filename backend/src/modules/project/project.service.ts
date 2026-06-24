import { prisma } from "../../config/prisma";

export const createProjectService = async (
    ownerId: string,
    data: {
        name: string;
        description?: string;
    }
) => {
    return prisma.project.create({
        data: {
            name: data.name,
            description: data.description,
            ownerId
        }
    });
};

export const getProjectsService = async (
    ownerId: string
) => {
    return prisma.project.findMany({
        where: {
            ownerId
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};

export const getProjectByIdService = async (
    projectId: string,
    ownerId: string
) => {
    return prisma.project.findFirst({
        where: {
            id: projectId,
            ownerId
        },
        include: {
            tasks: true
        }
    });
};

export const updateProjectService = async (
    projectId: string,
    ownerId: string,
    data: {
        name?: string;
        description?: string;
    }
) => {

    const project =
        await prisma.project.findFirst({
            where: {
                id: projectId,
                ownerId
            }
        });

    if (!project) {
        throw new Error("Project not found");
    }

    return prisma.project.update({
        where: {
            id: projectId
        },
        data
    });
};

export const deleteProjectService = async (
    projectId: string,
    ownerId: string
) => {

    const project =
        await prisma.project.findFirst({
            where: {
                id: projectId,
                ownerId
            }
        });

    if (!project) {
        throw new Error("Project not found");
    }

    await prisma.project.delete({
        where: {
            id: projectId
        }
    });

    return {
        message: "Project deleted"
    };
};