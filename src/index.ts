import dotenv from 'dotenv';
dotenv.config();
import { AddressInfo } from 'net';
import { App } from './app';
import { TmiService } from './services/tmi.service';
import env from './environments';
import { TwitchController } from './controllers/twitch.controller';
import { RootController } from './controllers/root.controller';

const app = new App([new RootController(), new TwitchController()]).getApp();

const listener = app.listen(env.SERVER_PORT || 3000, async () => {
    const addressInfo = listener.address() as AddressInfo;
    console.info(
        `App is running on ${addressInfo.address}:${addressInfo.port} (${addressInfo.family})`
    );

    // const bot = new TmiService();
    // bot.connect();
});
