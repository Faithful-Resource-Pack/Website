<template>
	<v-btn
		class="fav-button pa-0"
		:class="{ 'fav-button-favorited': favorite }"
		icon
		position="absolute"
		variant="text"
		:color="favColor"
		:aria-label="favAlt"
		@click="$emit('click')"
	>
		<v-icon :icon="favIcon" size="large" />
	</v-btn>
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
	emits: ["click"],
	computed: {
		favColor() {
			// CC is 80% opacity in hex
			return this.favorite ? "#FAA619" : "#FFFFFFCC";
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
@use "~/assets/css/variables" as *;

.fav-button {
	position: absolute;
	top: 0;
	left: 0;
	filter: drop-shadow(0 0 2px rgba(black, 80%));
	transition: $transition-button;
}

.fav-button:hover {
	color: #faa619 !important;
	opacity: 100%;
}

.fav-button-favorited {
	filter: unset;
}
</style>
