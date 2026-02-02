import type { UseSeoMetaInput } from "@unhead/vue";
import removeMd from "remove-markdown";

export interface MetaParams {
	title: MaybeRef<string> | ComputedRef<string>;
	description?: string;
	image?: string;
}

function handleTitle(title: string) {
	if (title) return `${title} - Faithful`;
	return "Faithful Resource Pack";
}

export const SEO_DESCRIPTION = "Providing a higher-resolution Minecraft experience since 2010.";
export const SEO_IMAGE =
	"https://database.faithfulpack.net/images/branding/social_media/banners/universal_banner.png";

/**
 * Generate full unhead meta tags from a title, description, and image
 */
export function generateMetaTags({ title, description, image }: MetaParams): UseSeoMetaInput {
	description ||= SEO_DESCRIPTION;
	image ||= SEO_IMAGE;
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
