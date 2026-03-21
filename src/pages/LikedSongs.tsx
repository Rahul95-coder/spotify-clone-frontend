import { useEffect, useState } from "react"
import { getLikedSongs } from "../services/likedSongService"
import { useLikedStore } from "../store/likedStore"
import type { Song } from "../types/Song"

export default function LikedSongs() {

    const [songs, setSongs] = useState<Song[]>([])
    const [error, setError] = useState<string | null>(null)
    const { setLikedSongs } = useLikedStore()

    useEffect(() => {
        const load = async () => {
            try {
                const userId = localStorage.getItem("userId")
                const token = localStorage.getItem("token")

                // CHANGED: log both so you can see exactly what's missing
                console.log("userId:", userId)
                console.log("token:", token ? "EXISTS" : "MISSING")

                if (!userId) {
                    setError("No userId in localStorage — are you logged in?")
                    return
                }

                const data = await getLikedSongs(userId)

                // CHANGED: log raw response so you can see what backend actually returns
                console.log("liked songs raw response:", data)

                setSongs(data)
                setLikedSongs(data.map((song: Song) => song.id))

            } catch (err: any) {
                // CHANGED: show the actual HTTP status so you know if it's 403/404/500
                const status = err?.response?.status
                const msg = err?.response?.data || err?.message
                console.error(`Liked songs fetch failed — status ${status}:`, msg)
                setError(`Failed to load liked songs (${status})`)
            }
        }

        load()
    }, [setLikedSongs])

    if (error) return (
        <div className="p-6 text-red-400">
            {error} — check browser console for details
        </div>
    )

    return (
        <div className="p-3 md:p-6 text-white">
            <h1 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">Liked Songs</h1>

            {songs.length === 0 && (
                <p className="text-neutral-400">No liked songs yet.</p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                {songs.map((song) => (
                    <div key={song.id} className="bg-neutral-900 p-4 rounded hover:bg-neutral-800">
                        <img
                            src={song.coverUrl || "/default-cover.jpg"}
                            alt={song.title}
                            className="rounded mb-3 w-full aspect-square object-cover"
                        />
                        <h3 className="font-semibold truncate">{song.title}</h3>
                        <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}