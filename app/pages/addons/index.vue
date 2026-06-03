<template>
	<hero-section
		background="/image/banners/add_ons.jpg"
		wordmark="/image/wordmarks/addons.png"
		wordmark-alt="Faithful Add-ons Wordmark"
		upspace="24px"
	>
		<template #tagline>Personalize and customize every aspect of your gameplay.</template>
		<template #actions>
			<div class="container pt-2 pb-0">
				<v-text-field
					v-model="search"
					variant="solo"
					clear-icon="mdi-close"
					:autofocus="!$vuetify.display.mobile"
					clearable
					hide-details
					placeholder="Search add-on name"
					@click:clear="clearSearch"
				/>
				<br />
			</div>
		</template>
	</hero-section>
	<div class="container pt-3">
		<v-chip-group
			v-model="rawSelectedPacks"
			class="d-flex flex-row align-center px-2"
			multiple
			variant="elevated"
		>
			<h3 class="h5 mb-0">Packs</h3>
			<div class="px-2" />
			<custom-chip v-for="pack in packs" :key="pack.id" :type="pack.id" filter :value="pack.id" />
		</v-chip-group>
		<v-chip-group
			v-model="rawSelectedEditions"
			class="d-flex flex-row align-center px-2"
			multiple
			variant="elevated"
		>
			<h3 class="h5 mb-0">Editions</h3>
			<div class="px-2" />
			<custom-chip
				v-for="edition in editions"
				:key="edition"
				:type="edition"
				filter
				:value="edition"
			/>
		</v-chip-group>
		<v-row no-gutters align="end" class="py-3">
			<v-col cols="12" sm="6" data-allow-mismatch="children">
				<p v-if="loading" class="d-flex flex-row align-center ga-2 ma-2">
					Loading Results...
					<v-progress-circular :size="20" :width="3" indeterminate />
				</p>
				<p v-else class="ma-2">{{ resultCount }} {{ results }} found</p>
			</v-col>
			<v-spacer />
			<v-col cols="12" :sm="$vuetify.display.mdAndUp ? 3 : 5">
				<v-select v-model="currentSort" hide-details density="compact" :items="sortMethods" />
			</v-col>
		</v-row>
		<div v-if="loading" class="res-grid-3">
			<div v-for="i in 5" :key="i" class="card addon-skeleton-card">
				<v-skeleton-loader
					data-allow-mismatch="class"
					type="image, subtitle, text, list-item-avatar"
					:theme
				/>
			</div>
		</div>
		<div v-else class="res-grid-3">
			<addon-card
				v-for="addon in favAddons"
				:key="addon.id"
				:addon
				:users
				:packs
				favorite
				@toggleFav="toggleFav"
			/>
			<addon-card
				v-for="addon in displayedAddons"
				:key="currentSort + addon.id"
				:addon
				:users
				:packs
				@toggleFav="toggleFav"
			/>
		</div>
		<div ref="bottomElement" />
	</div>
</template>

<script>
import AddonCard from "~/components/addons/addon-card.vue";
import HeroSection from "~/components/lib/hero-section.vue";
import CustomChip from "~/components/lib/custom-chip.vue";

const FAVORITE_ADDONS_KEY = "favAddons";

// this might break on really tall monitors, should probably be dynamic
const DISPLAYED_ADDONS_COUNT = 24;

