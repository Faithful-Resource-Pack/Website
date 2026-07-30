<template>
	<div class="hero-container text-center" :style="{ backgroundImage }">
		<!-- this was the least stupid way to add some padding at the top -->
		<div :style="{ height: upspace }" />
		<div class="px-4">
			<h1 v-if="$slots.title" class="hero-tagline title text-center mt-5">
				<slot name="title" />
			</h1>
			<img v-if="wordmark" class="hero-wordmark" :src="wordmark" :alt="wordmarkAlt" />
			<h2 v-if="$slots.tagline" class="hero-tagline">
				<slot name="tagline" />
			</h2>
		</div>
		<slot name="actions" />
	</div>
</template>

<script>
export default defineNuxtComponent({
	name: "hero-section",
	props: {
		upspace: {
			type: String,
			required: false,
			default: "60px",
		},
		background: {
			type: String,
			required: false,
			default: null,
		},
		wordmark: {
			type: String,
			required: false,
			default: null,
		},
		wordmarkAlt: {
			type: String,
			required: false,
			default: null,
		},
	},
	computed: {
		backgroundImage() {
			return `url("${this.background}")`;
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;

.hero-container {
	display: block;
	background-size: cover;
	background-position: center;
	box-shadow: $shadow-card;
}

.hero-tagline {
	color: white;
	text-shadow: 2px 2px 5px rgba(black, 0.8);
}

.hero-wordmark {
	margin-top: 50px;
	margin-bottom: 25px;
	filter: drop-shadow($shadow-wordmark);
	// halfway between sm and md breakpoints
	width: 668px;
	max-width: 100%;
}
</style>
