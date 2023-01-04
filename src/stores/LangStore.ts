import { createStore } from "$lib/createStore";
import { locale, defaultLocale, supportedLocales } from "$lib/translations";
import type { Readable } from "svelte/store";

type LangValue = typeof supportedLocales[number];

export let langStore = createStore<
	LangValue,
	Readable<LangValue> & {
		next: () => void;
	}
>(
	"LANG",
	defaultLocale,
	(v) => v as LangValue,
	(w) => {
		let { subscribe, update } = w;

		return {
			subscribe,
			next: function () {
				update((v) => {
					let i = supportedLocales.indexOf(v);
					let next = (i + 1) % supportedLocales.length;

					locale.set(supportedLocales[next]);
					return supportedLocales[next];
				});
			}
		};
	}
);

export let themeValueWatch = function (listener: (value: LangValue) => void) {
	let lastValue: LangValue;

	onlanguagechange = (event) => {
		listener(lastValue);
	};
};
