<script lang="ts">
	import DOMPurify from "isomorphic-dompurify";
	import { t } from "$lib/translations";
	import { derived, readable, writable } from "svelte/store";

	export let path: string;
	export let payload: any | undefined = undefined;
	export let tag: string = "";

	export let slots: Record<string, string> = {};

	const tags = tag.length > 0 ? [`<${tag}>`, `</${tag}>`] : ["", ""];

	$: raw = readable($t(path, payload));
	$: inner = derived(raw, (v) => String(v));
	$: value = writable("");
	$: {
		value.set($inner);
		Object.entries(slots).forEach(([key, val]) => {
			let re = new RegExp(`{${key}}([^{]+){\/[a-z]+}`, "g");
			value.update((v) => v.replace(re, val));
		});
	}
	$: sanitized = derived(value, (val) => DOMPurify.sanitize(val));
	$: final = derived(sanitized, (s) => `${tags[0]}${s}${tags[1]}`);
</script>

{@html $final}
