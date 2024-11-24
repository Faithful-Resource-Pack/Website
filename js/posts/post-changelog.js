export default {
	name: "post-changelog",
	// recursive component (best way I could find to do this)
	template: `
		<li
			v-if="typeof item === 'string'"
			class="card-title"
		>
			{{ item }}
		</li>
		<ul v-else-if="Array.isArray(item)">
			<post-changelog v-for="el in item" :item="el" :level="level + 1" />
		</ul>
		<template v-else>
			<template v-for="[key, val] in Object.entries(item)">
				<component
					:is="title"
					class="card-title text-left"
				>
					{{ key }}
				</component>
				<post-changelog :item="val" :level="level + 1" />
			</template>
		</template>
	`,
	props: {
		item: {
			type: [String, Object, Array],
			required: true,
		},
		level: {
			type: Number,
			required: false,
			default: 3,
		},
	},
	computed: {
		title() {
			return `h${this.level}`;
		},
	},
};
