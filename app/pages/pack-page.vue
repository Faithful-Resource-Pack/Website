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
	<hero-section :background="banner" :wordmark :wordmark-alt="title">
		<template #actions>
			<div class="container pt-0 pb-4 flex-row ga-4">
				<nuxt-link :to="download" class="btn block btn-xl btn-secondary">
					<v-icon size="small" icon="mdi-download" />
					<span class="ml-2">Downloads</span>
				</nuxt-link>
			</div>
		</template>
	</hero-section>
	<div class="container">
		<v-alert v-if="warning" :title="warning.split('\n')[0]" type="error" class="mb-3">
			{{ warning.split("\n")?.[1] || "" }}
		</v-alert>
		<!-- eslint-disable-next-line vue/no-v-html -->
		<div class="card card-body card-text" v-html="compileMarkdown(description)" />

		<template v-if="posts.length">
			<hr />
			<h2 id="posts" class="subtitle text-center my-5">Latest News</h2>
			<div class="res-grid-3">
				<post-card
					v-for="{ id, permalink, header_img, title, date } in posts"
					:key="id"
					:to="permalink"
					:image="header_img"
					:title
					:date
				/>
			</div>
		</template>

		<hr />

		<nuxt-link v-if="action" :to="action.to" class="btn btn-secondary btn-lg block my-5">
			{{ action.text }}
		</nuxt-link>
	</div>
</template>

<script>
import HeroSection from "~/components/lib/hero-section.vue";
import removeMd from "remove-markdown";

// routed through the main nuxt config file (since they're statically generated)
export default defineNuxtComponent({
	name: "pack-page",
	components: {
		HeroSection,
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
		color: {
			type: String,
			required: false,
			default: "#76c945",
		},
		download: {
			type: String,
			required: true,
		},
		warning: {
			type: String,
			required: false,
			default: null,
		},
		post_base: {
			type: String,
			required: false,
			default: null,
		},
		action: {
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
	data() {
		return {
			posts: [],
		};
	},
	methods: {
		async loadPosts() {
			const { apiURL } = useRuntimeConfig().public;
			const posts = await $fetch(`${apiURL}/posts/approved`);
			this.posts = posts
				.filter((p) => p.permalink.startsWith(this.post_base))
				.sort((a, b) => new Date(b.date) - new Date(a.date))
				.slice(0, 3);
		},
	},
	created() {
		if (this.post_base) this.loadPosts();
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;

.button-row {
	display: flex;
	flex-direction: row;
	justify-content: center;

	// stretch buttons to fill row
	> * {
		flex-grow: 1;
	}

	@media screen and (max-width: $breakpoint-md) {
		flex-direction: column;
	}
}
</style>
