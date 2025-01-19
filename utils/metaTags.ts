import type { UseSeoMetaInput } from "@unhead/vue";
import removeMd from "remove-markdown";

interface MetaParams {
	description: string;
	image: string;
	title: MaybeRef<string>;
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
			title: () => (title.value ? `${title.value} - Faithful` : "Faithful Resource Pack"),
			ogTitle: () => title.value,
			twitterTitle: () => title.value,
		};
	}
	return {
		...base,
		title: () => (title ? `${title} - Faithful` : "Faithful Resource Pack"),
		ogTitle: () => title,
		twitterTitle: () => title,
	};
}
