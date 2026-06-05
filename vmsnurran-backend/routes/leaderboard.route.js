import { Router } from 'express';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { getLeaderboard, getUserLeaderboardEntry } from '../controllers/leaderboard.controller.js';

const router = Router();

router.get('/', getLeaderboard);
router.get('/me', authenticateUser, getUserLeaderboardEntry);


export default router;