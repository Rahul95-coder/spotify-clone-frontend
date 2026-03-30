import { Link, useLocation } from "react-router-dom"
import { useUserStore } from "../../store/userStore"

export default function Sidebar() {
    const { user } = useUserStore()
    const location = useLocation()

    const navLink = (to: string, label: string) => {
        const active = location.pathname === to
        return (
            <Link
                to={to}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition
                    ${active
                    ? "bg-neutral-800 text-white"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                }`}
            >
                {label}
            </Link>
        )
    }

    return (
        <nav className="flex flex-col h-full text-white">

            {/* BRAND */}
            <div className="flex items-center gap-2 mb-6 px-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                     style={{ background: "#1DB954" }}>
                    <svg viewBox="0 0 20 20" width="20" height="20">
                        <rect x="1.5"  y="9" width="2" height="8"  rx="1" fill="white" opacity="0.9"/>
                        <rect x="5"    y="6" width="2" height="11" rx="1" fill="white"/>
                        <rect x="8.5"  y="3" width="2" height="14" rx="1" fill="white"/>
                        <rect x="12"   y="6" width="2" height="11" rx="1" fill="white"/>
                        <rect x="15.5" y="9" width="2" height="8"  rx="1" fill="white" opacity="0.9"/>
                    </svg>
                </div>
                <span className="font-semibold text-base tracking-wide">RVMUSIC</span>
            </div>

            {/* MAIN NAV */}
            <div className="flex flex-col gap-1 mb-6">
                {navLink("/", "🏠  Home")}
                {navLink("/search", "🔍  Search")}
            </div>

            {/* LIBRARY */}
            <div className="flex flex-col gap-1">
                <p className="text-xs text-neutral-500 uppercase tracking-widest px-3 mb-2">Library</p>
                {navLink("/library", "📚  Your Library")}
                {navLink("/liked-songs", "♥  Liked Songs")}
                {navLink("/history", "🕐  Recently Played")}
            </div>

            {/*/!* SPACER *!/*/}
            {/*<div className="flex-1" />*/}

            {/* ADMIN */}
            {user?.role === "ROLE_ADMIN" && (
                <div className="border-t border-neutral-800 pt-4">
                    {navLink("/admin", "⚙️  Admin Upload")}
                </div>
            )}
        </nav>
    )
}