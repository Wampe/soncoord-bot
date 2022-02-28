import axios from 'axios';
import { TwitchUser } from '../interfaces/twitch-user';
import { TwitchUserResponse } from '../interfaces/twitch-user-response';
import env from '../environments';

export class TwitchService {
    static readonly resources = {
        OAUTH_TOKEN: 'https://id.twitch.tv/oauth2/token',
        OAUTH_AUTHORIZE: 'https://id.twitch.tv/oauth2/authorize',
        OAUTH_VALIDATE: 'https://id.twitch.tv/oauth2/validate',
        GET_USERS: 'https://api.twitch.tv/helix/users'
    };

    async getUser(accessToken: string): Promise<TwitchUser> {
        const { data } = await axios.get<TwitchUserResponse>(TwitchService.resources.GET_USERS, {
            headers: {
                'Client-ID': env.TWITCH_CLIENT_ID,
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return data.data[0];
    }
}