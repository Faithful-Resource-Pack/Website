<template>
	<div class="text-center">
		<h1 class="title my-5">Faithful Statistics</h1>
		<h2 class="subtitle my-5">Main Packs</h2>
		<div class="res-grid-2">
			<h3>32x Releases</h3>
			<h3>
				<span class="badge badge-primary h1">{{ postStats.f32 }}</span>
			</h3>
			<h3>64x Releases</h3>
			<h3>
				<span class="badge badge-primary h1">{{ postStats.f64 }}</span>
			</h3>
		</div>

		<h2 class="subtitle my-5">Add-ons</h2>
		<div v-if="Object.keys(addonStats).length === 0 && addons !== null">
			<i class="fas spin"></i> Loading
		</div>
		<div v-else id="stats-addons" class="res-grid-2">
			<template v-for="res in Object.keys(addonStats)" :key="res">
				<div v-for="edi in Object.keys(addonStats[res])" :key="edi">
					<h3>
						<span>{{ res + " " + edi + " Add-ons" }}</span>
						<div class="badge-container">
							<span class="badge badge-primary h1 m-2">{{ addonStats[res][edi] }}</span>
						</div>
					</h3>
				</div>
			</template>
		</div>

		<h2 class="subtitle my-5">Mods</h2>
		<div v-if="Object.keys(modStats).length === 0 && mods !== null">
			<i class="fas spin"></i> Loading
		</div>
		<div v-else class="res-grid-3">
			<div v-for="mKey in Object.keys(messages)" :key="mKey">
				<h3>{{ messages[mKey] }}</h3>
				<h3>
					<span class="badge badge-primary h1">{{ modStats[mKey] }}</span>
				</h3>
			</div>
		</div>
	</div>
</template>

<script>
export default defineNuxtComponent({
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
	// for some reason <script setup> doesn't work with asyncData (???)
	setup() {
		definePageMeta({
			name: "Statistics",
		});
	},
	async asyncData() {
		const [mods, addons, posts] = await Promise.all([
			$fetch("https://api.faithfulpack.net/v2/mods/raw"),
			$fetch("https://api.faithfulpack.net/v2/addons/approved"),
			$fetch("https://api.faithfulpack.net/v2/posts/approved"),
		]);
		return {
			mods,
			addons,
			posts,
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
						if (cur.startsWith("/compliance32x") || cur.startsWith("/faithful32x")) ++acc.f32;
						if (cur.startsWith("/compliance64x") || cur.startsWith("/faithful64x")) ++acc.f64;
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
					{ versions: new Set(), storedPacks: 0 },
				);
			return {
				versions: versions.size,
				storedPacks,
				supportedMods,
			};
		},
	},
});
</script>
