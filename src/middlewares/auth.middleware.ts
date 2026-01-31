import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ROLE_PERMISSIONS, Permission } from '../helpers/permissions';
import { UserRole } from '../entity/user';
import { statusCodes } from '../helpers';

const statusCode = new statusCodes();

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        email: string;
        role: string;
        tokenVersion?: number;
    };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // 1. Get token from cookies or Authorization header
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return statusCode.unauthorized(res, 'Authentication token is missing');
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error('JWT_SECRET is not defined');
            return statusCode.internalServerError(res, 'Internal server error');
        }

        // 2. Verify token
        const decoded = jwt.verify(token, secret) as { userId: string; email: string; role: string; tokenVersion?: number };

        // 3. Attach user data to request
        req.user = decoded;

        next();
    } catch (error) {
        console.error(' [AuthMiddleware Error]: ', error);
        return statusCode.unauthorized(res, 'Invalid or expired token');
    }
};

export const checkRole = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return statusCode.unauthorized(res, 'Unauthorized');
        }

        if (!roles.includes(req.user.role)) {
            return statusCode.forbidden(res, 'Forbidden: You do not have the required permissions');
        }

        next();
    };
};

export const checkPermission = (requiredPermission: Permission) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return statusCode.unauthorized(res, 'Unauthorized');
        }

        const userRole = req.user.role as UserRole;
        const permissionsForRole = ROLE_PERMISSIONS[userRole] || [];

        const hasPermission = (permissionsForRole as readonly string[]).includes(requiredPermission);

        if (!hasPermission) {
            return statusCode.forbidden(res, `Forbidden: You do not have the required permission: ${requiredPermission}`);
        }

        next();
    };
};
