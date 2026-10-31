<template>
	<h1 class="title my-5 text-center">Download Archive</h1>
	<template v-for="(editions, pack) in alive" :key="pack">
		<h2 :id="hashify(pack)" class="text-center subtitle mb-0 download-title">
			<nuxt-link class="download-hashtag" title="Copy URL to clipboard" :to="`#${hashify(pack)}`">
				#</nuxt-link
			>{{ pack }}
		</h2>
		<template v-for="({ downloads, files }, edition) in editions" :key="edition">
			<p class="h3 text-center my-3">{{ edition }} Edition</p>
			<download-table :downloads :files class="mb-5" />
		</template>
		<br /><br />
	</template>
	<h2 class="text-center subtitle mb-0">Discontinued</h2>
	<template v-for="({ downloads, files }, name) in discontinued" :key="name">
		<p :id="hashify(name)" class="h3 text-center my-3 download-title">
			<nuxt-link class="download-hashtag" title="Copy URL to clipboard" :to="`#${hashify(name)}`">
				#</nuxt-link
			>{{ name }}
		</p>
		<download-table :downloads :files class="mb-5" />
	</template>
</template>

<script>
import DownloadTable from "~/components/downloads/archive/download-table.vue";
import downloadIndex from "../../public/data/download_archive_index.json";

export default defineNuxtComponent({
	components: {
		DownloadTable,
	},
	setup() {
		definePageMeta({
			layout: "text-container",
			name: "Download Archive",
		});
	},
	async asyncData() {
		// set object order by which ones come first
		const downloadData = {
			alive: downloadIndex
				.filter((d) => !d.discontinued)
				.reduce((acc, cur) => {
					acc[cur.name] ||= {};
					acc[cur.name][cur.edition] = {};
					return acc;
				}, {}),
			discontinued: downloadIndex
				.filter((d) => d.discontinued)
				.reduce((acc, cur) => {
					acc[cur.name] = {};
					return acc;
				}, {}),
		};

		await Promise.all(
			downloadIndex.map(async ({ discontinued, name, edition, json_filename, curseforge_id }) => {
				const [downloads, { files }] = await Promise.all([
					// even though this is async technically it counts as a fetch-like request
					import(`../../public/data/downloads/${json_filename}.json`)
						.then((res) => res.default)
						.catch((err) => {
							console.error(err);
							return {};
						}),
					$fetch(`https://api.cfwidget.com/${curseforge_id}`).catch((err) => {
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
		hashify(name) {
			// vue router really hates spaces in HTML ids
			return encodeURIComponent(name.replace(/ /g, "-"));
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
