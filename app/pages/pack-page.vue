<script setup>
definePageMeta({
	layout: "no-container",
	disableDefaultMeta: true,
});

// eslint-disable-next-line vue/valid-define-props
const { title, description, banner } = defineProps();

// the given banner URL doesn't have the wordmark so we chop up the url to create a new one with the wordmark
const packID = banner.split("/").at(-1).split(".")[0];
const image = `https://database.faithfulpack.net/images/branding/social_media/banners/github/${packID}_banner.png`;
useSeoMeta(generateMetaTags({ title, description: removeMd(description), image }));
</script>

<template>
	<hero-section :background="banner" :wordmark :wordmark-alt="title">
		<template #actions>
			<div style="height: 100px" />
		</template>
	</hero-section>
	<div class="container">
		<v-alert v-if="warning" :title="warning.split('\n')[0]" type="error" class="mb-3">
			{{ warning.split("\n")?.[1] || "" }}
		</v-alert>
		<div class="card card-body card-text">
			<!-- eslint-disable-next-line vue/no-v-html -->
			<div v-html="compileMarkdown(description)"></div>
			<div v-if="buttons" class="button-row ga-4">
				<nuxt-link
					v-for="({ to, text }, i) in buttons"
					:key="to"
					class="btn"
					:class="i === 0 ? 'btn-primary' : 'btn-secondary'"
					:to
					:style="buttons.length === 1 ? 'width: 50%; flex-grow: 0' : ''"
				>
					{{ text }}
				</nuxt-link>
			</div>
		</div>

		<nuxt-link v-if="action" :to="action.to" class="btn btn-secondary btn-lg block my-5">
			{{ action.text }}
		</nuxt-link>
	</div>
</template>

<script>
import HeroSection from "~/components/lib/hero-section.vue";
import removeMd from "remove-markdown";

// routed through the main nuxt config file (since they're statically generated)
export default defineNuxtComponent({
	name: "pack-page",
	components: {
		HeroSection,
	},
	props: {
		title: {
			type: String,
			required: true,
		},
		banner: {
			type: String,
			required: true,
		},
		wordmark: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		buttons: {
			type: Array,
			required: false,
			default: null,
		},
		downloads: {
			type: Object,
			required: false,
			default: null,
		},
		warning: {
			type: String,
			required: false,
			default: null,
		},
		action: {
			type: Object,
			required: false,
			default: null,
		},
		// not used but nuxt complains about extra props otherwise
		permalink: {
			type: String,
			required: true,
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;

.button-row {
	display: flex;
	flex-direction: row;
	justify-content: center;

	// stretch buttons to fill row
	> * {
		flex-grow: 1;
	}

	@media screen and (max-width: $breakpoint-md) {
		flex-direction: column;
	}
}
</style>
