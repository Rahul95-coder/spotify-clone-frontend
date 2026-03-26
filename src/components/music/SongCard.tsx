import type { Song } from "../../types/Song"
import { usePlayerStore } from "../../store/playerStore"
import { likeSong, unlikeSong } from "../../services/likedSongService"
import { useLikedStore } from "../../store/likedStore"
import { getPlaylists, addSongToPlaylist } from "../../services/playlistService"
import type { Playlist } from "../../types/Playlist"
import * as React from "react"

export default function SongCard({
                                     song,
                                     allSongs,
                                     onPlay
                                 }: {
    song: Song
    allSongs?: Song[]
    onPlay?: () => void
}) {

    const setSong  = usePlayerStore(s => s.setSong)
    const setQueue = usePlayerStore(s => s.setQueue)

    const likedSongs = useLikedStore(s => s.likedSongs)
    const like       = useLikedStore(s => s.like)
    const unlike     = useLikedStore(s => s.unlike)

    const [loading, setLoading]           = React.useState(false)
    const [animate, setAnimate]           = React.useState(false)
    const [showMenu, setShowMenu]         = React.useState(false)
    const [playlists, setPlaylists]       = React.useState<Playlist[]>([])
    const [showPlaylists, setShowPlaylists] = React.useState(false)
    const [addedMsg, setAddedMsg]         = React.useState("")

    if (!song?.id) return null

    const liked = likedSongs.includes(song.id)

    const handlePlay = () => {
        if (allSongs && allSongs.length > 0) setQueue(allSongs)
        setSong(song)
        onPlay?.()
    }

    const handleLike = async (e: React.MouseEvent) => {
        e.stopPropagation()
        if (loading) return
        setLoading(true)
        const isLiked = likedSongs.includes(song.id)
        isLiked ? unlike(song.id) : like(song.id)
        if (!isLiked) {
            setAnimate(true)
            setTimeout(() => setAnimate(false), 200)
        }
        try {
            isLiked ? await unlikeSong(song.id) : await likeSong(song.id)
        } catch {
            isLiked ? like(song.id) : unlike(song.id)
        } finally {
            setLoading(false)
        }
    }

    const handleMenuOpen = async (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowMenu(true)
        // load playlists when menu opens
        try {
            const data = await getPlaylists()
            setPlaylists(Array.isArray(data) ? data : [])
        } catch {
            setPlaylists([])
        }
    }

    const handleAddToPlaylist = async (e: React.MouseEvent, playlistId: string, playlistName: string) => {
        e.stopPropagation()
        try {
            await addSongToPlaylist(playlistId, song.id)
            setAddedMsg(`Added to ${playlistName}`)
            setTimeout(() => setAddedMsg(""), 2000)
        } catch {
            setAddedMsg("Already in playlist")
            setTimeout(() => setAddedMsg(""), 2000)
        }
        setShowMenu(false)
        setShowPlaylists(false)
    }

    return (
        <div
            onClick={handlePlay}
            className="bg-neutral-900 p-2 md:p-4 rounded-lg hover:bg-neutral-800 cursor-pointer group transition relative"
        >
            <div className="relative">
                <img
                    src={song.coverUrl || "/default-cover.jpg"}
                    alt={song.title}
                    className="rounded mb-2 md:mb-3 w-full aspect-square object-cover"
                />
                <button className="absolute bottom-2 right-2 bg-green-500 text-black w-8 h-8 md:w-10 md:h-10 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition">
                    ▶
                </button>
            </div>

            <h3 className="font-medium text-sm md:text-base truncate">{song.title}</h3>
            <p className="text-xs md:text-sm text-neutral-400 truncate">{song.artist}</p>

            {/* BOTTOM ROW: like + menu */}
            <div className="flex items-center justify-between mt-1 md:mt-2">
                <button
                    onClick={handleLike}
                    className={`text-lg md:text-xl transition-transform
                        ${liked ? "text-red-500" : "text-neutral-400"}
                        ${animate ? "scale-125" : "scale-100"}`}
                >
                    ♥
                </button>

                {/* ADDED: 3-dot menu */}
                <button
                    onClick={handleMenuOpen}
                    className="text-neutral-400 hover:text-white text-lg px-1"
                >
                    ···
                </button>
            </div>

            {/* SUCCESS TOAST */}
            {addedMsg && (
                <div className="absolute bottom-16 left-0 right-0 mx-2 bg-green-500 text-black text-xs text-center py-1 rounded z-20">
                    {addedMsg}
                </div>
            )}

            {/* DROPDOWN MENU */}
            {showMenu && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={e => { e.stopPropagation(); setShowMenu(false); setShowPlaylists(false) }}
                >
                    <div
                        className="absolute z-50 bg-neutral-800 rounded-lg shadow-xl w-48 py-1"
                        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="px-4 py-2 text-sm font-medium truncate border-b border-neutral-700">
                            {song.title}
                        </div>

                        {/* ADD TO PLAYLIST */}
                        <button
                            className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-700 transition"
                            onClick={e => { e.stopPropagation(); setShowPlaylists(!showPlaylists) }}
                        >
                            + Add to playlist
                        </button>

                        {showPlaylists && (
                            <>
                                {playlists.length === 0 ? (
                                    <div className="px-4 py-2 text-xs text-neutral-400">
                                        No playlists yet
                                    </div>
                                ) : (
                                    playlists.map(p => (
                                        <button
                                            key={p.id}
                                            className="w-full text-left px-6 py-2 text-sm hover:bg-neutral-700 text-neutral-300 transition truncate"
                                            onClick={e => handleAddToPlaylist(e, p.id, p.name)}
                                        >
                                            {p.name}
                                        </button>
                                    ))
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}