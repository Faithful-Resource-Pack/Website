<template>
	<hero-section
		background="/image/banners/add_ons.jpg"
		wordmark="/image/wordmarks/addons.png"
		wordmark-alt="Faithful Add-ons Wordmark"
		upspace="50px"
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
			<v-chip
				v-for="({ color, icon, text }, k) in packs"
				:key="k"
				filter
				:value="k"
				:style="{ color }"
			>
				<template #prepend>
					<media-icon :icon class="mr-1 ml-n1" :color />
				</template>
				<span>{{ text }}</span>
			</v-chip>
		</v-chip-group>
		<v-chip-group
			v-model="rawSelectedEditions"
			class="d-flex flex-row align-center px-2"
			multiple
			variant="elevated"
		>
			<h3 class="h5 mb-0">Editions</h3>
			<div class="px-2" />
			<v-chip
				v-for="({ color, icon, text }, k) in editions"
				:key="k"
				filter
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
				<v-select v-model="currentSort" hide-details density="compact" :items="sortMethods" />
			</v-col>
		</v-row>
		<div class="res-grid-3">
			<!-- favoriting doesn't work serverside since it depends on localstorage -->
			<client-only>
				<addon-card
					v-for="addon in favAddons"
					:key="addon.id"
					:addon
					:users
					favorite
					@toggleFav="toggleFav"
				/>
			</client-only>
			<addon-card
				v-for="addon in displayedAddons"
				:key="currentSort + addon.id"
				:addon
				:users
				@toggleFav="toggleFav"
			/>
		</div>
		<div ref="bottomElement" />
	</div>
</template>

<script>
import AddonCard from "~/components/addons/addon-card.vue";
import HeroSection from "~/components/lib/hero-section.vue";
import MediaIcon from "~/components/lib/media-icon.vue";

const FAVORITE_ADDONS_KEY = "favAddons";

// this might break on really tall monitors, should probably be dynamic
const DISPLAYED_ADDONS_COUNT = 24;

export default defineNuxtComponent({
	components: {
		HeroSection,
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
		const [addons, users] = await Promise.all([
			$fetch(`${apiURL}/addons/approved`),
			$fetch(`${apiURL}/users/names`),
		]);
		return {
			addons,
			users: users.reduce((acc, cur) => {
				acc[cur.id] = cur;
				return acc;
			}, {}),
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
				Java: { color: "#1DD96A", icon: "mdi-minecraft", text: "Java Edition" },
				Bedrock: { color: "#EEEEEE", icon: "mdi-cube", text: "Bedrock Edition" },
			},
			packs: {
				"32x": { color: "#00A2FF", icon: "faithful", text: "Faithful 32x" },
				"64x": { color: "#FF0092", icon: "faithful", text: "Faithful 64x" },
			},
			shownResults: DISPLAYED_ADDONS_COUNT,
			rawSelectedEditions: [],
			rawSelectedPacks: [],
			sortMethods,
			currentSort: sortMethods[0].value,
		};
	},
	methods: {
		// used for both search and favorites
		filterAddons(addons, sortMethod) {
			if (this.isSearchEmpty) return this.sortAddons(addons, sortMethod);
			const filtered = addons.filter((addon) => {
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

				const hasEdition = localEditions.some((edition) => this.selectedEditions.includes(edition));
				const hasPack = localPacks.some((pack) => this.selectedPacks.includes(pack));
				// must fulfill both criteria
				return hasEdition && hasPack;
			});

			return this.sortAddons(filtered, sortMethod);
		},
		sortAddons(addons, sortMethod) {
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
			if (this.fav[addon.id]) delete this.fav[addon.id];
			else this.fav[addon.id] = addon;
			localStorage.setItem(FAVORITE_ADDONS_KEY, JSON.stringify(this.fav));
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
			if (this.$route.query.search !== value) {
				this.$router.push({ query: value ? { search: value } : null });
				this.shownResults = DISPLAYED_ADDONS_COUNT; // reset results
			}
		},
	},
	created() {
		// take query params from route and start search with that if possible (can be done with ssr)
		if (this.$route.query.search) this.search = this.$route.query.search;
	},
	mounted() {
		// need localstorage access so this must be done after mounting
		this.fav = JSON.parse(localStorage.getItem(FAVORITE_ADDONS_KEY) || "{}");

		document.addEventListener("scroll", this.checkShownItems);
	},
	beforeUnmount() {
		document.removeEventListener("scroll", this.checkShownItems);
	},
});
</script>
