import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../services/authService"
import * as React from "react"

export default function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)  // ADDED

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)  // ADDED
        setError("")

        try {
            await login(email, password)
            navigate("/")
        } catch {
            setError("Invalid credentials")
        } finally {
            setLoading(false)  // ADDED
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-black">

            <form
                onSubmit={handleSubmit}
                className="bg-neutral-900 p-8 rounded w-96"
            >
                {/* BRAND */}
                <div className="flex items-center gap-2 mb-6">
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "#1DB954" }}
                    >
                        <svg viewBox="0 0 20 20" width="20" height="20">
                            <rect x="1.5"  y="9" width="2" height="8"  rx="1" fill="white" opacity="0.9"/>
                            <rect x="5"    y="6" width="2" height="11" rx="1" fill="white"/>
                            <rect x="8.5"  y="3" width="2" height="14" rx="1" fill="white"/>
                            <rect x="12"   y="6" width="2" height="11" rx="1" fill="white"/>
                            <rect x="15.5" y="9" width="2" height="8"  rx="1" fill="white" opacity="0.9"/>
                        </svg>
                    </div>
                    <span className="font-medium text-base tracking-wide text-white">RVMUSIC</span>
                </div>

                <h2 className="text-white text-2xl mb-6">Login</h2>

                {error && <p className="text-red-400 mb-4">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 p-2 rounded bg-neutral-800 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-4 p-2 rounded bg-neutral-800 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />

                {/* CHANGED: spinner + disabled state while loading */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-500 w-full p-2 rounded font-semibold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3"/>
                                <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                            </svg>
                            Logging in...
                        </>
                    ) : "Login"}
                </button>

                <p className="text-gray-400 mt-4">
                    Don't have an account?
                    <a href="/register" className="text-green-400 ml-2">Sign up</a>
                </p>

            </form>

        </div>
    )
}