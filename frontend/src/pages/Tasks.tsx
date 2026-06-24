import {
    useEffect,
    useState
} from "react";

import api from "../api/api";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

import { io } from "socket.io-client";

const socket =
    io("http://localhost:5000");

export default function Tasks() {

    const [tasks, setTasks] =
        useState<any[]>([]);

    const [title, setTitle] =
        useState("");

    const [description,
        setDescription] =
        useState("");

    const [projectId,
        setProjectId] =
        useState("");

    const fetchTasks =
        async () => {

            const res =
                await api.get("/tasks");

            setTasks(res.data);
        };

    useEffect(() => {

        fetchTasks();

        socket.on(
            "taskCreated",
            fetchTasks
        );

        socket.on(
            "taskUpdated",
            fetchTasks
        );

        socket.on(
            "taskDeleted",
            fetchTasks
        );

        return () => {
            socket.off(
                "taskCreated"
            );

            socket.off(
                "taskUpdated"
            );

            socket.off(
                "taskDeleted"
            );
        };

    }, []);

    const createTask =
        async () => {

            await api.post(
                "/tasks",
                {
                    title,
                    description,
                    projectId
                }
            );

            fetchTasks();
        };

    const updateStatus =
        async (
            taskId: string,
            status: string
        ) => {

            await api.patch(
                `/tasks/${taskId}`,
                {
                    status
                }
            );

            fetchTasks();
        };

    return (
        <>
            <Navbar />

            <div className="container">

                <div className="card">

                    <h2>Create Task</h2>

                    <input
                        placeholder="Title"
                        onChange={(e) =>
                            setTitle(
                                e.target.value
                            )
                        }
                    />

                    <textarea
                        placeholder="Description"
                        onChange={(e) =>
                            setDescription(
                                e.target.value
                            )
                        }
                    />

                    <input
                        placeholder="Project Id"
                        onChange={(e) =>
                            setProjectId(
                                e.target.value
                            )
                        }
                    />

                    <button
                        onClick={createTask}
                    >
                        Create Task
                    </button>

                </div>

                {tasks.map(task => (

                    <TaskCard
                        key={task.id}
                        task={task}
                        onStatusChange={
                            updateStatus
                        }
                    />

                ))}

            </div>
        </>
    );
}