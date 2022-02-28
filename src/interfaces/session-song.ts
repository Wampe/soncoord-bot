import { Timestamp } from 'firebase/firestore';
import { ChannelBase } from './channel-base';
import { SongBase } from './song-base';

export enum SessionSongStatus {
	Pending = 'pending',
	Playing = 'playing',
	Played = 'played'
}

export enum SessionSongType {
	Regular = 'regular',
	Prio = 'prio'
}

export interface SessionSong extends SongBase {
	requestedBy: ChannelBase;
	added: Timestamp;
	status: SessionSongStatus,
	type: SessionSongType
}
