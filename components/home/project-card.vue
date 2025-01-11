<template>
	<div class="card project-card">
		<div class="project-image">
			<img class="project-background" :src="background" :alt="name" />
			<img class="project-wordmark" :src="wordmark" :alt="`${name} wordmark`" />
		</div>
		<div class="card-body">
			<div class="card-text auto-flex">
				<span class="my-2 text-center" style="min-height: 65px">
					{{ description }}
				</span>
				<br />
			</div>
			<slot name="btns" />
		</div>
	</div>
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
		wordmark: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
});
</script>

<style scoped lang="scss">
.project-image {
	position: relative;
	display: inline;
}

// place wordmark on top of image
.project-wordmark {
	position: absolute;
	top: 8%;
	right: 0;
	padding: 30px;
}

.project-background {
	width: 100%;
	// cap max height so it doesn't push all the way down
	max-height: 260px;
}
</style>
