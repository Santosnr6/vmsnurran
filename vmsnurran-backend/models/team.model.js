import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        flag: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Team = mongoose.model('Team', teamSchema);

export default Team;