import { useEffect } from "react"
import type { Song } from "../../types/Song"
import { usePlayerStore } from "../../store/playerStore"
import SongCard from "./SongCard"

export default function SongList({ songs }: { songs: Song[] }) {

    const setQueue = usePlayerStore(s => s.setQueue)

    useEffect(() => {
        if (songs.length) setQueue(songs)
    }, [songs, setQueue])

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {songs.map((song: Song) => (
                <SongCard key={song.id} song={song} allSongs={songs} />
            ))}
        </div>
    )
}