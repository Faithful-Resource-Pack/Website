<template>
	<div
		v-for="{ id, label } in packs"
		:id="getId(id)"
		:key="id"
		class="full-container d-flex align-center"
	>
		<img
			class="preview"
			:src="`https://database.faithfulpack.net/images/branding/logos/transparent/hd/${id}_logo.png`"
			:alt="`${label} Logo`"
		/>
	</div>
</template>

<script>
export default defineNuxtComponent({
	name: "logo-preview",
	props: {
		packs: {
			type: Array,
			required: true,
		},
		selectedPack: {
			type: String,
			required: true,
		},
		hoverPack: {
			type: String,
			default: undefined,
		},
	},
	methods: {
		getId(id) {
			if (this.hoverPack === id) {
				return "shown";
			} else if (this.hoverPack === undefined && this.selectedPack === id) {
				return "shown";
			}
			return "";
		},
	},
	computed: {
		selectedLabel() {
			return this.packs.find((p) => p.id === this.selectedPack).label;
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables.scss" as *;
// use absolute to stack the images on top of each other
.preview {
	height: 75%;
	margin: auto;
	filter: drop-shadow($shadow-image);
}

.full-container {
	height: 100%;
	width: 100%;
	position: absolute;
	opacity: 0;
	transition: $transition-button;
}

#shown {
	opacity: 1;
}
</style>
