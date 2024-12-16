export default {
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
	// recursive component (best way I could find to do this)
	template: `
		<li
			v-if="typeof item === 'string'"
			class="card-title"
		>
			{{ item }}
		</li>
		<ul v-else-if="Array.isArray(item)">
			<post-changelog v-for="el in item" :item="el" :level="level + 1" list />
		</ul>
		<template v-else>
			<template v-for="[key, val] in Object.entries(item)">
				<li v-if="list" class="card-title">{{ key }}:</li>
				<component v-else :is="title" class="card-title text-left">
					{{ key }}:
				</component>
				<post-changelog :item="val" :level="level + 1" />
			</template>
		</template>
	`,
	computed: {
		title() {
			return `h${this.level}`;
		},
	},
};
