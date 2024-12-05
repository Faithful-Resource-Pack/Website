document.addEventListener("DOMContentLoaded", () => {
	const app = Vue.createApp({
		components: {
			PostDownloads: Vue.defineAsyncComponent(() => import("./post-downloads.js")),
			PostChangelog: Vue.defineAsyncComponent(() => import("./post-changelog.js")),
			DiscordButton: Vue.defineAsyncComponent(() => import("../components/discord-button.js")),
		},
		template: `
			<h2 v-if="data.discontinued" class="red banner">This project has been discontinued.</h2>
			<h2 v-if="data.title" class="display-3 my-5 text-center">{{ data.title }}</h2>
			<template v-if="data.header_img">
				<img class="fancy-card-1x" style="width: 100%" :src="data.header_img" alt="">
				<br />
			</template>

			<hr />

			<div v-if="data.description" class="card card-body">
				<p class="h5" v-html="data.description"></p>
			</div>
			<post-downloads v-if="data.downloads" :downloads="data.downloads" />
			<template v-if="data.changelog">
				<br />
				<h2 class="display-4 my-5 text-center">Changelog</h2>
				<div class="card card-body">
					<post-changelog :item="data.changelog" :level="3" />
				</div>
			</template>
			<br />
			<discord-button />
		`,
		data() {
			return {
				data: JSON.parse(window.postData),
			};
		},
	});

	app.mount("#app");
});
