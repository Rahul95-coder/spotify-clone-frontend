import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import Login from "../pages/Login"
import Search from "../pages/Search"
import Playlist from "../pages/PlaylistPage.tsx"
import Library from "../pages/Library"  // ADDED

import ProtectedRoute from "./ProtectedRoute"
import MainLayout from "../components/layout/MainLayout"
import Register from "../pages/Register.tsx"
import LikedSongs from "../pages/LikedSongs"
import ProfilePage from "../pages/ProfilePage.tsx"
import AdminUploadPage from "../pages/AdminUploadPage.tsx"
import HistoryPage from "../pages/HistoryPage.tsx";

export default function AppRoutes() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute adminOnly={true}>
                                <AdminUploadPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route index element={<Home />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="search" element={<Search />} />
                    <Route path="playlist/:id" element={<Playlist />} />
                    <Route path="liked-songs" element={<LikedSongs />} />
                    <Route path="history" element={<HistoryPage />} />
                    <Route path="library" element={<Library />} />  {/* ADDED */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}