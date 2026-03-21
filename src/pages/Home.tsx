import { useEffect, useState } from "react"
import { getSongs } from "../services/songService"
import SongList from "../components/music/SongList"
import { usePlayerStore } from "../store/playerStore"
import type { Song } from "../types/Song"

export default function Home() {

    const [songs, setSongs] = useState<Song[]>([])
    const play = usePlayerStore(s => s.play)

    useEffect(() => {
        getSongs().then(data => {
            const loaded = data || []
            setSongs(loaded)

            const justLoggedIn = sessionStorage.getItem("justLoggedIn")
            if (justLoggedIn && loaded.length > 0) {
                sessionStorage.removeItem("justLoggedIn")
                setTimeout(() => play(), 300)
            }
        })
    }, [])

    return (
        <div className="p-3 md:p-6">
            <h1 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">
                Trending Songs
            </h1>
            <SongList songs={songs} />
        </div>
    )
}