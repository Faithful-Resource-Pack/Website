<template>
	<v-dialog v-model="modalOpened" max-width="1080" style="z-index: 999">
		<img class="card" :src />
	</v-dialog>
</template>

<script>
export default defineNuxtComponent({
	name: "screenshot-modal",
	props: {
		modelValue: {
			type: Boolean,
			required: true,
		},
		src: {
			type: String,
			required: true,
		},
	},
	emits: ["update:modelValue"],
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
});
</script>
