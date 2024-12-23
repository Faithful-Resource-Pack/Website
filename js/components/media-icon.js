// handles all weird custom icon behavior and edge cases
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
	template: `
		<img v-if="isImage" class="custom-icon" :src="iconData" :alt="cleanedIcon" />
		<i v-else :class="iconType">{{ iconData }}</i>
	`,
	data() {
		return {
			icons: {
				// expand this list as needed
				download: { data: "", type: "fas" },
				curseforge: { data: "/image/icons/curseforge.svg", type: "image" },
				github: { data: "", type: "fab" },
				modrinth: { data: "", type: "fas" },
				mcpedl: { data: "", type: "fas" },
				patreon: { type: "fab", data: "" },
				paypal: { type: "fab", data: "" },
				pmc: { type: "fas", data: "" },
				psn: { type: "fab", data: "" },
				reddit: { type: "fab", data: "" },
				steam: { type: "fab", data: "" },
				twitter: { type: "fab", data: "" },
				website: { type: "fas", data: "" },
				xbox: { type: "fab", data: "" },
				youtube: { type: "fab", data: "" },
				other: { type: "fas", data: "" },
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
			return this.icons[this.cleanedIcon]?.data;
		},
		isImage() {
			return this.iconType === "image";
		},
	},
};
