<template>
	<v-alert
		v-if="post.discontinued"
		title="This project has been discontinued!"
		type="error"
		class="my-3"
	>
		This project has been deprecated and is no longer being actively worked on. Please contact a
		staff member on Discord if you're interested in maintaining it.
	</v-alert>
	<v-alert
		v-if="post.permalink.includes('compliance')"
		title="This project has been renamed!"
		type="info"
		class="my-3"
	>
		Faithful was briefly known as Compliance due to the current team starting as a breakaway project
		from the old fraudulent Faithful leadership, which maintained and monetized the pack from
		2016–2020 without permission. See
		<nuxt-link
			to="/faq/history#Who%20is%20Kraineff,%20who%20is%20Vattic,%20and%20why%20are%20there%20two%20Faithfuls?"
			class="text-white text-decoration-underline"
		>
			this FAQ answer</nuxt-link
		>
		for more information about Faithful's history.
	</v-alert>
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
		class="card card-body body-text"
		v-html="compileMarkdown(post.description)"
	/>
	<!-- eslint-enable vue/no-v-html -->
	<post-downloads v-if="Object.keys(post.downloads || {}).length" :downloads="post.downloads" />
	<template v-if="Object.keys(post.changelog || {}).length">
		<br />
		<h2 id="changelog" class="subtitle my-5 text-center">Changelog</h2>
		<div class="card card-body body-text">
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
