import { api } from "@vmsnurran/api";

export const login = async (credentials) => {
    const { data } = await api.post("/auth/login", credentials);
    return data;
};

export const register = async (credentials) => {
    const { data } = await api.post("/auth/register", credentials);
    return data;
};