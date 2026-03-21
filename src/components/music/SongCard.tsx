import type {Song} from "../../types/Song"
import {usePlayerStore} from "../../store/playerStore"
import {likeSong, unlikeSong} from "../../services/likedSongService"
import {useLikedStore} from "../../store/likedStore"
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

    // EACH selector is its own line — never return {} from a zustand selector
    const setSong = usePlayerStore(s => s.setSong)
    const setQueue = usePlayerStore(s => s.setQueue)

    const likedSongs = useLikedStore(s => s.likedSongs)
    const like = useLikedStore(s => s.like)
    const unlike = useLikedStore(s => s.unlike)

    const [loading, setLoading] = React.useState(false)
    const [animate, setAnimate] = React.useState(false)

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

        // optimistic update
        isLiked ? unlike(song.id) : like(song.id)
        if (!isLiked) {
            setAnimate(true)
            setTimeout(() => setAnimate(false), 200)
        }

        try {
            isLiked ? await unlikeSong(song.id) : await likeSong(song.id)
        } catch (error) {
            console.error("API failed, rolling back", error)
            // rollback
            isLiked ? like(song.id) : unlike(song.id)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            onClick={handlePlay}
            className="bg-neutral-900 p-2 md:p-4 rounded-lg hover:bg-neutral-800 cursor-pointer group transition"
        >
            <div className="relative">
                <img
                    src={song.coverUrl || "/default-cover.jpg"}
                    alt={song.title}
                    className="rounded mb-2 md:mb-3 w-full aspect-square object-cover"
                />
                <button
                    className="absolute bottom-2 right-2 bg-green-500 text-black w-8 h-8 md:w-10 md:h-10 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition">
                    ▶
                </button>
            </div>

            <h3 className="font-medium text-sm md:text-base truncate">{song.title}</h3>
            <p className="text-xs md:text-sm text-neutral-400 truncate">{song.artist}</p>

            <button
                onClick={handleLike}
                className={`mt-1 md:mt-2 text-lg md:text-xl transition-transform
                            ${liked ? "text-red-500" : "text-neutral-400"}
                            ${animate ? "scale-125" : "scale-100"}
                            `}
            >
                ♥
            </button>
        </div>
    )
}