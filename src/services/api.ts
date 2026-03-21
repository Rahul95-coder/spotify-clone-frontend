import axios from "axios"

const api = axios.create({
    baseURL:import.meta.env.VITE_API_URL ||  "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json"
    }
})

// 🔐 REQUEST INTERCEPTOR (attach token)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

// 🚨 RESPONSE INTERCEPTOR (handle auth errors globally)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {

            console.warn("Session expired. Logging out...")

            localStorage.clear()
            window.location.href = "/login"
        }

        return Promise.reject(error)
    }
)

export default api