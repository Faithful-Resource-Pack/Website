export default {
	name: "addon-modal",
	template: `
		<v-dialog
			v-model="modalOpened"
			max-width="1080"
			style="z-index: 999"
		>
			<img :src="image" />
		</v-dialog>
	`,
	props: {
		modelValue: {
			type: Boolean,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			modalOpened: false,
		};
	},
	watch: {
		modelValue(n) {
			this.modalOpened = n;
		},
		modalOpened(n) {
			this.$emit("update:modelValue", n);
		},
	},
};
