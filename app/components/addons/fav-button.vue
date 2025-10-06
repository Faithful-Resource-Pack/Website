<template>
	<v-btn
		class="fav-button pa-0"
		variant="plain"
		:icon="favIcon"
		:color="favColor"
		:aria-label="favAlt"
		@click="$emit('toggleFav')"
	/>
</template>

<script>
export default {
	name: "fav-icon",
	props: {
		favorite: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	emits: ["toggleFav"],
	computed: {
		favColor() {
			return this.favorite ? "#FAA619" : "#FFFFFFAA";
		},
		favIcon() {
			return this.favorite ? "mdi-star" : "mdi-star-outline";
		},
		favAlt() {
			// icon buttons don't have accessible names
			return this.favorite ? "Remove from Favorites" : "Add to Favorites";
		},
	},
};
</script>

<style scoped lang="scss">
@use "~/assets/css/lib/variables" as *;

.fav-button {
	position: absolute;
	// compensate for intrinsic padding
	top: calc(#{$primary-padding} - 16px);
	left: calc(#{$primary-padding} - 16px);
	opacity: 1 !important;
	filter: drop-shadow(0 0 5px rgba(black, 0.5));
}
</style>
