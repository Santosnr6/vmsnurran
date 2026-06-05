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
            let matchPoints = 0;
            let correctResults = 0;
            let correctOutcomes = 0;

            entry.predictions.forEach((prediction) => {
                const game = finishedGamesMap.get(
                    prediction.gameId.toString()
                );

                if (!game) return;

                const points = calculateGamePoints(prediction, game);

                matchPoints += points;

                if (points === 3) correctResults++;
                if (points === 1) correctOutcomes++;
            });

            const bonusPoints = entry.bonusPoints || 0;
            const totalPoints = matchPoints + bonusPoints;

            return {
                userId: entry.userId,
                username: entry.username,
                name: entry.firstName + " " + entry.lastName,

                totalPoints,
                matchPoints,
                bonusPoints,

                correctResults,
                correctOutcomes,

                worldCupWinner: entry.worldCupWinner,
                topGoalScorer: entry.topGoalScorer,
                totalGoals: entry.totalGoals,
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

export const getUserLeaderboardEntry = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const finishedGames = await getFinishedGames();

        const finishedGamesMap = new Map(
            finishedGames.games.map((game) => [
                game.gameNumber.toString(),
                game,
            ])
        );

        const predictionDocuments = await getPredictions();

        const userEntry = predictionDocuments.predictions.find(
            (entry) => entry.userId === userId
        );

        if (!userEntry) {
            return res.status(404).json({
                message: "User entry not found",
            });
        }

        let matchPoints = 0;
        let correctResults = 0;
        let correctOutcomes = 0;

        userEntry.predictions.forEach((prediction) => {
            const game = finishedGamesMap.get(
                prediction.gameId.toString()
            );

            if (!game) return;

            const points = calculateGamePoints(prediction, game);

            matchPoints += points;

            if (points === 3) correctResults++;
            if (points === 1) correctOutcomes++;
        });

        const bonusPoints = userEntry.bonusPoints || 0;
        const totalPoints = matchPoints + bonusPoints;

        res.json({
            userId: userEntry.userId,
            username: userEntry.username,
            name: userEntry.firstName + " " + userEntry.lastName,
            totalPoints,
            matchPoints,
            bonusPoints,

            correctResults,
            correctOutcomes,
        });
    } catch (error) {
        next(error);
    }
};