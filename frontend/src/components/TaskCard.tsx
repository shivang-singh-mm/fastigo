import { useState } from "react";
import api from "../api/api";

interface Props {
    task: any;
    onStatusChange: (
        taskId: string,
        status: string
    ) => void;
}

export default function TaskCard({
    task,
    onStatusChange
}: Props) {

    const [aiSummary, setAiSummary] =
        useState<any>(null);

    const [loading, setLoading] =
        useState(false);

    const generateSummary = async (
        taskId: string
    ) => {
        try {

            setLoading(true);

            const res = await api.post(`/ai/task/${taskId}/insights`);

            setAiSummary(res.data);

        } catch (err) {

            console.error(err);

            alert(
                "Failed to generate AI summary"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div
            className="card"
            style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "16px"
            }}
        >

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
                <strong>Priority:</strong>{" "}
                {task.priority}
            </p>

            <p>
                <strong>Status:</strong>{" "}
                {task.status}
            </p>

            <select
                value={task.status}
                onChange={(e) =>
                    onStatusChange(
                        task.id,
                        e.target.value
                    )
                }
            >
                <option value="TODO">
                    TODO
                </option>

                <option value="IN_PROGRESS">
                    IN_PROGRESS
                </option>

                <option value="DONE">
                    DONE
                </option>
            </select>

            <br />
            <br />

            <button
                onClick={() =>
                    generateSummary(
                        task.id
                    )
                }
            >
                {
                    loading
                        ? "Generating..."
                        : "AI Summary"
                }
            </button>

            {
                aiSummary && (
                    <div
                        style={{
                            marginTop: "16px",
                            padding: "12px",
                            background: "#f5f5f5",
                            borderRadius: "6px"
                        }}
                    >
                        <h4>
                            AI Insights
                        </h4>

                        {
                            typeof aiSummary ===
                                "string"
                                ? (
                                    <p>
                                        {aiSummary}
                                    </p>
                                )
                                : (
                                    <pre>
                                        {JSON.stringify(
                                            aiSummary,
                                            null,
                                            2
                                        )}
                                    </pre>
                                )
                        }
                    </div>
                )
            }

        </div>
    );
}