import {
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import api from "../api/api";

import Navbar from "../components/Navbar";

export default function Insights() {

    const { taskId } =
        useParams();

    const [data, setData] =
        useState<any>(null);

    useEffect(() => {

        const load =
            async () => {

                const res =
                    await api.post(
                        `/ai/tasks/${taskId}/insights`
                    );

                setData(res.data.data);
            };

        load();

    }, [taskId]);

    return (
        <>
            <Navbar />

            <div className="container">

                <div className="card">

                    <h2>
                        AI Task Insights
                    </h2>

                    {data && (

                        <>
                            <h3>
                                Summary
                            </h3>

                            <p>
                                {data.summary}
                            </p>

                            <h3>
                                Risks
                            </h3>

                            <ul>
                                {data.risks?.map(
                                    (
                                        risk: string,
                                        idx: number
                                    ) => (
                                        <li key={idx}>
                                            {risk}
                                        </li>
                                    )
                                )}
                            </ul>

                            <h3>
                                Recommendations
                            </h3>

                            <ul>
                                {data.recommendations?.map(
                                    (
                                        rec: string,
                                        idx: number
                                    ) => (
                                        <li key={idx}>
                                            {rec}
                                        </li>
                                    )
                                )}
                            </ul>

                            <h3>
                                Complexity
                            </h3>

                            <p>
                                {
                                    data.estimatedComplexity
                                }
                            </p>

                        </>
                    )}

                </div>

            </div>
        </>
    );
}