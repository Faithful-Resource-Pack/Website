<template>
	<div v-if="addon && addon.approval?.status === 'approved'">
		<screenshot-modal v-model="modalOpened" :src="currentImage" />

		<h1 class="title text-center my-5">{{ addon.name }}</h1>

		<v-row :style="{ display: $vuetify.display.mdAndUp ? 'flex' : 'block' }">
			<v-col :md="$vuetify.display.mdAndUp ? 9 : 10" style="max-width: 100%">
				<div class="card mb-6">
					<div class="carousel-container">
						<v-carousel
							v-model="currentImageIndex"
							:show-arrows="screenshots.length ? 'hover' : false"
							hide-delimiters
							theme="dark"
							height="auto"
						>
							<v-carousel-item
								v-for="src in reel"
								:key="src"
								:src
								class="cursor-pointer"
								@click="openModal"
							/>
						</v-carousel>
						<button class="btn btn-secondary btn-icon btn-modal" @click="openModal">
							<v-icon icon="mdi-fullscreen" />
						</button>
					</div>
					<div v-if="screenshots.length" class="reel-container">
						<div v-for="(src, i) in reel" :key="src" class="flex-0-0">
							<img
								:ref="`reel-${i}`"
								:src
								class="reel-image zoom-hitbox zoom-affected"
								:class="i === currentImageIndex ? 'selected' : 'deselected'"
								@click="selectImage(src)"
							/>
						</div>
					</div>
				</div>

				<!-- eslint-disable-next-line vue/no-v-html -->
				<div class="card card-body card-text" v-html="compileMarkdown(addon.description)" />
			</v-col>
			<v-col class="order-first" :md="$vuetify.display.mdAndUp ? 3 : 2" style="max-width: 100%">
				<div class="card card-body addon-info">
					<compatibility-card :options="addon.options" />
				</div>
				<div class="card card-body addon-info">
					<h2 class="text-center">
						{{ Object.keys(authors).length === 1 ? "Author" : "Authors" }}
					</h2>
					<author-widget v-for="author in authors" :key="author.id" :author />
				</div>
				<div class="card card-body addon-info">
					<h2 class="text-center">Details</h2>
					<p class="mb-0">Add-on ID: {{ addon.id }}</p>
					<v-tooltip v-if="addon.last_updated" location="bottom">
						<template #activator="{ props }">
							<p class="cursor-help mb-0" v-bind="props">
								Last updated {{ relativeDate(addon.last_updated) }}
							</p>
						</template>
						{{ exactDate(addon.last_updated, DATETIME_MED) }}
					</v-tooltip>
				</div>
			</v-col>
		</v-row>

		<h2 id="downloads" class="subtitle my-5 text-center">
			{{ downloads.length === 1 ? "Download" : "Downloads" }}
		</h2>
		<nuxt-link
			v-for="{ name, source } in downloads"
			:key="source"
			:to="source"
			class="btn block btn-lg btn-primary"
		>
			<media-icon size="small" :icon="name" fallback="download" />
			<span class="ml-2">{{ name }}</span>
		</nuxt-link>
		<br />
		<discord-button />
	</div>
</template>

<script>
import MediaIcon from "~/components/lib/media-icon.vue";
import ScreenshotModal from "~/components/lib/screenshot-modal.vue";
import AuthorWidget from "~/components/addon/author-widget.vue";
import CompatibilityCard from "~/components/addon/compatibility-card.vue";
import DiscordButton from "~/components/lib/discord-button.vue";

// I hate how ESM can't double destructure like cjs
import { DateTime } from "luxon";
const { DATETIME_MED } = DateTime;

export default defineNuxtComponent({
	components: {
		MediaIcon,
		ScreenshotModal,
		AuthorWidget,
		CompatibilityCard,
		DiscordButton,
	},
	data() {
		return {
			currentImageIndex: 0,
			modalOpened: false,
			DATETIME_MED,
		};
	},
	setup() {
		definePageMeta({
			disableDefaultMeta: true,
		});
	},
	async asyncData() {
		const route = useRoute();
		const { apiURL } = useRuntimeConfig().public;
		try {
			const addon = await $fetch(`${apiURL}/addons/${route.params.slug}/all`);
			const authorData = await $fetch(`${apiURL}/users/${addon.authors.join(",")}`);

			const authors = Array.isArray(authorData) ? authorData : [authorData];
			const title = `Add-on: ${addon.name} by ${listify(authors.map((u) => u.username).filter((u) => u)) || "Anonymous"}`;
			const image = addon.files.find((el) => el.use === "header").source;

			useSeoMeta(generateMetaTags({ title, description: addon.description, image }));

			return {
				addon,
				authors,
				files: addon.files,
			};
		} catch (err) {
			throw createError({ statusCode: 404, statusMessage: String(err) });
		}
	},
	methods: {
		selectImage(url) {
			const id = this.reel.findIndex((r) => r === url);
			this.currentImageIndex = id;
		},
		openModal() {
			this.modalOpened = true;
		},
	},
	computed: {
		header() {
			return this.files.find((el) => el.use === "header").source;
		},
		screenshots() {
			return this.files
				.filter((el) => el.use === "carousel" || el.use === "screenshot")
				.map((el) => el.source);
		},
		reel() {
			return [this.header, ...this.screenshots];
		},
		currentImage() {
			return this.reel[this.currentImageIndex];
		},
		downloads() {
			return this.files.filter((el) => el.use === "download");
		},
	},
	watch: {
		currentImageIndex(newValue) {
			const img = this.$refs[`reel-${newValue}`][0];
			img.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables.scss" as *;

.addon-info {
	padding: 1rem;
	// 12 * 2
	margin-bottom: 24px;
}

.carousel-container {
	position: relative;
}

.btn-modal {
	position: absolute;
	top: $padding-card;
	right: $padding-card;
}

.reel-container {
	display: flex;
	flex-flow: row nowrap;
	overflow-x: auto;
	scrollbar-width: none;
	margin: $padding-card;
	gap: $padding-card;
}

.reel-image {
	border-radius: $border-radius;
	height: 64px;
	filter: brightness(0.3);
	transition: $transition-zoom;
}

.reel-image.selected {
	filter: none;
}

.reel-image.deselected:hover {
	filter: brightness(1.1);
}
</style>
