<template>
	<base-card
		:to="`/addons/${addon.slug}`"
		:image="`https://database.faithfulpack.net/images/addons/${addon.slug}/header`"
		:alt
		:title-styles
	>
		<template #title>
			<span class="short-title">{{ addon.name }}</span>
		</template>
		<template v-if="!minimal" #body>
			<p class="addon-subtitle mb-2">{{ subtitle }}</p>
			<div class="author-heads">
				<img v-for="icon in userIcons" :key="icon" :src="icon" data-allow-mismatch="attribute" />
				<p v-if="firstUsername" class="mb-0 ml-2">By {{ firstUsername }}</p>
			</div>
			<div class="addon-flags">
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
		</template>
		<template #unlinked>
			<fav-button v-if="!minimal" :favorite @toggleFav="$emit('toggleFav', addon)" />
		</template>
	</base-card>
</template>

<script>
import BaseCard from "~/components/lib/base-card.vue";
import FavButton from "./fav-button.vue";

export default defineNuxtComponent({
	name: "addon-card",
	components: {
		BaseCard,
		FavButton,
	},
	props: {
		addon: {
			type: Object,
			required: true,
		},
		users: {
			type: Object,
			required: false,
			default: () => ({}),
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
	methods: {
		randomHead(seed) {
			// ten options for ten digits
			const options = [
				"X-Alex",
				"X-Ari",
				"X-Efe",
				"X-Kai",
				"X-Makena",
				"X-Noor",
				"X-Steve",
				"X-Steve",
				"X-Sunny",
				"X-Zuri",
			];

			// guaranteed to have the same head for the same user always (last digit is most random)
			return options[seed.toString().at(-1)];
		},
	},
	computed: {
		alt() {
			// take embed description if exists
			if (this.addon.embed_description) return this.addon.embed_description;
			// less than 150 characters (a lot of addons have really short descriptions)
			if (this.addon.description.length < 150) return this.addon.description;
			return this.addon.title;
		},
		packs() {
			return ["32x", "64x"].filter((p) => this.addon.options.tags.includes(p));
		},
		subtitle() {
			const formattedPacks = this.packs.map((res) => `Faithful ${res}`).join(", ");
			if (!this.addon.last_updated) return formattedPacks;
			const date = preciseDate(this.addon.last_updated);
			if (this.packs.length > 1) return `${formattedPacks}\n${date}`;
			return `${formattedPacks} • ${date}`;
		},
		titleStyles() {
			// https://stackoverflow.com/questions/34294054/how-to-implement-single-line-ellipsis-with-css
			const styles = {
				whiteSpace: "nowrap",
				overflow: "hidden",
				textOverflow: "ellipsis",
			};
			if (this.minimal) styles.marginBottom = 0;
			return styles;
		},
		authors() {
			return this.addon.authors.map((author) => this.users[author]);
		},
		userIcons() {
			return this.authors.map(
				(author) => `https://vzge.me/face/64/${author?.uuid || this.randomHead(author.id)}`,
			);
		},
		firstUsername() {
			const filtered = this.authors.filter((a) => typeof a?.username === "string");
			// only return if one possible choice (avoid favoritism)
			if (filtered.length === 1) return filtered[0].username;
			return "";
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/lib/variables" as *;

.addon-subtitle {
	white-space: pre-wrap;
	line-height: 1.2;
}

.author-heads {
	flex-grow: 1;
	display: flex;
	flex-flow: row wrap;
	align-items: center;
	gap: 6px;
	img {
		height: 32px;
		image-rendering: pixelated;
	}
}

.addon-flags {
	display: flex;
	flex-direction: column;
	position: absolute;
	bottom: $card-padding;
	right: $card-padding;

	& > img {
		height: 32px;
		width: 32px;
		border-radius: $border-radius-0x;
		margin-top: 5px;
	}
}
</style>