export default defineNuxtComponent({
	components: {
		HeroSection,
		AddonCard,
		CustomChip,
	},
	inject: ["theme"],
	setup() {
		definePageMeta({
			name: "Add-ons",
			layout: "no-container",
		});
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
			users: {},
			packs: [],
			editions: ["Java", "Bedrock"],
			search: "",
			fav: new Set(),
			shownResults: DISPLAYED_ADDONS_COUNT,
			rawSelectedEditions: [],
			rawSelectedPacks: [],
			sortMethods,
			currentSort: sortMethods[0].value,
		};
	},
	methods: {
		// used for both search and favorites
		filterAddons(addons, sortMethod = null) {
			if (this.isSearchEmpty) return this.sortAddons(addons, sortMethod);
			const filtered = addons.filter((addon) => {
				if (!addon.name.toLowerCase().includes(this.search.toLowerCase())) return false;

				const hasPack = addon.options.packs.some((pack) => this.selectedPacks.includes(pack));
				const hasEdition = addon.options.tags.some((edition) =>
					this.selectedEditions.includes(edition),
				);

				// must fulfill both criteria
				return hasEdition && hasPack;
			});

			return this.sortAddons(filtered, sortMethod);
		},
		sortAddons(addons, sortMethod) {
			if (!sortMethod) return Array.from(addons);
			return Array.from(addons).sort((a, b) => {
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
			if (this.fav.has(addon.id)) this.fav.delete(addon.id);
			else this.fav.add(addon.id);
			localStorage.setItem(FAVORITE_ADDONS_KEY, JSON.stringify(Array.from(this.fav)));
		},
		checkShownItems() {
			// https://stackoverflow.com/a/5354536/20327257
			const bottomElement = this.$refs.bottomElement.getBoundingClientRect();
			const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
			if (
				this.shownResults < this.resultCount &&
				bottomElement.bottom >= 0 &&
				bottomElement.top - viewHeight < 0
			)
				this.shownResults += DISPLAYED_ADDONS_COUNT;
		},
		async loadAddons() {
			const { apiURL } = useRuntimeConfig().public;
			this.addons = await $fetch(`${apiURL}/addons/approved`);
		},
		async loadUsers() {
			const { apiURL } = useRuntimeConfig().public;
			const users = await $fetch(`${apiURL}/users/names`);
			this.users = users.reduce((acc, cur) => {
				acc[cur.id] = cur;
				return acc;
			}, {});
		},
		async loadPacks() {
			const { apiURL } = useRuntimeConfig().public;
			this.packs = await $fetch(`${apiURL}/packs/search?tag=addons`);
		},
	},
	computed: {
		favAddons() {
			return this.filterAddons(
				this.addons.filter((a) => this.fav.has(a.id)),
				"dd",
			);
		},
		searchedAddons() {
			return this.filterAddons(this.addons, this.currentSort).filter(
				(addon) => !this.fav.has(addon.id),
			);
		},
		displayedAddons() {
			return this.searchedAddons.slice(0, this.shownResults - this.favAddons.length);
		},
		resultCount() {
			return this.searchedAddons.length + this.favAddons.length;
		},
		results() {
			return this.resultCount === 1 ? "result" : "results";
		},
		selectedPacks() {
			// zero length means all are selected
			if (this.rawSelectedPacks.length === 0) return this.packs.map((p) => p.id);
			return this.rawSelectedPacks;
		},
		selectedEditions() {
			if (this.rawSelectedEditions.length === 0) return this.editions;
			return this.rawSelectedEditions;
		},
		isSearchEmpty() {
			if (this.search !== "") return false;
			if (
				this.editions.length + this.packs.length !==
				this.selectedEditions.length + this.selectedPacks.length
			)
				return false;
			return true;
		},
		loading() {
			return !Object.keys(this.users).length;
		},
	},
	watch: {
		search(value) {
			if (this.$route.query.search !== value) {
				this.$router.replace({ query: value ? { search: value } : null });
				this.shownResults = DISPLAYED_ADDONS_COUNT; // reset results
			}
		},
	},
	created() {
		// take query params from route and start search with that if possible (can be done with ssr)
		if (this.$route.query.search) this.search = this.$route.query.search;
		Promise.all([this.loadAddons(), this.loadUsers(), this.loadPacks()]);
	},
	mounted() {
		const local = localStorage.getItem(FAVORITE_ADDONS_KEY);

		// legacy compatibility
		// todo: remove in a few months
		if (local && local.startsWith("{")) {
			this.fav = new Set(Object.keys(JSON.parse(local)));
			localStorage.setItem(FAVORITE_ADDONS_KEY, JSON.stringify(Array.from(this.fav)));
		} else this.fav = new Set(JSON.parse(local || "[]"));

		document.addEventListener("scroll", this.checkShownItems);
	},
	beforeUnmount() {
		document.removeEventListener("scroll", this.checkShownItems);
	},
});
</script>
