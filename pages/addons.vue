<template>
	<h1 class="title text-center my-3">Add-ons</h1>

	<template v-if="Object.keys(fav).length">
		<h2 class="text-center">Favorites</h2>
		<addon-grid favorites :addons="Object.values(fav)" @clickFav="toggleFav" />
		<br />
		<h2 class="text-center">All</h2>
	</template>

	<div class="card card-body">
		<h2 class="text-center h4">Search</h2>
		<div class="checkbox-container">
			<v-row no-gutters>
				<v-col cols="6" md="3" v-for="edition in editions" :key="edition">
					<v-checkbox
						v-model="selectedEditions"
						:label="edition"
						:disabled="selectedEditions.length === 1 && selectedEditions[0] === edition"
						:value="edition"
						color="white"
						hide-details
						@update:modelValue="startSearch"
					/>
				</v-col>
				<v-col cols="6" md="3" v-for="resolution in res" :key="resolution">
					<v-checkbox
						v-model="selectedRes"
						:label="resolution"
						:disabled="selectedRes.length === 1 && selectedRes[0] === resolution"
						:value="resolution"
						color="white"
						hide-details
						@update:modelValue="startSearch"
					/>
				</v-col>
			</v-row>
		</div>
		<v-text-field
			v-model="search"
			:append-icon="search ? 'mdi-send' : undefined"
			filled
			clear-icon="mdi-close"
			clearable
			hide-details
			placeholder="Search add-on name"
			type="text"
			@keyup.enter="startSearch"
			@click:append="startSearch"
			@click:clear="clearSearch"
		/>
		<br />
		<div class="addon-search-subtitle">
			<p>{{ resultCount }} {{ results }} found</p>
			<br />
			<v-select hide-details density="compact" v-model="currentSort" :items="sortMethods" />
		</div>
	</div>
	<br />
	<div v-if="loading" class="card card-body">Loading...</div>
	<addon-grid
		v-else-if="Object.keys(searchedAddons).length"
		:addons="searchedAddons"
		:sort="currentSort"
		:addonsFav="fav"
		@clickFav="toggleFav"
	/>
</template>

<script>
import AddonGrid from "~/components/addons/addon-grid.vue";

const FAVORITE_ADDONS_KEY = "favAddons";

export default {
	components: {
		AddonGrid,
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
			editions: ["Java", "Bedrock"],
			res: ["32x", "64x"],
			selectedEditions: ["Java", "Bedrock"],
			selectedRes: ["32x", "64x"],
			sortMethods,
			currentSort: sortMethods[0].value,
		};
	},
	methods: {
		startSearch() {
			if (
				this.search === "" &&
				this.editions.length + this.res.length ===
					this.selectedEditions.length + this.selectedRes.length
			)
				this.searchedAddons = this.addons;
			else {
				this.searchedAddons = this.addons.filter((addon) => {
					if (!addon.name.toLowerCase().includes(this.search.toLowerCase()) && this.search !== "")
						return false;

					// split types of an addon (res + edition : res & edition)
					const { localRes, localEditions } = addon.options.tags.reduce(
						(acc, tag) => {
							if (this.res.includes(tag)) acc.localRes.push(tag);
							if (this.editions.includes(tag)) acc.localEditions.push(tag);
							return acc;
						},
						{ localRes: [], localEditions: [] },
					);

					// search if edition then check if res
					if (!localEditions.some((edition) => this.selectedEditions.includes(edition)))
						return false;
					if (!localRes.some((res) => this.selectedRes.includes(res))) return false;
					return true;
				});
			}
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
	},
	mounted() {
		fetch("https://api.faithfulpack.net/v2/addons/approved")
			.then((res) => res.json())
			.then((data) => {
				this.addons = data;
				this.loading = false;
				this.searchedAddons = this.addons;
			});

		this.fav = JSON.parse(localStorage.getItem(FAVORITE_ADDONS_KEY) || "{}");
	},
};
</script>

<style scoped lang="scss">
// search
.checkbox-container {
	.v-input {
		text-align: center;
		margin: 0;
		padding: 0.25rem 0;
		margin-bottom: 1rem;
		.v-label {
			color: white !important;
		}
	}
}

.addon-search-subtitle {
	display: flex;
	justify-content: space-between;
	> * {
		margin-bottom: 0 !important;
		margin-top: 0 !important;
	}
	.v-select {
		max-width: 15rem;
	}
	.v-select__selection {
		color: rgba(255, 255, 255, 0.7);
	}
}
</style>
