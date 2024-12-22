export default {
	name: "compatibility-card",
	props: {
		options: {
			type: Object,
			required: true,
		},
	},
	template: `
		<div class="card card-body addon-info">
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
				<v-chip
					v-if="options.tags.includes('32x')"
					density="compact"
					color="#00b0ff"
					href="/faithful32x"
				>
					Faithful 32x
				</v-chip>
				<v-chip
					v-if="options.tags.includes('64x')"
					density="compact"
					color="#ff62bc"
					href="/faithful64x"
				>
					Faithful 64x
				</v-chip>
			</div>
			<template v-if="options.optifine">
				<h5>Dependencies</h5>
				<div class="author-widget">
					<img src="/image/addons/optifine.png" class="optifine-img">
					<p>
						Requires <a href="https://optifine.net/downloads" target="_blank">OptiFine</a> or an <a href="https://optifine.alternatives.lambdaurora.dev/" target="_blank">equivalent mod</a>
					</p>
				</div>
			</template>
		</div>
	`,
};
