<template>
	<img
		v-for="{ id } in packs"
		:key="id"
		class="download-preview"
		:class="getClass(id)"
		:src="`/image/banners/${id}.jpg`"
	/>

	<img
		v-for="{ id } in packs"
		:key="id"
		class="download-preview download-logo"
		:class="getClass(id)"
		:src="`https://database.faithfulpack.net/images/branding/logos/transparent/hd/${id}_logo.png`"
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
		getClass(id) {
			if (id === this.hoverPack && this.disabled) return "disabled";
			if (id === this.hoverPack) return "show";
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
