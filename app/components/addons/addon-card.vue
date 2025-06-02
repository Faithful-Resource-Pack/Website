<template>
	<article-card
		:to="`/addons/${addon.slug}`"
		:image="`https://database.faithfulpack.net/images/addons/${addon.slug}/header`"
		:title="addon.name"
		:alt
	>
		<template #unlinked>
			<v-btn
				v-if="!minimal"
				class="fav-button pa-0"
				variant="plain"
				:icon="favIcon"
				:color="favColor"
				:aria-label="favAlt"
				@click="$emit('toggleFav', addon)"
			/>
		</template>
		<template #linked>
			<div v-if="!minimal" class="addon-flags">
				<img
					v-if="addon.options.tags.includes('Java')"
					:src="java"
					alt="available for Java Edition"
					loading="lazy"
				/>
				<img
					v-if="addon.options.tags.includes('Bedrock')"
					:src="bedrock"
					alt="available for Bedrock Edition"
					loading="lazy"
				/>
				<img v-if="addon.options.optifine" :src="optifine" alt="requires optifine" loading="lazy" />
			</div>
			<div v-if="!minimal" class="addon-res">
				<p v-if="addon.options.tags.includes('32x')">32x</p>
				<p v-if="addon.options.tags.includes('64x')">64x</p>
			</div>
		</template>
	</article-card>
</template>

<script>
import ArticleCard from "~/components/lib/article-card.vue";

export default defineNuxtComponent({
	name: "addon-card",
	components: {
		ArticleCard,
	},
	props: {
		addon: {
			type: Object,
			required: true,
		},
		favorite: {
			type: Boolean,
			required: false,
			default: false,
		},
		// for reel on main page (hides extra info since the cards are smaller)
		minimal: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	emits: ["toggleFav"],
	data() {
		return {
			optifine: "/image/addons/optifine.png",
			bedrock: "/image/addons/bedrock.png",
			java: "/image/addons/java.png",
		};
	},
	computed: {
		alt() {
			// take embed description if exists
			if (this.addon.embed_description) return this.addon.embed_description;
			// less than 150 characters (a lot of addons have really short descriptions)
			if (this.addon.description.length < 150) return this.addon.description;
			return this.addon.title;
		},
		favColor() {
			return this.favorite ? "#faa619" : "#ffffffaa";
		},
		favIcon() {
			return this.favorite ? "mdi-star" : "mdi-star-outline";
		},
		favAlt() {
			// icon buttons don't have accessible names
			return this.favorite ? "Remove from Favorites" : "Add to Favorites";
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/lib/variables" as *;

// search page cards
.fav-button {
	position: absolute;
	top: calc(#{$card-padding} - 16px);
	left: calc(#{$card-padding} - 16px);
	opacity: 1 !important;
	filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.5));
}

.addon-flags {
	position: absolute;
	bottom: $card-padding;
	right: $card-padding;
	display: flex;
	flex-direction: column;

	& > img {
		height: 32px;
		width: 32px;
		border-radius: $border-radius-0x;
		margin-top: 5px;
	}
}

.addon-res {
	position: absolute;
	bottom: calc(#{$card-padding} + 14px);
	left: $card-padding;
	display: flex;
	flex-direction: row;

	& > p {
		margin-bottom: 0;
		margin-right: 1ch;
		color: rgba(255, 255, 255, 0.8);
	}
}
</style>
