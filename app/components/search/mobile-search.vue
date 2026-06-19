<template>
	<v-overlay v-model="barOpened" attach=".site-container">
		<div class="mobile-search-bar accent-textured mb-5">
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
			barOpened: false,
		};
	},
	methods: {
		closeBar() {
			this.barOpened = false;
		},
	},
	watch: {
		modelValue(n) {
			this.barOpened = n;
			this.search = "";
		},
		modalOpened(n) {
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
	height: 100vh;
	padding: $padding-card;
	padding-top: 0.5rem;
	// ideally the search would be sticky but this is less janky
	overflow: hidden auto;
	border-radius: 0 0 $border-radius $border-radius;
}
</style>
