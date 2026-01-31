import { Response } from 'express';

class StatusCodes {
    success(res: Response, message: string = "Request Acknowledged", data: any = {}): any {
        res.status(200).json({
            code: 200,
            status: "success",
            message,
            data
        });
    }

    created(res: Response, message: string = 'Resource created successfully.', data: any = {}): any {
        res.status(201).json({
            code: 201,
            status: "success",
            message,
            data
        });
    }

    badRequest(res: Response, message: string = 'Bad Request', data: any = {}): any {
        res.status(400).json({
            code: 400,
            status: "badRequest",
            message,
            data
        });
    }

    unauthorized(res: Response, message: string = 'Unauthorized access', data: any = {}): any {
        res.status(401).json({
            code: 401,
            status: "unauthorized",
            message,
            data
        });
    }

    forbidden(res: Response, message: string = 'Forbidden', data: any = {}): any {
        res.status(403).json({
            code: 403,
            status: "forbidden",
            message,
            data
        });
    }

    notFound(res: Response, message: string = 'Resource not found.', data: any = {}): any {
        res.status(404).json({
            code: 404,
            status: "notFound",
            message,
            data
        });
    }

    internalServerError(res: Response, message: string = 'Internal Server Error', data: any = {}): any {
        res.status(500).json({
            code: 500,
            status: "internalServerError",
            message,
            data
        });
    }

    custom(res: Response, statusCode: number, status: string, message: string, data: any = {}): any {
        res.status(statusCode).json({
            code: statusCode,
            status,
            message,
            data
        });
    }
}

export default StatusCodes;