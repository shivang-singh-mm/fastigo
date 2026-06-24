interface Props {
    project: any;
}

export default function ProjectCard({
    project
}: Props) {

    return (
        <div className="card">

            <h3>{project.name}</h3>

            <p>
                {project.description}
            </p>

        </div>
    );
}