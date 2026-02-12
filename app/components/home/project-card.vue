<template>
	<!-- https://github.com/nuxt/nuxt/issues/13659 -->
	<component
		:is="to ? defineNuxtLink({}) : 'span'"
		:to
		class="card"
		:class="to && 'zoom-hitbox zoom-affected'"
	>
		<div class="project-image">
			<img class="project-background" :src="background" :alt="name" />
			<div class="project-shadow" />
			<img class="project-logo" :src="logo" :alt="`${name} logo`" />
		</div>
		<div class="card-body">
			<h2 class="h4">{{ name }}</h2>
			<p v-if="description">{{ description }}</p>
			<slot />
		</div>
	</component>
</template>

<script>
export default defineNuxtComponent({
	name: "project-card",
	props: {
		name: {
			type: String,
			required: true,
		},
		background: {
			type: String,
			required: true,
		},
		logo: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: false,
			default: undefined,
		},
		to: {
			type: String,
			required: false,
			default: undefined,
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;

.project-image {
	position: relative;
	display: inline;
}

// place logo on top of image
.project-logo {
	position: absolute;
	right: 0;
}

.project-background {
	width: 100%;
	aspect-ratio: 1;
}

.project-shadow {
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(transparent, rgba(black, 0.5));
	transition: 0.5s all ease;
}

// turns out you can't override a background in css yet so this is the next best thing
.zoom-hitbox:hover .project-shadow {
	opacity: 0.3;
}
</style>
