import { usePlayerStore } from "../../store/playerStore"

export default function PlayerControls() {

    const {
        isPlaying,
        play,
        pause,
        playNext,
        playPrev,
        toggleShuffle,
        toggleRepeat,
        isShuffle,
        repeatMode
    } = usePlayerStore()


    const handleNext = () => {
        playNext()
    }

    const handlePrev = () => {
        playPrev()
    }

    return (
        <div className="flex items-center gap-3 md:gap-5">

            <button onClick={toggleShuffle} className={isShuffle ? "text-green-500" : ""}>
                🔀
            </button>

            <button onClick={handlePrev}>⏮</button>

            <button
                onClick={isPlaying ? pause : play}
                className="bg-white text-black w-8 h-8 md:w-10 md:h-10 rounded-full"
            >
                {isPlaying ? "⏸" : "▶"}
            </button>

            <button onClick={handleNext}>⏭</button>

            <button onClick={toggleRepeat} className={repeatMode !== "off" ? "text-green-500" : ""}>
                {repeatMode === "one" ? "🔂" : "🔁"}
            </button>


        </div>
    )
}