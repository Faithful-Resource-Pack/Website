<script setup>
definePageMeta({
	name: "Home",
	layout: "no-container",
});
</script>

<template>
	<div class="hero-container text-center">
		<div class="hero-upspace"></div>
		<img class="hero-wordmark" src="/image/wordmarks/faithful.png" alt="Faithful Wordmark" />
		<h2 class="hero-tagline">Providing a higher-resolution experience since 2010.</h2>
		<!-- hack to get the button the same width as the container -->
		<div class="container py-3">
			<discord-button>Join our Discord now and contribute to the project!</discord-button>
		</div>
	</div>
	<div class="container" id="app">
		<h2 class="title mb-4 text-center">Projects</h2>
		<div class="res-grid-2">
			<project-card
				name="Faithful 32x"
				background="/image/posters/f32.jpg"
				wordmark="/image/wordmarks/f32.png"
				description="The original Minecraft texture feel, with double the resolution and double the fun!"
			>
				<template #btns>
					<a class="btn block btn-dark" href="/faithful32x">See More</a>
				</template>
			</project-card>
			<project-card
				name="Faithful 64x"
				background="/image/posters/f64.jpg"
				wordmark="/image/wordmarks/f64.png"
				description="An even more detailed experience with quadruple-resolution textures!"
			>
				<template #btns>
					<a class="btn block btn-dark" href="/faithful64x">See More</a>
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
						<a class="btn btn-dark" href="/classicfaithful/32x-programmer-art">Original Textures</a>
						<a class="btn btn-dark" href="/classicfaithful/32x-jappa">Modern Textures (Jappa)</a>
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
						<a class="btn block btn-dark disabled" href="/classicfaithful/64x-programmer-art"
							>Coming Soon...</a
						>
						<a class="btn block btn-dark" href="/classicfaithful/64x-jappa"
							>Modern Textures (Jappa)</a
						>
					</div>
				</template>
			</project-card>
		</div>
		<!--
		<br>
		<div class="res-grid-2">
			<project-card
				name="Faithful Add-ons"
				background="/image/posters/addons.jpg"
				wordmark="/image/wordmarks/addons.png"
				description="A plethora of modifications to all our base packs, ranging from redstone utilities to a rainbow XP bar!"
			>
				<template #btns>
					<a class="btn block btn-dark" href="/addons">Discover Add-ons</a>
				</template>
			</project-card>
			<project-card
				name="Faithful Mods"
				background="/image/posters/mods.jpg"
				wordmark="/image/wordmarks/mods.png"
				description="A massive catalog of mods and modpack support for retaining the Faithful feel however you choose to play!"
			>
				<template #btns>
					<div class="btn-group">
						<a class="btn block btn-dark" href="/mods">Mods</a>
						<a class="btn block btn-dark" href="/modpacks">Modpacks</a>
					</div>
				</template>
			</project-card>
		</div>
		-->

		<hr />

		<h2 class="title text-center">Add-ons</h2>
		<div class="res-grid-4">
			<addon-card v-for="addon in addons" :key="addon.id" :addon minimal />
			<article-card href="/addons" image="/image/addons/see_more.png" title="See More" />
		</div>

		<hr />

		<h2 class="title text-center">News</h2>
		<div class="res-grid-3">
			<article-card
				v-for="post in topPosts"
				:key="post.id"
				:href="post.permalink"
				:image="post.header_img"
				:title="post.title"
			/>
		</div>
		<br />
		<a class="btn btn-dark news-button center" href="/news"> See More </a>
	</div>
</template>

<script>
import ProjectCard from "~/components/home/project-card.vue";
import ArticleCard from "~/components/lib/article-card.vue";
import AddonCard from "~/components/addons/addon-card.vue";
import DiscordButton from "~/components/lib/discord-button.vue";

const MAX_ADDONS_SHOWN = 3;

export default defineNuxtComponent({
	components: {
		ProjectCard,
		ArticleCard,
		AddonCard,
		DiscordButton,
	},
	data() {
		return {
			addons: [],
			posts: [],
		};
	},
	computed: {
		topPosts() {
			if (!this.posts.length) return [];
			return this.posts.slice(0, 6);
		},
	},
	beforeMount() {
		fetch("https://api.faithfulpack.net/v2/addons/approved")
			.then((res) => res.json())
			.then((val) => {
				const res = [];

				let items = val;
				for (let i = 0; i < MAX_ADDONS_SHOWN; ++i) {
					// removes duplicate suggested add-ons
					// | 0 is a faster version of Math.floor
					const element = items.splice((Math.random() * items.length) | 0, 1)[0];
					res.push(element);
				}
				this.addons = res;
			})
			.catch((err) => {
				console.error(err);
				this.addons = [];
			});

		fetch("https://api.faithfulpack.net/v2/posts/approved")
			.then((res) => res.json())
			.then((res) => {
				this.posts = res.sort((a, b) => new Date(b.date) - new Date(a.date));
			})
			.catch((err) => console.error(err));
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/lib/variables" as *;

.hero-container {
	display: block;
	background-image: url(/image/banners/hero.jpg);
	background-size: cover;
	background-position: center;
	padding: 0 2rem 1px;
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
