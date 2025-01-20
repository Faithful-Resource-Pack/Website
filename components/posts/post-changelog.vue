<template>
	<li v-if="typeof item === 'string'" class="changelog-item">
		{{ item }}
	</li>
	<ul v-else-if="Array.isArray(item)">
		<post-changelog v-for="el in item" :item="el" :level="level + 1" list />
	</ul>
	<template v-else>
		<template v-for="[key, val] in Object.entries(item)">
			<li v-if="list" class="changelog-item">{{ key }}:</li>
			<component v-else :is="title" class="changelog-item"> {{ key }}: </component>
			<post-changelog :item="val" :level="level + 1" />
		</template>
	</template>
</template>

<script>
export default defineNuxtComponent({
	name: "post-changelog",
	props: {
		item: {
			type: [String, Object, Array],
			required: true,
		},
		level: {
			type: Number,
			required: false,
			default: 2,
		},
		// used when headings should be a list element (nested category)
		list: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	computed: {
		title() {
			return `h${this.level}`;
		},
	},
});
</script>

<style scoped lang="scss">
// stops everything from looking really stupid
.changelog-item {
	margin-bottom: 0.75rem;
}
</style>
