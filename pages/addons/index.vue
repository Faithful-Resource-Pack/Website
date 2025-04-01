<template>
	<div class="hero-container text-center">
		<div class="hero-upspace" />
		<img class="hero-wordmark" src="/image/wordmarks/addons.png" alt="Faithful Wordmark" />
		<h2 class="hero-tagline">Personalize and customize every aspect of your gameplay.</h2>
		<div class="container pt-2 pb-0">
			<v-text-field
				v-model="search"
				:append-inner-icon="search ? 'mdi-send' : undefined"
				variant="solo"
				clear-icon="mdi-close"
				clearable
				hide-details
				placeholder="Search add-on name"
				@keyup.enter="startSearch"
				@click:appendInner="startSearch"
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
			@update:modelValue="startSearch"
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
			@update:modelValue="startSearch"
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
		<template v-if="Object.keys(fav).length" data-allow-mismatch="children">
			<h1 class="text-center">Favorites</h1>
			<addon-grid favorites :addons="Object.values(fav)" @clickFav="toggleFav" />
			<hr />
			<h1 class="text-center">All</h1>
		</template>
		<addon-grid
			v-if="Object.keys(searchedAddons).length"
			:addons="searchedAddons"
			:sort="currentSort"
			:addonsFav="fav"
			@clickFav="toggleFav"
		/>
	</div>
</template>

<script>
import AddonGrid from "~/components/addons/addon-grid.vue";
import MediaIcon from "~/components/lib/media-icon.vue";

const FAVORITE_ADDONS_KEY = "favAddons";

export default defineNuxtComponent({
	components: {
		AddonGrid,
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
			searchedAddons: data,
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
		startSearch() {
			// set query params for sharing
			if (this.$route.query.search !== this.search)
				this.$router.push({ query: this.search ? { search: this.search } : null });

			if (this.isSearchEmpty) {
				this.searchedAddons = this.addons;
				return;
			}
			this.searchedAddons = this.addons.filter((addon) => {
				if (!addon.name.toLowerCase().includes(this.search.toLowerCase()) && this.search !== "")
					return false;

				// split types of an addon (pack + edition : pack & edition)
				const { localPacks, localEditions } = addon.options.tags.reduce(
					(acc, tag) => {
						if (Object.keys(this.packs).includes(tag)) acc.localPacks.push(tag);
						if (Object.keys(this.editions).includes(tag)) acc.localEditions.push(tag);
						return acc;
					},
					{ localPacks: [], localEditions: [] },
				);

				// search if edition then check if pack
				if (!localEditions.some((edition) => this.selectedEditions.includes(edition))) return false;
				if (!localPacks.some((pack) => this.selectedPacks.includes(pack))) return false;
				return true;
			});
		},
		clearSearch() {
			this.search = "";
			this.startSearch();
		},
		toggleFav(addon) {
			if (this.fav[addon.id]) delete this.fav[addon.id];
			else this.fav[addon.id] = addon;
			localStorage.setItem(FAVORITE_ADDONS_KEY, JSON.stringify(this.fav));
		},
	},
	computed: {
		results() {
			return this.resultCount === 1 ? "result" : "results";
		},
		resultCount() {
			return this.searchedAddons.length;
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
	created() {
		// take query params from route and start search with that if possible
		if (!this.$route.query.search) return;
		this.search = this.$route.query.search;
		this.startSearch();
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
