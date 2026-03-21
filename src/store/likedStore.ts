import { create } from "zustand"

interface LikedState {
    likedSongs: string[]
    setLikedSongs: (songs: string[]) => void
    like: (songId: string) => void
    unlike: (songId: string) => void
}

export const useLikedStore = create<LikedState>((set) => ({
    likedSongs: [],

    setLikedSongs: (songs) => set({ likedSongs: songs }),

    like: (songId) =>
        set((state) => ({
            likedSongs: [...new Set([...state.likedSongs, songId])]
        })),

    unlike: (songId) =>
        set((state) => ({
            likedSongs: state.likedSongs.filter(id => id !== songId)
        }))
}))