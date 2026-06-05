import { Router } from 'express';
import { getGames, updateGameResult } from '../controllers/games.controller.js';
import { validateScoreBody } from '../middlewares/validators.middleware.js';

const router = Router();

router.get('/', getGames);
router.patch('/:id', validateScoreBody, updateGameResult);

export default router;