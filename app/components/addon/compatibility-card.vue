<template>
	<h2 class="text-center card-title">Compatibility</h2>
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
		<profile-card src="/image/addons/optifine.png">
			Requires
			<nuxt-link to="https://optifine.net/downloads" target="_blank">OptiFine</nuxt-link> or an
			<nuxt-link to="https://optifine.alternatives.lambdaurora.dev/" target="_blank">
				equivalent mod
			</nuxt-link>
		</profile-card>
	</template>
</template>

<script>
import MediaIcon from "~/components/lib/media-icon.vue";
import ProfileCard from "~/components/lib/profile-card.vue";

export default defineNuxtComponent({
	name: "compatibility-card",
	components: {
		MediaIcon,
		ProfileCard,
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
				Java: { color: "#1DD96A", icon: "mdi-minecraft", text: "Java Edition" },
				Bedrock: { color: "#EEEEEE", icon: "mdi-cube", text: "Bedrock Edition" },
				"32x": { color: "#00A2FF", icon: "faithful", text: "Faithful 32x", to: "/faithful32x" },
				"64x": { color: "#FF0092", icon: "faithful", text: "Faithful 64x", to: "/faithful64x" },
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
