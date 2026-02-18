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
			<author-heads v-if="Object.keys(users).length" :authors />
			<addon-flags :options="addon.options" />
		</template>
		<template #unlinked>
			<fav-button
				v-if="!minimal && !disableFavorites"
				:favorite
				@click="$emit('toggleFav', addon)"
			/>
		</template>
	</base-card>
</template>

<script>
import BaseCard from "~/components/lib/base-card.vue";
import FavButton from "./fav-button.vue";
import AuthorHeads from "./author-heads.vue";
import AddonFlags from "./addon-flags.vue";

export default defineNuxtComponent({
	name: "addon-card",
	components: {
		BaseCard,
		FavButton,
		AuthorHeads,
		AddonFlags,
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
		disableFavorites: {
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
	computed: {
		subtitle() {
			const formattedPacks = this.packs.map((res) => `Faithful ${res}`).join(", ");
			if (!this.addon.last_updated) return formattedPacks;
			const date = exactDate(this.addon.last_updated);
			if (this.packs.length > 1) return `${formattedPacks}\n${date}`;
			return `${formattedPacks} • ${date}`;
		},
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
	},
});
</script>

<style scoped lang="scss">
.addon-subtitle {
	white-space: pre-wrap;
	line-height: 1.2;
}
</style>
