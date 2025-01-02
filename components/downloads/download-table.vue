<template>
	<div class="download-table-padding">
		<table class="download-table">
			<thead>
				<tr class="download-heading">
					<th colspan="2" class="file-heading"><p>Name</p></th>
					<th><p>Date</p></th>
					<th><p>Size</p></th>
					<th colspan="2"><p>Downloads</p></th>
				</tr>
			</thead>
			<tbody>
				<download-version
					v-for="(items, version) in downloads"
					:key="version"
					:items="items"
					:files="files"
					:version="version"
				/>
			</tbody>
		</table>
	</div>
</template>

<script>
import DownloadVersion from "./download-version.vue";

export default {
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
			type: Object,
			required: true,
		},
	},
};
</script>

<style lang="scss">
@use "~/assets/css/lib/variables" as *;
@use "~/assets/css/components/download-badges" as *;

.download-table-padding {
	border-radius: $border-radius-0x;
	padding: 0.7rem;
	overflow-x: auto;
	margin-bottom: 2rem;
}

.download-table {
	width: 100%;
}

.download-heading {
	background-color: #343a40;
	border-radius: $border-radius-0x;
	width: 100%;
	th {
		text-align: center;
		width: calc(40% / 3);
		p {
			font-size: 1.25rem;
			padding: 0.2rem;
		}
	}
}

// default middle text alignment looks really stupid
.file-heading {
	text-align: left !important;
	padding-left: 0.7rem;
	width: 50%;
}

// all p elements inside the download table use this style
.download-table p {
	color: #ccc;
	margin-bottom: 0;
	vertical-align: middle;
}

.download-item {
	border-radius: $border-radius-0x;
	padding-left: 0.7rem;
	padding-right: 0.7rem;
	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
}

.download-name {
	display: inline-flex;
	padding-top: 0px !important;
	padding-bottom: 0px !important;
	padding-left: 0.5rem;
	margin: 0px;
	// fix for dots not respecting aspect ratio
	align-items: center;
}

.subitem {
	opacity: 75%;
}

td {
	text-align: center;
	vertical-align: middle;
	width: calc(50% / 3);
}

.download-details {
	text-align: left;
	width: 45%;
}

.links {
	width: calc(50% / 6);
}

.link-text {
	padding: 0;
	margin-left: 8px;
}

.mobile-details {
	display: none;
}

.show-icon-container {
	user-select: none;
	width: 5%;
}

.show-icon {
	opacity: 50%;
}

.btn-dl {
	padding: 0.1rem 0.4rem;
	width: 110px;
}

i.dl-icon {
	font-size: 20px;
}

// mobile layout
@media (max-width: 760px) {
	.download-table-padding {
		margin: 0;
		padding: 0;
	}

	thead {
		display: none;
	}

	.download-name {
		padding-left: 0px !important;
		// remove inline so it wraps the badges underneath
		display: flex;
	}

	// hide desktop details and show mobile details
	.size,
	.date {
		display: none;
	}
	.mobile-details {
		display: block;
	}

	.download-item {
		display: flex;
		align-items: stretch;
		padding: 0.25rem 0.5rem;

		// remove hover effect (looks bad on mobile)
		&:hover {
			background-color: transparent;
		}
	}

	// fix margins
	.show-icon-container {
		flex: 0 0 24px;
		padding: 0.2rem 0;
	}

	.download-details {
		flex: 1 1 auto;
		padding: 0.2rem 0.4rem;
	}

	.links {
		flex: 0 0 30px;
		width: auto;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	// square buttons with centered icon and remove text
	.btn-dl {
		width: 30px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.link-text {
		display: none;
	}
}
</style>
