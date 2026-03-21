import { create } from "zustand";
import { getCurrentUser, updateUser } from "../services/userService";
import { logout as logoutAuth } from "../services/authService";

interface UserState {
    user: { username: string; role: string; id: string } | null;
    loading: boolean;

    fetchUser: () => Promise<void>;
    updateProfile: (username: string) => Promise<void>;
    logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    loading: false,

    fetchUser: async () => {
        set({ loading: true })

        try {
            const data = await getCurrentUser()
            set({ user: data })
        } catch (e) {
            console.error("Failed to fetch user")
            set({ user: null })  // explicitly set user null on fail
        } finally {
            set({ loading: false })
        }
    },

    updateProfile: async (username) => {
        set({ loading: true });
        try {
            const updated = await updateUser({ username });
            set({ user: updated });
        } catch (e) {
            console.error("Update failed", e);
        } finally {
            set({ loading: false });
        }
    },

    logout: () => {
        logoutAuth();
        set({ user: null });
        window.location.href = "/login";
    }
}));