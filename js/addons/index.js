const FAVORITE_ADDONS_KEY = "favAddons";

document.addEventListener("DOMContentLoaded", () => {
	const app = Vue.createApp({
		components: {
			AddonGrid: Vue.defineAsyncComponent(() => import("./addon-grid.js")),
		},
		template: `
			<!-- vuetify overrides the bootstrap margin styles so we manually add them -->
			<h1
				class="display-3 text-center"
				style="margin-top: 3rem !important; margin-bottom: 3rem !important"
			>
				Add-ons
			</h1>

			<template v-if="Object.keys(fav).length">
				<h3 class="text-center">Favorites</h3>
				<addon-grid
					:key="Object.keys(fav).length"
					:addons="fav"
					favorites
					:addonsFav="fav"
					@clickFav="toggleFav"
				/>
				<br />
				<h3 class="text-center">All</h3>
			</template>

			<div class="card card-body">
				<h4 class="text-center">Search</h4>
				<div class="checkbox-container">
					<v-row no-gutters>
						<v-col
							cols="6"
							md="3"
							v-for="edition in editions"
							:key="edition"
						>
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
						<v-col
							cols="6"
							md="3"
							v-for="resolution in res"
							:key="resolution"
						>
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
				<div class="addon-info-subtitle">
					<p>{{ resultCount }} {{ results }} found</p>
					<br>
					<v-select
						hide-details
						density="compact"
						v-model="currentSort"
						:items="sortMethods"
					/>
				</div>
			</div>
			<br />
			<addon-grid
				:key="Object.keys(fav).length"
				:addons="searchedAddons"
				:sort="currentSort"
				:addonsFav="fav"
				@clickFav="toggleFav"
			/>
		`,
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
				search: "",
				loading: true,
				optifine: "/image/icon/optifine.png",
				bedrock: "/image/icon/bedrock.png",
				java: "/image/icon/java.png",
				editions: ["Java", "Bedrock"],
				res: ["32x", "64x"],
				selectedEditions: ["Java", "Bedrock"],
				selectedRes: ["32x", "64x"],
				fav: {},
				resultCount: 0,
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
					this.searchedAddons = this.addons
						.filter((addon) => {
							if (
								!addon.name.toLowerCase().includes(this.search.toLowerCase()) &&
								this.search !== ""
							)
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
							if (
								!localEditions.some((edition) =>
									this.selectedEditions.includes(edition),
								)
							)
								return false;
							if (!localRes.some((res) => this.selectedRes.includes(res)))
								return false;
							return true;
						})
						.reduce((acc, cur) => {
							acc[cur.id] = cur;
							return acc;
						}, {});
				}

				this.resultCount = Object.keys(this.searchedAddons).length;
				this.$forceUpdate(); // force update (because it can be a bit long to process)
			},
			clearSearch() {
				this.search = "";
				this.startSearch();
			},
			toggleFav(addon) {
				if (!this.fav[addon.id]) {
					this.fav[addon.id] = addon;
					window.localStorage.setItem(FAVORITE_ADDONS_KEY, JSON.stringify(this.fav));
				} else {
					delete this.fav[addon.id];
					window.localStorage.setItem(FAVORITE_ADDONS_KEY, JSON.stringify(this.fav));
				}

				this.$forceUpdate();
			},
		},
		computed: {
			results() {
				return this.resultCount === 1 ? "result" : "results";
			},
		},
		created() {
			fetch("https://api.faithfulpack.net/v2/addons/approved")
				.then((res) => res.json())
				.then((data) => {
					this.addons = data;
					this.loading = false;
					this.resultCount = data.length;

					// fix missing ID (property value)
					for (const addonID of Object.keys(this.addons))
						this.addons[addonID].id = addonID;

					this.searchedAddons = this.addons;
				});

			this.fav = JSON.parse(window.localStorage.getItem(FAVORITE_ADDONS_KEY) || "{}");
		},
	});
	app.use(Vuetify.createVuetify());
	app.mount("#app");
});
