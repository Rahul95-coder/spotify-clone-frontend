import api from "./api"
import type { Playlist } from "../types/Playlist"

export const getPlaylists = async (): Promise<Playlist[]> => {
    const res = await api.get(`/playlists`)
    return (res.data.playlists || res.data.content || res.data) as Playlist[]
}

export const createPlaylist = async (name: string): Promise<Playlist> => {
    const res = await api.post(`/playlists`, { name })
    return res.data
}

export const addSongToPlaylist = async (playlistId: string, songId: string) => {
    await api.post(`/playlists/${playlistId}/songs/${songId}`)
}

export const getPlaylist = async (id: string): Promise<Playlist> => {
    const res = await api.get(`/playlists/${id}`)
    return res.data
}