import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../models/user.model';
import AuthenticationTokenMissingException from '../errors/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../errors/WrongAuthenticationTokenException';
import IRequestWithUser from '../interface/IRequestWithUser';
import IDataStoredInToken from '../interface/IDataStoredInToken';

const authMiddleware = async (
    request: IRequestWithUser,
    response: Response,
    next: NextFunction
) => {
    const { cookies } = request;
    if (cookies && cookies.Authorization) {
        const secret = process.env.JWT_SECRET as string;
        try {
            const verificationResponse = jwt.verify(
                cookies.Authorization,
                secret
            ) as IDataStoredInToken;
            const id = verificationResponse._id;
            const user = await User.findByPk(id);
            if (user) {
                request.user = user;
                next();
            } else {
                next(new WrongAuthenticationTokenException());
            }
        } catch (error) {
            next(new WrongAuthenticationTokenException());
        }
    } else {
        next(new AuthenticationTokenMissingException());
    }
};

export default authMiddleware;
