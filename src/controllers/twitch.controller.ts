import { Request, Response, Router } from 'express';
import passport from 'passport';
import { ControllerBase } from './controller-base';

export class TwitchController extends ControllerBase {
	private router: Router;
	controllerPath: string;
	
	constructor() {
		super();
		this.controllerPath = '/api/auth/twitch';
		this.router = Router();		

		this.router.get(
            '/',
            passport.authenticate('twitch', { scope: 'user:read:email' })
        );

        this.router.get(
            '/callback',
            passport.authenticate('twitch', {
                successRedirect: '/',
                failureRedirect: '/api/auth/twitch/failed',
            })
        );

        this.router.get(
            '/bot',
            passport.authenticate('twitch-bot', { scope: 'chat:read chat:edit user:read:email' })
        );

        this.router.get(
            '/bot/callback',
            passport.authenticate('twitch-bot', {
                successRedirect: '/',
                failureRedirect: '/api/auth/twitch/failed',
            })
        );

		this.router.get('/failed', (request: Request, response: Response) => {
			response.send('Authorization with Twitch failed');
        });
	}

	getRouter(): Router {
		return this.router;
	}
}
