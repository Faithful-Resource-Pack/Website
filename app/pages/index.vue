<template>
	<hero-section
		background="/image/banners/hero.jpg"
		wordmark="/image/wordmarks/faithful.png"
		wordmark-alt="Faithful Wordmark"
	>
		<template #tagline>Providing a higher-resolution Minecraft experience since 2010.</template>
		<template #actions>
			<!-- hack to get the button the same width as the container -->
			<div class="container py-3">
				<discord-button>Join our Discord now and contribute to the project!</discord-button>
			</div>
		</template>
	</hero-section>
	<div class="container">
		<h2 class="title mb-4 text-center">Our Projects</h2>
		<div class="basic-grid project-reel">
			<!-- project data and props have the same key names so we can assign to v-bind directly -->
			<project-card v-for="project in projects" :key="project.name" v-bind="project">
				<template #btns>
					<chevron-link
						v-for="{ text, to } in project.buttons"
						:key="text"
						:to
						:text
						class="btn block btn-secondary my-1"
						:aria-label="text === 'See More' ? project.name : text"
					/>
				</template>
			</project-card>
		</div>

		<hr />

		<h2 class="title text-center">Add-ons</h2>
		<div class="basic-grid addon-reel">
			<template v-if="!addons.length">
				<div v-for="i in ADDON_REEL_LENGTH - 1" :key="i" class="card">
					<v-skeleton-loader type="image, subtitle" theme="dark" />
				</div>
			</template>
			<template v-else>
				<addon-card v-for="addon in addons" :key="addon.id" :addon minimal />
			</template>
			<base-card to="/addons" image="/image/addons/see_more.png">
				<template #title>
					<chevron-link aria-label="Go to add-on page">See More</chevron-link>
				</template>
			</base-card>
		</div>

		<hr />

		<h2 class="title text-center">News</h2>
		<div class="res-grid-3">
			<template v-if="!topPosts.length">
				<div v-for="i in 6" :key="i" class="card pb-3">
					<v-skeleton-loader type="image, subtitle, text" theme="dark" />
				</div>
			</template>
			<template v-else>
				<post-card
					v-for="{ id, permalink, header_img, title, date } in topPosts"
					:key="id"
					:to="permalink"
					:image="header_img"
					:title
					:date
				/>
			</template>
		</div>
		<br />
		<nuxt-link class="btn btn-secondary news-button center" to="/news" aria-label="Go to news page">
			See More
		</nuxt-link>
	</div>
</template>

<script>
import ProjectCard from "~/components/home/project-card.vue";
import PostCard from "~/components/lib/post-card.vue";
import AddonCard from "~/components/addons/addon-card.vue";
import DiscordButton from "~/components/lib/discord-button.vue";
import ChevronLink from "~/components/lib/chevron-link.vue";
import HeroSection from "~/components/lib/hero-section.vue";
import BaseCard from "~/components/lib/base-card.vue";

const PROJECTS = [
	{
		name: "Faithful 32x",
		background: "/image/posters/f32.jpg",
		logo: "https://database.faithfulpack.net/images/branding/logos/transparent/hd/f32_logo.png",
		description: "Double the resolution and double the fun!",
		to: "/faithful32x",
	},
	{
		name: "Faithful 64x",
		background: "/image/posters/f64.jpg",
		logo: "https://database.faithfulpack.net/images/branding/logos/transparent/hd/f64_logo.png",
		description: "An even more detailed experience!",
		to: "/faithful64x",
	},
	{
		name: "Classic Faithful 32x",
		background: "/image/posters/cf32.jpg",
		logo: "https://database.faithfulpack.net/images/branding/logos/transparent/hd/cf32_logo.png",
		description: "For when you need that nostalgic hit!",
		to: "/classic32x",
	},
	{
		name: "Classic Faithful 64x",
		background: "/image/posters/cf64.jpg",
		logo: "https://database.faithfulpack.net/images/branding/logos/transparent/hd/cf64_logo.png",
		description: "Both nostalgia and detail in equal amounts!",
		to: "/classic64x",
	},
];
const ADDON_REEL_LENGTH = 4;

export default defineNuxtComponent({
	components: {
		HeroSection,
		ProjectCard,
		BaseCard,
		PostCard,
		AddonCard,
		DiscordButton,
		ChevronLink,
	},
	// for some reason <script setup> doesn't work with asyncData (???)
	setup() {
		definePageMeta({
			// index by default
			name: "Home",
			layout: "no-container",
		});
	},
	data() {
		return {
			projects: PROJECTS,
			ADDON_REEL_LENGTH,
			addons: [],
			topPosts: [],
		};
	},
	methods: {
		async loadAddons() {
			const { apiURL } = useRuntimeConfig().public;
			const allAddons = await $fetch(`${apiURL}/addons/approved`);
			this.addons = Array.from(
				// subtract one for "see more" card
				{ length: ADDON_REEL_LENGTH - 1 },
				() => allAddons.splice((Math.random() * allAddons.length) | 0, 1)[0],
			);
		},
		async loadPosts() {
			const { apiURL } = useRuntimeConfig().public;
			this.topPosts = await $fetch(`${apiURL}/posts/top`);
		},
	},
	created() {
		this.loadAddons();
		this.loadPosts();
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;

.project-reel,
.addon-reel {
	grid-template-columns: repeat(4, 1fr);
}

@media screen and (max-width: $breakpoint-lg) {
	.project-reel {
		grid-template-columns: repeat(2, 2fr);
	}
}

@media screen and (max-width: $breakpoint-md) {
	.addon-reel {
		grid-template-columns: repeat(2, 2fr);
	}
}

@media screen and (max-width: $breakpoint-xs) {
	.project-reel {
		grid-template-columns: 1fr;
	}
}

.news-button {
	width: 50%;
}
</style>
