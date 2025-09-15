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
			default: "80px",
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
@use "~/assets/css/lib/variables" as *;

.hero-container {
	display: block;
	background-size: cover;
	background-position: center;
	box-shadow: $primary-shadow;
}

.hero-tagline {
	color: white;
	text-shadow: $secondary-text 0px 4px 10px;
}

.hero-wordmark {
	margin-top: 50px;
	margin-bottom: 25px;
	filter: drop-shadow($wordmark-shadow);
	width: 475px;
	max-width: 100%;
}
</style>
