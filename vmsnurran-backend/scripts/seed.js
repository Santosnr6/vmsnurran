import dotenv from "dotenv";
import mongoose from "mongoose";

import Team from "../models/team.model.js";
import Game from "../models/game.model.js";

import { teams } from "../data/teams.data.js";
import { games } from "../data/games.data.js";

dotenv.config();

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Connected to MongoDB");

        await Team.deleteMany();
        await Game.deleteMany();

        console.log("Old teams and matches removed");

        await Team.insertMany(Object.values(teams));
        await Game.insertMany(games);

        console.log(`${Object.values(teams).length} teams inserted`);
        console.log(`${games.length} matches inserted`);

        process.exit(0);
    } catch (error) {
        console.error("Seed failed:", error);
        process.exit(1);
    }
}

seedDatabase();