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
			<span class="text-truncate" v-html="compiledMarkdown(firstPost.description)" />
			<nuxt-link class="btn block btn-dark" :to="firstPost.permalink">Read More</nuxt-link>
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
import { marked } from "marked";

export default defineNuxtComponent({
	components: {
		ArticleCard,
	},
	async asyncData() {
		try {
			const posts = await $fetch("https://api.faithfulpack.net/v2/posts/approved");
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
			return DOMPurify.sanitize(marked.parse(text));
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
