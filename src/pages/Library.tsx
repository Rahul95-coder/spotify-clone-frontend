import { useEffect, useState } from "react"
import { getPlaylists } from "../services/playlistService"
import PlaylistCard from "../components/playlist/PlaylistCard"
import type { Playlist } from "../types/Playlist"

export default function Library() {

    const [playlists, setPlaylists] = useState<Playlist[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getPlaylists()
                setPlaylists(Array.isArray(data) ? data : [])
            } catch (err) {
                console.error("Failed to load playlists", err)
                setPlaylists([])
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    if (loading) return <p className="p-6 text-neutral-400">Loading...</p>

    return (
        <div className="p-3 md:p-6">
            <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                Your Library
            </h1>

            {playlists.length === 0 ? (
                <p className="text-neutral-400">No playlists yet.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                    {playlists.map(p => (
                        <PlaylistCard key={p.id} playlist={p} />
                    ))}
                </div>
            )}
        </div>
    )
}