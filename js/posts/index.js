document.addEventListener("DOMContentLoaded", () => {
	const PostDownloads = () => import("./post-downloads.js");
	const PostChangelog = () => import("./post-changelog.js");
	const v = new Vue({
		el: "#app",
		components: {
			PostDownloads,
			PostChangelog,
		},
		template: `
			<div>
				<h2 v-if="data.discontinued" class="red banner">This project has been discontinued.</h2>
				<h2 v-if="data.title" class="display-3 my-5 text-center">{{ data.title }}</h2>
				<template v-if="data.header_img">
					<img class="fancy-card-1x" style="width: 100%" :src="data.header_img" alt="">
					<br />
				</template>
				<hr />
				<div v-if="data.description" class="card card-body">
					<p class="h4 m-0" v-html="data.description"></p>
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
				<a href="https://discord.gg/sN9YRQbBv7">
					<p class="blurple banner">Start a discussion in our Discord!</p>
				</a>
			</div>
		`,
		data() {
			return {
				data: JSON.parse(window.postData),
			};
		},
	});
});
