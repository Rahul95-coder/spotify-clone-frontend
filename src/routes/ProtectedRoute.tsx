import {Navigate} from "react-router-dom"
import {getToken} from "../services/authService"
import {useUserStore} from "../store/userStore"
import {useEffect, useState} from "react"

export default function ProtectedRoute({children, adminOnly}: { children: React.ReactNode, adminOnly?: boolean }) {
    const token = getToken()
    const {user, fetchUser, loading} = useUserStore()
    const [loaded, setLoaded] = useState(false)

    // Fetch user on mount if token exists and user is null
    useEffect(() => {
        if (token && !user) {
            fetchUser().finally(() => setLoaded(true))
        } else {
            setLoaded(true)
        }
    }, [token, user, fetchUser])

    if (!token) return <Navigate to="/login"/>

    // Show loading until user info fetched
    if (!loaded || (token && !user)) {
        if (loading) return <div className="text-white p-6">Loading...</div>
    }


    if (adminOnly && user?.role !== "ROLE_ADMIN") {
        return <Navigate to="/"/>
    }

    return children
}