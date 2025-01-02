<template>
	<div class="card">
		<a class="img-card" :href>
			<img :src="image" :alt="alt || title" loading="lazy" />
			<div class="img-card-shadow" />
			<h3 v-if="title">{{ title }}</h3>
			<slot name="linked" />
		</a>
		<slot name="unlinked" />
	</div>
</template>
<script>
export default {
	name: "article-card",
	props: {
		href: {
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
};
</script>
