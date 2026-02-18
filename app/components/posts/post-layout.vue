<template>
	<p v-if="post.discontinued" class="warning banner">This project has been discontinued.</p>
	<div v-if="post.title" class="text-center my-5">
		<h1 v-if="mainTitle" class="title mb-2">{{ mainTitle }}</h1>
		<h2 v-if="subtitle" class="subtitle">{{ subtitle }}</h2>
	</div>
	<template v-if="post.header_img">
		<img :src="post.header_img" class="header-img" />
		<br />
	</template>

	<hr />

	<!-- eslint-disable vue/no-v-html -->
	<div
		v-if="post.description"
		class="card card-body card-text"
		v-html="compileMarkdown(post.description)"
	/>
	<!-- eslint-enable vue/no-v-html -->
	<post-downloads v-if="Object.keys(post.downloads || {}).length" :downloads="post.downloads" />
	<template v-if="Object.keys(post.changelog || {}).length">
		<br />
		<h2 class="subtitle my-5 text-center">Changelog</h2>
		<div class="card card-body card-text">
			<post-changelog :item="post.changelog" />
		</div>
	</template>
	<br />
	<discord-button />
</template>

<script>
import DiscordButton from "~/components/lib/discord-button.vue";
import PostChangelog from "~/components/posts/post-changelog.vue";
import PostDownloads from "~/components/posts/post-downloads.vue";

export default defineNuxtComponent({
	name: "post-layout",
	components: {
		DiscordButton,
		PostDownloads,
		PostChangelog,
	},
	props: {
		post: {
			type: Object,
			required: true,
		},
	},
	computed: {
		mainTitle() {
			const split = this.post.title.split(": ");
			// single-part title, take whole thing
			if (split.length === 1) return this.post.title;
			return split.slice(1).join(": ");
		},
		subtitle() {
			// if there's only one part then it just returns itself
			const split = this.post.title.split(": ");
			if (split.length === 1) return "";
			return split[0];
		},
	},
});
</script>
