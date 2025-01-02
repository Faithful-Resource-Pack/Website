<template>
	<img v-if="isImage" class="custom-icon" :src="iconData" :alt="cleanedIcon" />
	<v-icon v-else :icon="iconData" />
</template>

<script>
export default {
	name: "media-icon",
	props: {
		icon: {
			type: String,
			required: true,
		},
		fallback: {
			type: String,
			required: false,
			default: "other",
		},
	},
	data() {
		return {
			icons: {
				// expand this list as needed
				download: { data: "download", type: "mdi" },
				curseforge: { data: "/image/icons/curseforge.svg", type: "image" },
				github: { data: "github", type: "mdi" },
				modrinth: { data: "wrench", type: "mdi" },
				mcpedl: { data: "cube", type: "mdi" },
				patreon: { type: "mdi", data: "patreon" },
				paypal: { type: "mdi", data: "paypal" },
				pmc: { type: "mdi", data: "earth" },
				psn: { type: "mdi", data: "sony-playstation" },
				reddit: { type: "mdi", data: "reddit" },
				steam: { type: "mdi", data: "steam" },
				twitter: { type: "mdi", data: "twitter" },
				website: { type: "mdi", data: "web" },
				xbox: { type: "mdi", data: "microsoft-xbox" },
				youtube: { type: "mdi", data: "youtube" },
				other: { type: "mdi", data: "link-variant" },
			},
		};
	},
	computed: {
		cleanedIcon() {
			const cleaned = this.icon.toLowerCase().trim();
			// fix exceptions, expand if needed
			switch (cleaned) {
				case "curse":
					return "curseforge";
				case "planet minecraft":
				case "planetminecraft":
					return "pmc";
			}
			if (Object.keys(this.icons).includes(cleaned)) return cleaned;
			return this.fallback;
		},
		iconType() {
			return this.icons[this.cleanedIcon]?.type;
		},
		iconData() {
			const icon = this.icons[this.cleanedIcon];
			if (!icon) return `mdi-${this.icons.other.data}`;
			if (this.iconType === "image") return icon.data;
			return [icon.type, icon.data].join("-");
		},
		isImage() {
			return this.iconType === "image";
		},
	},
};
</script>
