<template>
	<div class="download-btn-group">
		<a class="btn btn-primary btn-lg mb-0" :href="data.to">
			<v-icon size="small" icon="mdi-download" />
			<span class="ml-2">{{ edition }} ({{ data.version }})</span> </a
		><button
			class="btn btn-primary btn-lg px-2 mb-0"
			:style="getStyle(data.count)"
			:disabled="data.count <= 1"
			:title="alt"
			@click="$emit('toggle', edition, panelOpen)"
		>
			<v-icon :icon />
		</button>
		<!-- if there's only one version disable the button since it's useless (e.g. cf bedrock )-->
	</div>
</template>

<script>
export default defineNuxtComponent({
	name: "download-button",
	props: {
		edition: {
			type: String,
			required: true,
		},
		data: {
			type: Object,
			required: true,
		},
		panelOpen: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	emits: ["toggle"],
	computed: {
		alt() {
			return this.panelOpen ? "Close Version Panel" : "Open Version Panel";
		},
		icon() {
			return this.panelOpen ? "mdi-chevron-left" : "mdi-chevron-right";
		},
	},
	methods: {
		getStyle(count) {
			return count === 0 ? "opacity: 0.7" : "";
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables.scss" as *;

.download-btn-group {
	position: relative;
	> * {
		display: block;
		border-radius: 0;
		box-shadow: none;
	}
}
.download-btn-group > :last-child {
	position: absolute;
	top: 0;
	right: 0;
	background: transparent;
	border-left: 2px solid rgba(black, 0.2);
}
</style>
