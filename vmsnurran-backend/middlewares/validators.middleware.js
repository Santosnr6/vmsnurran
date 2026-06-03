export const validateAuthBody = (req, res, next) => {
    if(!req.body) {
        return next({
            status : 401,
            message : 'Missing request body'
        });
    }
    const { username, password } = req.body;
    if(!username || !password) {
        return next({
            status : 401,
            message : 'Both username and password are required'
        });
    }
    next();
}

export const validateScoreBody = (req, res, next) => {
    if(!req.body) {
        return next({
            status : 401,
            message : 'Missing request body'
        });
    }
    const { homeScore, awayScore } = req.body;
    if(!homeScore || !awayScore) {
        return next({
            status : 401,
            message : 'Both homeScore and awayScore are required'
        });
    }
    next();
}

export const validatePredictionBody = (req, res, next) => {
    if (!req.body) {
        return next({
            status: 400,
            message: "Missing request body"
        });
    }

    const {
        predictions,
        worldCupWinner,
        topGoalScorer,
        totalGoals
    } = req.body;

    if (!Array.isArray(predictions) || predictions.length === 0) {
        return next({
            status: 400,
            message: "Predictions must be a non-empty array"
        });
    }

    if (!worldCupWinner) {
        return next({
            status: 400,
            message: "World Cup winner is required"
        });
    }

    if (!topGoalScorer) {
        return next({
            status: 400,
            message: "Top goal scorer is required"
        });
    }

    if (
        totalGoals === undefined ||
        typeof totalGoals !== "number" ||
        totalGoals < 0
    ) {
        return next({
            status: 400,
            message: "Total goals must be a positive number"
        });
    }

    for (const prediction of predictions) {
        const { gameId, homeScore, awayScore } = prediction;

        if (gameId === undefined || gameId === null) {
            return next({
                status: 400,
                message: "Each prediction must contain a gameId"
            });
        }

        if (
            typeof homeScore !== "number" ||
            homeScore < 0
        ) {
            return next({
                status: 400,
                message: `Invalid homeScore for game ${gameId}`
            });
        }

        if (
            typeof awayScore !== "number" ||
            awayScore < 0
        ) {
            return next({
                status: 400,
                message: `Invalid awayScore for game ${gameId}`
            });
        }
    }

    next();
}