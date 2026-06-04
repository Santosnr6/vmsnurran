import { getFinishedGames } from "../services/games.service.js";
import { getPredictions } from "../services/predictions.service.js";
import { calculateGamePoints } from "../utils/game.util.js";

export const getLeaderboard = async (req, res, next) => {
    try {
        const finishedGames = await getFinishedGames();

        const finishedGamesMap = new Map(
            finishedGames.games.map((game) => [
                game.gameNumber.toString(),
                game,
            ])
        );
        
        const predictionDocuments = await getPredictions();

        const leaderboard = predictionDocuments.predictions.map((entry) => {
            let totalPoints = 0;
            let correctResults = 0;
            let correctOutcomes = 0;

            entry.predictions.forEach((prediction) => {
                const game = finishedGamesMap.get(
                    prediction.gameId.toString()
                );

                if (!game) return;

                const points = calculateGamePoints(prediction, game);

                totalPoints += points;

                if (points === 3) correctResults++;
                if (points === 1) correctOutcomes++;
            });

            return {
                userId: entry.userId,
                username: entry.username,
                totalPoints,
                correctResults,
                correctOutcomes,
            };
        });

        leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);

        res.json({
            leaderboard,
        });
    } catch (error) {
        next(error);
    }
};