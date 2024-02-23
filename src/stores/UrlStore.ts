import { readable } from "svelte/store";

type WindowURL = Window & typeof globalThis & { onurlchange: Function | undefined };

const EVENT_NAME = "urlchange";

export type UrlChangeEvent = {
	oldURL: string;
	newURL: string;
};

type DetailedEvent = Event & {
	detail: UrlChangeEvent;
};

export default readable<null | DetailedEvent>(null, (set) => {
	const hasNativeEvent = Object.keys(window).includes("onurlchange");
	let interval: NodeJS.Timer | undefined = undefined;

	const windowURL = window as WindowURL;
	const myFunction = (event: Event) => {
		if (windowURL.onurlchange !== undefined) {
			windowURL.onurlchange(event);
		}
	};

	if (!hasNativeEvent) {
		let oldURL = location.href;
		interval = setInterval(() => {
			const newURL = location.href;
			if (oldURL === newURL) {
				return;
			}
			const urlChangeEvent = new CustomEvent(EVENT_NAME, {
				detail: {
					oldURL,
					newURL,
				},
			});
			oldURL = newURL;
			dispatchEvent(urlChangeEvent);
		}, 25);
		window.addEventListener(EVENT_NAME, myFunction);
	}

	windowURL.onurlchange = (e: DetailedEvent) => {
		set(e);
	};

	() => {
		clearInterval(interval);
		window.removeEventListener(EVENT_NAME, myFunction);
	};
});
