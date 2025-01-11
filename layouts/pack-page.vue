<script setup>
definePageMeta({
	layout: "no-container",
});
</script>

<template>
	<div class="hero" :style="bannerStyle">
		<div class="container">
			<img class="wordmark" :src="wordmark" />
		</div>
	</div>
	<div class="container">
		<div class="card card-body card-text">
			<template v-html="compiledMarkdown(text)"></template>
			<div class="button-row" v-if="buttons">
				<a class="btn btn-dark" v-for="{ href, text } in buttons" :key="href" :href>
					{{ text }}
				</a>
			</div>
		</div>
		<hr />
		<post-downloads v-if="downloads" :downloads />
	</div>
</template>

<script>
import PostDownloads from "~/components/posts/post-downloads.vue";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

// routed through the main nuxt config file (since they're statically generated)
export default defineNuxtComponent({
	name: "pack-page",
	components: {
		PostDownloads,
	},
	props: {
		title: {
			type: String,
			required: true,
		},
		banner: {
			type: String,
			required: true,
		},
		wordmark: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		buttons: {
			type: Array,
			required: false,
		},
		downloads: {
			type: Object,
			required: false,
		},
		// not used but nuxt complains about extra props otherwise
		permalink: {
			type: String,
			required: true,
		},
	},
	methods: {
		compiledMarkdown(text) {
			return DOMPurify.sanitize(marked.parse(text));
		},
	},
	computed: {
		bannerStyle() {
			return {
				backgroundImage: `url(${this.banner})`,
			};
		},
	},
});
</script>

<style scoped lang="scss">
.hero {
	display: block;
	background-size: cover;
	background-position: center;
	padding: 0 2rem 1px;
	text-align: center;
}

.wordmark {
	padding: 5vw;
	filter: drop-shadow(0 0 10px #000);
	width: 800px;
}
</style>
