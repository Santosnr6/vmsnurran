import { api } from "@vmsnurran/api";

export const getGames = async () => {
    const { data } = await api.get("/games");
    return data;
};