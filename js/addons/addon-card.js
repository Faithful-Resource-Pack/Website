export default {
	name: "addon-card",
	components: {
		ArticleCard: Vue.defineAsyncComponent(() => import("../components/article-card.js")),
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
	template: `
		<article-card
			:href="'/addons/' + addon.slug"
			:image="'https://database.faithfulpack.net/images/addons/' + addon.slug + '/header'"
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
					<img
						v-if="addon.options.optifine"
						:src="optifine"
						alt="requires optifine"
						loading="lazy"
					/>
				</div>
				<div class="addon-res" v-if="!minimal">
					<p v-if="addon.options.tags.includes('32x')">32x</p>
					<p v-if="addon.options.tags.includes('64x')">64x</p>
				</div>
			</template>
		</article-card>
	`,
	data() {
		return {
			optifine: "/image/icon/optifine.png",
			bedrock: "/image/icon/bedrock.png",
			java: "/image/icon/java.png",
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
};
