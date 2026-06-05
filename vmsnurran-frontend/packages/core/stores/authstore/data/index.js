import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem("token"),
    role: null,
    setAuth: ({ user, token, role }) => {
        localStorage.setItem("token", token);
        console.log(user, token, role);
        set({ user, token, role });
    },

    logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null, role: null });
    },
}));