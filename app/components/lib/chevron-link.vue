<template>
	<component :is="renderedComponent" class="chevron-text" :to v-bind="$attrs">
		<slot>{{ text }}</slot>
		<v-icon class="chevron" size="small" icon="mdi-chevron-right" />
	</component>
</template>

<script>
// appends a chevron icon to the end of text
export default defineNuxtComponent({
	name: "chevron-link",
	inheritAttrs: false,
	props: {
		text: {
			type: String,
			required: false,
		},
		// used to check whether to render as a link or just text
		to: {
			type: String,
			required: false,
			default: "",
		},
	},
	computed: {
		renderedComponent() {
			return this.to ? resolveComponent("nuxt-link") : "span";
		},
	},
});
</script>

<style scoped lang="scss">
.chevron-text {
	display: inline-flex;
	flex-flow: row nowrap;
	align-items: center;
}

.chevron {
	// compensate for intrinsic padding
	margin: -0.5rem -0.5rem -0.5rem 0;
	bottom: 1px;
}
</style>
