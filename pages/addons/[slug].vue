<template>
	<div v-if="addon && addon.approval?.status === 'approved'">
		<screenshot-modal v-model="modal" :image="modalImage" />

		<!-- vuetify overrides the bootstrap margin styles so we manually add them -->
		<h1
			class="title text-center"
			style="margin-top: 3rem !important; margin-bottom: 3rem !important"
		>
			{{ addon.name }}
		</h1>

		<v-row :style="{ display: $vuetify.display.mdAndUp ? 'flex' : 'block' }">
			<v-col :md="$vuetify.display.mdAndUp ? 9 : 10" style="max-width: 100%">
				<img :src="header" class="header-img" style="width: 100%" />

				<!-- you need two <br>s for some reason, no idea why -->
				<br /><br />

				<div class="card card-body" v-if="screenshots.length">
					<h3 class="text-center">Gallery</h3>
					<div class="res-grid-3">
						<div v-for="image in screenshots" :key="image">
							<div class="card img-card">
								<img :src="image" @click="openModal(image)" />
							</div>
						</div>
					</div>
				</div>

				<br />

				<div class="card card-body card-text" v-html="compiledMarkdown(addon.description)" />
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
					<p v-if="addon.last_updated" class="mb-0">Last Updated: {{ date }}</p>
				</div>
			</v-col>
		</v-row>

		<h2 id="downloads" class="subtitle text-center" style="margin-bottom: 3rem; margin-top: 2rem">
			Downloads
		</h2>
		<a
			v-for="file in downloads"
			:key="file.source"
			:href="file.source"
			class="btn block btn-lg btn-primary"
		>
			{{ file.name }}
		</a>
		<br /><br />
		<discord-button />
	</div>
</template>

<script>
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import ScreenshotModal from "~/components/lib/screenshot-modal.vue";
import AuthorWidget from "~/components/addon/author-widget.vue";
import CompatibilityCard from "~/components/addon/compatibility-card.vue";
import DiscordButton from "~/components/lib/discord-button.vue";

export default defineNuxtComponent({
	components: {
		ScreenshotModal,
		AuthorWidget,
		CompatibilityCard,
		DiscordButton,
	},
	data() {
		return {
			authors: [],
			modal: false,
			modalImage: "",
		};
	},
	async asyncData() {
		const route = useRoute();
		const addon = await $fetch(`https://api.faithfulpack.net/v2/addons/${route.params.slug}/all`);
		return {
			addon,
			files: addon.files,
		};
	},
	methods: {
		openModal(url) {
			this.modalImage = url;
			this.modal = true;
		},
		compiledMarkdown(markdown) {
			return DOMPurify.sanitize(marked.parse(markdown));
		},
		async searchAuthors() {
			const authorData = await Promise.all(
				this.addon.authors.map((authorID) =>
					fetch(`https://api.faithfulpack.net/v2/users/${authorID}`).then((res) => res.json()),
				),
			);
			this.authors = authorData.sort((a, b) => a.username.localeCompare(b.username));
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
		date() {
			const dateObj = new Date(this.addon.last_updated);
			const year = dateObj.getFullYear();
			const month = dateObj.getMonth() + 1; // 0 indexed
			const day = dateObj.getDate();
			// mdy for us (expand array if someone else does too)
			if (navigator && ["en-US"].includes(navigator.language)) return `${month}/${day}/${year}`;
			// dmy for everyone else (and on server since no client is available)
			return `${day}/${month}/${year}`;
		},
	},
	beforeMount() {
		window.scrollTo(0, 0);
		this.searchAuthors();
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
