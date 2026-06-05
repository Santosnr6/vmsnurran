import { api } from "@vmsnurran/api";

export const getTeam = async (team) => {
    const { data } = await api.get(`/teams/${team}`);
    return data;
};

export const getTeams = async () => {
    const { data } = await api.get("/teams");
    return data;
};