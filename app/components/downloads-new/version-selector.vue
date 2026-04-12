<template>
	<!-- header is 999 so we set it just below that (needs to be above images) -->
	<div
		class="d-block card-body card-text align-self-start block"
		style="z-index: 998"
		@keyup.esc="$emit('close')"
	>
		<div class="d-flex align-center justify-space-between">
			<h2 class="mb-0">Select Minecraft Version</h2>
			<v-icon
				class="close-button"
				icon="mdi-close"
				title="Close Version Panel"
				@click="$emit('close')"
			/>
		</div>
		<v-text-field
			ref="search"
			v-model="search"
			variant="solo"
			density="comfortable"
			clearable
			autofocus
			hide-details
			class="mt-5 mb-4"
			clear-icon="mdi-close"
			:placeholder="`Search ${edition} Edition versions`"
			@click:clear="clearSearch"
		/>
		<div v-if="shownVersions.length" class="d-flex flex-column ga-2">
			<a
				v-for="version in shownVersions"
				:key="version"
				class="btn btn-secondary block my-0"
				:href="versions[version].to"
			>
				<v-icon icon="mdi-download" size="small" />
				<span class="ml-2">{{ version }}</span>
			</a>
		</div>
		<div v-else>
			No matching versions were found for {{ edition }} Edition. Have you made a typo?
		</div>
	</div>
</template>

<script>
const IMPORTANT_VERSIONS = ["1.20.1", "1.19.2", "1.16.x", "1.12.x", "1.8.x", "1.7.x", "Beta 1.7.3"];
const MAX_RESULTS = 10;

export default defineNuxtComponent({
	name: "version-selector",
	props: {
		versions: {
			type: Object,
			required: true,
		},
		edition: {
			type: String,
			required: true,
		},
	},
	emits: ["close"],
	data() {
		return {
			search: "",
		};
	},
	methods: {
		clearSearch() {
			this.search = "";
		},
	},
	computed: {
		versionList() {
			return Object.keys(this.versions);
		},
		shownVersions() {
			if (!this.search) {
				const foundImportant = IMPORTANT_VERSIONS.filter((v) => this.versionList.includes(v));

				// pad it out with extra top versions
				const delta = MAX_RESULTS - foundImportant.length;
				const extra = this.versionList.filter((v) => !foundImportant.includes(v)).slice(0, delta);
				return [...extra, ...foundImportant];
			}
			return this.versionList
				.filter((v) => v.toLowerCase().includes(this.search.toLowerCase()))
				.slice(0, MAX_RESULTS);
		},
	},
	watch: {
		downloads: {
			handler() {
				// maintain focus
				this.$refs.search.focus();
			},
			deep: true,
		},
	},
});
</script>

<style lang="scss" scoped>
@use "~/assets/css/variables.scss" as *;

.close-button:hover {
	color: $text-card-title;
	transition: $transition-navigation;
}
</style>
