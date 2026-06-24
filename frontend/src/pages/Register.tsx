import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {

        await api.post("/auth/register", {
            name,
            email,
            password
        });

        navigate("/");
    };

    return (
        <div className="container">

            <div className="card">

                <h2>Register</h2>

                <input
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={register}>
                    Register
                </button>

            </div>

        </div>
    );
}