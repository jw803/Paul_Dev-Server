import express from 'express';
import * as bodyParser from 'body-parser';
import routers from './routes';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routerSetup();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private routerSetup() {
        for (const route of routers) {
            this.app.use(route.getPrefix(), route.getRouter());
        }
    }
}

export default new App().app;
