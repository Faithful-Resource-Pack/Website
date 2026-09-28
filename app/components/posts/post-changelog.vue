<template>
	<li v-if="typeof item === 'string'" class="mb-2">
		{{ item }}
	</li>
	<ul v-else-if="Array.isArray(item)">
		<post-changelog v-for="el in item" :key="el" :item="el" :level="level + 1" list />
	</ul>
	<template v-else>
		<template v-for="[key, val] in Object.entries(item)" :key>
			<li v-if="list">{{ key }}:</li>
			<component
				:is="title"
				v-else
				class="d-flex align-center justify-space-between"
				style="cursor: pointer"
				@click="toggleCollapse(key)"
			>
				{{ key }}:
				<v-icon
					size="1.5rem"
					:title="collapsed.has(key) ? 'Open changelog category' : 'Close changelog category'"
					:icon="collapseIcon(key)"
					style="opacity: 0.7"
				/>
			</component>
			<!-- use v-show so children remember their collapsing state if reopened -->
			<div v-show="!collapsed.has(key)">
				<post-changelog :item="val" :level="level + 1" />
			</div>
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
			default: 1,
		},
		// used when headings should be a list element (nested category)
		list: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	data() {
		return {
			collapsed: new Set(),
		};
	},
	methods: {
		toggleCollapse(key) {
			if (this.collapsed.has(key)) this.collapsed.delete(key);
			else this.collapsed.add(key);
		},
		collapseIcon(key) {
			return this.collapsed.has(key) ? "mdi-chevron-right" : "mdi-chevron-down";
		},
	},
	computed: {
		title() {
			return `h${this.level}`;
		},
	},
});
</script>
