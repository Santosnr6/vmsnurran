import Game from "../models/game.model.js";

export const getAllGames = async () => {
    try {
        const result = await Game.find();
        if(result) {
            return {
                success : true,
                games : result
            }
        } else throw new Error('No games found');
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}

export const getGroupGames = async (group) => {
    try {
        const result = await Game.find({ group });
        if(result) {
            return {
                success : true,
                games : result
            }
        } else throw new Error('No games found');
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}

export const updateGame = async (id, score) => {
    try {
        const game = await Game.findOne({ gameNumber : id });
        if(!game) {
            throw new Error('No game found');
        }
        console.log(game);
        game.homeScore = score.homeScore;
        game.awayScore = score.awayScore;
        game.status = "finished";
        await game.save();

        return {
            success : true
        }
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}
