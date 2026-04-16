<template>
	<div class="download-btn-group">
		<a class="btn btn-primary btn-lg flex-grow-1 mb-0" :href="data.to">
			<v-icon size="small" icon="mdi-download" />
			<span class="ml-2">{{ edition }} ({{ data.version }})</span>
		</a>
		<!-- if there's only one version disable the button since it's useless (e.g. cf bedrock )-->
		<button
			class="btn btn-primary btn-lg px-2 mb-0"
			:disabled="data.count <= 1"
			:title="alt"
			@click="$emit('toggle', edition, panelOpen)"
		>
			<v-icon :icon />
		</button>
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
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables.scss" as *;

.download-btn-group {
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	gap: 2px;
	border-radius: $border-radius;
	box-shadow: $shadow-sheet;

	> * {
		box-shadow: none;
		border-radius: 0;
	}
}
.download-btn-group > :first-child {
	border-top-left-radius: $border-radius;
	border-bottom-left-radius: $border-radius;
}
.download-btn-group > :last-child {
	border-top-right-radius: $border-radius;
	border-bottom-right-radius: $border-radius;
}
</style>
