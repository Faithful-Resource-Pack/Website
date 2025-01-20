<template>
	<div class="text-center">
		<h1 class="title my-5">Faithful Statistics</h1>
		<h2 class="subtitle my-5">Main Packs</h2>
		<div class="stats-container">
			<h3>Faithful 32x Releases</h3>
			<v-chip v-bind="badgeProps">{{ postStats.f32 }}</v-chip>
		</div>
		<br />
		<div class="stats-container">
			<h3>Faithful 64x Releases</h3>
			<v-chip v-bind="badgeProps">{{ postStats.f64 }}</v-chip>
		</div>

		<h2 class="subtitle my-5">Add-ons</h2>
		<div v-if="Object.keys(addonStats).length === 0 && addons !== null">
			<v-progress-circular size="24" indeterminate /> Loading...
		</div>
		<div v-else class="res-grid-2">
			<template v-for="res in Object.keys(addonStats)" :key="res">
				<div v-for="edi in Object.keys(addonStats[res])" :key="edi" class="stats-container">
					<h3>{{ `${res} ${edi} Add-ons` }}</h3>
					<v-chip v-bind="badgeProps">{{ addonStats[res][edi] }}</v-chip>
				</div>
			</template>
		</div>

		<h2 class="subtitle my-5">Mods</h2>
		<div v-if="Object.keys(modStats).length === 0 && mods !== null">
			<v-progress-circular size="24" indeterminate /> Loading...
		</div>
		<div v-else class="res-grid-3">
			<div v-for="mKey in Object.keys(messages)" :key="mKey" class="stats-container">
				<h3>{{ messages[mKey] }}</h3>
				<v-chip v-bind="badgeProps">{{ modStats[mKey] }}</v-chip>
			</div>
		</div>
	</div>
</template>

<script>
export default defineNuxtComponent({
	data() {
		return {
			messages: {
				versions: "Versions Supported",
				supportedMods: "Mods Supported",
				storedPacks: "Total Mod Downloads",
			},
			// huge pain to copy/paste everywhere
			badgeProps: {
				color: "#007bff",
				variant: "flat",
				size: "large",
				density: "compact",
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

<style scoped lang="scss">
.stats-container {
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	align-items: center;
	gap: 1.5rem;
}
// hack for bypassing scoped styling
.v-chip * {
	font-size: 1.25rem;
}
</style>
