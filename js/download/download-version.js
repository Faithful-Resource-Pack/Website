export default {
	name: "download-version",
	components: {
		DownloadLine: Vue.defineAsyncComponent(() => import("./download-line.js")),
	},
	props: {
		items: {
			type: Array,
			required: true,
		},
		version: {
			type: String,
			required: true,
		},
		files: {
			type: Array,
			required: true,
		},
	},
	template: `
		<download-line
			:single="items.length <= 1"
			:item="items[0]"
			:curse="getCurseFile(items[0])"
			:version
			@toggle="toggleChildren"
		/>
		<template v-if="isOpen">
			<download-line
				v-for="subItem in items.slice(1)"
				nested
				single
				:item="subItem"
				:curse="getCurseFile(subItem)"
				:version
			/>
		</template>
	`,
	data() {
		return {
			isOpen: false,
		}
	},
	methods: {
		toggleChildren() {
			this.isOpen = !this.isOpen;
		},
		getCurseFile(item) {
			if (item.links.curse) {
				const id = parseInt(item.links.curse.split("/").pop());
				return this.files.find((el) => el.id === id);
			}
		},
	},
}