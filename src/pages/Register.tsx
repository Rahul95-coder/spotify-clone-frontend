import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../services/authService"
import * as React from "react";

export default function Register(){

    const navigate = useNavigate()

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()

        try{

            await register(name,email,password)

            navigate("/login")

        }catch{

            setError("Registration failed")

        }

    }

    return(

        <div className="flex justify-center items-center h-screen bg-black">

            <form
                onSubmit={handleSubmit}
                className="bg-neutral-900 p-8 rounded w-96"
            >

                <h2 className="text-white text-2xl mb-6">
                    Create Account
                </h2>

                {error && (
                    <p className="text-red-400 mb-4">{error}</p>
                )}

                <input
                    type="text"
                    placeholder="Name"
                    className="w-full mb-4 p-2 rounded"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />

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

                <button className="bg-green-500 w-full p-2 rounded">
                    Register
                </button>

                <p className="text-gray-400 mt-4">
                    Already have an account?
                    <a
                        href="/login"
                        className="text-green-400 ml-2"
                    >
                        Sign in
                    </a>
                </p>

            </form>

        </div>

    )

}