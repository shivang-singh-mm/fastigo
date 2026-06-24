import { Router } from "express";

import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    searchTasks
} from "./task.controller";

import {
    authMiddleware
} from "../../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/", createTask);

router.get("/", getTasks);

router.get("/search", searchTasks);

router.get("/:id", getTaskById);

router.patch("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;