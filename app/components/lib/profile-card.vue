<template>
	<div class="profile-card">
		<img class="profile-avatar" :src :alt />
		<!-- need div to treat as one unit -->
		<div><slot /></div>
	</div>
</template>

<script>
export default defineNuxtComponent({
	name: "profile-card",
	props: {
		src: {
			type: String,
			required: true,
		},
		alt: {
			type: String,
			required: false,
			default: undefined,
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;

.profile-card {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: flex-start;
	gap: 1ch;
	margin-top: 1ch;
	overflow-wrap: anywhere;
}

.profile-avatar {
	image-rendering: pixelated;
	height: 48px;
	box-shadow: $shadow-sheet;
}
</style>
