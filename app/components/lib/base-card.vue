<template>
	<!-- formatting styles for the actual card background/padding etc -->
	<div class="card zoom-hitbox zoom-affected">
		<!-- put layout styles on link to affect its children correctly -->
		<nuxt-link :to class="d-flex flex-column">
			<slot name="image">
				<img class="card-image" :src="image" :alt loading="lazy" />
			</slot>
			<div class="card-body">
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
