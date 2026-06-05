import Prediction from '../models/prediction.model.js';
import { getUser, getUsers } from './users.service.js';

export const getPredictions = async () => {
    try {
        const predictions = await Prediction.find();
        const users = await getUsers();

        const usersMap = new Map(
            users.users.map((user) => [user.userId, user])
        );

        const predictionsWithUsers = predictions.map((prediction) => {
            const user = usersMap.get(prediction.userId);

            return {
                ...prediction.toObject(),
                username: user?.username || "Unknown user",
                firstName: user?.firstName || "Unknown",
                lastName: user?.lastName || "Unknown",
            };
        });

        return {
            success: true,
            predictions: predictionsWithUsers,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}

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

