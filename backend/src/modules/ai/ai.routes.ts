import { Router } from "express";

import {
    getTaskInsights
} from "./ai.controller";

import {
    authMiddleware
} from "../../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post(
    "/task/:taskId/insights",
    getTaskInsights
);



export default router;