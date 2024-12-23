export default {
	name: "post-downloads",
	components: {
		MediaIcon: Vue.defineAsyncComponent(() => import("../components/media-icon.js")),
	},
	props: {
		downloads: {
			type: Object,
			required: true,
		},
	},
	template: `
		<h2 class="subtitle my-5 text-center">Downloads</h2>
		<template v-for="[category, items] in Object.entries(downloads)">
			<a
				v-if="typeof items === 'string'"
				:href="items"
				class="btn block btn-lg btn-primary my-3"
			>
				<media-icon :icon="items" fallback="download" />
				<span style="margin-left: 8px">{{ category }}</span>
			</a>
			<template v-else>
				<h1 class="my-3 text-center">{{ category }}</h1>
				<a
					v-for="[name, link] in Object.entries(items)"
					:key="link"
					:href="link"
					class="btn block btn-lg btn-primary"
				>
					<media-icon :icon="name" fallback="download" />
					<span style="margin-left: 8px">{{ name }}</span>
				</a>
				<br />
			</template>
		</template>
	`,
};
