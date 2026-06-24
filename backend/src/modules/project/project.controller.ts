import { Request, Response } from "express";

import {
    createProjectService,
    getProjectsService,
    getProjectByIdService,
    updateProjectService,
    deleteProjectService
} from "./project.service";

export const createProject = async (
    req: Request,
    res: Response
) => {

    const ownerId = (req as any).user.userId;

    const project =
        await createProjectService(
            ownerId,
            req.body
        );

    res.status(201).json(project);
};

export const getProjects = async (
    req: Request,
    res: Response
) => {

    const projects =
        await getProjectsService(
            (req as any).user.userId
        );

    res.json(projects);
};

export const getProjectById = async (
    req: Request,
    res: Response
) => {

    const project =
        await getProjectByIdService(
            (req as any).params.id,
            (req as any).user.userId
        );

    if (!project) {
        return res.status(404).json({
            message: "Project not found"
        });
    }

    res.json(project);
};

export const updateProject = async (
    req: Request,
    res: Response
) => {

    const project =
        await updateProjectService(
            (req as any).params.id,
            (req as any).user.userId,
            req.body
        );

    res.json(project);
};

export const deleteProject = async (
    req: Request,
    res: Response
) => {

    const result =
        await deleteProjectService(
            (req as any).params.id,
            (req as any).user.userId
        );

    res.json(result);
};