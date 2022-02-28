import express, { Application } from 'express'
import session from 'express-session';
import passport from 'passport';
import OAuth2Strategy from 'passport-oauth2';
import env from './environments';
import { Controller } from './interfaces/controller.interface';
import { Profile } from './interfaces/profile';
import { TwitchUser } from './interfaces/twitch-user';
import { TwitchService } from './services/twitch.service';
import { OAuthStrategies } from './utils/auth-strategies';

export class App {
	private readonly app: Application

	constructor(controller: Array<Controller>) {
		this.app = express();

		OAuth2Strategy.prototype.userProfile = this.assignUserProfileSource;
		this.initControllers(controller);
		this.initPassport();
	}

	getApp(): Application {
		return this.app;
	}

	private async assignUserProfileSource(
		accessToken: string,
		done: (err?: Error | null | undefined, profile?: TwitchUser) => void
	): Promise<void> {
        const authService = new TwitchService();

        try {
            const user = await authService.getUser(accessToken);
            done(null, user);    
        } catch (error: unknown) {
            done(error as Error);
        }        
	}

	private initControllers(controller: Array<Controller>): void {
        // ToDo: Handle environment of development and production
        // if (app.get('env') === 'production') {
        //     app.set('trust proxy', 1) // trust first proxy
        //     sess.cookie.secure = true // serve secure cookies
        // cookie: {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: true,
        //     maxAge: 600000 
        // }
        // }
		this.app.use(
            session({ 
				secret: env.SERVER_SESSION_SECRET,
				resave: false,
				saveUninitialized: false
			})
        );
            
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        if (controller) {
            controller.forEach((entity: Controller) => {
                this.app.use(entity.controllerPath, entity.getRouter());
            });
        }
	}

	private initPassport(): void {
		passport.serializeUser<Express.User>(
			(
				user: Express.User,
				done: (err: unknown, id?: Express.User) => void
			) => done(null, user)
        );

        passport.deserializeUser<Express.User>(
			(
				id: Express.User,
				done: (err: unknown, user?: false | Express.User | null | undefined) => void
			) => done(null, id)
        );

        passport.use(
            'twitch',
            new OAuth2Strategy(OAuthStrategies.twitchStrategyOptions, this.UserVerifyCallback)
        );

		passport.use(
            'twitch-bot',
            new OAuth2Strategy(OAuthStrategies.twitchBotStrategyOptions, this.BotVerifyCallback)
        );
	}

    private UserVerifyCallback(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: OAuth2Strategy.VerifyCallback
    ): void {
        profile.accessToken = accessToken;
        profile.refreshToken = refreshToken;

        // Handling User

        done(null, profile);
    }

    private BotVerifyCallback(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: OAuth2Strategy.VerifyCallback
    ): void {
        profile.accessToken = accessToken;
        profile.refreshToken = refreshToken;

        // Bot Onboarding

        done(null, profile);
    }
}
