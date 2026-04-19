<template>
	<screenshot-modal v-model:open="modalOpened" v-model="currentImageIndex" :sources />

	<div class="card mb-6">
		<div class="carousel-container">
			<!-- don't show arrows if there's only a header -->
			<v-carousel
				v-model="currentImageIndex"
				:show-arrows="sources.length > 1 ? 'hover' : false"
				hide-delimiters
				theme="dark"
				height="auto"
			>
				<v-carousel-item
					v-for="src in sources"
					:key="src"
					:src
					class="cursor-pointer"
					@click="openModal"
				/>
			</v-carousel>
			<button class="btn btn-secondary btn-icon btn-modal" @click="openModal">
				<v-icon icon="mdi-fullscreen" />
			</button>
		</div>
		<div v-if="sources.length > 1" class="reel-container">
			<!-- buttons make it tab-selectable -->
			<button v-for="(src, i) in sources" :key="src" class="flex-0-0" @click="selectImage(src)">
				<img
					:ref="`reel-${i}`"
					:src
					class="reel-image zoom-hitbox zoom-affected"
					:class="i === currentImageIndex ? 'selected' : 'deselected'"
				/>
			</button>
		</div>
	</div>
</template>

<script>
import ScreenshotModal from "./screenshot-modal.vue";

export default defineNuxtComponent({
	name: "screenshot-carousel",
	components: {
		ScreenshotModal,
	},
	props: {
		sources: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			modalOpened: false,
			currentImageIndex: 0,
		};
	},
	methods: {
		selectImage(url) {
			// for some reason vuetify tracks based on index rather than source
			const id = this.sources.indexOf(url);
			this.currentImageIndex = id;
		},
		openModal() {
			this.modalOpened = true;
		},
	},
	computed: {
		currentImage() {
			return this.sources[this.currentImageIndex];
		},
	},
	watch: {
		currentImageIndex(newValue) {
			// I have genuinely no idea why the ref is an array but this fixes it
			const img = this.$refs[`reel-${newValue}`]?.[0];
			if (img) img.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables.scss" as *;

.carousel-container {
	position: relative;
}

.btn-modal {
	position: absolute;
	top: $padding-card;
	right: $padding-card;
}

.reel-container {
	display: flex;
	flex-flow: row nowrap;
	overflow-x: auto;
	scrollbar-width: none;
	margin: $padding-card;
	gap: $padding-card;
}

.reel-image {
	border-radius: $border-radius;
	height: 64px;
	filter: brightness(0.5);
	transition: $transition-zoom;
}

.reel-image.selected {
	filter: none;
}

.reel-image.deselected:hover {
	filter: brightness(1.1);
}
</style>
