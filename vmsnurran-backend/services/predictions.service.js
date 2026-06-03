import Prediction from '../models/prediction.model.js';

export const findPrediction = async (userId) => {
    try {
        const result = await Prediction.findOne({ userId });
        return {
            success : true,
            prediction : result
        }
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}

export const addNewPrediction = async (prediction) => {
    try {
        const result = await Prediction.create(prediction);
        return {
            success : true,
            prediction : result
        }
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}

export const updatePrediction = async (prediction) => {
    try {
        const result = await Prediction.findOneAndUpdate({userId : prediction.userId}, prediction);
        return {
            success : true,
            prediction : result
        }
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}

