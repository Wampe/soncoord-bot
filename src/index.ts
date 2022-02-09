import dotenv from 'dotenv';
import { TwitchBot } from './twitch-bot';

dotenv.config();

const bot = new TwitchBot();
bot.connect();
