export default {
	name: "screenshot-modal",
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
	emits: ["update:modelValue"],
	template: `
		<v-dialog
			v-model="modalOpened"
			max-width="1080"
			style="z-index: 999"
		>
			<img :src="image" />
		</v-dialog>
	`,
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
