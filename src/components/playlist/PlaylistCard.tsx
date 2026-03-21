import type { Playlist } from "../../types/Playlist"
import { useNavigate } from "react-router-dom"

export default function PlaylistCard({ playlist }: { playlist: Playlist }) {

    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(`/playlist/${playlist.id}`)}
            className="
                bg-neutral-900 p-3 md:p-4 rounded-lg
                hover:bg-neutral-800 cursor-pointer transition
            "
        >

            <img
                src={playlist.coverUrl || "/default-cover.jpg"}
                alt={playlist.name}
                className="rounded mb-2 w-full h-32 md:h-40 object-cover"
            />

            <h3 className="text-sm md:text-base font-medium truncate">
                {playlist.name}
            </h3>

        </div>
    )
}