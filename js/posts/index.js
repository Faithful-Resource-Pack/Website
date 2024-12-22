document.addEventListener("DOMContentLoaded", () => {
	const app = Vue.createApp({
		components: {
			PostDownloads: Vue.defineAsyncComponent(() => import("./post-downloads.js")),
			PostChangelog: Vue.defineAsyncComponent(() => import("./post-changelog.js")),
			DiscordButton: Vue.defineAsyncComponent(() =>
				import("../components/discord-button.js"),
			),
		},
		template: `
			<p v-if="data.discontinued" class="red banner h2">This project has been discontinued.</p>
			<h1 v-if="data.title" class="title my-5 text-center">{{ data.title }}</h1>
			<template v-if="data.header_img">
				<img :src="data.header_img" class="header-img" style="width: 100%">
				<br />
			</template>

			<hr />

			<div v-if="data.description" class="card card-body card-text">
				<p v-html="data.description" />
			</div>
			<post-downloads v-if="data.downloads" :downloads="data.downloads" />
			<template v-if="data.changelog">
				<br />
				<h2 class="subtitle my-5 text-center">Changelog</h2>
				<div class="card card-body">
					<post-changelog :item="data.changelog" />
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
