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
			<div v-html="sanitizedDescription"></div>
			<div class="button-row" v-if="buttons">
				<nuxt-link class="btn btn-dark" v-for="{ to, text } in buttons" :key="to" :to>
					{{ text }}
				</nuxt-link>
			</div>
		</div>
		<hr />
		<post-downloads v-if="downloads" :downloads />
	</div>
</template>

<script>
import NoContainer from "~/layouts/no-container.vue";
import PostDownloads from "~/components/posts/post-downloads.vue";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

// routed through the main nuxt config file (since they're statically generated)
export default defineNuxtComponent({
	name: "pack-page",
	components: {
		NoContainer,
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
		description: {
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
	computed: {
		bannerStyle() {
			return {
				backgroundImage: `url(${this.banner})`,
			};
		},
		sanitizedDescription() {
			return DOMPurify.sanitize(marked.parse(this.description));
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
