import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { statusCodes } from '../helpers';

const statusCode = new statusCodes();

class UserController {
    public async signup(req: Request, res: Response) {
        try {
            const data = await authService.signup(req, res);
            return statusCode.success(res, "Signup successful", data);
        } catch (error: any) {
            console.error("Signup error:", error);
            return statusCode.badRequest(res, error.message || "Signup failed");
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const data = await authService.login(req, res);
            return statusCode.success(res, "Login successful", data);
        } catch (error: any) {
            console.error("Login error:", error);
            return statusCode.unauthorized(res, error.message || "Login failed");
        }
    }

    public async logout(req: Request, res: Response) {
        try {
            const data = await authService.logout(req, res);
            return statusCode.success(res, "Logout successful", data);
        } catch (error: any) {
            console.error("Logout error:", error);
            return statusCode.internalServerError(res, "Logout failed");
        }
    }
}

export default new UserController();
