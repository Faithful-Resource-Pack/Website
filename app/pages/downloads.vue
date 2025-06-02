<template>
	<h1 class="title my-5 text-center">Downloads</h1>
	<template v-for="(editions, pack) in alive" :key="pack">
		<h2 :id="hashify(pack)" class="text-center subtitle mb-0 download-title">
			<nuxt-link class="download-hashtag" title="Copy URL to clipboard" :to="`#${hashify(pack)}`">
				#</nuxt-link
			>{{ pack }}
		</h2>
		<template v-for="({ downloads, files }, edition) in editions" :key="edition">
			<h3 class="text-center my-3">{{ edition }} Edition</h3>
			<download-table :downloads :files />
		</template>
		<br /><br />
	</template>
	<h2 class="text-center subtitle mb-0">Discontinued</h2>
	<template v-for="({ downloads, files }, name) in discontinued" :key="name">
		<h3 class="text-center my-3">{{ name }}</h3>
		<download-table :downloads :files />
	</template>
</template>

<script>
import DownloadTable from "~/components/downloads/download-table.vue";

// expand this with new packs as necessary
const DOWNLOAD_DATA = [
	{
		// json filename
		json: "faithful_32x_java",
		// curseforge project id
		curse: "436482",
		// display name
		name: "Faithful 32x",
		// display edition
		edition: "Java",
		// whether to display at bottom
		discontinued: false,
	},
	{
		json: "faithful_32x_bedrock",
		curse: "507188",
		name: "Faithful 32x",
		edition: "Bedrock",
	},
	{
		json: "faithful_64x_java",
		curse: "419139",
		name: "Faithful 64x",
		edition: "Java",
	},
	{
		json: "faithful_64x_bedrock",
		curse: "694024",
		name: "Faithful 64x",
		edition: "Bedrock",
	},
	{
		json: "faithful_32x_dungeons",
		curse: "501546",
		name: "Faithful 32x for Minecraft Dungeons",
		discontinued: true,
	},
];

export default defineNuxtComponent({
	components: {
		DownloadTable,
	},
	async asyncData() {
		// set object order by which ones come first
		const downloadData = {
			alive: DOWNLOAD_DATA.filter((d) => !d.discontinued).reduce((acc, cur) => {
				acc[cur.name] ||= {};
				acc[cur.name][cur.edition] = {};
				return acc;
			}, {}),
			discontinued: DOWNLOAD_DATA.filter((d) => d.discontinued).reduce((acc, cur) => {
				acc[cur.name] = {};
				return acc;
			}, {}),
		};

		await Promise.all(
			DOWNLOAD_DATA.map(async ({ discontinued, name, edition, json, curse }) => {
				const [downloads, { files }] = await Promise.all([
					// vite limitation, can't do regular $fetch here
					import(`public/downloads/${json}.json`)
						.then((res) => res.default)
						.catch((err) => {
							console.error(err);
							return {};
						}),
					$fetch(`https://api.cfwidget.com/${curse}`).catch((err) => {
						console.error(err);
						return [];
					}),
				]);
				// nested fields already set up
				if (discontinued) downloadData.discontinued[name] = { downloads, files };
				else downloadData.alive[name][edition] = { downloads, files };
			}),
		);

		// after the promise.all everything has finished fetching into downloadData
		return downloadData;
	},
	methods: {
		hashify(id) {
			// vue router really hates spaces in HTML ids
			return encodeURIComponent(id.replace(/ /g, "-"));
		},
	},
});
</script>

<style scoped lang="scss">
.download-title {
	// compensate for the # and space
	margin-left: -1.5ch;
	&:hover {
		.download-hashtag {
			opacity: 1;
			cursor: pointer;
		}
	}
}

.download-hashtag {
	opacity: 0;
}
</style>
