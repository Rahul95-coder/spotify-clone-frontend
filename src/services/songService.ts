import api from "../services/api"

export const getSongs = async () => {

    const response = await api.get("/songs?size=100")

    return response.data.songs
}

export const searchSongs = async (query: string) => {

    const response = await api.get(`/songs/search?query=${query}`)

    return response.data

}