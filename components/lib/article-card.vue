<template>
	<div class="card">
		<nuxt-link class="img-card" :to>
			<img :src="image" :alt="alt || title" loading="lazy" />
			<div class="img-card-shadow" />
			<h3 v-if="title">{{ title }}</h3>
			<slot name="linked" />
		</nuxt-link>
		<slot name="unlinked" />
	</div>
</template>
<script>
export default defineNuxtComponent({
	name: "article-card",
	props: {
		to: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: false,
			default: "https://database.faithfulpack.net/images/website/posts/placeholder.jpg",
		},
		title: {
			type: String,
			required: false,
		},
		alt: {
			type: String,
			required: false,
		},
	},
});
</script>
