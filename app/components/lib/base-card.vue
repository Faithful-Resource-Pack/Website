<template>
	<div class="card zoom-hitbox zoom-affected">
		<nuxt-link class="base-card" :to>
			<slot name="image">
				<img class="base-card-image" :src="image" :alt loading="lazy" />
			</slot>
			<div class="base-card-body">
				<h3 v-if="$slots.title" class="h4 mb-1" :style="titleStyles">
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
@use "~/assets/css/variables" as *;

.base-card {
	display: flex;
	flex-flow: column nowrap;

	position: relative;
	height: 100%;
	&:hover {
		cursor: pointer;
	}
}
.base-card-body {
	flex-grow: 1;
	height: auto;
	display: flex;
	flex-flow: column nowrap;
	margin: $padding-card;
}

.base-card-image {
	position: relative;
	width: 100%;
	height: auto;
	aspect-ratio: 16 / 9;
}
</style>
