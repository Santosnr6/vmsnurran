import {
    getTeams,
    getTeamByCode,
} from "../services/teams.service.js";

export const getTeamsController = async (req, res, next) => {
    try {
        const result = await getTeams();

        if (!result.success) {
            return next({
                status: result.status || 500,
                message: result.message,
            });
        }

        res.status(200).json({
            teams: result.teams,
        });
    } catch (error) {
        next(error);
    }
};

export const getTeamByCodeController = async (req, res, next) => {
    try {
        const { code } = req.params;

        const result = await getTeamByCode(code);

        if (!result.success) {
            return next({
                status: result.status || 500,
                message: result.message,
            });
        }

        res.status(200).json({
            team: result.team,
        });
    } catch (error) {
        next(error);
    }
};