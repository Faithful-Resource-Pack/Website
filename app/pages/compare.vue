<template>
	<v-row no-gutters>
		<v-col cols="12" md="9" ref="reel">
			<img-comparison-slider>
				<!-- for some reason left and right are flipped -->
				<img slot="before" :src="rightImg" class="header-img" />
				<img slot="after" :src="leftImg" class="header-img" />
			</img-comparison-slider>
			<v-row no-gutters>
				<v-col cols="12" sm="6" class="px-5">
					<pack-selection v-model="leftPack" :packs />
				</v-col>
				<v-col cols="12" sm="6" class="px-5">
					<pack-selection v-model="rightPack" :packs />
				</v-col>
			</v-row>
		</v-col>
		<v-col cols="12" md="3" class="px-5 pt-3">
			<h2 class="text-center">Choose Image</h2>
			<div class="image-reel mb-5">
				<div
					v-for="(src, i) in TMP_IMAGES" :key="src"
					class="selection-container"
					:class="selectedImage === src ? 'selected-image' : 'unselected-image'"
				>
					<img :src @click="select(i)" />
				</div>
			</div>
		</v-col>
	</v-row>
</template>

<script>
import { ImgComparisonSlider } from "@img-comparison-slider/vue";
import PackSelection from "~/components/compare/pack-selection.vue";

export default defineNuxtComponent({
	components: {
		PackSelection,
		ImgComparisonSlider,
	},
	setup() {
		definePageMeta({
			layout: "no-container",
		});
	},
	async asyncData() {
		const { apiURL } = useRuntimeConfig().public;
		try {
			const packs = await $fetch(`${apiURL}/packs/raw`);
			// TODO: remove this when supported
			delete packs.classic_faithful_64x_progart;
			return { packs };
		} catch {
			return { packs: {} };
		}
	},
	data() {
		return {
			leftPack: "default",
			rightPack: "faithful_32x",
			selectedImage: "/image/compare/faithful_32x.jpg",
			reelHeight: "auto",
		};
	},
	methods: {
		select(i) {
			this.selectedImage = this.TMP_IMAGES[i];
		},
	},
	computed: {
		leftImg() {
			return `/image/compare/${this.leftPack}.jpg`;
		},
		rightImg() {
			return `/image/compare/${this.rightPack}.jpg`;
		},
		TMP_IMAGES() {
			return Object.values(this.packs).map((p) => `/image/compare/${p.id}.jpg`).slice(0, 5);
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;

.image-reel {
	display: flex;
	flex-flow: column nowrap;
	overflow: auto;
	gap: 20px;
	> * {
		flex: 0 0 auto;
	}
}

@media screen and (max-width: 960px) {
	.image-reel {
		flex-flow: row nowrap;
	}
	.selection-container {
		// otherwise they fill the screen
		max-width: 400px;
	}
}

.selection-container {
	overflow: hidden;
	border-radius: $border-radius;
	box-shadow: $shadow-sheet;
}

.selected-image {
	outline: 0.5rem solid #76c945;
	outline-offset: -0.5rem;
}

.unselected-image * {
	filter: grayscale(100%);
	transition: all 0.5s ease;
}
</style>
