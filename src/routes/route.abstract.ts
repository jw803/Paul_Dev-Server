import { Router } from 'express';
import config from '../config';

abstract class MainRoute {
    private path = config.VERSION;

    protected router = Router();

    protected abstract setRoutes(): void;

    public getPrefix() {
        return this.path;
    }

    public getRouter() {
        return this.router;
    }
}

export default MainRoute;
