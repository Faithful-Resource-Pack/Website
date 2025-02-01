<template>
	<span
		v-if="isImage"
		class="custom-icon"
		:style="{ maskImage: `url(${iconData})`, backgroundColor: color }"
		v-bind="$attrs"
	/>
	<v-icon v-else :icon="iconData" :color v-bind="$attrs" />
</template>

<script>
export default defineNuxtComponent({
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
		color: {
			type: String,
			required: false,
			default: "white",
		},
	},
	data() {
		return {
			icons: {
				// expand this list as needed
				download: { data: "download", type: "mdi" },
				faithful: { data: "/image/icons/faithful_logo.svg", type: "image" },
				curseforge: { data: "/image/icons/curseforge.svg", type: "image" },
				modrinth: { data: "/image/icons/modrinth.svg", type: "image" },
				github: { data: "github", type: "mdi" },
				mcpedl: { data: "cube", type: "mdi" },
				patreon: { data: "patreon", type: "mdi" },
				paypal: { data: "paypal", type: "mdi" },
				pmc: { data: "earth", type: "mdi" },
				psn: { data: "sony-playstation", type: "mdi" },
				reddit: { data: "reddit", type: "mdi" },
				steam: { data: "steam", type: "mdi" },
				twitter: { data: "twitter", type: "mdi" },
				website: { data: "web", type: "mdi" },
				xbox: { data: "microsoft-xbox", type: "mdi" },
				youtube: { data: "youtube", type: "mdi" },
				other: { data: "link-variant", type: "mdi" },
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
});
</script>

<style scoped lang="scss">
// https://dev.to/hasantezcan/how-to-colorize-svg-image-1kc8
.custom-icon {
	display: inline-block;
	vertical-align: middle;
	mask-size: 100%;
	mask-repeat: no-repeat;
	mask-position: center;
	width: 1.25em;
	height: 1.25em;
}
</style>
