import { Request, Response } from 'express';
import * as UserServices from '../services/user.services';
import User from '../models/user.model';

class UserController {
    // 取得所有使用者
    public async getAll(req: Request, res: Response) {
        const result = await UserServices.getUsers();
        return res.status(200).json(result);
    }

    // 新增一個使用者
    public async createOne(req: Request, res: Response) {
        const result: User = await UserServices.createUser(req.body);
        return res.status(200).json(result);
    }
}

export default UserController;
