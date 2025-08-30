<script setup>
definePageMeta({
	layout: "no-container",
	disableDefaultMeta: true,
});

// eslint-disable-next-line vue/valid-define-props
const { title, description, banner } = defineProps();

// the given banner URL doesn't have the wordmark so we chop up the url to create a new one with the wordmark
const packID = banner.split("/").at(-1).split(".")[0];
const image = `https://database.faithfulpack.net/images/branding/social_media/banners/github/${packID}_banner.png`;
useSeoMeta(generateMetaTags({ title, description: removeMd(description), image }));
</script>

<template>
	<div class="hero" :style="bannerStyle">
		<div class="container">
			<img class="wordmark" :src="wordmark" />
		</div>
	</div>
	<div class="container">
		<div class="card card-body card-text">
			<!-- eslint-disable-next-line vue/no-v-html -->
			<div v-html="compileMarkdown(description)"></div>
			<div v-if="buttons" class="button-row">
				<nuxt-link
					v-for="{ to, text } in buttons"
					:key="to"
					class="btn btn-dark"
					:to
					:style="buttons.length === 1 ? 'width: 50%; flex-grow: 0' : ''"
				>
					{{ text }}
				</nuxt-link>
			</div>
		</div>
		<hr />
		<post-downloads v-if="downloads" :downloads />
	</div>
</template>

<script>
import PostDownloads from "~/components/posts/post-downloads.vue";
import removeMd from "remove-markdown";

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
		description: {
			type: String,
			required: true,
		},
		buttons: {
			type: Array,
			required: false,
			default: null,
		},
		downloads: {
			type: Object,
			required: false,
			default: null,
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
				backgroundImage: `url("${this.banner}")`,
			};
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/lib/variables" as *;

.hero {
	display: block;
	background-size: cover;
	background-position: center;
	padding: 0 2rem 1px;
	text-align: center;
	box-shadow: $primary-shadow;
}

.wordmark {
	padding: 5vw;
	filter: drop-shadow($wordmark-shadow);
	width: 800px;
}
</style>
