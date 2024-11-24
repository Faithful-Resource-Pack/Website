export default {
	name: "download-table",
	components: {
		DownloadLine: Vue.defineAsyncComponent(() => import("./download-line.js")),
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
					<template
						v-for="(items, version) in downloads"
						:key="version"
					>
						<download-line
							:single="items.length <= 1"
							:item="items[0]"
							:curse="getCurseFile(items[0])"
							:version="version"
							@toggle="toggleChildren(version)"
						/>
						<template v-if="openStates[version]">
							<download-line
								v-for="subItem in items.slice(1)"
								nested
								single
								:item="subItem"
								:curse="getCurseFile(subItem)"
								:version="version"
							/>
						</template>
					</template>
				</tbody>
			</table>
		</div>
	`,
	data() {
		return {
			openStates: {},
		};
	},
	methods: {
		toggleChildren(version) {
			// this could probably be encapsulated into an in-between component that handles children but oh well
			this.openStates[version] = !this.openStates[version];
		},
		getCurseFile(item) {
			if (item.links.curse) {
				const id = parseInt(item.links.curse.split("/").pop());
				return this.files.find((el) => el.id === id);
			}
		},
	},
};
