<template>
	<img
		v-if="selectedPack"
		id="selected"
		class="banner-preview"
		:src="`/image/banners/${selectedPack}.jpg`"
		:alt="`${selectedLabel} Background`"
	/>
	<img
		v-for="{ id, label } in packs"
		:id="getId(id)"
		:key="id"
		class="banner-preview"
		:src="`/image/banners/${id}.jpg`"
		:alt="`${label} Background`"
	/>
</template>

<script>
export default defineNuxtComponent({
	name: "banner-preview",
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
			if (id === this.hoverPack) return "hovered";
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
.banner-preview {
	opacity: 0;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	transition: $transition-zoom;
	filter: brightness(0.6) saturate(1.1);
	opacity: 0;
}

#hovered,
#selected {
	opacity: 1;
}
</style>
