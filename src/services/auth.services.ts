import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import config from '../config';
import IUser from '../interface/IUser';
import userModel from '../models/user.model';
import CreateUserDto from '../dto/user.dto';
import UserWithThatEmailAlreadyExistsException from '../errors/UserWithThatEmailAlreadyExistsException';
import IDataStoredInToken from '../interface/IDataStoredInToken';
import TokenData from '../interface/ITokenData';

class AuthenticationService {
    public user = userModel;

    public register = async (userData: CreateUserDto) => {
        if (await this.user.findOne({ where: { email: userData.email } })) {
            throw new UserWithThatEmailAlreadyExistsException(userData.email);
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await this.user.create({
            ...userData,
            password: hashedPassword
        });
        const tokenData = this.createToken(user);
        return {
            ...tokenData,
            username: userData.name
        };
    };

    public createToken(user: IUser): TokenData {
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

export default AuthenticationService;
