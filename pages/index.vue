<template>
	<div class="hero-container text-center">
		<!-- this was the least stupid way to add some padding at the top -->
		<div class="hero-upspace" />
		<img class="hero-wordmark" src="/image/wordmarks/faithful.png" alt="Faithful Wordmark" />
		<h2 class="hero-tagline">Providing a higher-resolution Minecraft experience since 2010.</h2>
		<!-- hack to get the button the same width as the container -->
		<div class="container py-3">
			<discord-button>Join our Discord now and contribute to the project!</discord-button>
		</div>
	</div>
	<div class="container">
		<h2 class="title mb-4 text-center">Projects</h2>
		<div class="res-grid-2">
			<!-- TODO: refactor buttons, use v-for with data -->
			<project-card
				name="Faithful 32x"
				background="/image/posters/f32.jpg"
				wordmark="/image/wordmarks/f32.png"
				description="The original Minecraft texture feel, with double the resolution and double the fun!"
			>
				<template #btns>
					<nuxt-link class="btn block btn-dark" to="/faithful32x">
						See More <v-icon size="small" icon="mdi-chevron-right" />
					</nuxt-link>
				</template>
			</project-card>
			<project-card
				name="Faithful 64x"
				background="/image/posters/f64.jpg"
				wordmark="/image/wordmarks/f64.png"
				description="An even more detailed experience with quadruple-resolution textures!"
			>
				<template #btns>
					<nuxt-link class="btn block btn-dark" to="/faithful64x">
						See More <v-icon size="small" icon="mdi-chevron-right" />
					</nuxt-link>
				</template>
			</project-card>
		</div>

		<br />

		<div class="res-grid-2">
			<project-card
				name="Classic Faithful 32x"
				background="/image/posters/cf32.jpg"
				wordmark="/image/wordmarks/cf32.png"
				description="The older yet refreshed look of Faithful, for when you need that nostalgic hit!"
			>
				<template #btns>
					<div class="button-row">
						<nuxt-link class="btn btn-dark" to="/classic32x">
							Original Textures <v-icon size="small" icon="mdi-chevron-right" />
						</nuxt-link>
						<nuxt-link class="btn btn-dark" to="/classic32x-jappa">
							Modern Textures (Jappa) <v-icon size="small" icon="mdi-chevron-right" />
						</nuxt-link>
					</div>
				</template>
			</project-card>
			<project-card
				name="Classic Faithful 64x"
				background="/image/posters/cf64.jpg"
				wordmark="/image/wordmarks/cf64.png"
				description="The traditional Faithful style with fully refreshed and ultra high-resolution textures!"
			>
				<template #btns>
					<div class="button-row">
						<nuxt-link class="btn block btn-dark" to="/classic64x">
							Original Textures <v-icon size="small" icon="mdi-chevron-right" />
						</nuxt-link>
						<nuxt-link class="btn block btn-dark" to="/classic64x-jappa">
							Modern Textures (Jappa) <v-icon size="small" icon="mdi-chevron-right" />
						</nuxt-link>
					</div>
				</template>
			</project-card>
		</div>

		<hr />

		<h2 class="title text-center">Add-ons</h2>
		<div class="res-grid-4">
			<addon-card v-for="addon in addons" :key="addon.id" :addon minimal />
			<article-card to="/addons" image="/image/addons/see_more.png" title="See More" />
		</div>

		<hr />

		<h2 class="title text-center">News</h2>
		<div class="res-grid-3">
			<article-card
				v-for="{ id, permalink, header_img, title } in topPosts"
				:key="id"
				:to="permalink"
				:image="header_img"
				:title
			/>
		</div>
		<br />
		<nuxt-link class="btn btn-dark news-button center" to="/news">See More</nuxt-link>
	</div>
</template>

<script>
import ProjectCard from "~/components/home/project-card.vue";
import ArticleCard from "~/components/lib/article-card.vue";
import AddonCard from "~/components/addons/addon-card.vue";
import DiscordButton from "~/components/lib/discord-button.vue";

const ADDON_REEL_LENGTH = 4;

export default defineNuxtComponent({
	components: {
		ProjectCard,
		ArticleCard,
		AddonCard,
		DiscordButton,
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
		} catch (err) {
			return {
				addons: [],
				topPosts: [],
			};
		}
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/lib/variables" as *;

.hero-container {
	display: block;
	background-image: url("/image/banners/hero.jpg");
	background-size: cover;
	background-position: center;
	box-shadow: $card-shadow;
}

.hero-upspace {
	height: 80px;
}

.hero-tagline {
	color: #fff;
	text-shadow: rgba(0, 0, 0, 0.75) 0px 4px 10px;
}

.hero-wordmark {
	margin-top: 50px;
	margin-bottom: 25px;
	filter: drop-shadow(0 0 10px #000);
	max-width: 100%;
}

.news-button {
	width: 50%;
}
</style>
