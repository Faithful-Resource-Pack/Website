export interface AddonDownload {
	key: string;
	links: string[];
}

export const AddonTagValues = ["Java", "32x", "Bedrock", "64x"] as const;

export type AddonTag = typeof AddonTagValues;
export type AddonTagArray = Array<AddonTag[number]>;

export interface Addon {
	id?: number | string;
	name: string; // addon name (> 5 && < 30)
	slug: string; // used in link & as comments id (ex: 'www.faithfulpack.net/addons/Faithful3D')
	description: string; // addon description (> 256 && < 4096)
	authors: Array<string>; // discord users IDs
	options: {
		comments: boolean; // true if comments are enabled on this addon
		optifine: boolean; // true if the pack require optifine to work properly
		tags: AddonTagArray; // Edition + Resolution
	};
	last_updated?: number; // present if was updated since field apparition, gives timestamp
}
