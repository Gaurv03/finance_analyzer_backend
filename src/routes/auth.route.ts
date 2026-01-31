import { Router } from 'express';
import authController from '../controller/auth.controller';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { SignupDto } from '../dtos/auth/signup.dto';
import { LoginDto } from '../dtos/auth/login.dto';

const router = Router();

router.post('/signup', validationMiddleware(SignupDto), authController.signup);
router.post('/login', validationMiddleware(LoginDto), authController.login);
router.post('/logout', authController.logout);

export default router;

