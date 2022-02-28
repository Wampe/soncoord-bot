export class SongRequests {

    static getYouTubeVideoId(source: string): RegExpMatchArray | null {
        return source.match(/^https?:\/\/(?:www\.youtube(?:-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*&)?vi?=|&vi?=|\?(?:.*&)?vi?=)([^#&?\n/<>"']*)/i);
    }

    static getSonglistRequestParameter(source: string): RegExpMatchArray | null {
        return source.match(/^(.*?)\s(by|-|from)\s(.* ?)$/);
    }
}
