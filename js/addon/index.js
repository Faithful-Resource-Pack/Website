document.addEventListener("DOMContentLoaded", () => {
	const app = Vue.createApp({
		components: {
			ScreenshotModal: Vue.defineAsyncComponent(() => import("./screenshot-modal.js")),
			AuthorWidget: Vue.defineAsyncComponent(() => import("./author-widget.js")),
			AddonFlag: Vue.defineAsyncComponent(() => import("./addon-flag.js")),
			DiscordButton: Vue.defineAsyncComponent(() =>
				import("../components/discord-button.js"),
			),
		},
		template: `
			<div
				v-if="loading"
				style="max-width: 1140px"
			>
				<div class="card card-body">
					<p class="text-center">The add-on is loading, please wait...</p>
				</div>
			</div>
			<div v-else-if="addon.approval.status === 'approved'">

				<!-- vuetify overrides the bootstrap margin styles so we manually add them -->
				<h1
					class="title text-center"
					style="margin-top: 3rem !important; margin-bottom: 3rem !important"
				>
					{{ addon.name }}
				</h1>
				<img :src="header" class="fancy-card-2x" style="width: 100%">
				<br />

				<screenshot-modal v-model="modal" :image="modalImage" />
				<div class="card card-body" v-if="screenshots.length">
					<h3 class="text-center">Screenshots</h3>
					<div class="res-grid-3" v-if="files.length">
						<div v-for="(image, index) in screenshots">
							<div class="card img-card">
								<img :src="image" @click="openModal(image)">
							</div>
						</div>
					</div>
				</div>

				<br />

				<v-row :style="{ 'display': $vuetify.display.mdAndUp ? 'flex' : 'block' }">
					<v-col :md="$vuetify.display.mdAndUp ? 9 : 10" style="max-width: 100%">
						<h3 class="text-center">Description</h3>
						<div class="card card-body">
							<p class="h5" v-html="compiledMarkdown(addon.description)"></p>
						</div>
					</v-col>
					<v-col class="order-first" :md="$vuetify.display.mdAndUp ? 3 : 2" style="max-width: 100%">
						<h3 class="text-center">
							{{ Object.keys(authors).length === 1 ? "Author" : "Authors" }}
						</h3>

						<div class="card card-body author-widget-container">
							<author-widget v-for="author in authors" :key="author.id" :author />
						</div>
					</v-col>
				</v-row>
				<v-row
					:style="{ 'flex-direction': $vuetify.display.mdAndUp ? 'row' : 'column' }"
				>
					<v-col>
						<h3 class="text-center">Downloads</h3>
						<div class="card card-body">
							<a
								v-for="file in downloads"
								:key="file.source"
								:href="file.source"
								class="btn btn-dark"
								style="color: white; width: 100%; margin: 5px 0"
							>
								{{ file.name }}
							</a>
						</div>
					</v-col>
					<v-col>
						<h3 class="text-center">Information</h3>
						<addon-flag
							type="optifine"
							v-if="addon.options.optifine"
						>
							Requires <a href="https://optifine.net/downloads" target="_blank">OptiFine</a> or
							an <a href="https://optifine.alternatives.lambdaurora.dev/" target="_blank">equivalent mod</a>
						</addon-flag>
						<addon-flag
							type="java"
							v-if="addon.options.tags && addon.options.tags.includes('Java')"
						>
							Supports Java Edition
						</addon-flag>

						<addon-flag
							type="bedrock"
							v-if="addon.options.tags && addon.options.tags.includes('Bedrock')"
						>
							Supports Bedrock Edition
						</addon-flag>

						<v-row>
							<v-col
								style="display: flex; align-content: stretch; justify-content: flex-start"
							>
								<addon-flag
									v-if="addon.options.tags && addon.options.tags.includes('32x')"
									type="32x"
									square
								/>
								<addon-flag
									v-if="addon.options.tags && addon.options.tags.includes('64x')"
									type="64x"
									square
								/>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
				<br /><br />
				<discord-button />
			</div>
		`,
		data() {
			return {
				addon: {},
				files: [],
				authors: [],
				modal: false,
				modalImage: "",
				loading: true,
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
						fetch(`https://api.faithfulpack.net/v2/users/${authorID}`).then((res) =>
							res.json(),
						),
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
		},
		created() {
			if (!window.slug && this.$route) {
				fetch(`https://api.faithfulpack.net/v2/addons/${window.slug}`)
					.then((res) => res.json())
					.then((data) => {
						this.addon = data[0];
					})
					.then(() =>
						Promise.all([
							this.searchAuthors(),
							fetch(`https://api.faithfulpack.net/v2/addons/${this.addon.id}`)
								.then((res) => res.json())
								.then((data) => {
									this.files = data;
								}),
						]),
					)
					.catch((err) => {
						console.error(err);
						this.addon = {};
					})
					.finally(() => {
						this.loading = false;
						window.scrollTo(0, 0);
					});
			} else {
				this.addon = window.addon;
				this.searchAuthors();
				this.files = window.files;

				this.loading = false;
				window.scrollTo(0, 0);
			}
		},
	});
	app.use(Vuetify.createVuetify());
	app.mount("#app");
});
