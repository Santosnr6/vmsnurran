import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import authRouter from './routes/auth.route.js';

// Config
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8081;
mongoose.connect(process.env.MONGODB_URI);
const database = mongoose.connection;

// Middlewares
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);

// Database
database.on('error', (error) => console.log(error));
database.once('connected', () => {
    console.log('DB Connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}...`);
    });
});

app.use(errorHandler);