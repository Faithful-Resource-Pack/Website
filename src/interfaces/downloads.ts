export interface Download {
	file: string;
	file_type: string;
	file_version: number;
	latest?: "latest";
	date: string;
	size?: string;
	links: Record<string, string>;
}

export type DownloadJSON = Record<string, Download[]>;
