import { useState } from "react"
import api from "../services/api"
import { getToken } from "../services/authService"

export default function AdminUploadPage() {
    const [title, setTitle] = useState("")
    const [artist, setArtist] = useState("")
    const [albumId, setAlbumId] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [cover, setCover] = useState<File | null>(null)  // ADDED
    const [coverPreview, setCoverPreview] = useState<string | null>(null)  // ADDED
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    // ADDED: preview cover before upload
    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0] || null
        setCover(selected)
        if (selected) {
            setCoverPreview(URL.createObjectURL(selected))
        } else {
            setCoverPreview(null)
        }
    }

    const handleUpload = async () => {
        if (!file) return setError("Please select an audio file")
        if (!title.trim()) return setError("Title is required")
        if (!artist.trim()) return setError("Artist is required")
        if (!albumId.trim()) return setError("Album ID is required")

        setLoading(true)
        setError("")
        setSuccess("")

        const formData = new FormData()
        formData.append("title", title)
        formData.append("artist", artist)
        formData.append("albumId", albumId)
        formData.append("file", file)
        if (cover) formData.append("cover", cover)  // ADDED

        try {
            const token = getToken()
            await api.post("/songs/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            })
            setSuccess("Uploaded successfully!")
            setTitle("")
            setArtist("")
            setAlbumId("")
            setFile(null)
            setCover(null)
            setCoverPreview(null)
        } catch (e) {
            setError("Upload failed. Check console for details.")
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-4 max-w-md mx-auto bg-neutral-900 rounded-lg mt-8">
            <h2 className="text-xl font-bold mb-4 text-white">Admin Upload</h2>

            {error && <p className="text-red-400 mb-2">{error}</p>}
            {success && <p className="text-green-400 mb-2">{success}</p>}

            <input
                className="w-full mb-2 p-2 rounded bg-neutral-800 text-white"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <input
                className="w-full mb-2 p-2 rounded bg-neutral-800 text-white"
                placeholder="Artist"
                value={artist}
                onChange={e => setArtist(e.target.value)}
            />
            <input
                className="w-full mb-2 p-2 rounded bg-neutral-800 text-white"
                placeholder="Album ID"
                value={albumId}
                onChange={e => setAlbumId(e.target.value)}
            />

            {/* ADDED: cover image upload with preview */}
            <div className="mb-3">
                <label className="text-neutral-400 text-sm mb-1 block">
                    Cover Image (optional)
                </label>

                {coverPreview && (
                    <img
                        src={coverPreview}
                        alt="Cover preview"
                        className="w-32 h-32 object-cover rounded mb-2"
                    />
                )}

                <input
                    type="file"
                    accept="image/*"
                    className="w-full text-neutral-300"
                    onChange={handleCoverChange}
                />
            </div>

            <div className="mb-4">
                <label className="text-neutral-400 text-sm mb-1 block">
                    Audio File
                </label>
                <input
                    type="file"
                    accept="audio/*"
                    className="w-full text-neutral-300"
                    onChange={e => setFile(e.target.files?.[0] || null)}
                />
            </div>

            <button
                onClick={handleUpload}
                disabled={loading}
                className="w-full p-2 bg-green-500 rounded text-black font-semibold hover:bg-green-600 transition"
            >
                {loading ? "Uploading..." : "Upload"}
            </button>
        </div>
    )
}