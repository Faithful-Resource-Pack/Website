<script setup>
definePageMeta({
	name: "Add-ons",
	layout: "no-container",
});
</script>

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
		<v-chip-group
			class="d-flex flex-row align-center px-2"
			v-model="rawSelectedRes"
			multiple
			variant="elevated"
			@update:modelValue="startSearch"
		>
			<h5 class="mb-0">Packs</h5>
			<div class="px-2" />
			<v-chip
				filter
				v-for="({ color, icon, text }, k) in resolutions"
				:key="k"
				:value="k"
				:style="{ color }"
			>
				<media-icon #prepend :icon class="mr-1 ml-n1" :color />
				<span>{{ text }}</span>
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
		<template v-if="Object.keys(fav).length">
			<h2 class="text-center">Favorites</h2>
			<addon-grid favorites :addons="Object.values(fav)" @clickFav="toggleFav" />
			<br />
			<h2 class="text-center">All</h2>
		</template>
		<div v-if="loading" class="card card-body">Loading...</div>
		<addon-grid
			v-else-if="Object.keys(searchedAddons).length"
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
	data() {
		const sortMethods = [
			{ title: "Date (Newest to Oldest)", value: "dd" },
			{ title: "Date (Oldest to Newest)", value: "da" },
			{ title: "Name (A-Z)", value: "na" },
			{ title: "Name (Z-A)", value: "nd" },
		];
		return {
			addons: [],
			searchedAddons: [],
			// store as object for faster lookup (sorting not needed)
			fav: {},
			search: "",
			loading: true,
			editions: {
				Java: { color: "#1dd96a", icon: "mdi-minecraft", text: "Java Edition" },
				Bedrock: { color: "#eee", icon: "mdi-cube", text: "Bedrock Edition" },
			},
			resolutions: {
				"32x": { color: "#00b0ff", icon: "faithful", text: "Faithful 32x" },
				"64x": { color: "#ff62bc", icon: "faithful", text: "Faithful 64x" },
			},
			rawSelectedEditions: [],
			rawSelectedRes: [],
			sortMethods,
			currentSort: sortMethods[0].value,
		};
	},
	methods: {
		startSearch() {
			if (this.isSearchEmpty) {
				this.searchedAddons = this.addons;
				return;
			}
			this.searchedAddons = this.addons.filter((addon) => {
				if (!addon.name.toLowerCase().includes(this.search.toLowerCase()) && this.search !== "")
					return false;

				// split types of an addon (res + edition : res & edition)
				const { localRes, localEditions } = addon.options.tags.reduce(
					(acc, tag) => {
						if (Object.keys(this.resolutions).includes(tag)) acc.localRes.push(tag);
						if (Object.keys(this.editions).includes(tag)) acc.localEditions.push(tag);
						return acc;
					},
					{ localRes: [], localEditions: [] },
				);

				// search if edition then check if res
				if (!localEditions.some((edition) => this.selectedEditions.includes(edition))) return false;
				if (!localRes.some((res) => this.selectedRes.includes(res))) return false;
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
		selectedRes() {
			// zero length means all are selected
			if (this.rawSelectedRes.length === 0) return Object.keys(this.resolutions);
			return this.rawSelectedRes;
		},
		selectedEditions() {
			if (this.rawSelectedEditions.length === 0) return Object.keys(this.editions);
			return this.rawSelectedEditions;
		},
		isSearchEmpty() {
			if (this.search !== "") return false;
			if (
				Object.keys(this.editions).length + Object.keys(this.resolutions).length !==
				this.selectedEditions.length + this.selectedRes.length
			)
				return false;
			return true;
		},
	},
	// need nonblocking fetch (SSR not needed)
	beforeMount() {
		const { apiURL } = useRuntimeConfig().public;
		$fetch(`${apiURL}/addons/approved`).then((data) => {
			this.addons = data;
			this.loading = false;
			this.searchedAddons = data;
		});

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
