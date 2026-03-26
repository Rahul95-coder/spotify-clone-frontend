import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPlaylist } from "../services/playlistService"
import SongList from "../components/music/SongList"
import type { Song } from "../types/Song"

export default function PlaylistPage() {

    const { id } = useParams()
    const [name, setName]     = useState("")
    const [songs, setSongs]   = useState<Song[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return
        const load = async () => {
            try {
                const data = await getPlaylist(id)
                setName(data.name)
                setSongs(Array.isArray(data.songs) ? data.songs : [])
            } catch (err) {
                console.error("Failed to load playlist", err)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [id])

    if (loading) return <p className="p-6 text-neutral-400">Loading...</p>

    return (
        <div className="p-3 md:p-6">
            <div className="flex items-end gap-4 mb-6">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-neutral-800 rounded flex items-center justify-center text-4xl flex-shrink-0">
                    🎵
                </div>
                <div>
                    <p className="text-xs text-neutral-400 uppercase tracking-widest mb-1">Playlist</p>
                    <h1 className="text-2xl md:text-4xl font-bold">{name}</h1>
                    <p className="text-neutral-400 text-sm mt-1">{songs.length} songs</p>
                </div>
            </div>

            {songs.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-neutral-400">No songs in this playlist yet.</p>
                    <p className="text-neutral-500 text-sm mt-1">Go to Home and add songs using the ··· menu</p>
                </div>
            ) : (
                <SongList songs={songs} />
            )}
        </div>
    )
}