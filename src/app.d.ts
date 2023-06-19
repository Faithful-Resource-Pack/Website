// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { IconDefinition } from "@fortawesome/free-brands-svg-icons"

// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}

    interface CardLink {
        href: string,
        title: string
    };

	interface CardUrl {
		title: string,
		background: string,
		src: string
	}

	interface CardList {
		links: Array<CardLink[]>,
		urls: Array<CardUrl>
	}

	interface Post {
		permalink: string,
		title: string,
		headerImage: string
	}

	interface Download {
		file: string,
		file_type: string,
		file_version?: number,
		size?: string,
		latest?: 'latest',
		date: string,
		links: Record<string, string>
	}

	interface DownloadList extends Record<string, Download[]> {}

	interface PackEdition {
		name: string,
		downloads: DownloadList
	}

	interface Pack {
		name: string,
		background_url: string,
		editions: Array<PackEdition>
	}

	interface FavoriteAddonStore {
		favorites: Array<string>
	}

	interface SearchAddonStore {
		search: string,
		categories: Array<string>;
		editions: Array<string>,
		resolutions: Array<string>,
		authors: Array<string>,
	}

	interface FaqArray {
		question: string,
		answer: string,
		keywords: string[],
	}

	interface FaqObject {
		faqArray: FaqArray[],
	}
}