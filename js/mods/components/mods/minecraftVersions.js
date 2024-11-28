/* global Vue, MinecraftUtils */
/* eslint no-multi-str: 0 */

export default {
	name: "minecraft-versions",
	components: {
		DownloadMinecraftVersion: Vue.defineAsyncComponent(() => import("./downloadMinecraftVersion.js")),
	},
	props: {
		versions: Array,
		breakpoints: Object,
	},
	template: `
		<div id="minecraftVersions">
			<div>
				<div
					v-for="(line, index) in versionsOrganized"
					:key="index"
					class="auto-flex mt-0 mx-0 btn-group-custom"
				>
					<download-minecraft-version
						v-for="version in line"
						:key="version.version"
						:value="version"
						:block="breakpoints.lg && !breakpoints.md"
					/>
				</div>
			</div>
		</div>
	`,
	computed: {
		orderedVersions() {
			return this.versions.sort(function (a, b) {
				const numbers = MinecraftUtils.minecraftVersionsToNumbers([a.version, b.version]);

				return numbers[0] > numbers[1] ? -1 : 1;
			});
		},
		elementsPerLine() {
			if (this.breakpoints.lg && !this.breakpoints.md) return this.versions.length;
			if (this.breakpoints.md && !this.breakpoints.sm) return 6;
			if (this.breakpoints.sm && !this.breakpoints.xs) return 3;

			return 1;
		},
		versionsOrganized() {
			const result = [];

			for (let i = 0; i < this.orderedVersions.length; ++i) {
				if (i % this.elementsPerLine === 0) {
					result.push([]);
				}

				result[result.length - 1].push(this.orderedVersions[i]);
			}

			return result;
		},
	},
	methods: {
		downloadVersion(version) {
			if (this.$root.handleDownload) {
				this.$root.handleDownload("version", {
					version: version,
				});
			}
		},
	},
};
