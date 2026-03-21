import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUserStore } from "../../store/userStore"

export default function Topbar({ toggleSidebar }: { toggleSidebar?: () => void }) {

    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const { user, logout } = useUserStore()

    return (
        <header className="h-14 flex items-center justify-between px-4 md:px-6 border-b border-neutral-800 bg-neutral-950">

            {/* MOBILE MENU */}
            <button onClick={toggleSidebar} className="md:hidden text-white text-xl">
                ☰
            </button>

            {/* BRAND — replaces search box */}
            <div className="flex items-center gap-2">
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
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
                <span className="font-medium text-base tracking-wide text-white">
                    RVMUSIC
                </span>
            </div>

            {/* USER */}
            <div className="relative">
                <div
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold">
                        {user?.username?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <span className="text-sm hidden md:block">
                        {user?.username || "User"}
                    </span>
                </div>

                {open && (
                    <div className="absolute right-0 mt-2 w-40 bg-neutral-900 rounded shadow-lg border border-neutral-800 z-50">
                        <button
                            onClick={() => { navigate("/profile"); setOpen(false) }}
                            className="w-full text-left px-4 py-2 hover:bg-neutral-800 text-sm"
                        >
                            Profile
                        </button>
                        <button
                            onClick={logout}
                            className="w-full text-left px-4 py-2 hover:bg-red-600 text-sm"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>

        </header>
    )
}