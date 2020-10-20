import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import HttpException from '../errors/HttpException';

function validationMiddleware<T>(type: any, skipMissingProperties = false): RequestHandler {
    return (req, res, next) => {
        validate(plainToClass(type, req.body), { skipMissingProperties }).then(
            (errors: ValidationError[]) => {
                if (errors.length > 0) {
                    const message = errors
                        .map(({ constraints }) => {
                            if (constraints) {
                                return Object.values(constraints);
                            }
                            return '';
                        })
                        .join(', ');
                    next(new HttpException(400, message));
                } else {
                    next();
                }
            }
        );
    };
}

export default validationMiddleware;
