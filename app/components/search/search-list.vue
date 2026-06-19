<template>
	<div v-if="results.length" class="d-flex flex-column overflow-y-auto overflow-x-hidden mx-n2">
		<component
			:is="listComponent(result)"
			v-for="result in results"
			:key="result.label"
			:to="result.link"
			class="d-flex flex-row align-start pa-2 ga-3 highlight-hover cursor-pointer body-text"
			style="z-index: 997"
			@click="$emit('select', result)"
		>
			<v-icon :icon="result.icon" class="search-result mt-1" :title="result.type" />
			<div class="d-flex flex-column">
				<span class="h5">{{ result.label }}</span>

				<!-- eslint-disable-next-line vue/no-v-html -->
				<p v-if="result.context" class="search-result mb-0" v-html="result.context" />
			</div>
		</component>
	</div>
</template>

<script>
export default defineNuxtComponent({
	name: "search-list",
	props: {
		results: {
			// { type: string, label: string, link?: string, icon: string }
			type: Array,
			required: true,
		},
	},
	emits: ["select"],
	methods: {
		listComponent(result) {
			return result.link ? resolveComponent("nuxt-link") : "button";
		},
	},
});
</script>

<style scoped lang="scss">
.search-result * {
	margin-bottom: 0 !important;
}
</style>
