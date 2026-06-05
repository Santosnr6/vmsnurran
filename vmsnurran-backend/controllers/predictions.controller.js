import { addNewPrediction, findPrediction, updatePrediction, updateBonusPoints } from "../services/predictions.service.js";

export const getPrediction = async (req, res, next) => {
    const result = await findPrediction(req.user.userId);
    if(result.success) {
        res.json({
            success : true,
            prediction : result.prediction
        });
    } else {
        next({
            status : 404,
            message : result.message
        });
    }
}

export const createPrediction = async (req, res, next) => {
    const prediction = req.body;
    const result = await addNewPrediction({
        userId : req.user.userId,
        ...prediction
    });

    if(result.success) {
        res.status(201).json({
            success : true,
            message : 'Prediction created successfully',
            prediction : result.prediction
        });
    } else {
        next({
            status : 401,
            message : result.message
        });
    }
}

export const updateUserPrediction = async (req, res, next) => {
    const prediction = req.body;
    const result = await updatePrediction({
        userId : req.user.userId,
        ...prediction
    });

    if(result.success) {
        res.json({
            success : true,
            message : 'Prediction updated successfully'
        });
    } else {
        next({
            status : 404,
            message : result.message
        })
    }
}

export const updateUserBonusPoints = async (req, res, next) => {
    const { bonusPoints } = req.body;
    const result = await updateBonusPoints(req.user.userId, bonusPoints);

    if(result.success) {
        res.json({
            success : true,
            message : 'Bonus points updated successfully'
        });
    } else {
        next({
            status : 404,
            message : result.message
        })
    }
}