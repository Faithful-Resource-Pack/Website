<template>
	<project-card v-bind="$attrs">
		<div class="download-btns">
			<nuxt-link class="btn btn-primary block" :to="detectedLatest.to">
				{{ detectedLatest.label }}
			</nuxt-link>
			<button class="btn btn-primary" style="aspect-ratio: 1">
				<v-icon icon="mdi-chevron-down" />
				<v-menu
					activator="parent"
					location="bottom center"
					attach=".site-container"
					:close-on-content-click="false"
				>
					<download-menu :data :detectedEdition />
				</v-menu>
			</button>
		</div>
	</project-card>
</template>

<script>
import DownloadMenu from "./download-menu.vue";

export default defineNuxtComponent({
	name: "download-card",
	components: {
		DownloadMenu,
	},
	props: {
		data: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			// value doesn't really matter
			detectedEdition: "Java",
		};
	},
	methods: {
		detectEdition() {
			const userAgent = window.navigator.userAgent;
			const platform = window.navigator?.userAgentData?.platform || window.navigator.platform;
			const iosPlatforms = ["iPhone", "iPad", "iPod"];

			if (platform.toLowerCase().includes("mac")) return "Java";
			if (iosPlatforms.includes(platform)) return "Bedrock";
			if (platform.toLowerCase().includes("win")) return "Java";
			// must test android before linux
			if (/Android/.test(userAgent)) return "Bedrock";
			if (/Linux/.test(platform)) return "Java";
		},
	},
	computed: {
		detectedDownload() {
			const [version, data] = Object.entries(this.data[this.detectedEdition])[0];
			return {
				version,
				to: Object.values(data[0].links)[0],
			};
		},
		detectedLatest() {
			return {
				to: this.detectedDownload.to,
				label: `Latest ${this.detectedEdition} (${this.detectedDownload.version})`,
			};
		},
	},
	mounted() {
		this.detectedEdition = this.detectEdition();
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;

.download-btns {
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	gap: 0.25rem;
	> * {
		border-radius: 0;
	}
}
.download-btns > :first-child {
	border-top-left-radius: $border-radius;
	border-bottom-left-radius: $border-radius;
}
.download-btns > :last-child {
	border-top-right-radius: $border-radius;
	border-bottom-right-radius: $border-radius;
}
</style>
