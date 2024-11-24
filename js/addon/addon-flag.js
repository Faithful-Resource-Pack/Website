export default {
	name: "addon-flag",
	props: {
		type: {
			type: String,
			required: true,
		},
		square: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	template: `
		<div :class="flagClasses" :style="square ? 'margin-right: 24px' : ''">
			<img class="addon-flags-big" :src="images[type]" :alt="'Supports ' + type" loading="lazy" />
			<p v-if="!square && $slots.default" class="addon-flags-big-text">
				<slot />
			</p>
		</div>
		<br />
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
	computed: {
		flagClasses() {
			return ["card", "card-body", this.square ? "card-widget-square" : "card-widget"];
		},
	},
};
