import { StrategyOptions } from 'passport-oauth2';
import env from '../environments';
import { TwitchService } from '../services/twitch.service';

export class OAuthStrategies {
    static twitchStrategyOptions: StrategyOptions = {
        authorizationURL: TwitchService.resources.OAUTH_AUTHORIZE,
        tokenURL: TwitchService.resources.OAUTH_TOKEN,
        clientID: env.TWITCH_CLIENT_ID,
        clientSecret: env.TWITCH_CLIENT_SECRET,
        callbackURL: env.TWITCH_AUTH_CALLBACK,
        state: true
    }

    static twitchBotStrategyOptions: StrategyOptions = {
        authorizationURL: TwitchService.resources.OAUTH_AUTHORIZE,
        tokenURL: TwitchService.resources.OAUTH_TOKEN,
        clientID: env.TWITCH_CLIENT_ID,
        clientSecret: env.TWITCH_CLIENT_SECRET,
        callbackURL: env.TWITCH_AUTH_BOT_CALLBACK,
        state: true
    }
}