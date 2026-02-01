<template>
	<h1 class="title my-5 text-center">Faithful News</h1>

	<div v-if="!posts.length" class="d-flex flex-column align-center justify-center">
		<v-progress-circular indeterminate :size="150" :width="7" />
		<p class="h5">Loading Posts...</p>
	</div>
	<div v-else class="basic-grid top-news pb-5">
		<nuxt-link class="card zoom-hitbox" :to="firstPost.permalink" aria-label="Latest post">
			<img
				class="zoom-affected"
				:src="
					firstPost.header_img ||
					'https://database.faithfulpack.net/images/website/posts/placeholder.jpg'
				"
				alt="Latest post's header image"
				loading="lazy"
			/>
		</nuxt-link>
		<div class="flex-down">
			<nuxt-link :to="firstPost.permalink" class="underline-hover">
				<h2 class="h1">{{ firstPost.title }}</h2>
			</nuxt-link>
			<p class="news-preview">
				{{ compileMarkdown(firstPost.description, true) }}
			</p>
			<nuxt-link
				class="btn block btn-secondary mt-5"
				:to="firstPost.permalink"
				aria-label="Go to full post"
			>
				Read More
			</nuxt-link>
		</div>
	</div>

	<hr />

	<div class="res-grid-3">
		<!-- no need for alt text as the images are decorative (the title is enough) -->
		<post-card
			v-for="{ id, permalink, header_img, title, date } in restPosts"
			:key="id"
			:to="permalink"
			:image="header_img"
			:title
			:date
		/>
	</div>
</template>

<script>
import PostCard from "~/components/lib/post-card.vue";

export default defineNuxtComponent({
	components: {
		PostCard,
	},
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
			return this.posts.slice(1);
		},
	},
	created() {
		this.loadPosts();
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;

.top-news {
	grid-template-columns: 1fr;
}

@media screen and (min-width: $breakpoint-sm) {
	.top-news {
		grid-template-columns: repeat(2, 2fr);
	}
}

* {
	// must use regular css variable (scss inlines variables when compiled)
	--news-display-height: 5;
	@media screen and (max-width: $breakpoint-xl) {
		--news-display-height: 3;
	}
	@media screen and (max-width: $breakpoint-md) {
		--news-display-height: 1;
	}
	@media screen and (max-width: $breakpoint-sm) {
		--news-display-height: 4;
	}
}

// https://css-tricks.com/line-clampin/
.news-preview {
	display: -webkit-box;
	height: calc(1.5 * var(--news-display-height));
	overflow: hidden;
	line-clamp: var(--news-display-height);
	-webkit-line-clamp: var(--news-display-height);
	-webkit-box-orient: vertical;
}
</style>
