document.addEventListener("DOMContentLoaded", () => {
	const app = Vue.createApp({
		data() {
			return {
				addons: {},
				posts: {},
				mods: {},
				messages: {
					versions: "Minecraft Versions Supported",
					supportedMods: "Mods Supported",
					storedPacks: "Mod Resource Packs Stored",
				},
			};
		},
		computed: {
			addonStats() {
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
			modStats() {
				const allMods = Object.values(this.mods);
				const supportedMods = allMods.length;
				const { storedPacks, versions } = allMods
					.map((mod) => mod.resource_pack.versions)
					.reduce(
						(acc, versions) => {
							versions.forEach((v) => {
								acc.versions.add(v);
								++acc.storedPacks;
							});
							return acc;
						},
						{ versions: new Set(), storedPacks: 0, },
					);
				return {
					versions: versions.size,
					storedPacks,
					supportedMods,
				}
			},
		},
		created() {
			fetch("https://api.faithfulpack.net/v2/mods/raw")
				.then((res) => res.json())
				.then((json) => {
					this.mods = json;
				})
				.catch(() => {
					this.mods = null;
				});

			fetch("https://api.faithfulpack.net/v2/addons/approved")
				.then((res) => res.json())
				.then((data) => {
					this.addons = data;
				})
				.catch(() => {
					this.addons = null;
				});

			fetch("https://api.faithfulpack.net/v2/posts/approved")
				.then((res) => res.json())
				.then((data) => {
					this.posts = data;
				})
				.catch(() => {
					this.posts = null;
				});
		},
	});
	app.mount("#stats");
});
