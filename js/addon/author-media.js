export default {
	name: "author-media",
	components: {
		MediaIcon: Vue.defineAsyncComponent(() => import("../components/media-icon.js")),
	},
	props: {
		media: {
			type: Object,
			required: true,
		},
	},
	template: `
		<a class="author-media" :href="formattedURL" target="_blank" rel="noreferrer">
			<media-icon :icon="media.type" />
		</a>
	`,
	computed: {
		formattedURL() {
			const url = this.media.link;
			return !/^https?:\/\//i.test(url) ? `http://${url}` : url;
		},
	},
};
