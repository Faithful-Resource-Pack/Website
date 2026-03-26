<template>
	<div class="download-table-padding accent-textured">
		<table class="download-table">
			<thead class="download-heading">
				<tr>
					<th />
					<th class="file-heading">Name</th>
					<th>Date</th>
					<th colspan="2">Downloads</th>
				</tr>
			</thead>
			<tbody>
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
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;

.download-table-padding {
	border-radius: $border-radius;
	padding: $padding-card;
	overflow-x: auto;
	margin-bottom: 2rem;
	box-shadow: $shadow-sheet;
}

// for mobile
.download-table {
	width: 100%;
}

.download-heading {
	font-size: 1.25rem;
	color: $text-card-title;
}

// default middle text alignment looks really stupid
.file-heading {
	text-align: left !important;
	p {
		margin-bottom: 200px !important;
	}
}

// remove padding and table headers on mobile
@media screen and (max-width: $breakpoint-sm) {
	.download-table-padding {
		margin: 0;
		padding: 0;
	}

	thead {
		display: none;
	}
}
</style>
