<template>
	<img
		v-for="{ id, name, banner } in packs"
		:key="id"
		class="download-preview"
		:class="getClass(id)"
		:src="banner"
		:alt="`${name} Background`"
	/>

	<img
		v-for="{ id, name, logo } in packs"
		:key="id"
		class="download-preview download-logo"
		:class="getClass(id)"
		:src="logo"
		:alt="`${name} Logo`"
	/>
</template>

<script>
export default defineNuxtComponent({
	name: "pack-preview",
	props: {
		packs: {
			type: Array,
			required: true,
		},
		hoverPack: {
			type: String,
			required: true,
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	methods: {
		getClass(packId) {
			if (packId === this.hoverPack && this.disabled) return "disabled";
			if (packId === this.hoverPack) return "show";
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables.scss" as *;

// use absolute to stack the images on top of each other
.download-preview {
	opacity: 0;
	position: absolute;
	left: 0;
	right: 0;
	height: 100%;
	transition: $transition-zoom;
	filter: brightness(0.6) saturate(1.1);
}

.download-preview.show {
	opacity: 1;
}

.download-preview.disabled {
	opacity: 0;
}

.download-logo {
	height: 75%;
	margin: auto;
	filter: drop-shadow($shadow-image);
	transition: $transition-button;
}
</style>
