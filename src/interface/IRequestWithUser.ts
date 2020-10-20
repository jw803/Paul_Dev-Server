import { Request } from 'express';
import IUser from './IUser';

export default interface IRequestWithUser extends Request {
    user: IUser;
}
