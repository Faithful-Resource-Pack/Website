<template>
	<h2 class="text-center">Compatibility</h2>
	<h5>Supported Editions</h5>
	<div class="addon-chips">
		<v-chip
			v-if="options.tags.includes('Java')"
			prepend-icon="mdi-minecraft"
			density="compact"
			color="#1dd96a"
		>
			Java Edition
		</v-chip>
		<v-chip
			v-if="options.tags.includes('Bedrock')"
			prepend-icon="mdi-cube"
			density="compact"
			color="#eee"
		>
			Bedrock Edition
		</v-chip>
	</div>
	<h5>Supported Packs</h5>
	<div class="addon-chips">
		<v-chip v-if="options.tags.includes('32x')" density="compact" color="#00b0ff" to="/faithful32x">
			Faithful 32x
		</v-chip>
		<v-chip v-if="options.tags.includes('64x')" density="compact" color="#ff62bc" to="/faithful64x">
			Faithful 64x
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
export default defineNuxtComponent({
	name: "compatibility-card",
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
	padding-bottom: 10px;
}
</style>
