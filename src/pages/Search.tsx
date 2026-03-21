import { useState } from "react"
import { searchSongs } from "../services/songService"
import SongCard from "../components/music/SongCard"
import type {Song} from "../types/Song.ts";

export default function Search(){

    const [query,setQuery] = useState("")
    const [songs,setSongs] = useState([])

    const handleSearch = async () => {

        const results = await searchSongs(query)

        setSongs(results)

    }

    return(

        <div>

            <h1 className="text-2xl mb-4">
                Search
            </h1>

            <input
                className="p-2 text-black"
                placeholder="Search songs or artists"
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
            />

            <button
                onClick={handleSearch}
                className="ml-2 bg-green-500 px-3 py-1"
            >
                Search
            </button>

            <div className="grid grid-cols-4 gap-4 mt-6">

                {songs.map((song: Song)=>(
                    <SongCard key={song.id} song={song}/>
                ))}

            </div>

        </div>

    )

}