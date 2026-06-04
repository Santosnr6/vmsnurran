import mongoose from 'mongoose';

const predictionSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        predictions: [
            {
                gameId: {
                    type: String,
                    required: true,
                },
                homeScore: {
                    type: Number,
                    required: true,
                    min: 0,
                },
                awayScore: {
                    type: Number,
                    required: true,
                    min: 0,
                },
            },
        ],

        worldCupWinner: {
            type: String,
            required: true,
        },

        topGoalScorer: {
            type: String,
            required: true,
        },
        totalGoals : {
            type : Number,
            required : true
        }
    },
    { timestamps: true }
);

const Prediction = mongoose.model('Prediction', predictionSchema);

export default Prediction;