<template>
	<p v-if="post.discontinued" class="red banner h2">This project has been discontinued.</p>
	<h1 v-if="post.title" class="title my-5 text-center">{{ post.title }}</h1>
	<template v-if="post.header_img">
		<img :src="post.header_img" class="header-img" style="width: 100%" />
		<br />
	</template>

	<hr />

	<div
		v-if="post.description"
		class="card card-body card-text"
		v-html="compiledMarkdown(post.description)"
	/>
	<post-downloads v-if="Object.keys(post.downloads).length" :downloads="post.downloads" />
	<template v-if="Object.keys(post.changelog).length">
		<br />
		<h2 class="subtitle my-5 text-center">Changelog</h2>
		<div class="card card-body">
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
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";


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
	methods: {
		compiledMarkdown(text) {
			return DOMPurify.sanitize(marked.parse(text));
		},
	},
});
</script>
