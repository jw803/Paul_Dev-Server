import express, { json, urlencoded, Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routers from './routes';
import errHandler from './middleware/error.middleware';

class App {
    public app: Application;

    constructor() {
        this.app = express();

        this.initializeMiddlewares();
        this.routerSetup();
        this.initializeErrorHandling();
    }

    private initializeMiddlewares() {
        this.app.use(json());
        this.app.use(urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(cookieParser());
    }

    private initializeErrorHandling(): void {
        this.app.use(errHandler);
    }

    private routerSetup() {
        for (const route of routers) {
            this.app.use(route.getPrefix(), route.getRouter());
        }
    }
}

export default new App().app;
