// src/services/historyService.ts
import api from "./api"


export const addToHistory = async (songId: string): Promise<void> => {
    try {
        await api.post(`/history/${songId}`)
    } catch (error) {
        console.error("Failed to add to history:", error)
    }
}

export const getHistory = async (_userId: string) => {
    const res = await api.get(`/history`)
    return res.data
}