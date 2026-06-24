import express from "express";
import cors from "cors";

import projectRoutes
    from "./modules/project/project.routes";

import authRoutes
    from "./modules/auth/auth.routes";

import taskRoutes
    from "./modules/task/task.routes";

import aiRoutes from "./modules/ai/ai.routes";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);

app.use(
    "/api/projects",
    projectRoutes
);

app.use(
    "/api/tasks",
    taskRoutes
);

app.use("/api/auth", authRoutes);

export default app;