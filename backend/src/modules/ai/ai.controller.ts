import { Request, Response } from "express";

import {
    generateTaskInsights
} from "./ai.service";

export const getTaskInsights =
    async (
        req: Request,
        res: Response
    ) => {

        const { taskId } = req.params;

        if (!taskId) return res.status(401).json({ body: "Need Task ID" })

        const result =
            await generateTaskInsights(
                taskId
            );

        res.status(200).json({
            success: true,
            data: result
        });
    };