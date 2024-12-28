document.addEventListener("DOMContentLoaded", () => {
	const app = Vue.createApp({
		components: {
			DownloadTable: Vue.defineAsyncComponent(() => import("./download-table.js")),
		},
		template: `
			<h1 class="title my-5 text-center">Downloads</h1>
			<template v-for="(editions, pack) in alive" :key="pack">
				<h2 :id="pack" class="text-center subtitle mb-0 download-title" @click="copyText(pack)">
					<a class="download-hashtag" title="Copy URL to clipboard" :href="'#' + pack">#</a>{{ pack }}
				</h2>
				<template v-for="(data, edition) in editions" :key="edition">
					<h3 class="text-center my-3">{{ edition }} Edition</h3>
					<download-table
						:downloads="data.downloads"
						:files="data.files"
					/>
				</template>
				<br /><br />
			</template>
			<h2 class="text-center subtitle mb-0">Discontinued</h2>
			<template v-for="(data, name) in discontinued" :key="name">
				<h3 class="text-center my-3">{{ name }}</h3>
				<download-table
					:downloads="data.downloads"
					:files="data.files"
				/>
			</template>
		`,
		data() {
			return {
				alive: {
					"Faithful 32x": {
						Java: {
							downloads: [],
							files: [],
						},
						Bedrock: {
							downloads: [],
							files: [],
						},
					},
					"Faithful 64x": {
						Java: {
							downloads: [],
							files: [],
						},
						Bedrock: {
							downloads: [],
							files: [],
						},
					},
				},
				discontinued: {
					"Faithful 32x for Minecraft Dungeons": {
						downloads: [],
						files: [],
					},
				},
			};
		},
		methods: {
			fetchData({ json, curse, name, edition, discontinued }) {
				fetch(`data/downloads/${json}.json`)
					.then((res) => res.json())
					.then((downloads) => {
						if (discontinued) this.discontinued[name].downloads = downloads;
						else this.alive[name][edition].downloads = downloads;
					})
					.catch(console.error);
				fetch(`https://api.cfwidget.com/${curse}`)
					.then((res) => res.json())
					.then(({ files }) => {
						if (discontinued) this.discontinued[name].files = files;
						else this.alive[name][edition].files = files;
					})
					.catch(console.error);
			},
			copyText(id) {
				location.hash = `#${encodeURIComponent(id)}`;
				// write it before copying the whole URL (don't have to worry about multiple packs stacking)
				navigator.clipboard.writeText(location.href);
			},
		},
		created() {
			Promise.all([
				this.fetchData({
					json: "faithful_32x_java",
					curse: "436482",
					name: "Faithful 32x",
					edition: "Java",
				}),
				this.fetchData({
					json: "faithful_32x_bedrock",
					curse: "507188",
					name: "Faithful 32x",
					edition: "Bedrock",
				}),
				this.fetchData({
					json: "faithful_64x_java",
					curse: "419139",
					name: "Faithful 64x",
					edition: "Java",
				}),
				this.fetchData({
					json: "faithful_64x_bedrock",
					curse: "694024",
					name: "Faithful 64x",
					edition: "Bedrock",
				}),
				this.fetchData({
					json: "faithful_32x_dungeons",
					curse: "501546",
					name: "Faithful 32x for Minecraft Dungeons",
					discontinued: true,
				}),
			]);
		},
	});

	app.mount("#app");
});
