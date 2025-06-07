<template>
	<div class="card">
		<nuxt-link class="post-card zoom-hitbox" :to>
			<img class="post-card-image zoom-affected" :src="image" :alt="alt || title" loading="lazy" />
			<div class="post-card-shadow" />
			<h3 class="post-card-title">
				<slot name="title">{{ title }}</slot>
			</h3>
			<slot name="linked" />
		</nuxt-link>
		<slot name="unlinked" />
	</div>
</template>
<script>
export default defineNuxtComponent({
	name: "post-card",
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
		// can use either prop or slot
		title: {
			type: String,
			required: false,
			default: "",
		},
		alt: {
			type: String,
			required: false,
			default: "",
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/lib/variables" as *;

.post-card {
	position: relative;
	height: 0;
	padding-top: 56.25%; // (9 / 16) * 100
	&:hover {
		cursor: pointer;
	}
}
.post-card-title {
	position: absolute;
	bottom: 0;
	// https://sass-lang.com/documentation/interpolation/
	// remove 6px from the bottom to compensate for the intrinsic font padding
	margin: calc(#{$card-padding} - 6px) $card-padding;
	color: #fff;
	font-size: 1.5rem;
	line-height: 1;
}

// this is such a stupid css class name when you think about it
.post-card-image,
.post-card-shadow {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.post-card-shadow {
	background: linear-gradient(transparent 60%, rgba(0, 0, 0, 0.5));
}
</style>
