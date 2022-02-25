import { Category } from './category';
import { ChannelBase } from './channel-base';
import { ChannelSettings } from './channel-settings';
import { PriorityRequest } from './priority-request';
import { Session } from './session';
import { Song } from './song';

export interface Channel extends ChannelBase {
	settings: ChannelSettings,
	priorities: Array<PriorityRequest>;
	sessions: Array<Session>;
	songs: Array<Song>;
	categories: Array<Category>;
}
