import { Router } from 'express';
import config from '../config';

abstract class MainRoute {
    private prefix = config.VERSION;

    protected router = Router();

    protected abstract setRoutes(): void;

    public getPrefix() {
        return this.prefix;
    }

    public getRouter() {
        return this.router;
    }
}

export default MainRoute;
