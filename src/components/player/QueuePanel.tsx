import { usePlayerStore } from "../../store/playerStore"

export default function QueuePanel() {

    const { queue, currentSong, setSong } = usePlayerStore()

    return (
        <div className="h-full overflow-y-auto p-4 bg-neutral-900">

            <h2 className="text-lg font-semibold mb-4">Queue</h2>

            {queue.map((song) => {

                const active = currentSong?.id === song.id

                return (
                    <div
                        key={song.id}
                        onClick={() => setSong(song)}
                        className={`p-2 rounded cursor-pointer 
                        ${active ? "bg-green-700" : "hover:bg-neutral-800"}`}
                    >
                        <div>{song.title}</div>
                        <div className="text-sm text-gray-400">{song.artist}</div>
                    </div>
                )
            })}

        </div>
    )
}