import QueuePanel from "../player/QueuePanel.tsx";
import {useEffect, useState} from "react";
import {Outlet, useLocation} from "react-router-dom";
import Topbar from "./Topbar.tsx";
import Sidebar from "./Sidebar.tsx";
import Player from "../player/Player.tsx";

export default function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const location = useLocation()

    // 🔥 AUTO CLOSE SIDEBAR ON ROUTE CHANGE
    useEffect(() => {
        setSidebarOpen(false)
    }, [location.pathname])

    return (
        <div className="flex flex-col h-screen bg-black text-white">

            <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

            <div className="flex flex-1 overflow-hidden">

                {/* Overlay */}
                <div
                    className={`fixed inset-0 bg-black/50 z-10 md:hidden ${
                        sidebarOpen ? "block" : "hidden"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                />

                {/* Sidebar */}
                <aside className={`
                    fixed md:static z-20 h-full w-60 bg-black border-r border-neutral-800 p-4
                    transform transition-transform duration-300
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                `}>
                    <Sidebar />
                </aside>

                {/* Main */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <Outlet />
                </main>

                {/* Queue */}
                <div className="hidden lg:block w-80 border-l border-neutral-800">
                    <QueuePanel />
                </div>

            </div>

            <Player />
        </div>
    )
}