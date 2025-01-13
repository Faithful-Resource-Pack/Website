<template>
	<article-card
		:to="`/addons/${addon.slug}`"
		:image="`https://database.faithfulpack.net/images/addons/${addon.slug}/header`"
		:title="addon.name"
		:alt
	>
		<template #unlinked>
			<slot />
		</template>
		<template #linked>
			<div class="addon-flags" v-if="!minimal">
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
			<div class="addon-res" v-if="!minimal">
				<p v-if="addon.options.tags.includes('32x')">32x</p>
				<p v-if="addon.options.tags.includes('64x')">64x</p>
			</div>
		</template>
	</article-card>
</template>

<script>
import ArticleCard from "../lib/article-card.vue";

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
		minimal: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
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
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/lib/variables" as *;

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
