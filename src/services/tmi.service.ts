import { Client, ChatUserstate } from 'tmi.js';
import { SongRequests } from '../utils/song-requests';
import env from '../environments';

export class TmiService {
    private readonly client: Client;

    constructor() {
        this.client = new Client({
            connection: {
                reconnect: true,
                secure: true,
            },
            options: {
                clientId: env.TWITCH_CLIENT_ID,
            },
            identity: {
                username: env.TWITCH_USERNAME,
                password: env.TWITCH_OAUTH,
            },
            channels: env.TWITCH_CHANNELS?.split(','),
        });
    }

    connect(): void {
        try {
            this.registerEvents();
            this.client.connect();
        } catch (error: unknown) {
            console.error('*** TMI client could not get started!');
            console.error(error);
        }
    }

    private registerEvents(): void {
        this.client.on('connected', (address: string, port: number) =>
            console.log(`* Connected to ${address}:${port}`)
        );

        this.client.on('disconnected', (reason: string) =>
            console.log('* Disconnected:', reason)
        );

        this.client.on('ping', () => {
            console.log('Got PING, will send PONG.');
            this.client.raw('PONG :tmi.twitch.tv');
        });

        this.client.on(
            'part',
            (channel: string, username: string, self: boolean) => {
                if (self) {
                    console.log('Left channel', channel, username);
                    this.client.say(username, `Left channel ${channel}`);
                }
            }
        );

        this.client.on(
            'join',
            (channel: string, username: string, self: boolean) => {
                if (self) {
                    console.log('Joined channel', channel, username);
                    this.client.say(username, `Joined channel ${channel}`);
                }
            }
        );

        this.client.on('message', this.onMessage);
    }

    private onMessage(
        channel: string,
        context: ChatUserstate,
        message: string,
        self: boolean
    ): void {
        if (self || !message.startsWith('!')) {
            return;
        }

        const command = message.trim();

        if (command.startsWith('!sr')) {
            console.log(command);
            const splittedCommand = command.match(/^!(\w+)\s(.*?)$/);
            if (splittedCommand) {

                let requestCommand = SongRequests.getYouTubeVideoId(splittedCommand[2]);
                if (requestCommand) {
                    // Handle YT based request
                    console.log('YT ID', requestCommand[1]);
                }

                requestCommand = SongRequests.getSonglistRequestParameter(splittedCommand[2]);
                if (requestCommand) {
                    // Handle songlist based request
                    console.log('SL Params', requestCommand[1]);
                }

                // check request in database (song list)

                console.log('');
                console.log('');
            }
        } else {
            switch (command) {
                case '!soncoord':
                    this.client.say(
                        channel,
                        `Hi ${context['display-name']} I am here :)`
                    );
                    break;

                case '!part':
                    if (channel === '#soncoord' && context.username) {
                        this.client.part(context.username);
                    }
                    break;

                case '!join':
                    if (channel === '#soncoord' && context.username) {
                        this.client.join(context.username);
                    }
                    break;
            }
        }
    }
}
