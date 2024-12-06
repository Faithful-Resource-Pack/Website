export default {
	name: "author-widget",
	components: {
		AuthorMedia: Vue.defineAsyncComponent(() => import("./author-media.js")),
	},
	props: {
		author: {
			type: Object,
			required: true,
		},
	},
	template: `
		<div class="author-widget">
			<img class="author-avatar" :src="avatar" :alt="altText" />
			<!-- need div to treat as one unit -->
			<div>
				<h5>{{ author.username }}</h5>
				<author-media
					v-for="m in author.media"
					:key="m.type"
					:media="m"
				/>
			</div>
		</div>
	`,
	computed: {
		avatar() {
			// string interpolation in inline templates suck so it's easier to do it here
			return `https://visage.surgeplay.com/face/128/${this.author.uuid || "X-Steve"}`;
		},
		altText() {
			return `${this.author.username}'s Avatar`;
		},
	},
};
