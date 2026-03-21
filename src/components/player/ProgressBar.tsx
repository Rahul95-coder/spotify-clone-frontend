import { useEffect, useState } from "react"
import * as React from "react";

interface Props {
    audioRef: React.RefObject<HTMLAudioElement>
}

export default function ProgressBar({ audioRef }: Props) {

    const [progress, setProgress] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    // 🎯 FORMAT TIME
    const formatTime = (time: number) => {
        if (!time || isNaN(time)) return "0:00"
        const min = Math.floor(time / 60)
        const sec = Math.floor(time % 60).toString().padStart(2, "0")
        return `${min}:${sec}`
    }

    // 🎯 SYNC WITH AUDIO
    useEffect(() => {

        const audio = audioRef.current
        if (!audio) return

        const update = () => {
            const current = audio.currentTime || 0
            const total = audio.duration || 0

            setCurrentTime(current)
            setDuration(total)

            if (total > 0) {
                setProgress((current / total) * 100)
            }
        }

        audio.addEventListener("timeupdate", update)
        audio.addEventListener("loadedmetadata", update)

        return () => {
            audio.removeEventListener("timeupdate", update)
            audio.removeEventListener("loadedmetadata", update)
        }

    }, [audioRef])

    // 🎯 SEEK
    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {

        const audio = audioRef.current
        if (!audio || !duration) return

        const rect = e.currentTarget.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const percent = clickX / rect.width

        audio.currentTime = percent * duration
    }

    return (

        <div className="w-full flex items-center gap-2 text-xs text-neutral-400">

            {/* CURRENT TIME */}
            <span className="w-10 text-right">
                {formatTime(currentTime)}
            </span>

            {/* PROGRESS BAR */}
            <div
                onClick={handleSeek}
                className="flex-1 h-2 md:h-1 bg-neutral-700 rounded cursor-pointer relative group"
            >
                <div
                    className="h-full bg-green-500 rounded transition-all"
                    style={{ width: `${progress}%` }}
                />

                {/* Hover thumb (Spotify feel) */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition"
                    style={{ left: `${progress}%`, transform: "translate(-50%, -50%)" }}
                />
            </div>

            {/* TOTAL TIME */}
            <span className="w-10">
                {formatTime(duration)}
            </span>

        </div>
    )
}