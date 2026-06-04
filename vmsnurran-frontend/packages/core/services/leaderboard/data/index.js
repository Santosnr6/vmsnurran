import { api } from "@vmsnurran/api";

export const getMyScore = async () => {
    const { data } = await api.get("/leaderboard/me");
    return data;
};

export const getLeaderboard = async () => {
    const { data } = await api.get("/leaderboard");
    return data;
};