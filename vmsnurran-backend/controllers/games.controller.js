import { getAllGames, getGroupGames, updateGame } from "../services/games.service.js"

export const getGames = async (req, res, next) => {
    const { group } = req.query;
    let result = null;
    if(!group) {
        result = await getAllGames();
    } else {
        result = await getGroupGames(group);
    }
    if(result.success) {
        res.json({
            success : true,
            games : result.games
        });
    } else {
        next({
            status : 404,
            message : result.message
        })
    }
}

export const updateGameResult = async (req, res, next) => {
    const { id } = req.params;
    const score = req.body;
    const result = await updateGame(Number(id), req.body);
    console.log(result);
    if(result.success) {
        res.json({
            success : true
        });
    } else {
        next({
            status : 404,
            message : result.message
        })
    }
}
