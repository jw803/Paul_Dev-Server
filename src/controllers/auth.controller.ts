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

    public authenticationService = new AuthenticationService();

    public async register(request: Request, response: Response, next: NextFunction) {
        const userData: CreateUserDto = request.body;
        try {
            const { cookie, user } = await this.authenticationService.register(userData);
            response.setHeader('Set-Cookie', [cookie]);
            response.send(user);
        } catch (error) {
            next(error);
        }
    }

    public async login(request: Request, response: Response, next: NextFunction) {
        const logInData: LogInDto = request.body;
        const user = await this.user.findOne({ where: { email: logInData.email } });
        if (user) {
            const isPasswordMatching = await bcrypt.compare(
                logInData.password,
                user.get('password')
            );
            if (isPasswordMatching) {
                const tokenData = this.createToken(user);
                response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
                response.send(user);
            } else {
                next(new WrongCredentialsException());
            }
        } else {
            next(new WrongCredentialsException());
        }
    }

    public async logout(request: Request, response: Response) {
        response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
        response.send(200);
    }

    private createCookie(tokenData: ITokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
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
