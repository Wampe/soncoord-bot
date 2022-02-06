import tmi, { ChatUserstate } from 'tmi.js';
import dotenv from "dotenv"

dotenv.config()

const {
  TWITCH_USERNAME,
  TWITCH_OAUTH
} = process.env;

const opts: tmi.Options = {
  identity: {
    username: TWITCH_USERNAME,
    password: TWITCH_OAUTH
  },
  channels: 
    [`${process.env.TWITCH_CHANNEL}`]
};

export class TwitchBot {
  private twitchClient: tmi.Client | null = null;
  
  connect(): void {
    this.twitchClient = new tmi.client(opts);  
    this.twitchClient.on(
      'connected',
      (addr: string, port: number) => this.onConnectedHandler(addr, port));

    this.twitchClient.on(
      'message',
      (target: string, userState: ChatUserstate, msg: string, self: boolean) =>
        this.onMessageHandler(target, userState, msg, self)
    );

    this.twitchClient.on("disconnected", (reason: string) => {
      console.log('disconnected', reason);
    });

    this.twitchClient.on("ping", () => {
      this.twitchClient?.raw("PONG :tmi.twitch.tv");
    });

    this.twitchClient.on("part", (channel: string, username: string, self: boolean) => {
      console.log('Left channel', channel, username, self);
    });

    this.twitchClient.connect();
  }
  
  // Called every time a message comes in
  onMessageHandler (target: string, context: ChatUserstate, msg: string, self: boolean) {
    if (self || !msg.startsWith('!')) {
      return;
    }

    console.log(target);
    console.log(context);
    console.log(msg);
    console.log(self);
    
    const commandName = msg.trim();

    if (commandName === '!hello') {
        this.twitchClient?.say(target, `hello`);
    } else if (commandName === '!part') {
      this.twitchClient?.part(target);
    }
  }

  onConnectedHandler(addr: string, port: number): void {
    console.log(`* Connected to ${addr}:${port}`);
  }
}

const bot = new TwitchBot();
bot.connect();
