import type { UseSeoMetaInput } from "@unhead/vue";
import removeMd from "remove-markdown";

export interface MetaParams {
	description: string;
	image: string;
	title: MaybeRef<string> | ComputedRef<string>;
}

function handleTitle(title: string) {
	if (title) return `${title} - Faithful`;
	return "Faithful Resource Pack";
}

/**
 * Generate full unhead meta tags from a title, description, and image
 */
export function generateMetaTags({ title, description, image }: MetaParams): UseSeoMetaInput {
	const sanitized = removeMd(description);
	const base = {
		description: sanitized,
		ogDescription: sanitized,
		twitterDescription: sanitized,
		ogImage: image,
		twitterImage: image,
	};
	if (isRef(title)) {
		return {
			...base,
			title: () => handleTitle(title.value),
			ogTitle: () => handleTitle(title.value),
			twitterTitle: () => handleTitle(title.value),
		};
	}
	return {
		...base,
		title: () => handleTitle(title),
		ogTitle: () => handleTitle(title),
		twitterTitle: () => handleTitle(title),
	};
}
