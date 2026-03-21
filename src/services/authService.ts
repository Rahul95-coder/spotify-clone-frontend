import api from "./api"


function decodeJwt(token: string): any {
    try {
        const payload = token.split(".")[1]
        return JSON.parse(atob(payload))
    } catch {
        return null
    }
}

export const register = async (username: string, email: string, password: string) => {
    const res = await api.post("/users/register", { username, email, password })
    return res.data
}

export const login = async (email: string, password: string) => {
    const res = await api.post("/users/login", { email, password })
    const { token, username } = res.data.data

    localStorage.setItem("token", token)
    localStorage.setItem("username", username)

    const decoded = decodeJwt(token)
    if (decoded?.sub) localStorage.setItem("userId", decoded.sub)

    // ADDED: flag so Home.tsx knows to autoplay on first load after login
    sessionStorage.setItem("justLoggedIn", "true")

    return res.data.data
}


export const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("userId") // CHANGED: clean up userId too
}

export const getToken = () => localStorage.getItem("token")