/* global Vue */

document.addEventListener("DOMContentLoaded", () => {
	const app = Vue.createApp({
		data() {
			return {
				addons: {},
				posts: {},
				keys: [
					"numberOfMinecraftVersions",
					"totalNumberOfResourcePacksStored",
					"numberOfModsSupported",
				],
				messages: {
					loading: "Loading",
					numberOfMinecraftVersions: "Minecraft Versions Supported",
					numberOfModsSupported: "Mods Supported",
					totalNumberOfResourcePacksStored: "Mod Resource Packs Stored",
				},
				loading: true,
				numberOfMinecraftVersions: undefined,
				numberOfModsSupported: undefined,
				totalNumberOfResourcePacksStored: undefined,
			};
		},
		computed: {
			loadingMessage() {
				return '<i class="fas spin"></i> ' + this.messages.loading;
			},
			addonsStats() {
				// super duper dynamic addons stats
				const allEditions = [];
				const result = Object.values(this.addons)
					.map((e) => e.options.tags)
					.reduce((acc, tags) => {
						const resolutions = tags.filter((t) => !isNaN(parseInt(t)));
						// everything else
						const editions = tags.filter((t) => !resolutions.includes(t));
						for (const resolution of resolutions) {
							acc[resolution] ||= {};
							for (const edition of editions) {
								if (!allEditions.includes(edition)) allEditions.push(edition);
								acc[resolution][edition] ||= 0;
								++acc[resolution][edition];
							}
						}
						return acc;
					}, {});
				Object.keys(result).forEach((res) => {
					allEditions
						.filter((e) => !result[res][e])
						.forEach((e) => {
							result[res][e] = 0;
						});
				});

				return result;
			},
			postStats() {
				return Object.values(this.posts)
					.map((post) => post.permalink)
					.reduce(
						(acc, cur) => {
							if (cur.startsWith("/compliance32x") || cur.startsWith("/faithful32x"))
								++acc.f32;
							if (cur.startsWith("/compliance64x") || cur.startsWith("/faithful64x"))
								++acc.f64;
							return acc;
						},
						{ f32: 0, f64: 0 },
					);
			},
		},
		created() {
			fetch("https://api.faithfulpack.net/v2/mods/raw")
				.then((res) => res.json())
				.then((json) => {
					const mods = json;
					const versionList = [];
					let resourcePacks = 0;
					let modAmount = 0;

					Object.values(mods)
						.map((e) => e.resource_pack.versions)
						.forEach((versions) => {
							versions.forEach((version) => {
								// version sum
								if (!versionList.includes(version)) versionList.push(version);

								// resource pack sum
								++resourcePacks;
							});
							// mod sum
							++modAmount;
						});

					this.numberOfMinecraftVersions = versionList.length;
					this.numberOfModsSupported = modAmount;
					this.totalNumberOfResourcePacksStored = resourcePacks;

					this.loading = false;
				})
				.catch(console.error);

			fetch("https://api.faithfulpack.net/v2/addons/approved")
				.then((response) => response.json())
				.then((data) => {
					this.addons = data;
				})
				.catch(() => {
					this.addons = undefined;
				});

			fetch("https://api.faithfulpack.net/v2/posts/approved")
				.then((res) => res.json())
				.then((data) => {
					this.posts = data;
				})
				.catch(() => {
					this.posts = undefined;
				});
		},
	});
	app.mount("#stats");
});
