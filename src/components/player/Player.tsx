import { useEffect, useRef, useState } from "react"
import { usePlayerStore } from "../../store/playerStore"
import PlayerControls from "./PlayerControls"
import ProgressBar from "./ProgressBar"
import { addToHistory } from "../../services/historyService"
import QueuePanel from "./QueuePanel"

export default function Player() {

    const audioRef = useRef<HTMLAudioElement>(null)

    const currentSong = usePlayerStore(s => s.currentSong)
    const isPlaying   = usePlayerStore(s => s.isPlaying)
    const playNext    = usePlayerStore(s => s.playNext)
    const play        = usePlayerStore(s => s.play)  // ADDED: was missing, used in resume button

    const [showQueue, setShowQueue]   = useState(false)
    const [showVolume, setShowVolume] = useState(false)
    const [showResume, setShowResume] = useState(false)

    // LOAD SONG
    useEffect(() => {
        const audio = audioRef.current
        if (!audio || !currentSong?.id) return

        audio.pause()
        audio.src = `http://localhost:8080/api/songs/stream/${currentSong.id}`
        audio.load()
        audio.play().catch(() => {})
        addToHistory(currentSong.id)
    }, [currentSong?.id])

    // PLAY / PAUSE
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return
        isPlaying ? audio.play().catch(() => {}) : audio.pause()
    }, [isPlaying])

    // SHOW RESUME BANNER on refresh if song was persisted
    useEffect(() => {
        if (currentSong && !isPlaying) setShowResume(true)
    }, [])

    // AUTO NEXT
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const handleEnd = () => {
            const { repeatMode } = usePlayerStore.getState()
            if (repeatMode === "one") {
                audio.currentTime = 0
                audio.play().catch(() => {})
            } else {
                playNext()
            }
        }

        audio.addEventListener("ended", handleEnd)
        return () => audio.removeEventListener("ended", handleEnd)
    }, [playNext])

    if (!currentSong) return null

    return (
        <div className="bg-neutral-900 border-t border-neutral-800 px-3 md:px-6 py-2 md:py-3">

            <div className="flex items-center justify-between gap-3">

                {/* LEFT */}
                <div className="flex items-center gap-2 min-w-0">
                    <img
                        src={currentSong.coverUrl || "/default-cover.jpg"}
                        className="w-10 h-10 md:w-12 md:h-12 rounded"
                    />
                    <div className="truncate">
                        <div className="text-sm font-medium truncate">{currentSong.title}</div>
                        <div className="text-xs text-neutral-400 truncate">{currentSong.artist}</div>
                    </div>
                </div>

                {/* CENTER */}
                <div className="flex flex-col items-center flex-1 max-w-md">
                    <div className="flex items-center gap-4">
                        <PlayerControls />

                        <button onClick={() => setShowQueue(true)} className="text-lg hover:text-green-500">
                            ☰
                        </button>

                        {/* MOBILE VOLUME */}
                        <div className="relative md:hidden">
                            <button onClick={() => setShowVolume(!showVolume)} className="text-lg">
                                🔊
                            </button>
                            {showVolume && (
                                <input
                                    type="range" min="0" max="1" step="0.01"
                                    className="absolute bottom-10 left-1/2 -translate-x-1/2 w-24"
                                    onChange={(e) => {
                                        if (audioRef.current) audioRef.current.volume = Number(e.target.value)
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    <div className="w-full mt-1">
                        <ProgressBar audioRef={audioRef} />
                    </div>
                </div>

                {/* DESKTOP VOLUME */}
                <div className="hidden md:flex items-center w-32 justify-end">
                    <input
                        type="range" min="0" max="1" step="0.01" className="w-full"
                        onChange={(e) => {
                            if (audioRef.current) audioRef.current.volume = Number(e.target.value)
                        }}
                    />
                </div>
            </div>

            {/* RESUME BANNER */}
            {showResume && !isPlaying && (
                <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-green-500 text-black px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-3 z-50 shadow-lg">
                    <span>Continue playing <b>{currentSong.title}</b>?</span>
                    <button
                        onClick={() => { play(); setShowResume(false) }}
                        className="bg-black text-white px-3 py-1 rounded-full text-xs"
                    >
                        ▶ Resume
                    </button>
                    <button
                        onClick={() => setShowResume(false)}
                        className="text-black opacity-60 hover:opacity-100"
                    >
                        ✕
                    </button>
                </div>
            )}

            <audio ref={audioRef} />

            {/* QUEUE MODAL */}
            {showQueue && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
                    <div className="flex justify-between items-center p-4 border-b border-neutral-700">
                        <h2 className="text-lg">Queue</h2>
                        <button onClick={() => setShowQueue(false)}>✖</button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2">
                        <QueuePanel />
                    </div>
                </div>
            )}
        </div>
    )
}