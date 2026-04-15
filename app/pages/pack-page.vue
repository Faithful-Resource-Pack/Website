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
				<nuxt-link :to="download" class="btn btn-xl block btn-secondary">
					<v-icon style="font-size: 1.5rem" icon="mdi-download" />
					<span class="ml-3">Downloads</span>
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

		<template v-if="action">
			<br />
			<nuxt-link :to="action.to" class="btn btn-secondary btn-more my-5">
				{{ action.text }}
			</nuxt-link>
		</template>

		<template v-if="usePosts">
			<hr />
			<h2 id="posts" class="subtitle text-center my-5">Latest News</h2>
			<div class="res-grid-3">
				<template v-if="!posts.length">
					<div v-for="i in 3" :key="i" class="card pb-3">
						<v-skeleton-loader type="image, subtitle, text" theme="dark" />
					</div>
				</template>
				<template v-else>
					<post-card
						v-for="{ id, permalink, header_img, title, date } in posts"
						:key="id"
						:to="permalink"
						:image="header_img"
						:title
						:date
					/>
				</template>
			</div>
			<br />
			<nuxt-link to="/news" class="btn btn-secondary btn-more">See all news</nuxt-link>
		</template>

		<template v-if="useAddons">
			<hr />
			<h2 id="posts" class="subtitle text-center my-5">Latest Add-ons</h2>
			<div class="res-grid-3">
				<template v-if="!posts.length">
					<div v-for="i in 3" :key="i" class="card pb-3">
						<v-skeleton-loader type="image, subtitle, text" theme="dark" />
					</div>
				</template>
				<template v-else>
					<addon-card v-for="addon in addons" :key="addon.id" :addon disable-favorites />
				</template>
			</div>
			<br />
			<nuxt-link to="/addons" class="btn btn-secondary btn-more">See all add-ons</nuxt-link>
		</template>
	</div>
</template>

<script>
import HeroSection from "~/components/lib/hero-section.vue";
import removeMd from "remove-markdown";
import PostCard from "~/components/lib/post-card.vue";
import AddonCard from "~/components/addons/addon-card.vue";
import DiscordButton from "~/components/lib/discord-button.vue";

const SHOWN_POSTS = 3;
const SHOWN_ADDONS = 3;

// todo: remove this when addons support all packs
const NAME_TO_RES = {
	"Faithful 32x": "32x",
	"Faithful 64x": "64x",
};

// routed through the main nuxt config file (since they're statically generated)
export default defineNuxtComponent({
	name: "pack-page",
	components: {
		HeroSection,
		PostCard,
		AddonCard,
		DiscordButton,
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
			usePosts: false,
			addons: [],
			useAddons: false,
		};
	},
	methods: {
		async loadPosts() {
			this.usePosts = true;
			const { apiURL } = useRuntimeConfig().public;
			const posts = await $fetch(`${apiURL}/posts/approved`);
			this.posts = posts
				.filter((p) => p.permalink.startsWith(this.post_base))
				.sort((a, b) => new Date(b.date) - new Date(a.date))
				.slice(0, SHOWN_POSTS);
		},
		async loadAddons() {
			this.useAddons = true;
			const { apiURL } = useRuntimeConfig().public;
			const addons = await $fetch(`${apiURL}/addons/approved`);
			this.addons = addons
				.filter((a) => a.options.tags.includes(NAME_TO_RES[this.title]))
				.sort((a, b) => new Date(b.last_updated || 0) - new Date(a.last_updated || 0))
				.slice(0, SHOWN_ADDONS);
		},
	},
	created() {
		if (this.post_base) this.loadPosts();
		if (NAME_TO_RES[this.title]) this.loadAddons();
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
