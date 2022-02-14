export class SongRequests {
	static isYouTube(source: string): boolean {
		return new RegExp(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/)
			.test(source);
	}

	static getYouTubeVideoId(source: string): string | null {
		const idSource = source.match(/^https?:\/\/(?:www\.youtube(?:-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*&)?vi?=|&vi?=|\?(?:.*&)?vi?=)([^#&?\n/<>"']*)/i);

		return idSource ? idSource[1] : null;
	}

	static isSonglist(source: string): boolean {
		return new RegExp(/^!(\w+)\s(.*?)\s(by)\s(.* ?)$/).test(source);
	}

	static getSonglistRequestParameter(source: string): RegExpMatchArray | null {
		return source.match(/^!(\w+)\s(.*?)\s(by)\s(.* ?)$/);
	}
}
