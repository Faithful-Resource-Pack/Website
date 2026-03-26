<template>
	<h2 class="text-center">Compatibility</h2>
	<h5>Supported Packs</h5>
	<div class="addon-chips">
		<custom-chip v-for="pack in packs" :key="pack" :type="pack" link />
	</div>
	<h5>Supported Editions</h5>
	<div class="addon-chips">
		<custom-chip v-for="edition in editions" :key="edition" :type="edition" link />
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
import ProfileCard from "~/components/lib/profile-card.vue";
import CustomChip from "~/components/lib/custom-chip.vue";

export default defineNuxtComponent({
	name: "compatibility-card",
	components: {
		CustomChip,
		ProfileCard,
	},
	props: {
		options: {
			type: Object,
			required: true,
		},
	},
	computed: {
		editions() {
			return this.options.tags.filter((e) => ["Java", "Bedrock"].includes(e));
		},
		packs() {
			return this.options.tags.filter((p) => ["32x", "64x"].includes(p));
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
