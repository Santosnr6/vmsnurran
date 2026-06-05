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
                console.log('Prediction:', prediction);
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
                name : entry.firstName + ' ' + entry.lastName,
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
        console.log('Prediction documents:', predictionDocuments);
        const userEntry = predictionDocuments.predictions.find(
            (entry) => entry.userId === userId
        );
        console.log('User entry:', userEntry);
        if (!userEntry) {
            return res.status(404).json({ message: "User entry not found" });
        }

        let totalPoints = 0;
        let correctResults = 0;
        let correctOutcomes = 0;
        userEntry.predictions.forEach((prediction) => {
            const game = finishedGamesMap.get(
                prediction.gameId.toString()
            );
            
            if (!game) return;

            const points = calculateGamePoints(prediction, game);
            totalPoints += points;
            if (points === 3) correctResults++;
            if (points === 1) correctOutcomes++;
        });
    
        res.json({
            userId: userEntry.userId,
            username: userEntry.username,
            totalPoints,
            correctResults,
            correctOutcomes,
        });
    } catch (error) {
        next(error);
    }
};