import dotenv from 'dotenv';
import { TmiService } from './services/tmi.service';

dotenv.config();

const bot = new TmiService();
bot.connect();
