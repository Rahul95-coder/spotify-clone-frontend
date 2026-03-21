import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { Playlist } from "../types/Playlist"
import { getPlaylist } from "../services/playlistService"
import SongCard from "../components/music/SongCard"

export default function PlaylistPage(){

    const { id } = useParams()

    const [playlist,setPlaylist] = useState<Playlist | null>(null)

    useEffect(()=>{

        if(id){

            getPlaylist(id).then(setPlaylist)

        }

    },[id])

    if(!playlist) return <p>Loading playlist...</p>

    return(

        <div className="p-3 md:p-6">

            <h1 className="text-xl md:text-2xl font-bold mb-4">
                {playlist.name}
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">

                {playlist.songs.map(song=>(
                    <SongCard key={song.id} song={song}/>
                ))}

            </div>

        </div>
    )

}