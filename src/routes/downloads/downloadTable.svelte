<script lang="ts">
	import DownloadItem from "./downloadItem.svelte";
	export let downloads: App.DownloadList;
</script>

<div class="outline">
	<table class="download-table">
		<thead>
			<tr>
				<th colspan="2" class="large"><p>Version</p></th>
				<th colspan="2"><p>Downloads</p></th>
				<th><p>Size</p></th>
				<th><p>Date</p></th>
			</tr>
		</thead>
		<tbody>
			{#each Object.entries(downloads) as [key, download]}
				<DownloadItem version={key} downloads={download} />
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	.outline {
		background: #131313 url(/images/background/bg_light_background.png) repeat;
		border-radius: $border-radius;
		padding: 0.7rem;
		overflow-x: auto;
		margin-bottom: 2rem;
	}
	.download-table {
		width: 100%;
		border-collapse: collapse;
	}
	thead > tr {
		background-color: #343a40;
		border-radius: $border-radius;
	}
	th > p {
		font-size: 20px;
		margin: 0;
	}
	th.large {
		text-align: left;
	}
	th > p,
	:global(td > p) {
		color: #ccc;
		padding: 0.2rem;
		margin-bottom: 0;
		vertical-align: middle;
	}

	@media (max-width: 760px) {
		.download-table thead {
			display: none;
		}
		.outline {
			margin: 0;
			padding: 0;
		}
	}
</style>
