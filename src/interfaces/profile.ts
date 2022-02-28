import { TwitchUser } from './twitch-user';

export interface Profile extends TwitchUser {
	accessToken: string;
	refreshToken: string;
}
