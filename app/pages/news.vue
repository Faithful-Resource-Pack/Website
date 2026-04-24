<template>
	<h1 class="title my-5 text-center">Faithful News</h1>

	<div v-if="!posts.length" class="card top-news">
		<v-skeleton-loader type="image" :theme />
		<div class="card-body d-flex flex-column">
			<v-skeleton-loader type="article" :theme />
		</div>
	</div>
	<nuxt-link v-else class="card top-news" :to="firstPost.permalink">
		<img
			:src="
				firstPost.header_img ||
				'https://database.faithfulpack.net/images/website/posts/placeholder.jpg'
			"
			alt="Latest post's header image"
			loading="lazy"
		/>
		<div class="card-body body-text d-flex flex-column">
			<h2 class="news-title">{{ firstPost.title }}</h2>
			<p class="news-preview">
				{{ compileMarkdown(firstPost.description, true) }}
			</p>
			<span class="mt-auto h5">{{ exactDate(firstPost.date) }}</span>
		</div>
	</nuxt-link>

	<hr />

	<div v-if="!posts.length" class="res-grid-3">
		<div v-for="i in 5" :key="i" class="card">
			<v-skeleton-loader type="image, subtitle, text" :theme class="pb-3" />
		</div>
	</div>
	<div v-else>
		<div v-for="([year, yearPosts], i) in restPosts" :key="year">
			<h2 v-if="i !== 0" class="subtitle mb-2">{{ year }}</h2>
			<div class="res-grid-3 mb-7">
				<!-- no need for alt text as the images are decorative (the title is enough) -->
				<post-card
					v-for="{ id, permalink, header_img, title, date } in yearPosts"
					:key="id"
					:to="permalink"
					:image="header_img"
					:title
					:date
				/>
			</div>
		</div>
	</div>
</template>

<script>
import PostCard from "~/components/lib/post-card.vue";

export default defineNuxtComponent({
	components: {
		PostCard,
	},
	inject: ["theme"],
	data() {
		return { posts: [] };
	},
	methods: {
		async loadPosts() {
			const { apiURL } = useRuntimeConfig().public;
			const posts = await $fetch(`${apiURL}/posts/approved`);
			this.posts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
		},
	},
	computed: {
		firstPost() {
			return this.posts[0];
		},
		restPosts() {
			if (!this.posts) return [];
			return Object.entries(
				this.posts.slice(1).reduce((acc, cur) => {
					const year = new Date(cur.date).getFullYear();
					acc[year] ||= [];
					acc[year].push(cur);
					return acc;
				}, {}),
			).sort((a, b) => b[0] - a[0]);
		},
	},
	created() {
		this.loadPosts();
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;

$news-display-height: 3;

// don't add a gap because card-body comes with padding already
.top-news {
	display: grid;
	grid-template-columns: 1fr;
}

@media screen and (min-width: $breakpoint-sm) {
	.top-news {
		grid-template-columns: repeat(2, 2fr);
	}
}

.top-news:hover .news-title {
	text-decoration: underline;
}

// https://css-tricks.com/line-clampin/
.news-preview {
	display: -webkit-box;
	height: calc(1.5 * $news-display-height);
	overflow: hidden;
	line-clamp: $news-display-height;
	-webkit-line-clamp: $news-display-height;
	-webkit-box-orient: vertical;
}

* {
	// hide before wrapping
	@media screen and (max-width: $breakpoint-md) {
		.news-preview {
			display: none;
		}
	}

	@media screen and (max-width: $breakpoint-sm) {
		.news-preview {
			display: -webkit-box;
		}
	}
}
</style>
