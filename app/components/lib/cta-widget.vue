<template>
	<div class="my-5">
		<h2 class="text-center">{{ title }}</h2>
		<a class="btn btn-secondary btn-more" :href target="_blank" rel="noopener noreferrer">
			{{ btn }}
		</a>
	</div>
</template>

<script>
export default defineNuxtComponent({
	name: "cta-widget",
	props: {
		href: {
			type: String,
			required: false,
			default: "https://discord.gg/sN9YRQbBv7",
		},
		title: {
			type: String,
			required: false,
			default: "",
		},
		btn: {
			type: String,
			required: false,
			default: "Start a discussion on our Discord server",
		},
	},
});
</script>
