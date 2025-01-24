<template>
	<h1 class="title my-5 text-center">Faithful News</h1>

	<h2 v-if="!posts.length" class="text-center">
		{{ error ? `Error: ${error}` : "No posts found" }}
	</h2>
	<div v-else class="news-grid pb-5">
		<nuxt-link class="card img-card" :to="firstPost.permalink">
			<img
				:src="
					firstPost.header_img ||
					'https://database.faithfulpack.net/images/website/posts/placeholder.jpg'
				"
				loading="lazy"
			/>
		</nuxt-link>
		<div class="flex-down">
			<nuxt-link :to="firstPost.permalink" class="underline-hover">
				<h2 class="h1">{{ firstPost.title }}</h2>
			</nuxt-link>
			<p class="news-preview">
				{{ compiledMarkdown(firstPost.description) }}
			</p>
			<nuxt-link class="btn block btn-dark mt-5" :to="firstPost.permalink">Read More</nuxt-link>
		</div>
	</div>

	<hr />

	<div class="res-grid-3">
		<article-card
			v-for="post in restPosts"
			:key="post.id"
			:to="post.permalink"
			:image="post.header_img"
			:title="post.title"
		/>
	</div>
</template>

<script>
import ArticleCard from "~/components/lib/article-card.vue";
import DOMPurify from "isomorphic-dompurify";
import removeMd from "remove-markdown";

export default defineNuxtComponent({
	components: {
		ArticleCard,
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
	methods: {
		compiledMarkdown(text) {
			return DOMPurify.sanitize(removeMd(text));
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
