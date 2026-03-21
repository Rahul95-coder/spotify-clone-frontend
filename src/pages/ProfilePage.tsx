import { useEffect, useState } from "react"
import { useUserStore } from "../store/userStore"

export default function ProfilePage() {
    const { user, fetchUser, updateProfile, loading } = useUserStore()
    const [username, setUsername] = useState("")

    useEffect(() => {
        if (!user) fetchUser()
    }, [user, fetchUser])

    useEffect(() => {
        if (user) setUsername(user.username)
    }, [user])

    const handleSave = async () => {
        if (!username.trim()) return
        await updateProfile(username)
        alert("Profile updated!")
    }

    if (loading && !user) {
        return <div className="p-6 text-white">Loading...</div>
    }

    if (!user) {
        return <div className="p-6 text-white">User not found</div>
    }

    return (
        <div className="p-4 md:p-6 text-white flex justify-center">

            <div className="w-full max-w-md bg-neutral-900 p-5 md:p-6 rounded-lg">

                <h1 className="text-xl md:text-2xl font-bold mb-6 text-center">
                    Profile
                </h1>

                {/* Avatar */}
                <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center text-black text-lg md:text-xl font-bold">
                        {user.username.charAt(0).toUpperCase()}
                    </div>
                </div>

                {/* Username */}
                <label className="block text-sm mb-1">Username</label>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-neutral-800 px-3 py-2 rounded mb-4 text-sm md:text-base"
                />

                {/* Button */}
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="w-full bg-green-500 text-black py-2 rounded hover:scale-105 transition"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>

            </div>
        </div>
    )
}