<template>
	<div class="card card-body overflow-y-auto d-block">
		<div v-for="edition in editions" :key="edition">
			<h2 class="h3 mb-3">{{ edition }} Edition</h2>
			<div :class="expanded && !$vuetify.display.xs && 'res-grid-4 ga-0 gc-10'">
				<div v-for="(download, version, i) in extractDownloads(data[edition])" :key="version">
					<div class="d-flex flex-row align-center justify-space-between my-2">
						<p class="mb-0 mr-5">
							{{ version }}
							<template v-if="i === 0">(Latest)</template>
						</p>
						<a :href="getLinkFromDownload(download)" class="download-btn" style="color: unset">
							<v-icon icon="mdi-download" />
						</a>
					</div>
					<v-divider v-if="!expanded || $vuetify.display.xs" class="my-2" />
				</div>
			</div>
		</div>
		<button class="btn btn-secondary block my-3" @click="toggleExpanded">
			<v-icon :icon="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'" class="mr-1" />
			Show {{ expanded ? "fewer" : "more" }} versions
		</button>
		<nuxt-link to="/archive" class="my-3 text-center">Other Downloads</nuxt-link>
	</div>
</template>

<script>
const IMPORTANT_VERSIONS = ["1.19.2", "1.16.x", "1.12.x", "1.8.x", "1.7.x", "Beta 1.7.3"];
const TOP_VERSIONS = 2;

export default defineNuxtComponent({
	name: "download-menu",
	props: {
		data: {
			type: Object,
			required: true,
		},
		detectedEdition: {
			type: String,
			required: false,
			default: "java",
		},
	},
	data() {
		return {
			expanded: false,
		};
	},
	methods: {
		toggleExpanded() {
			this.expanded = !this.expanded;
		},
		extractDownloads(downloads) {
			if (this.expanded) return downloads;
			return Object.entries(downloads)
				.filter(([version], i) => {
					if (i < TOP_VERSIONS) return true;
					if (IMPORTANT_VERSIONS.includes(version)) return true;
					return false;
				})
				.reduce((acc, [version, downloads]) => {
					acc[version] = downloads;
					return acc;
				}, {});
		},
		getLinkFromDownload(download) {
			return Object.values(download[0].links)[0];
		},
	},
	computed: {
		editions() {
			return Object.keys(this.data).sort((a, b) =>
				b === this.detectedEdition ? 1 : a.localeCompare(b),
			);
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;

.download-btn * {
	transition: $transition-navigation;
}

.download-btn:hover * {
	color: white;
	transform: scale(0.85);
}
</style>
