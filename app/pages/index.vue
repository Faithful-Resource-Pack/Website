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
			<addon-card v-for="addon in addons" :key="addon.id" :addon minimal />
			<base-card to="/addons" image="/image/addons/see_more.png">
				<template #title>
					<chevron-link aria-label="Go to add-on page">See More</chevron-link>
				</template>
			</base-card>
		</div>

		<hr />

		<h2 class="title text-center">News</h2>
		<div class="res-grid-3">
			<post-card
				v-for="{ id, permalink, header_img, title, date } in topPosts"
				:key="id"
				:to="permalink"
				:image="header_img"
				:title
				:date
			/>
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
	async asyncData() {
		const { apiURL } = useRuntimeConfig().public;
		try {
			const [allAddons, topPosts] = await Promise.all([
				$fetch(`${apiURL}/addons/approved`),
				$fetch(`${apiURL}/posts/top?count=6`),
			]);

			return {
				addons: Array.from(
					// subtract one for "see more" card
					{ length: ADDON_REEL_LENGTH - 1 },
					() => allAddons.splice((Math.random() * allAddons.length) | 0, 1)[0],
				),
				topPosts,
			};
		} catch {
			return {
				addons: [],
				topPosts: [],
			};
		}
	},
	data() {
		return {
			projects: PROJECTS,
		};
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;

.addon-reel {
	grid-template-columns: repeat(4, 1fr);
}

@media screen and (max-width: $breakpoint-md) {
	.addon-reel {
		grid-template-columns: repeat(2, 1fr);
	}
}

.news-button {
	width: 50%;
}
</style>
