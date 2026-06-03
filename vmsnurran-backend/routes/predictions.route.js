import { Router } from 'express';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { createPrediction, getPrediction, updateUserPrediction } from '../controllers/predictions.controller.js';
import { validatePredictionBody } from '../middlewares/validators.middleware.js';

const router = Router();

router.use(authenticateUser);

router.get('/me', getPrediction);
router.post('/', validatePredictionBody, createPrediction);
router.put('/me', validatePredictionBody, updateUserPrediction);

export default router;