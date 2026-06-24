import Navbar from "../components/Navbar";

export default function Dashboard() {

    return (
        <>
            <Navbar />

            <div className="container">

                <div className="card">
                    <h2>Task Management Dashboard</h2>
                </div>

                <div className="card">
                    <h3>Features</h3>

                    <ul>
                        <li>Projects</li>
                        <li>Tasks</li>
                        <li>Real-time Updates</li>
                        <li>AI Insights</li>
                    </ul>
                </div>

            </div>
        </>
    );
}