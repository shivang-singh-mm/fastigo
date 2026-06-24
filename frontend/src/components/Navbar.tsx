import { Link } from "react-router-dom";

export default function Navbar() {

    return (
        <div
            style={{
                background: "#111",
                padding: "15px"
            }}
        >
            <Link
                to="/dashboard"
                style={{ color: "white" }}
            >
                Dashboard
            </Link>

            {" | "}

            <Link
                to="/projects"
                style={{ color: "white" }}
            >
                Projects
            </Link>

            {" | "}

            <Link
                to="/tasks"
                style={{ color: "white" }}
            >
                Tasks
            </Link>
        </div>
    );
}