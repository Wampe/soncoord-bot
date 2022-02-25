import { Timestamp } from 'firebase/firestore';
import { Category } from './category';
import { SongBase } from './song-base';

export interface Song extends SongBase {
	categories: Array<Category | string>;
	active: boolean;
	timesPlayed: number;
	lastPlayed: Timestamp;	
}
