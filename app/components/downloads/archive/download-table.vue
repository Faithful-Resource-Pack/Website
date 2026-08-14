<template>
	<div class="download-table-padding accent-textured">
		<table class="download-table">
			<thead class="download-heading" @click="toggleCollapse">
				<!-- bit of jank required to match body padding when collapsed -->
				<tr>
					<th class="pl-2 pr-4">
						<v-icon
							:icon="collapseIcon"
							size="x-small"
							:title="isCollapsed ? 'Open download list' : 'Close download list'"
						/>
					</th>
					<th class="text-left" style="width: 100%"><h4>Name</h4></th>
					<th><h4 class="px-8">Published</h4></th>
					<th><h4 style="min-width: 128px">Downloads</h4></th>
				</tr>
			</thead>
			<tbody v-show="!isCollapsed">
				<download-version
					v-for="(items, version) in downloads"
					:key="version"
					:items
					:files
					:version
				/>
			</tbody>
		</table>
	</div>
</template>

<script>
import DownloadVersion from "./download-version.vue";

export default defineNuxtComponent({
	name: "download-table",
	components: {
		DownloadVersion,
	},
	props: {
		downloads: {
			type: Object,
			required: true,
		},
		files: {
			type: Array,
			required: false,
			default: () => [],
		},
	},
	data() {
		return {
			isCollapsed: false,
		};
	},
	methods: {
		toggleCollapse() {
			this.isCollapsed = !this.isCollapsed;
		},
	},
	computed: {
		collapseIcon() {
			return this.isCollapsed ? "mdi-plus" : "mdi-minus";
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;

.download-table-padding {
	border-radius: $border-radius;
	// half of the horizontal padding goes here and half in the highlight
	padding: calc($padding-container / 2);
	overflow-x: auto;
	box-shadow: $shadow-card;
}

// for mobile
.download-table {
	width: 100%;
}

.download-heading {
	cursor: pointer;
}

.download-heading h4 {
	font-size: 1.25rem;
	padding-top: calc($padding-container / 2);
}

// remove table headers on mobile
@media screen and (max-width: $breakpoint-sm) {
	thead {
		display: none;
	}
}
</style>
