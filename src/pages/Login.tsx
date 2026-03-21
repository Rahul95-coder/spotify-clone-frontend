import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../services/authService"
import * as React from "react";

export default function Login(){

    const navigate = useNavigate()

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()

        try{

            await login(email,password)

            navigate("/")

        }catch{

            setError("Invalid credentials")

        }

    }

    return(

        <div className="flex justify-center items-center h-screen bg-black">

            <form
                onSubmit={handleSubmit}
                className="bg-neutral-900 p-8 rounded w-96"
            >

                <h2 className="text-white text-2xl mb-6">
                    Login
                </h2>

                {error && (
                    <p className="text-red-400 mb-4">
                        {error}
                    </p>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 p-2 rounded"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-4 p-2 rounded"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <button
                    className="bg-green-500 w-full p-2 rounded"
                >
                    Login
                </button>

                <p className="text-gray-400 mt-4">
                    Don't have an account?
                    <a
                        href="/register"
                        className="text-green-400 ml-2"
                    >
                        Sign up
                    </a>
                </p>

            </form>

        </div>

    )

}