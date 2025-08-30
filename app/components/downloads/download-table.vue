<template>
	<div class="download-table-padding">
		<table class="download-table">
			<thead>
				<tr class="download-heading">
					<th colspan="2" class="file-heading"><p>Name</p></th>
					<th><p>Date</p></th>
					<th colspan="2"><p>Downloads</p></th>
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
@use "~/assets/css/lib/variables" as *;

.download-table-padding {
	border-radius: $border-radius;
	padding: 0.7rem;
	overflow-x: auto;
	margin-bottom: 2rem;
}

.download-table {
	width: 100%;
}

.download-heading {
	background: $bg-download;
	border-radius: $border-radius;
	width: 100%;
	th {
		text-align: center;
		width: calc(40% / 3);
		p {
			font-size: 1.25rem;
			padding: 0.2rem;
			color: $grey;
			margin-bottom: 0;
			vertical-align: middle;
		}
	}
}

// default middle text alignment looks really stupid
.file-heading {
	text-align: left !important;
	padding-left: 0.7rem;
	width: 50%;
}

// remove padding and table headers on mobile
@media (max-width: 760px) {
	.download-table-padding {
		margin: 0;
		padding: 0;
	}

	thead {
		display: none;
	}
}
</style>
