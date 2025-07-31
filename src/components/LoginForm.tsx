import React, { useState } from "react";

interface Props {
    onLogin: (username: string) => void;
}

export default function LoginForm({ onLogin }: Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        const resp = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        setLoading(false);
        if (resp.ok) {
            onLogin(username);
        } else {
            alert("Invalid username or password");
        }
    }

    return (
        <form onSubmit={handleLogin} className="flex flex-col items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl mb-4 text-center">Login</h2>
                <input
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="mb-2 p-2 w-full border"
                    placeholder="Username"
                />
                <input
                    required
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="mb-4 p-2 w-full border"
                    placeholder="Password"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </div>
        </form>
    );
}
