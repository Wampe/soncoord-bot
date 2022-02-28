import { Response, Request, NextFunction, Router } from 'express';
import { ControllerBase } from './controller-base';

export class RootController extends ControllerBase {
    private router: Router;
    controllerPath: string;

    constructor() {
        super();
        this.controllerPath = '/';
        this.router = Router();

        this.router.get('/', (request: Request, response: Response, next: NextFunction) => {
            if (request.session) {
                response.send('Welcome');
            } else {
                console.error('No session given!');
                response.send('No session given!');
            }
        });
    }

    getRouter(): Router {
        return this.router;
    }
}
