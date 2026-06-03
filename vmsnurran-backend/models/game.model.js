import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
    {
        gameNumber: {
            type: Number,
            required: true,
            unique: true,
        },

        stage: {
            type: String,
            required: true,
            enum: ["group", "round_of_32", "round_of_16", "quarter_final", "semi_final", "bronze_match", "final"],
        },

        group: {
            type: String,
            default: null,
        },

        groupMatchday: {
            type: Number,
            default: null,
        },

        homeTeam: {
            type: String,
            required: true,
            uppercase: true,
            trim: true,
        },

        awayTeam: {
            type: String,
            required: true,
            uppercase: true,
            trim: true,
        },

        kickoff: {
            type: Date,
            required: true,
        },

        location: {
            stadium: {
                type: String,
                default: null,
            },
            city: {
                type: String,
                default: null,
            },
            country: {
                type: String,
                default: null,
            },
        },

        homeScore: {
            type: Number,
            default: null,
            min: 0,
        },

        awayScore: {
            type: Number,
            default: null,
            min: 0,
        },

        status: {
            type: String,
            enum: ["scheduled", "live", "finished"],
            default: "scheduled",
        },
    },
    {
        timestamps: true,
    }
);

const Game = mongoose.model('Game', gameSchema);

export default Game;