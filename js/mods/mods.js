/* global location, Vue, MinecraftUtils */

document.addEventListener("DOMContentLoaded", () => {
	const app = Vue.createApp({
		components: {
			BrokenPage: Vue.defineAsyncComponent(() => import("../components/broken-page.js")),
			MinecraftModList: Vue.defineAsyncComponent(() =>
				import("./components/mods/minecraft-mod-list.js"),
			),
			MinecraftVersions: Vue.defineAsyncComponent(() =>
				import("./components/mods/minecraft-versions.js"),
			),
			DownloadMinecraftVersion: Vue.defineAsyncComponent(() =>
				import("./components/mods/download-minecraft-version.js"),
			),
			LocalDownload: Vue.defineAsyncComponent(() => import("./components/local-download.js")),
			ZipOptions: Vue.defineAsyncComponent(() => import("./components/zip-options.js")),
		},
		data() {
			return {
				form: {
					search: "",
					minSearchLetters: 3,
				},
				isMounted: false,
				isLoadingDownload: false,
				loading: true,
				mods: [],
				sentences: {
					searchAdvice: "You can search by name or by version",
					lettersLeft: "letters to start search...",
					loading: '<i class="fas spin"></i> Loading mods...',
					failed: "Failed to load mods. Check console for more informations",
					noresults: "No results found for your search: ",
					noResultsVersion: "No results found for version",
					typeAnotherVersion: "Try to type another version than",
				},
				versions: {
					1: {
						min: "1.6.1",
						max: "1.8.9",
					},
					2: {
						min: "1.9",
						max: "1.10.2",
					},
					3: {
						min: "1.11",
						max: "1.12.2",
					},
					4: {
						min: "1.13",
						max: "1.14.4",
					},
					5: {
						min: "1.15",
						max: "1.16.1",
					},
					6: {
						min: "1.16.2",
						max: "1.16.5",
					},
					7: {
						min: "1.17.0",
						max: "1.17.1",
					},
					8: {
						min: "1.18.0",
						max: "1.18.2",
					},
					9: {
						min: "1.19",
						max: "1.100",
					},
				},
				breakpointLimits: {
					xs: 575,
					sm: 785,
					md: 1200,
					lg: Infinity,
				},
				windowSize: window.innerWidth,
			};
		},
		computed: {
			apiURL() {
				return window.location.hostname === "127.0.0.1"
					? "http://localhost:8000"
					: "https://api.faithfulpack.net";
			},
			breakpoints() {
				const result = {};

				const keys = Object.keys(this.breakpointLimits);

				for (let i = 0; i < keys.length; ++i) {
					result[keys[i]] = this.windowSize <= this.breakpointLimits[keys[i]];
				}

				return result;
			},
			canPackMods() {
				return this.modPackageVersion !== undefined;
			},
			emptyTable() {
				if (this.loading === true) return this.sentences.loading;

				if (this.mods.length === 0) return this.sentences.failed;

				if (
					this.form.search.length >= 1 &&
					!isNaN(parseInt(this.form.search.charAt(0))) &&
					this.filteredMods.length === 0
				) {
					return this.sentences.noResultsVersion + " " + this.form.search;
				}

				if (this.filteredMods.length === 0)
					return this.sentences.noresults + this.form.search;

				return "";
			},
			/**
			 * Filter mods following the research
			 * @returns {Object} corresponding mods
			 */
			filteredMods() {
				if (this.form.search.length >= 1 && !isNaN(parseInt(this.form.search.charAt(0)))) {
					return this.mods.filter((mod) => {
						let found = false;
						let i = 0;
						while (i < mod.resource_pack.versions.length && !found) {
							found = mod.resource_pack.versions[i].startsWith(this.form.search);
							++i;
						}

						return found;
					});
				}

				if (this.form.search.length >= this.form.minSearchLetters) {
					return this.mods.filter((mod) => {
						const searchTerm = this.form.search.toLowerCase();
						if (this.modToDisplayName(mod).toLowerCase().includes(searchTerm))
							return true;

						let inAliases = false;
						let i = 0;
						let aliases = mod.aliases || [];
						while (i < aliases.length && !inAliases) {
							inAliases = aliases[i].toLowerCase().includes(searchTerm);
							i++;
						}

						return inAliases;
					});
				}
				return this.mods;
			},
			exactVersionMode() {
				return (
					this.modSelection.findIndex((mod) => {
						const correspondingNumbers = MinecraftUtils.minecraftVersionsToNumbers([
							this.versions["1"].min,
							mod.version,
						]);

						return correspondingNumbers[1] < correspondingNumbers[0];
					}) !== -1
				);
			},
			modSelection() {
				const selection = this.mods.filter((mod) => mod.selected && !!mod.versionSelected);

				return selection.map((mod) => {
					return this.modToSelection(mod);
				});
			},
			downloadButtonText() {
				return this.isLoadingDownload
					? '<i class="fas spin"></i> Sending request...'
					: "Download Resource Pack";
			},
			minecraftVersions() {
				const mcVersions = [];

				for (let i = 0; i < this.mods.length; ++i) {
					for (let a = 0; a < this.mods[i].resource_pack.versions.length; ++a) {
						let index;
						if (
							(index = mcVersions.findIndex(
								(item) => item.version === this.mods[i].resource_pack.versions[a],
							)) === -1
						) {
							mcVersions.push({
								version: this.mods[i].resource_pack.versions[a],
								count: 1,
							});
						} else {
							mcVersions[index].count = mcVersions[index].count + 1;
						}
					}
				}

				return mcVersions;
			},
			modPackageVersion() {
				// you can pack mods if they have the same package version number
				// (list of package number must not change)

				// we need mods and versions to be loaded
				if (this.loading || this.modSelection.length === 0) {
					return undefined;
				}

				let result;
				let versionChanged = false;
				let minecraftVersion;

				let i = 0;
				while (i < this.modSelection.length && !versionChanged) {
					if (this.exactVersionMode) {
						const tmp = this.modSelection[i].version;

						if (minecraftVersion === undefined) {
							minecraftVersion = tmp;
						} else {
							if (minecraftVersion !== tmp) {
								versionChanged = true;
							}
						}
					} else {
						const tmp = this.packageVersion(this.modSelection[i].version);

						if (result === undefined) {
							result = tmp;
						} else {
							if (result !== tmp) {
								versionChanged = true;
							}
						}
					}

					++i;
				}

				return versionChanged ? undefined : result || minecraftVersion;
			},
			searchAdvice() {
				if (this.loading === true || this.mods.length === 0) {
					return "";
				}

				if (
					this.form.search.length >= 1 &&
					!isNaN(parseInt(this.form.search.charAt(0))) &&
					this.filteredMods.length === 0
				)
					return this.sentences.typeAnotherVersion + " " + this.form.search;

				if (this.form.search.length < this.form.minSearchLetters)
					return String(
						this.form.minSearchLetters -
							this.form.search.length +
							" " +
							this.sentences.lettersLeft,
					);
			},
		},
		methods: {
			modToDisplayName(mod) {
				return mod.name;
			},
			modToRepoName(mod) {
				if (!mod || !mod.resource_pack || !mod.resource_pack.git_repository) {
					console.error(mod);
					throw new Error("Mod doesn't have a repository");
				}
				return mod.resource_pack.git_repository.split("/").pop();
			},
			modToRepoURL(mod) {
				return mod.resource_pack.git_repository;
			},
			modToSelection(mod, version = undefined) {
				return {
					name: this.modToRepoName(mod),
					displayName: this.modToDisplayName(mod),
					repositoryURL: this.modToRepoURL(mod),
					version: mod.versionSelected || version,
				};
			},
			packageVersion(modVersion) {
				const numbers = MinecraftUtils.minecraftVersionToNumberArray(modVersion);

				const versionKeys = Object.keys(this.versions);

				let i = 0;
				let result = -1;
				while (i < versionKeys.length && result === -1) {
					const otherNumbersMin = MinecraftUtils.minecraftVersionToNumberArray(
						this.versions[versionKeys[i]].min,
					);
					const otherNumbersMax = MinecraftUtils.minecraftVersionToNumberArray(
						this.versions[versionKeys[i]].max,
					);

					// we compute the corresponding numbers
					const correspondingNumbers = MinecraftUtils.minecraftVersionsToNumbers([
						numbers,
						otherNumbersMin,
						otherNumbersMax,
					]);

					if (
						correspondingNumbers[0] >= correspondingNumbers[1] &&
						correspondingNumbers[0] <= correspondingNumbers[2]
					) {
						result = versionKeys[i];
					}

					++i;
				}

				if (result === -1) throw new Error("No versions file");

				return result;
			},
		},
		mounted() {
			this.isMounted = true;

			// acquire mods json from Faithful database
			fetch(`${this.apiURL}/v2/mods/raw`)
				.then((res) => res.json())
				.then((json) => {
					// sort by mod name value
					const sortable = [];
					for (const mod in json) {
						sortable.push([mod, json[mod]]);
					}
					sortable.sort((a, b) => {
						if (a[1].name.toLowerCase() < b[1].name.toLowerCase()) return -1;
						if (a[1].name.toLowerCase() > b[1].name.toLowerCase()) return 1;
						return 0;
					});

					const sorted = [];
					sortable.forEach((item) => sorted.push({ ...item[1], id: item[0] }));

					this.mods = sorted;
					this.loading = false;
				})
				.catch(console.error);

			// we need this part for breakpoints
			this.windowSize = window.innerWidth;
			window.addEventListener("resize", () => {
				this.windowSize = window.innerWidth;
			});
		},
	});
	app.mount("#app");
});
