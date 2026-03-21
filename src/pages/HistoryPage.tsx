// src/pages/HistoryPage.tsx
import { useEffect, useState } from "react"
import { getHistory } from "../services/historyService"
import SongList from "../components/music/SongList"
import type { Song } from "../types/Song"

export default function HistoryPage() {

    const [songs, setSongs] = useState<Song[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            try {
                const userId = localStorage.getItem("userId")
                if (!userId) return

                const data = await getHistory(userId)
                setSongs(Array.isArray(data) ? data : [])
            } catch (err) {
                console.error("Failed to load history", err)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    if (loading) return <p className="p-6 text-neutral-400">Loading...</p>

    return (
        <div className="p-3 md:p-6">
            <h1 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">
                Recently Played
            </h1>

            {songs.length === 0 ? (
                <p className="text-neutral-400">No history yet. Play some songs!</p>
            ) : (
                <SongList songs={songs} />
            )}
        </div>
    )
}