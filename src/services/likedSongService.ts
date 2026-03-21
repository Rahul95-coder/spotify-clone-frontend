import api from "../services/api"


export const likeSong = async ( songId: string) => {
    const res = await api.post(`/likes/${songId}`)
    return res.data
}

export const unlikeSong = async ( songId: string) => {
    await api.delete(`/likes/${songId}`)
}

export const getLikedSongs = async (userId: string) => {
    const res = await api.get(`/likes/${userId}`)
    return res.data
}