<template>
	<v-overlay v-model="barOpen" attach=".site-container">
		<div class="mobile-search-bar accent-textured">
			<search-widget mobile @close="closeBar" />
		</div>
	</v-overlay>
</template>

<script>
import SearchWidget from "~/components/search/search-widget.vue";

export default defineNuxtComponent({
	name: "search-modal",
	components: {
		SearchWidget,
	},
	props: {
		modelValue: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["update:modelValue"],
	data() {
		return {
			barOpen: false,
		};
	},
	methods: {
		closeBar() {
			this.barOpen = false;
		},
	},
	watch: {
		modelValue(n) {
			this.barOpen = n;
			this.search = "";
		},
		modalOpen(n) {
			this.$emit("update:modelValue", n);
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables.scss" as *;

.mobile-search-overlay {
	z-index: 998;
	height: 100vh;
	width: 100vw;
	background: rgba(0, 0, 0, 0.5);
	position: absolute;
	top: 0;
}

.mobile-search-bar {
	position: absolute;
	top: 0;
	z-index: 999;
	width: 100vw;
	max-height: 100vh;
	padding: 0.5rem $padding-container $padding-container $padding-container;
	// ideally the search would be sticky but this is less janky
	overflow: hidden auto;
	border-radius: 0 0 $border-radius $border-radius;
}
</style>
