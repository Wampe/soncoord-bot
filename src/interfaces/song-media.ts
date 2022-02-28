export enum MediaSource {
    YouTube = 'youtube',
    Local = 'local'
}

export interface SongMedia {
    source: MediaSource;
    path: string;
}
