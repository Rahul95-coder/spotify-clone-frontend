import { Link } from "react-router-dom"
import { useUserStore } from "../../store/userStore"

export default function Sidebar() {
    const { user } = useUserStore()

    return (
        <nav className="flex flex-col gap-4 text-white">

            {/* ADDED: brand */}
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                     style={{ background: "#1DB954" }}>
                    <svg viewBox="0 0 20 20" width="20" height="20">
                        <rect x="1.5" y="9"  width="2" height="8" rx="1" fill="white" opacity="0.9"/>
                        <rect x="5"   y="6"  width="2" height="11" rx="1" fill="white"/>
                        <rect x="8.5" y="3"  width="2" height="14" rx="1" fill="white"/>
                        <rect x="12"  y="6"  width="2" height="11" rx="1" fill="white"/>
                        <rect x="15.5" y="9" width="2" height="8"  rx="1" fill="white" opacity="0.9"/>
                    </svg>
                </div>
                <span className="font-medium text-base tracking-wide">RVMUSIC</span>
            </div>

            <Link to="/">Home</Link>
            <Link to="/search">Search</Link>
            <Link to="/library">Your Library</Link>
            <Link to="/liked-songs">Liked Songs</Link>
            <Link to="/history">Recently Played</Link>

            {user?.role === "ROLE_ADMIN" && (
                <Link to="/admin">Admin Upload</Link>
            )}
        </nav>
    )
}