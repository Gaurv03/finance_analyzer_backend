import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { statusCodes } from '../helpers';

const statusCode = new statusCodes();

/**
 * Middleware to validate request body using class-validator and class-transformer
 * @param dto - The DTO class to validate against
 * @param skipMissingProperties - Whether to skip missing properties
 */
export const validationMiddleware = (
    dto: any,
    skipMissingProperties = false
): RequestHandler => {
    return (req, res, next) => {
        const dtoInstance = plainToInstance(dto, req.body);
        validate(dtoInstance, { skipMissingProperties }).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                const message = errors
                    .map((error: ValidationError) => Object.values(error.constraints || {}))
                    .flat()
                    .join(', ');

                return statusCode.badRequest(res, message, errors);
            } else {
                req.body = dtoInstance;
                next();
            }
        });
    };
};
