// routes/index.ts
import { Router } from 'express';
import authRoute from './auth.route';
const router = Router();

// Register routes
router.use('/auth', authRoute)

export default router;