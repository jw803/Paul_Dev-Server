import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import WrongCredentialsException from '../errors/WrongCredentialsException';
import AuthenticationService from '../services/auth.services';
import userModel from '../models/user.model';
import CreateUserDto from '../dto/user.dto';
import LogInDto from '../dto/logIn.dto';
import ITokenData from '../interface/ITokenData';
import IUser from '../interface/IUser';
import IDataStoredInToken from '../interface/IDataStoredInToken';
import config from '../config';

class AuthController {
    private user = userModel;

    private authenticationService: AuthenticationService = new AuthenticationService();

    public register = async (request: Request, response: Response, next: NextFunction) => {
        const userData: CreateUserDto = request.body;
        try {
            const result = await this.authenticationService.register(userData);
            response.json(result);
        } catch (error) {
            next(error);
        }
    };

    public login = async (request: Request, response: Response, next: NextFunction) => {
        const logInData: LogInDto = request.body;
        const user = await this.user.findOne({ where: { email: logInData.email } });
        if (user) {
            const isPasswordMatching = await bcrypt.compare(
                logInData.password,
                user.get('password')
            );
            if (isPasswordMatching) {
                const tokenData = this.createToken(user);
                response.json({
                    username: user.name,
                    ...tokenData
                });
            } else {
                next(new WrongCredentialsException());
            }
        } else {
            next(new WrongCredentialsException());
        }
    };

    public async valid(request: Request, response: Response, next: NextFunction) {
        let token = request.headers.authorization;
        if (token) {
            jwt.verify(token, config.JWT_SECRET, (err, decode: any) => {
                if (decode) {
                    response.json({
                        username: decode.username,
                        token: jwt.sign({ username: decode.username }, config.JWT_SECRET, {
                            expiresIn: 200
                        })
                    });
                } else {
                    next(new WrongCredentialsException());
                }
            });
        } else {
            next(new WrongCredentialsException());
        }
    }

    private createToken(user: IUser): ITokenData {
        const expiresIn = 60 * 60; // an hour
        const dataStoredInToken: IDataStoredInToken = {
            _id: user._id
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, config.JWT_SECRET, { expiresIn })
        };
    }
}

export default AuthController;
