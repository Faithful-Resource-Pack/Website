// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
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
}