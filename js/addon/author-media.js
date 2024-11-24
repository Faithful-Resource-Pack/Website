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
				v-if="MEDIAS_TO_ICONS[media.type].src"
				width="24"
				height="24"
				:src="MEDIAS_TO_ICONS[media.type].src"
				:alt="media.type"
			/>
			<i
				v-else-if="MEDIAS_TO_ICONS[media.type].fas"
				class="fas"
			>
				{{ MEDIAS_TO_ICONS[media.type].fas }}
			</i>
			<i
				v-else-if="MEDIAS_TO_ICONS[media.type].fab"
				class="fab"
			>
				{{ MEDIAS_TO_ICONS[media.type].fab }}
			</i>
			<i v-else class="fab">{{ MEDIAS_TO_ICONS["Other"].fab }}</i>
		</a>
	`,
	data() {
		return {
			MEDIAS_TO_ICONS: {
				CurseForge: { src: "/image/addons/curseforge.svg" },
				GitHub: { fab: "" },
				Modrinth: { fas: "" },
				Patreon: { fab: "" },
				Paypal: { fab: "" },
				"Planet Minecraft": { fas: "" },
				PSN: { fab: "" },
				Reddit: { fab: "" },
				Steam: { fab: "" },
				Twitter: { fab: "" },
				Website: { fas: "" },
				Xbox: { fab: "" },
				YouTube: { fab: "" },
				Other: { fas: "" },
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
