<template>
	<nuxt-link :to class="card zoom-hitbox zoom-affected">
		<div class="project-image">
			<img class="project-background" :src="background" :alt="name" />
			<div class="project-shadow" />
			<img class="project-logo" :src="logo" :alt="`${name} logo`" />
		</div>
		<div class="card-body">
			<h2 class="h4 text-white">{{ name }}</h2>
			<p>{{ description }}</p>
		</div>
	</nuxt-link>
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
			required: true,
		},
		to: {
			type: String,
			required: true,
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/lib/variables" as *;

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
	background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
	transition: 0.5s all ease;
}

// turns out you can't override a background in css yet so this is the next best thing
.zoom-hitbox:hover .project-shadow {
	opacity: 0.3;
}
</style>
