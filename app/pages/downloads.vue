<template>
	<h1 class="title my-5 text-center">Download Faithful</h1>
	<div class="card d-flex flex-row">
		<div class="card-body card-text">
			<h2>Select Pack</h2>
			<pack-selector v-model:select="selectedPack" v-model:hover="hoverPack" :packs />
			<div class="d-flex flex-column ga-3">
				<download-button
					v-for="(data, edition) in defaultDownloads"
					:key="edition"
					:edition
					:data
					:panel-open="versionSelectorOpen && edition === selectedEdition"
					@toggle="toggleVersionSelector"
				/>
			</div>
		</div>
		<div v-if="$vuetify.display.mdAndUp" class="right-panel-container">
			<pack-preview :packs :hover-pack :disabled="versionSelectorOpen" />
			<!-- reuses form component but it's a modal on mobile and fills the preview on desktop -->
			<version-selector
				v-if="versionSelectorOpen"
				:edition="selectedEdition"
				:versions="versions"
				@close="closeVersionSelector"
			/>
		</div>
	</div>

	<!-- attach to site container so themes work -->
	<v-dialog
		v-if="versionSelectorOpen && !$vuetify.display.mdAndUp"
		v-model="versionSelectorOpen"
		attach=".site-container"
	>
		<div class="card">
			<version-selector
				:edition="selectedEdition"
				:versions="versions"
				@close="closeVersionSelector"
			/>
		</div>
	</v-dialog>

	<div class="text-center mt-7">
		<p class="h5">
			Looking for a specific release or discontinued project?
			<nuxt-link to="/archive">Search the Faithful archive</nuxt-link>
		</p>
	</div>
</template>

<script>
import DownloadButton from "~/components/downloads/download-button.vue";
import PackPreview from "~/components/downloads/pack-preview.vue";
import PackSelector from "~/components/downloads/pack-selector.vue";
import VersionSelector from "~/components/downloads/version-selector.vue";

const DOWNLOAD_DATA = [
	{
		id: "f32",
		json: "faithful_32x_java",
		edition: "Java",
	},
	{
		id: "f32",
		json: "faithful_32x_bedrock",
		edition: "Bedrock",
	},
	{
		id: "f64",
		json: "faithful_64x_java",
		edition: "Java",
	},
	{
		id: "f64",
		json: "faithful_64x_bedrock",
		edition: "Bedrock",
	},
	{
		id: "cf32",
		json: "classic_32x_java",
		edition: "Java",
	},
	{
		id: "cf32",
		json: "classic_32x_bedrock",
		edition: "Bedrock",
	},
	{
		id: "cf64",
		json: "classic_64x_jappa_java",
		edition: "Java",
	},
	{
		id: "cf64",
		json: "classic_64x_jappa_bedrock",
		edition: "Bedrock",
	},
];

export default defineNuxtComponent({
	components: {
		PackSelector,
		PackPreview,
		DownloadButton,
		VersionSelector,
	},
	async asyncData() {
		// set object order by which ones come first
		const downloadData = DOWNLOAD_DATA.reduce((acc, cur) => {
			acc[cur.id] ||= {};
			acc[cur.id][cur.edition] = "";
			return acc;
		}, {});

		await Promise.all(
			DOWNLOAD_DATA.map(async ({ id, json, to, edition }) => {
				if (to) {
					downloadData[id][edition] = to;
					return;
				}

				// vite limitation, can't do regular $fetch here
				const downloads = await import(`../../public/downloads/${json}.json`)
					.then((res) => res.default)
					.catch((err) => {
						console.error(err);
						return {};
					});

				downloadData[id][edition] = downloads;
			}),
		);

		// after the promise.all everything has finished fetching into downloadData
		return { downloadData };
	},
	data() {
		return {
			packs: [
				{
					id: "f32",
					label: "Faithful 32x",
					description: "Tried and true for over a decade.",
					to: "/faithful32x",
				},
				{
					id: "f64",
					label: "Faithful 64x",
					description: "An even more detailed experience.",
					to: "/faithful64x",
				},
				{
					id: "cf32",
					label: "Classic Faithful 32x",
					description: "Bring back the old-school feel in style.",
					to: "/classic32x",
				},
				{
					id: "cf64",
					label: "Classic Faithful 64x",
					description: "Nostalgia and ultra-detailed graphics, all in one.",
					to: "/classic64x-jappa",
				},
			],
			selectedPack: "f32",
			hoverPack: "f32",
			selectedEdition: null,
		};
	},
	methods: {
		openVersionSelector(edition) {
			this.selectedEdition = edition;
		},
		closeVersionSelector() {
			this.selectedEdition = null;
		},
		toggleVersionSelector(edition, open) {
			return open ? this.closeVersionSelector() : this.openVersionSelector(edition);
		},
		hashify(id) {
			// vue router really hates spaces in HTML ids
			return `#${id.replace(/ /g, "-")}`;
		},
	},
	computed: {
		downloads() {
			const out = {};
			for (const [edition, versions] of Object.entries(this.downloadData[this.selectedPack])) {
				out[edition] ||= {};
				for (const [i, [version, [data]]] of Object.entries(versions).entries()) {
					out[edition][version] = {
						...data,
						to: Object.values(data.links)[0],
						version,
						latest: i === 0,
					};
				}
			}
			return out;
		},
		defaultDownloads() {
			return Object.entries(this.downloads).reduce((acc, [edition, versions]) => {
				acc[edition] = Object.values(versions)[0];
				acc[edition].count = Object.keys(versions).length;
				return acc;
			}, {});
		},
		versions() {
			if (!this.selectedEdition) return {};
			return this.downloads[this.selectedEdition];
		},
		versionSelectorOpen() {
			return this.selectedEdition !== null;
		},
	},
	watch: {
		selectedPack: {
			handler(newValue) {
				const pack = this.packs.find((p) => p.id === newValue);
				if (!pack || this.hashify(pack.label) === this.$route.hash) return;
				this.$router.replace({ hash: this.hashify(pack.label) });
			},
		},
	},
	mounted() {
		if (this.$route.hash) {
			const result = this.packs.find((p) => this.hashify(p.label) === this.$route.hash);
			if (result && result.id) this.selectedPack = result.id;
			this.hoverPack = this.selectedPack;
		}
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables.scss" as *;

.right-panel-container {
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	width: 50%;
}
</style>
