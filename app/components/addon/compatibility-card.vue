<template>
	<h2 class="text-center">Compatibility</h2>
	<h5>Supported Packs</h5>
	<div class="addon-chips">
		<v-chip v-for="{ color, icon, text, to } in packs" :key="text" density="compact" :color :to>
			<template #prepend>
				<media-icon :icon class="mr-1 ml-n1" :color />
			</template>
			{{ text }}
		</v-chip>
	</div>
	<h5>Supported Editions</h5>
	<div class="addon-chips">
		<v-chip
			v-for="{ color, icon, text } in editions"
			:key="text"
			:prepend-icon="icon"
			density="compact"
			:color
		>
			{{ text }}
		</v-chip>
	</div>
	<template v-if="options.optifine">
		<h5>Dependencies</h5>
		<div class="profile-card">
			<img src="/image/addons/optifine.png" class="profile-avatar" />
			<p>
				Requires
				<nuxt-link to="https://optifine.net/downloads" target="_blank">OptiFine</nuxt-link> or an
				<nuxt-link to="https://optifine.alternatives.lambdaurora.dev/" target="_blank">
					equivalent mod
				</nuxt-link>
			</p>
		</div>
	</template>
</template>

<script>
import MediaIcon from "~/components/lib/media-icon.vue";

export default defineNuxtComponent({
	name: "compatibility-card",
	components: {
		MediaIcon,
	},
	props: {
		options: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			data: {
				Java: { color: "#1dd96a", icon: "mdi-minecraft", text: "Java Edition" },
				Bedrock: { color: "#eee", icon: "mdi-cube", text: "Bedrock Edition" },
				"32x": { color: "#00a2ff", icon: "faithful", text: "Faithful 32x", to: "/faithful32x" },
				"64x": { color: "#ff0092", icon: "faithful", text: "Faithful 64x", to: "/faithful64x" },
			},
		};
	},
	computed: {
		editions() {
			return this.options.tags
				.filter((e) => ["Java", "Bedrock"].includes(e))
				.map((k) => this.data[k]);
		},
		packs() {
			return this.options.tags.filter((p) => ["32x", "64x"].includes(p)).map((k) => this.data[k]);
		},
	},
});
</script>

<style scoped lang="scss">
.addon-chips {
	display: flex;
	flex-flow: row wrap;
	gap: 1ch;
	padding-bottom: 10px;
}
</style>
