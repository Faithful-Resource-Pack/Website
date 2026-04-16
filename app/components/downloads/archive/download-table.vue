<template>
	<div class="download-table-padding accent-textured">
		<table class="download-table">
			<thead class="download-heading">
				<tr>
					<!-- these must be in divs, I have no idea why -->
					<th />
					<th class="text-left"><div>Name</div></th>
					<th><div>Published</div></th>
					<th><div>Downloads</div></th>
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
	// half of the horizontal padding goes here and half in the highlight
	padding: $padding-card calc($padding-card / 2);
	overflow-x: auto;
	box-shadow: $shadow-sheet;
}

// for mobile
.download-table {
	width: 100%;
}

.download-heading div {
	font-size: 1.25rem;
	color: $text-card-title;
	padding-bottom: $padding-card;
}

// remove table headers on mobile
@media screen and (max-width: $breakpoint-sm) {
	thead {
		display: none;
	}
}
</style>
