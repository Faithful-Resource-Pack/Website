import { createStore } from "$lib/createStore";
import { locale, defaultLocale, supportedLocales } from "$lib/translations";
import type { Readable } from "svelte/store";

type LangValue = (typeof supportedLocales)[number];

export let langStore = createStore<
	LangValue,
	Readable<LangValue> & {
		next: () => void;
		set: (lang: string) => void;
	}
>(
	"LANG",
	defaultLocale,
	(v) => v as LangValue,
	(w) => {
		let { subscribe, update, set } = w;

		return {
			subscribe,
			set(lang: string) {
				if (!supportedLocales.includes(lang)) return;
				locale.set(lang);
				set(lang);
			},
			next() {
				update((v) => {
					let i = supportedLocales.indexOf(v);
					let next = (i + 1) % supportedLocales.length;

					locale.set(supportedLocales[next]);
					return supportedLocales[next];
				});
			},
		};
	},
);

export let langValueWatch = function (listener: (value: LangValue) => void) {
	let lastValue: LangValue;

	onlanguagechange = (event) => {
		listener(lastValue);
	};
};
