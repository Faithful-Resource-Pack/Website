<template>
	<h1 class="title m-0 text-center">Download Faithful</h1>

	<div id="download-container" class="card">
		<banner-preview :packs :hover-pack :selected-pack />
		<div id="download-content" class="d-flex">
			<div class="pane d-flex flex-column">
				<div id="pack-container" class="card">
					<pack-selector v-model:select="selectedPack" v-model:hover="hoverPack" :packs />
				</div>
				<div id="download-button-group" class="d-flex flex-column">
					<div v-for="(data, edition) in defaultDownloads" :key="edition" class="card">
						<download-button
							:edition
							:data
							:panel-open="versionSelectorOpen && edition === selectedEdition"
							@toggle="toggleVersionSelector"
						/>
					</div>
				</div>
			</div>
			<div class="pane">
				<logo-preview :packs :hover-pack :selected-pack />
			</div>
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
		<p class="h5 ma-0">
			Looking for a specific release or discontinued project?
			<nuxt-link to="/archive">Search the Faithful archive</nuxt-link>
		</p>
	</div>
</template>

<script>
import DownloadButton from "~/components/downloads/download-button.vue";
import BannerPreview from "~/components/downloads/banner-preview.vue";
import PackSelector from "~/components/downloads/pack-selector.vue";
import VersionSelector from "~/components/downloads/version-selector.vue";
import LogoPreview from "~/components/downloads/logo-preview.vue";

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
		DownloadButton,
		BannerPreview,
		VersionSelector,
		LogoPreview,
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
					color: "#00A2FF",
					label: "Faithful 32x",
					hash: "#Faithful-32x",
					description: "Tried and true for over a decade.",
					to: "/faithful32x",
				},
				{
					id: "f64",
					color: "#FF0092",
					label: "Faithful 64x",
					hash: "#Faithful-64x",
					description: "For when 32x isn't quite enough.",
					to: "/faithful64x",
				},
				{
					id: "cf32",
					color: "#5ED900",
					label: "Classic Faithful 32x",
					hash: "#Classic-Faithful-32x",
					description: "Authentically return to 2015 in style.",
					to: "/classic32x",
				},
				{
					id: "cf64",
					color: "#BE42FF",
					label: "Classic Faithful 64x",
					hash: "#Classic-Faithful-64x",
					description: "Nostalgia and ultra-detailed graphics, all in one.",
					to: "/classic64x-jappa",
				},
			],
			selectedPack: "f32",
			hoverPack: "f32",
			selectedEdition: null,
			mainContainer: null,
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
		selectedLabel() {
			if (!this.selectedPack) return "";
			return this.downloadData[this.selectedPack].label;
		},
	},
	watch: {
		selectedPack: {
			handler(newValue) {
				const pack = this.packs.find((p) => p.id === newValue);
				if (!pack || pack.hash === this.$route.hash) return;
				this.$router.replace({ hash: pack.hash });
			},
		},
	},
	mounted() {
		if (this.$route.hash) {
			const result = this.packs.find((p) => p.hash === this.$route.hash);
			if (result && result.id) this.selectedPack = result.id;
			this.hoverPack = this.selectedPack;
		}
	},
});
</script>

<style>
main > .container {
	padding-top: 25px;
	padding-bottom: 25px;
}
</style>

<style scoped lang="scss">
@use "~/assets/css/variables.scss" as *;

$main-radius: 2.5rem;
$main-padding: 1.25rem;
$content-radius: $main-radius - $main-padding;

#download-container {
	position: relative;
	overflow: hidden;
	border-radius: $main-radius;

	& > #download-content > .pane:first-child {
		padding: $main-padding;
	}
}

.title {
	font-size: 3.2rem;
	margin-bottom: 25px;
}

#pack-container {
	border-radius: $content-radius;
}

.pane {
	flex: 1 1 0;
	position: relative;
	z-index: 2;

	&.flex-column {
		gap: $main-padding;
	}
}

#download-button-group {
	gap: calc($main-padding / 2);

	& > .card {
		border-radius: $content-radius;
	}
}
</style>
