import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import authRouter from './routes/auth.route.js';
import gamesRouter from './routes/games.route.js';
import predictionsRouter from './routes/predictions.route.js';
import leaderboardRouter from './routes/leaderboard.route.js';
import teamsRouter from './routes/teams.route.js';

// Config
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8081;
mongoose.connect(process.env.MONGODB_URI);
const database = mongoose.connection;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/games', gamesRouter);
app.use('/api/predictions', predictionsRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/teams', teamsRouter);

console.log("MONGO_URI exists:", Boolean(process.env.MONGO_URI));
console.log("JWT_SECRET exists:", Boolean(process.env.JWT_SECRET));

// Database
database.on('error', (error) => console.log(error));
database.once('connected', () => {
    console.log('DB Connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}...`);
    });
});

app.use(errorHandler);