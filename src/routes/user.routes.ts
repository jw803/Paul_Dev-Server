import { Request, Response } from 'express';
import MainRoute from './route.abstract';
import validationMiddleware from '../middleware/validation.middleware';
import CreateUserDto from '../dto/user.dto';
import LogInDto from '../dto/logIn.dto';
import UserController from '../controllers/auth.controller';

class UserRoutes extends MainRoute {
    private path = '/auth';

    private userController: UserController = new UserController();

    constructor() {
        super();
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.get('/test', (req: Request, res: Response) => {
            res.status(200).send('you called user path test!');
        });
        this.router
            .get(`${this.path}/validate`, this.userController.valid)
            .post(
                `${this.path}/register`,
                validationMiddleware(CreateUserDto),
                this.userController.register
            )
            .post(`${this.path}/login`, validationMiddleware(LogInDto), this.userController.login);
    }
}

export default UserRoutes;
