import tmi, { ChatUserstate } from 'tmi.js';

export class TwitchBot {
	private twitchClient: tmi.Client | null = null;

	constructor() {
		this.twitchClient = new tmi.client({
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

		this.registerEvents();
	}

	connect(): void {
		this.twitchClient?.connect();
	}

	disconnect(): void {
		this.twitchClient?.disconnect();
	}

	private registerEvents(): void {
		this.twitchClient?.on('connected', (address: string, port: number) =>
			console.log(`* Connected to ${address}:${port}`)
		);

		this.twitchClient?.on('disconnected', (reason: string) =>
			console.log('* Disconnected:', reason)
		);

		this.twitchClient?.on('ping', () => {
			console.log('Got PING, will send PONG.');
			this.twitchClient?.raw('PONG :tmi.twitch.tv');
		});

		this.twitchClient?.on(
			'part',
			(channel: string, username: string, self: boolean) => {
				if (self) {
					console.log('Left channel', channel, username)
					this.twitchClient?.say(username, `Left channel ${channel}`);
				}
			}
		);

		this.twitchClient?.on(
			'join',
			(channel: string, username: string, self: boolean) => {
				if (self) {
					console.log('Joined channel', channel, username);
					this.twitchClient?.say(username, `Joined channel ${channel}`);
				}
			}
				
		);

		this.twitchClient?.on(
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
	) {
		if (self || !message.startsWith('!')) {
			return;
		}

		const command = message.trim();

		switch (command) {
			case '!soncoord':
				this.twitchClient?.say(channel, `Hi ${context['display-name']} I am here :)`);
			break;

			case '!part':
				if (channel === '#soncoord') {
					this.leaveChannel(context.username);
				}
			break;

			case '!join':
				if (channel === '#soncoord') {
					this.joinChannel(context.username);
				}
			break;

			case '!sr':
				// ToDo: Request a song
			break;
		}
	}

	private joinChannel(channel: string | undefined): void {
		if (channel === undefined) {
			return;
		}

		this.twitchClient?.join(channel);
	}

	private leaveChannel(channel: string | undefined): void {
		if (channel === undefined) {
			return;
		}

		this.twitchClient?.part(channel);
	}
}
