import { Client, ChatUserstate } from 'tmi.js';
import { SongRequests } from '../utils/song-requests';

export class TmiService {
	private readonly client: Client;

	constructor() {
		this.client = new Client({
			connection: {
				reconnect: true,
				secure: true,
			},
			options: {
				clientId: process.env?.TWITCH_CLIENT_ID,
			},
			identity: {
				username: process.env?.TWITCH_USERNAME,
				password: process.env?.TWITCH_OAUTH,
			},
			channels: process.env.TWITCH_CHANNELS?.split(','),
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

		this.client.on(
			'message',
			(
				channel: string,
				context: ChatUserstate,
				message: string,
				self: boolean
			) => this.onMessage(channel, context, message, self)
		);
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
			const splittedMessage = command.match(/^!(\w+)\s(.*?)$/);
			if (splittedMessage) {
				// Song Request for Songlist or youtube
				console.log('');
				console.log('');
				console.log('Anything with request');
				console.log('Is YouTube', SongRequests.isYouTube(splittedMessage[2]));
				console.log(
					'YT ID',
					SongRequests.getYouTubeVideoId(splittedMessage[2])
				);
				console.log('Is Songlist', SongRequests.isSonglist(command));
				console.log(
					'SL Params',
					SongRequests.getSonglistRequestParameter(command)
				);
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
