<template>
	<div v-if="addon && addon.approval?.status === 'approved'">
		<screenshot-modal v-model="modal" :src="modalImage" />

		<h1 class="title text-center my-5">{{ addon.name }}</h1>

		<v-row :style="{ display: $vuetify.display.mdAndUp ? 'flex' : 'block' }">
			<v-col :md="$vuetify.display.mdAndUp ? 9 : 10" style="max-width: 100%">
				<img :src="header" class="header-img mb-6" />

				<div v-if="screenshots.length" class="card card-body mb-6">
					<h2 class="text-center">Gallery</h2>
					<div class="res-grid-3">
						<div v-for="image in screenshots" :key="image">
							<div class="card img-card">
								<img :src="image" @click="openModal(image)" />
							</div>
						</div>
					</div>
				</div>

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
					<p v-if="addon.last_updated" class="mb-0" :title="preciseDate">
						Last updated {{ relativeDate }}
					</p>
				</div>
			</v-col>
		</v-row>

		<h2 class="subtitle my-5 text-center">
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

import { DateTime } from "luxon";

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
			modal: false,
			modalImage: "",
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
			const image =
				addon.files.find((el) => el.use === "header")?.source ||
				"https://database.faithfulpack.net/images/website/posts/placeholder.jpg";

			useSeoMeta(generateMetaTags({ title, description: addon.description, image }));

			return {
				addon,
				authors,
				files: addon.files,
			};
		} catch (err) {
			throw createError({ statusCode: 404, statusMessage: String(err), fatal: true });
		}
	},
	methods: {
		openModal(url) {
			this.modalImage = url;
			this.modal = true;
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
		downloads() {
			return this.files.filter((el) => el.use === "download");
		},
		relativeDate() {
			return DateTime.fromMillis(this.addon.last_updated).toRelative();
		},
		preciseDate() {
			return DateTime.fromMillis(this.addon.last_updated).toLocaleString(DateTime.DATETIME_MED);
		},
	},
});
</script>

<style scoped lang="scss">
.addon-info {
	padding: 1rem;
	// 12 * 2
	margin-bottom: 24px;
}
</style>
