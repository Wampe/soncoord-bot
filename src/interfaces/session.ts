import { SessionSong } from './session-song';

export interface Session {
	limit: number;
	sessionSongs: Array<SessionSong>
}
