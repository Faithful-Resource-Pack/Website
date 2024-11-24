export default {
	name: "author-card",
	components: {
		AuthorMedia: Vue.defineAsyncComponent(() => import("./author-media.js")),
	},
	props: {
		author: {
			type: Object,
			required: true,
		},
		multiple: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	template: `
		<img
			:src="avatar"
			:alt="altText"
			style="display: block; margin-left: auto; margin-right: auto; max-height: 250px"
		/>
		<div class="card card-title text-center author-widget">
			<h4>{{ author.username }}</h4>
			<div class="author-socials">
				<author-media
					v-for="m in author.media"
					:key="m.type"
					:media="m"
				/>
			</div>
		</div>
	`,
	computed: {
		fullAvatar() {
			return `https://visage.surgeplay.com/full/256/${this.author.uuid}`;
		},
		headAvatar() {
			return `https://visage.surgeplay.com/head/128/${this.author.uuid}`;
		},
		avatar() {
			if (!this.author.uuid) return "https://visage.surgeplay.com/head/128/X-Steve";
			if (this.multiple) return this.headAvatar;
			return this.$vuetify.display.mdAndUp ? this.fullAvatar : this.headAvatar;
		},
		altText() {
			return `${this.author.username}'s Avatar`;
		}
	},
};
