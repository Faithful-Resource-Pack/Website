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
		<h2 class="title mb-4 text-center">Projects</h2>
		<div class="res-grid-2">
			<!-- project data and props have the same key names so we can assign to v-bind directly -->
			<project-card v-for="project in projects" :key="project.name" v-bind="project">
				<template #btns>
					<div class="button-row">
						<chevron-link
							v-for="{ text, to } in project.buttons"
							:key="text"
							:to
							:text
							class="btn block btn-dark"
							:aria-label="text === 'See More' ? project.name : text"
						/>
					</div>
				</template>
			</project-card>
		</div>

		<hr />

		<h2 class="title text-center">Add-ons</h2>
		<div class="res-grid-4">
			<addon-card v-for="addon in addons" :key="addon.id" :addon minimal />
			<post-card to="/addons" image="/image/addons/see_more.png">
				<template #title>
					<chevron-link aria-label="Go to add-on page">See More</chevron-link>
				</template>
			</post-card>
		</div>

		<hr />

		<h2 class="title text-center">News</h2>
		<div class="res-grid-3">
			<post-card
				v-for="{ id, permalink, header_img, title } in topPosts"
				:key="id"
				:to="permalink"
				:image="header_img"
				:title
			/>
		</div>
		<br />
		<nuxt-link class="btn btn-dark news-button center" to="/news" aria-label="Go to news page">
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

const PROJECTS = [
	{
		name: "Faithful 32x",
		background: "/image/posters/f32.jpg",
		wordmark: "/image/wordmarks/f32.png",
		description:
			"The original Minecraft texture feel, with double the resolution and double the fun!",
		buttons: [
			{
				text: "See More",
				to: "/faithful32x",
			},
		],
	},
	{
		name: "Faithful 64x",
		background: "/image/posters/f64.jpg",
		wordmark: "/image/wordmarks/f64.png",
		description: "An even more detailed experience with quadruple-resolution textures!",
		buttons: [
			{
				text: "See More",
				to: "/faithful64x",
			},
		],
	},
	{
		name: "Classic Faithful 32x",
		background: "/image/posters/cf32.jpg",
		wordmark: "/image/wordmarks/cf32.png",
		description: "The older yet refreshed look of Faithful, for when you need that nostalgic hit!",
		buttons: [
			{
				text: "Original Textures",
				to: "/classic32x",
			},
			{
				text: "Modern Textures (Jappa)",
				to: "/classic32x-jappa",
			},
		],
	},
	{
		name: "Classic Faithful 64x",
		background: "/image/posters/cf64.jpg",
		wordmark: "/image/wordmarks/cf64.png",
		description:
			"The traditional Faithful style with fully refreshed and ultra high-resolution textures!",
		buttons: [
			{
				text: "Original Textures",
				to: "/classic64x",
			},
			{
				text: "Modern Textures (Jappa)",
				to: "/classic64x-jappa",
			},
		],
	},
];
const ADDON_REEL_LENGTH = 4;

export default defineNuxtComponent({
	components: {
		HeroSection,
		ProjectCard,
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
.news-button {
	width: 50%;
}
</style>
