/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import HttpException from '../errors/HttpException';

const errorHandler = (
    error: HttpException,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    response.status(status).send({
        message,
        status
    });
};

export default errorHandler;
