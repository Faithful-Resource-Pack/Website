<template>
	<h2>Compatibility</h2>
	<span class="h5">Supported Packs</span>
	<div class="addon-chips">
		<custom-chip v-for="pack in options.packs" :key="pack" :type="pack" link />
	</div>
	<span class="h5 mt-3">Supported Editions</span>
	<div class="addon-chips">
		<custom-chip v-for="edition in options.tags" :key="edition" :type="edition" link />
	</div>
	<template v-if="options.optifine">
		<span class="h5 mt-3">Dependencies</span>
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
});
</script>

<style scoped lang="scss">
.addon-chips {
	display: flex;
	flex-flow: row wrap;
	gap: 1ch;
}
</style>
