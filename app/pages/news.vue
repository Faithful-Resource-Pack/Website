<template>
	<h1 class="title my-5 text-center">Faithful News</h1>

	<p v-if="!posts.length" class="warning banner">
		{{ error ? `Error: ${error}` : "No posts found" }}
	</p>
	<div v-else class="top-news pb-5">
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
	async asyncData() {
		const { apiURL } = useRuntimeConfig().public;
		try {
			const posts = await $fetch(`${apiURL}/posts/approved`);
			return {
				posts: posts.sort((a, b) => new Date(b.date) - new Date(a.date)),
				error: null,
			};
		} catch (error) {
			return {
				posts: [],
				error,
			};
		}
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
});
</script>

<style scoped lang="scss">
* {
	// must use regular css variable (scss inlines variables when compiled)
	--news-display-height: 5;
	@media screen and (max-width: 1280px) {
		--news-display-height: 3;
	}
	@media screen and (max-width: 960px) {
		--news-display-height: 1;
	}
	@media screen and (max-width: 760px) {
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

.underline-hover {
	color: unset;
	&:hover {
		color: unset;
		text-decoration: underline;
		text-decoration-color: currentColor;
	}
}
</style>
