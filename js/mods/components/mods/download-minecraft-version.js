/* global Vue */
/* eslint no-multi-str: 0 */

export default {
	name: "download-minecraft-version",
	props: {
		value: {
			type: Object,
		},
		block: {
			type: Boolean,
		},
	},
	template: `
		<button type="button" class="btn btn-dark minecraftVersion mb-1 mr-1" :value="value.version" @click="dv">
			<span :style="{display: block ? 'block' : 'initial' }">
				{{ value.version }}
			</span>
			<span class="badge badge-light" style="color: black; margin-left: 5px">
				{{ value.count }}
			</span>
		</button>
	`,
	data() {
		return {};
	},
	methods: {
		dv() {
			if (
				this.$root.$refs.localDownload &&
				!!this.$root.$refs.localDownload.openConfirmModal
			) {
				this.$root.$refs.localDownload.openConfirmModal(
					this.$root.mods
						.filter((mod) =>
							mod.resource_pack.versions.includes(this.$props.value.version),
						)
						.map((mod) => {
							return this.$root.modToSelection(mod, this.$props.value.version);
						}),
				);
			}
		},
	},
};
