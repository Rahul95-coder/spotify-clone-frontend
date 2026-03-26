import { useEffect, useState } from "react"
import { getPlaylists, createPlaylist } from "../services/playlistService"
import PlaylistCard from "../components/playlist/PlaylistCard"
import type { Playlist } from "../types/Playlist"

export default function Library() {

    const [playlists, setPlaylists] = useState<Playlist[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [newName, setNewName] = useState("")
    const [creating, setCreating] = useState(false)

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

    useEffect(() => { load() }, [])

    const handleCreate = async () => {
        if (!newName.trim()) return
        setCreating(true)
        try {
            const playlist = await createPlaylist(newName.trim())
            setPlaylists(prev => [...prev, playlist])
            setNewName("")
            setShowModal(false)
        } catch (err) {
            console.error("Failed to create playlist", err)
        } finally {
            setCreating(false)
        }
    }

    if (loading) return <p className="p-6 text-neutral-400">Loading...</p>

    return (
        <div className="p-3 md:p-6">
            <div className="flex items-center justify-between mb-4 md:mb-6">
                <h1 className="text-xl md:text-2xl font-bold">Your Library</h1>
                {/* ADDED: create playlist button */}
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-500 text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-400 transition"
                >
                    + New Playlist
                </button>
            </div>

            {playlists.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="text-4xl mb-4">🎵</div>
                    <p className="text-neutral-400 mb-2">No playlists yet</p>
                    <p className="text-neutral-500 text-sm">Create your first playlist to get started</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                    {playlists.map(p => (
                        <PlaylistCard key={p.id} playlist={p} />
                    ))}
                </div>
            )}

            {/* CREATE PLAYLIST MODAL */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-neutral-900 rounded-lg p-6 w-80 shadow-xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-semibold mb-4">Create Playlist</h2>
                        <input
                            autoFocus
                            placeholder="Playlist name"
                            value={newName}
                            onChange={e => setNewName(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleCreate()}
                            className="w-full bg-neutral-800 px-3 py-2 rounded mb-4 text-sm"
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-2 rounded border border-neutral-600 text-sm hover:bg-neutral-800 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreate}
                                disabled={creating || !newName.trim()}
                                className="flex-1 py-2 rounded bg-green-500 text-black text-sm font-semibold disabled:opacity-50 hover:bg-green-400 transition"
                            >
                                {creating ? "Creating..." : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}