export default {
	name: "author-media",
	props: {
		media: {
			type: Object,
			required: true,
		},
	},
	template: `
		<a :href="formattedURL" target="_blank" rel="noreferrer">
			<img
				v-if="MEDIAS_TO_ICONS[media.type].type === 'image'"
				width="24"
				height="24"
				:src="MEDIAS_TO_ICONS[media.type].data"
				:alt="media.type"
			/>
			<i
				v-else
				:class="MEDIAS_TO_ICONS[media.type || 'Other'].type || 'fas'"
			>
				{{ MEDIAS_TO_ICONS[media.type || "Other"].data || MEDIAS_TO_ICONS["Other"] }}
			</i>
		</a>
	`,
	data() {
		return {
			MEDIAS_TO_ICONS: {
				CurseForge: { type: "image", data: "/image/addons/curseforge.svg" },
				GitHub: { type: "fab", data: "" },
				Modrinth: { type: "fas", data: "" },
				Patreon: { type: "fab", data: "" },
				Paypal: { type: "fab", data: "" },
				"Planet Minecraft": { type: "fas", data: "" },
				PSN: { type: "fab", data: "" },
				Reddit: { type: "fab", data: "" },
				Steam: { type: "fab", data: "" },
				Twitter: { type: "fab", data: "" },
				Website: { type: "fas", data: "" },
				Xbox: { type: "fab", data: "" },
				YouTube: { type: "fab", data: "" },
				Other: { type: "fas", data: "" },
			},
		};
	},
	computed: {
		formattedURL() {
			return !/^https?:\/\//i.test(this.media.link)
				? `http://${this.media.link}`
				: this.media.link;
		},
	},
};
