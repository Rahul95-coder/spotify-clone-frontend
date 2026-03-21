import api from "./api";

// GET CURRENT USER
export const getCurrentUser = async () => {
    const res = await api.get("/users/me");
    // Return the inner data object
    return res.data.data;
}

// UPDATE USER
export const updateUser = async (payload: { username: string }) => {
    const res = await api.put("/users/update", payload);
    return res.data.data;
}