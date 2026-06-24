import { Router } from "express";

import {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
} from "./project.controller";

import {
    authMiddleware
} from "../../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/", createProject);

router.get("/", getProjects);

router.get("/:id", getProjectById);

router.patch("/:id", updateProject);

router.delete("/:id", deleteProject);

export default router;