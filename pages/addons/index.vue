<template>
	<div class="hero-container text-center">
		<div class="hero-upspace" />
		<img class="hero-wordmark" src="/image/wordmarks/addons.png" alt="Faithful Wordmark" />
		<h2 class="hero-tagline">Personalize and customize every aspect of your gameplay.</h2>
		<div class="container pt-2 pb-0">
			<v-text-field
				v-model="search"
				variant="solo"
				clear-icon="mdi-close"
				clearable
				hide-details
				placeholder="Search add-on name"
				@click:clear="clearSearch"
			/>
			<br />
		</div>
	</div>
	<div class="container pt-3">
		<v-chip-group
			class="d-flex flex-row align-center px-2"
			v-model="rawSelectedPacks"
			multiple
			variant="elevated"
		>
			<h5 class="mb-0">Packs</h5>
			<div class="px-2" />
			<v-chip
				filter
				v-for="({ color, icon, text }, k) in packs"
				:key="k"
				:value="k"
				:style="{ color }"
			>
				<media-icon #prepend :icon class="mr-1 ml-n1" :color />
				<span>{{ text }}</span>
			</v-chip>
		</v-chip-group>
		<v-chip-group
			class="d-flex flex-row align-center px-2"
			v-model="rawSelectedEditions"
			multiple
			variant="elevated"
		>
			<h5 class="mb-0">Editions</h5>
			<div class="px-2" />
			<v-chip
				filter
				v-for="({ color, icon, text }, k) in editions"
				:key="k"
				:value="k"
				:style="{ color }"
				:prepend-icon="icon"
			>
				{{ text }}
			</v-chip>
		</v-chip-group>
		<v-row no-gutters align="end" class="py-3">
			<v-col cols="12" sm="6">
				<p class="ma-2">{{ resultCount }} {{ results }} found</p>
			</v-col>
			<v-spacer />
			<v-col cols="12" :sm="$vuetify.display.mdAndUp ? 3 : 5">
				<v-select hide-details density="compact" v-model="currentSort" :items="sortMethods" />
			</v-col>
		</v-row>
		<div class="res-grid-3">
			<!-- favoriting doesn't work serverside since it depends on localstorage -->
			<client-only>
				<addon-card
					v-for="addon in favAddons"
					:key="addon.id"
					:addon
					favorite
					@toggleFav="toggleFav"
				/>
			</client-only>
			<addon-card v-for="addon in searchedAddons" :key="addon.id" :addon @toggleFav="toggleFav" />
		</div>
	</div>
</template>

<script>
import AddonCard from "~/components/addons/addon-card.vue";
import MediaIcon from "~/components/lib/media-icon.vue";

const FAVORITE_ADDONS_KEY = "favAddons";

export default defineNuxtComponent({
	components: {
		AddonCard,
		MediaIcon,
	},
	setup() {
		definePageMeta({
			name: "Add-ons",
			layout: "no-container",
		});
	},
	async asyncData() {
		const { apiURL } = useRuntimeConfig().public;
		const data = await $fetch(`${apiURL}/addons/approved`);
		return {
			addons: data,
		};
	},
	data() {
		const sortMethods = [
			{ title: "Date (Newest to Oldest)", value: "dd" },
			{ title: "Date (Oldest to Newest)", value: "da" },
			{ title: "Name (A-Z)", value: "na" },
			{ title: "Name (Z-A)", value: "nd" },
		];
		return {
			// store as object for faster lookup (sorting not needed)
			fav: {},
			search: "",
			editions: {
				Java: { color: "#1dd96a", icon: "mdi-minecraft", text: "Java Edition" },
				Bedrock: { color: "#eee", icon: "mdi-cube", text: "Bedrock Edition" },
			},
			packs: {
				"32x": { color: "#00b0ff", icon: "faithful", text: "Faithful 32x" },
				"64x": { color: "#ff62bc", icon: "faithful", text: "Faithful 64x" },
			},
			rawSelectedEditions: [],
			rawSelectedPacks: [],
			sortMethods,
			currentSort: sortMethods[0].value,
		};
	},
	methods: {
		// used for both search and favorites
		filterAddons(addons, sortMethod) {
			if (this.isSearchEmpty) return addons;
			return addons
				.filter((addon) => {
					if (!addon.name.toLowerCase().includes(this.search.toLowerCase())) return false;

					// split types of an addon (pack + edition : pack & edition)
					// they should really be split but oh well
					const { localPacks, localEditions } = addon.options.tags.reduce(
						(acc, tag) => {
							if (Object.keys(this.packs).includes(tag)) acc.localPacks.push(tag);
							if (Object.keys(this.editions).includes(tag)) acc.localEditions.push(tag);
							return acc;
						},
						{ localPacks: [], localEditions: [] },
					);

					const hasEdition = localEditions.some((edition) =>
						this.selectedEditions.includes(edition),
					);
					const hasPack = localPacks.some((pack) => this.selectedPacks.includes(pack));
					// must fulfill both criteria
					return hasEdition && hasPack;
				})
				.sort((a, b) => {
					const an = a.name.trim().toLowerCase();
					const bn = b.name.trim().toLowerCase();
					const ad = a.last_updated || 0;
					const bd = b.last_updated || 0;
					switch (sortMethod) {
						case "na": // name ascending
							return an === bn ? 0 : an > bn ? 1 : -1;
						case "nd": // name descending
							return an === bn ? 0 : an > bn ? -1 : 1;
						case "da": // date ascending
							return ad === bd ? 0 : ad > bd ? 1 : -1;
						case "dd": // date descending (default)
						default:
							return ad === bd ? 0 : ad < bd ? 1 : -1;
					}
				});
		},
		clearSearch() {
			// watcher handles query params
			this.search = "";
		},
		toggleFav(addon) {
			if (this.fav[addon.id]) delete this.fav[addon.id];
			else this.fav[addon.id] = addon;
			localStorage.setItem(FAVORITE_ADDONS_KEY, JSON.stringify(this.fav));
		},
	},
	computed: {
		favAddons() {
			// always sorted by name ascending
			return this.filterAddons(Object.values(this.fav), "na");
		},
		searchedAddons() {
			return this.filterAddons(this.addons, this.currentSort).filter(
				(addon) => !this.fav[addon.id],
			);
		},
		resultCount() {
			return this.searchedAddons.length + Object.keys(this.fav).length;
		},
		results() {
			return this.resultCount === 1 ? "result" : "results";
		},
		selectedPacks() {
			// zero length means all are selected
			if (this.rawSelectedPacks.length === 0) return Object.keys(this.packs);
			return this.rawSelectedPacks;
		},
		selectedEditions() {
			if (this.rawSelectedEditions.length === 0) return Object.keys(this.editions);
			return this.rawSelectedEditions;
		},
		isSearchEmpty() {
			if (this.search !== "") return false;
			if (
				Object.keys(this.editions).length + Object.keys(this.packs).length !==
				this.selectedEditions.length + this.selectedPacks.length
			)
				return false;
			return true;
		},
	},
	watch: {
		search(value) {
			if (this.$route.query.search !== value)
				this.$router.push({ query: value ? { search: value } : null });
		},
	},
	created() {
		// take query params from route and start search with that if possible
		if (this.$route.query.search) this.search = this.$route.query.search;
	},
	mounted() {
		// need localstorage access so this must be done after mounting
		this.fav = JSON.parse(localStorage.getItem(FAVORITE_ADDONS_KEY) || "{}");
	},
});
</script>

<style scoped lang="scss">
.hero-container {
	background-image: url("/image/banners/add_ons.jpg");
}
.hero-upspace {
	height: 50px;
}
</style>
