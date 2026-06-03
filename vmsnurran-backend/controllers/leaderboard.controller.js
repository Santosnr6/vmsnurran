import { getFinishedGames } from "../services/games.service.js";

export const getLeaderboard = async (req, res, next) => {
    const finishedGames = await getFinishedGames();
    res.json({
        finishedGames
    });
}