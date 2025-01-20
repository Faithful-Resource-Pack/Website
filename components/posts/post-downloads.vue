<template>
	<h2 class="subtitle my-5 text-center">Downloads</h2>
	<template v-for="[category, items] in Object.entries(downloads)">
		<nuxt-link
			v-if="typeof items === 'string'"
			:to="items"
			class="btn block btn-lg btn-primary my-3"
		>
			<media-icon size="small" :icon="items" fallback="download" />
			<span style="margin-left: 8px">{{ category }}</span>
		</nuxt-link>
		<template v-else>
			<h1 class="my-3 text-center">{{ category }}</h1>
			<nuxt-link
				v-for="[name, link] in Object.entries(items)"
				:key="link"
				:to="link"
				class="btn block btn-lg btn-primary"
			>
				<media-icon size="small" :icon="name" fallback="download" />
				<span style="margin-left: 8px">{{ name }}</span>
			</nuxt-link>
			<br />
		</template>
	</template>
</template>

<script>
import MediaIcon from "~/components/lib/media-icon.vue";

export default defineNuxtComponent({
	name: "post-downloads",
	components: {
		MediaIcon,
	},
	props: {
		downloads: {
			type: Object,
			required: true,
		},
	},
});
</script>
