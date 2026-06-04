import Team from "../models/team.model.js";

export const getTeams = async () => {
    try {
        const teams = await Team.find().sort({ name: 1 });

        return {
            success: true,
            teams,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};

export const getTeamByCode = async (code) => {
    try {
        const team = await Team.findOne({
            code: code.toUpperCase(),
        });

        if (!team) {
            return {
                success: false,
                status: 404,
                message: "Team not found",
            };
        }

        return {
            success: true,
            team,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};