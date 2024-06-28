import { Router } from 'express';
import { googleAuth, googleAuthCallback, outlookAuth, outlookAuthCallback } from '../controllers/authController';

const router = Router();

router.get('/auth/google', googleAuth);
router.get('/auth/google/callback', googleAuthCallback);
router.get('/auth/outlook', outlookAuth);
router.get('/auth/outlook/callback', outlookAuthCallback);

export default router;
