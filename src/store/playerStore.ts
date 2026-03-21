import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Song } from "../types/Song"

interface PlayerState {
    currentSong: Song | null
    queue: Song[]
    originalQueue: Song[]
    shuffledQueue: Song[]
    currentIndex: number
    history: Song[]
    isPlaying: boolean
    isShuffle: boolean
    repeatMode: "off" | "one" | "all"

    setQueue: (songs: Song[]) => void
    setSong: (song: Song) => void
    play: () => void
    pause: () => void
    playNext: () => void
    playPrev: () => void
    toggleShuffle: () => void
    toggleRepeat: () => void
}

export const usePlayerStore = create<PlayerState>()(
    // ADDED: persist middleware — saves currentSong, queue, currentIndex to
    // localStorage automatically. On refresh, store rehydrates from localStorage.
    persist(
        (set, get) => ({

            currentSong: null,
            queue: [],
            originalQueue: [],
            shuffledQueue: [],
            currentIndex: -1,
            history: [],
            isPlaying: false, // ALWAYS start paused on refresh — browser blocks autoplay
            isShuffle: false,
            repeatMode: "off",

            setQueue: (songs) => {
                const { currentSong } = get()
                const idx = currentSong ? songs.findIndex(s => s.id === currentSong.id) : -1
                set({
                    queue: songs,
                    originalQueue: songs,
                    shuffledQueue: [],
                    currentIndex: idx !== -1 ? idx : 0,
                    ...(currentSong ? {} : {
                        currentSong: songs.length ? songs[0] : null,
                        isPlaying: false
                    })
                })
            },

            setSong: (song) => {
                const { queue, currentSong } = get()
                const index = queue.findIndex(s => s.id === song.id)
                set(state => ({
                    currentSong: song,
                    currentIndex: index !== -1 ? index : 0,
                    isPlaying: true,
                    history: currentSong ? [...state.history, currentSong] : state.history
                }))
            },

            play: () => set({ isPlaying: true }),
            pause: () => set({ isPlaying: false }),

            playNext: () => {
                const { queue, currentSong, repeatMode } = get()
                if (!queue.length || !currentSong) return
                if (repeatMode === "one") return

                const idx = queue.findIndex(s => s.id === currentSong.id)
                let nextIndex = idx + 1

                if (nextIndex >= queue.length) {
                    if (repeatMode === "all") nextIndex = 0
                    else { set({ isPlaying: false }); return }
                }

                set({ currentIndex: nextIndex, currentSong: queue[nextIndex], isPlaying: true })
            },

            playPrev: () => {
                const { queue, currentSong } = get()
                if (!queue.length || !currentSong) return

                const idx = queue.findIndex(s => s.id === currentSong.id)
                if (idx > 0) {
                    set({ currentIndex: idx - 1, currentSong: queue[idx - 1], isPlaying: true })
                }
            },

            toggleShuffle: () => {
                const { isShuffle, originalQueue, currentSong } = get()
                if (!isShuffle) {
                    const shuffled = [...originalQueue].sort(() => Math.random() - 0.5)
                    const index = shuffled.findIndex(s => s.id === currentSong?.id)
                    set({ isShuffle: true, queue: shuffled, shuffledQueue: shuffled, currentIndex: index !== -1 ? index : 0 })
                } else {
                    const index = originalQueue.findIndex(s => s.id === currentSong?.id)
                    set({ isShuffle: false, queue: originalQueue, currentIndex: index !== -1 ? index : 0 })
                }
            },

            toggleRepeat: () => {
                const { repeatMode } = get()
                const next = repeatMode === "off" ? "all" : repeatMode === "all" ? "one" : "off"
                set({ repeatMode: next })
            }
        }),
        {
            name: "player-storage", // localStorage key
            // IMPORTANT: only persist these fields — don't persist isPlaying
            // because browser blocks autoplay on page load without user interaction
            partialize: (state) => ({
                currentSong: state.currentSong,
                queue: state.queue,
                originalQueue: state.originalQueue,
                currentIndex: state.currentIndex,
                isShuffle: state.isShuffle,
                repeatMode: state.repeatMode,
            })
        }
    )
)