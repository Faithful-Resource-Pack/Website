export default {
	name: "download-table",
	components: {
		DownloadVersion: Vue.defineAsyncComponent(() => import("./download-version.js")),
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
	template: `
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
	`,
};
