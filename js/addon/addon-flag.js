export default {
	name: "addon-flag",
	props: {
		type: {
			type: String,
			required: true,
		},
	},
	template: `
		<div class="card card-body card-widget">
			<img class="addon-flags-big" :src="images[type]" :alt="'Supports ' + type" loading="lazy" />
			<p v-if="$slots.default" class="addon-flags-big-text">
				<slot />
			</p>
		</div>
	`,
	data() {
		return {
			images: {
				optifine: "/image/icon/optifine.png",
				java: "/image/icon/java.png",
				bedrock: "/image/icon/bedrock.png",
				"32x": "/image/icon/32.png",
				"64x": "/image/icon/64.png",
			},
		};
	},
};
