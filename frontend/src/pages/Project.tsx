import { useEffect, useState } from "react";

import api from "../api/api";

import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {

    const [projects, setProjects] =
        useState<any[]>([]);

    const [name, setName] =
        useState("");

    const [description, setDescription] =
        useState("");

    const fetchProjects =
        async () => {

            const res =
                await api.get("/projects");

            setProjects(res.data);
        };

    useEffect(() => {
        fetchProjects();
    }, []);

    const createProject =
        async () => {

            await api.post(
                "/projects",
                {
                    name,
                    description
                }
            );

            fetchProjects();
        };

    return (
        <>
            <Navbar />

            <div className="container">

                <div className="card">

                    <h2>Create Project</h2>

                    <input
                        placeholder="Name"
                        onChange={(e) =>
                            setName(e.target.value)
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

                    <button
                        onClick={createProject}
                    >
                        Create
                    </button>

                </div>

                {projects.map(project => (

                    <ProjectCard
                        key={project.id}
                        project={project}
                    />

                ))}

            </div>
        </>
    );
}