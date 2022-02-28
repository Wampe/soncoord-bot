import { ChannelBase } from './channel-base';

export interface Bot {
    displayName: string;
    login: string;
    accessToken: string;
    refreshToken: string;
    channels: Array<ChannelBase>
}
