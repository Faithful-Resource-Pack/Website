document.addEventListener("DOMContentLoaded", () => {
	const app = Vue.createApp({
		components: {
			ScreenshotModal: Vue.defineAsyncComponent(() =>
				import("../components/screenshot-modal.js"),
			),
			AuthorWidget: Vue.defineAsyncComponent(() => import("./author-widget.js")),
			CompatibilityCard: Vue.defineAsyncComponent(() => import("./compatibility-card.js")),
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
			<div v-else-if="addon?.approval.status === 'approved'">

				<!-- vuetify overrides the bootstrap margin styles so we manually add them -->
				<h1
					class="title text-center"
					style="margin-top: 3rem !important; margin-bottom: 3rem !important"
				>
					{{ addon.name }}
				</h1>

				<v-row :style="{ 'display': $vuetify.display.mdAndUp ? 'flex' : 'block' }">
					<v-col :md="$vuetify.display.mdAndUp ? 9 : 10" style="max-width: 100%">
						<img :src="header" class="header-img" style="width: 100%">
						<br />

						<screenshot-modal v-model="modal" :image="modalImage" />

						<div class="card card-body" v-if="screenshots.length">
							<h3 class="text-center">Screenshots</h3>
							<div class="res-grid-3">
								<div v-for="(image, index) in screenshots">
									<div class="card img-card">
										<img :src="image" @click="openModal(image)">
									</div>
								</div>
							</div>
							<br />
						</div>

						<br />

						<div class="card card-body">
							<p class="h5" v-html="compiledMarkdown(addon.description)"></p>
						</div>
					</v-col>
					<v-col class="order-first" :md="$vuetify.display.mdAndUp ? 3 : 2" style="max-width: 100%">
						<compatibility-card :options="addon.options" />
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

				<h2 id="downloads" class="subtitle text-center" style="margin-bottom:3rem;margin-top:2rem;">
					Downloads
				</h2>
				<p v-for="file in downloads" :key="file.source" class="text-center">
					<a class="btn block btn-lg btn-primary" :href="file.source">{{ file.name }}</a>
				</p>
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
			date() {
				const dateObj = new Date(this.addon.last_updated);
				const year = dateObj.getFullYear();
				const month = dateObj.getMonth() + 1; // 0 indexed
				const day = dateObj.getDate();
				// mdy for us (expand array if someone else does too)
				if (["en-US"].includes(navigator.language)) return `${month}/${day}/${year}`;
				// dmy for everyone else
				return `${day}/${month}/${year}`;
			},
		},
		created() {
			if (!window.addon) return;
			this.addon = window.addon;
			this.searchAuthors();
			this.files = window.files;

			this.loading = false;
			window.scrollTo(0, 0);
		},
	});
	app.use(Vuetify.createVuetify());
	app.mount("#app");
});
