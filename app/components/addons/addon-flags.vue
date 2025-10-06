<template>
	<div class="addon-flags">
		<img
			v-if="options.tags.includes('Java')"
			:src="java"
			alt="Available for Java Edition"
			loading="lazy"
		/>
		<img
			v-if="options.tags.includes('Bedrock')"
			:src="bedrock"
			alt="Available for Bedrock Edition"
			loading="lazy"
		/>
		<img v-if="options.optifine" :src="optifine" alt="Requires OptiFine" loading="lazy" />
	</div>
</template>

<script>
export default {
	name: "addon-flags",
	props: {
		options: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			optifine: "/image/addons/optifine.png",
			bedrock: "/image/addons/bedrock.png",
			java: "/image/addons/java.png",
		};
	},
};
</script>

<style scoped lang="scss">
@use "~/assets/css/lib/variables" as *;

.addon-flags {
	display: flex;
	flex-direction: column;
	position: absolute;
	bottom: $primary-padding;
	right: $primary-padding;

	& > img {
		height: 32px;
		width: 32px;
		border-radius: $border-radius;
		margin-top: 5px;
	}
}
</style>
