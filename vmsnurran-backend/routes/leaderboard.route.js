import { Router } from 'express';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { getLeaderboard } from '../controllers/leaderboard.controller.js';

const router = Router();

router.use(authenticateUser);

router.get('/', getLeaderboard);

export default router;