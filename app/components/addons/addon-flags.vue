<template>
	<div class="addon-flags">
		<img
			v-if="options.tags.includes('Java')"
			:src="java"
			title="Available for Java Edition"
			loading="lazy"
			width="32"
			height="32"
		/>
		<img
			v-if="options.tags.includes('Bedrock')"
			:src="bedrock"
			title="Available for Bedrock Edition"
			loading="lazy"
			width="32"
			height="32"
		/>
		<img
			v-if="options.optifine"
			:src="optifine"
			title="Requires OptiFine"
			loading="lazy"
			width="32"
			height="32"
		/>
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
@use "~/assets/css/variables" as *;

.addon-flags {
	display: flex;
	flex-direction: column;
	position: absolute;
	bottom: $padding-container;
	right: $padding-container;

	& > img {
		border-radius: $border-radius;
		margin-top: 5px;
	}
}
</style>
