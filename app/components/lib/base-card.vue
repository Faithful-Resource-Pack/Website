<template>
	<div class="card zoom-hitbox zoom-affected">
		<nuxt-link class="post-card" :to>
			<img class="post-card-image" :src="image" :alt loading="lazy" />
			<div class="post-card-body">
				<h3 v-if="$slots.title" class="post-card-title" :style="titleStyles">
					<slot name="title" />
				</h3>
				<slot name="body" />
			</div>
		</nuxt-link>
		<slot name="unlinked" />
	</div>
</template>
<script>
export default defineNuxtComponent({
	name: "base-card",
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
		alt: {
			type: String,
			required: false,
			default: "",
		},
		titleStyles: {
			type: [Object, Array],
			required: false,
			default: () => ({}),
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/lib/variables" as *;

.post-card {
	display: flex;
	flex-flow: column nowrap;

	position: relative;
	height: 100%;
	&:hover {
		cursor: pointer;
	}
}
.post-card-body {
	flex-grow: 1;
	height: auto;
	display: flex;
	flex-flow: column nowrap;
	margin: $card-padding;
	line-height: 1;
}

.post-card-image {
	position: relative;
	width: 100%;
	height: auto;
	aspect-ratio: 16 / 9;
}

.post-card-title {
	color: white;
	font-size: 1.5rem;
	// makes gap between subtitle and title smaller
	margin-bottom: 0.25rem;
}
</style>
