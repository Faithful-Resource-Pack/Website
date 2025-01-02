<template>
	<h1 class="title my-5 text-center">Faithful News</h1>

	<h2 v-if="loading" class="text-center">Loading…</h2>
	<h2 v-else-if="!posts.length" class="text-center">
		{{ error ? `Error: ${error}` : "No posts found" }}
	</h2>
	<div v-else class="news-grid pb-5">
		<a class="card img-card" :href="firstPost.permalink">
			<img
				:src="
					firstPost.header_img ||
					'https://database.faithfulpack.net/images/website/posts/placeholder.jpg'
				"
				loading="lazy"
			/>
		</a>
		<div class="flex-down">
			<a :href="firstPost.permalink" class="underline-hover">
				<h2 class="h1">{{ firstPost.title }}</h2>
			</a>
			<p class="text-truncate" v-html="firstPost.description" />
			<a class="btn block btn-dark" :href="firstPost.permalink">Read More</a>
		</div>
	</div>

	<hr />

	<div class="res-grid-3">
		<article-card
			v-for="post in restPosts"
			:key="post.id"
			:href="post.permalink"
			:image="post.header_img"
			:title="post.title"
		/>
	</div>
</template>

<script>
import ArticleCard from "~/components/lib/article-card.vue";

export default {
	components: {
		ArticleCard,
	},
	data() {
		return {
			posts: [],
			loading: true,
			error: null,
		};
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
		fetch("https://api.faithfulpack.net/v2/posts/approved")
			.then((res) => res.json())
			.then((res) => {
				this.posts = Object.values(res).sort((a, b) => new Date(b.date) - new Date(a.date));
			})
			.catch((err) => {
				this.error = err;
				this.posts = [];
				console.error(err);
			})
			.finally(() => {
				this.loading = false;
			});
	},
};
</script>
