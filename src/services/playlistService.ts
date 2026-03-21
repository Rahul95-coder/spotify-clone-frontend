import api from "../services/api"
import type {Playlist} from "../types/Playlist"

export const getPlaylist = async (id: string): Promise<Playlist> => {

    const res = await api.get(`/playlists/${id}`)

    return res.data

}

export const getPlaylists = async (): Promise<Playlist[]> => {

    const res = await api.get(`/playlists`)

    return (res.data.playlists || res.data.content || res.data) as Playlist[]

}
