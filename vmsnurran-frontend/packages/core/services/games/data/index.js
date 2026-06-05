import { api } from "@vmsnurran/api";

export const getGames = async () => {
    const { data } = await api.get("/games");
    return data;
};

export const setGameScore = async (gameId, score) => {
    console.log('Setting game score:', { gameId, score });
    const { data } = await api.patch(`/games/${gameId}`, score);
    return data;
};