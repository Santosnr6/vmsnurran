import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/auth.controller.js';
import { validateAuthBody } from '../middlewares/validators.middleware.js';

const router = Router();

router.use(validateAuthBody);

router.post('/register', registerUser);

router.post('/login', loginUser);

export default router;