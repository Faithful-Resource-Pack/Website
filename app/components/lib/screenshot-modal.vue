<template>
	<v-dialog
		v-model="modalOpened"
		content-class="screenshot-modal"
		:max-width="$vuetify.display.mdAndUp ? '80vw' : undefined"
	>
		<img class="header-img" :src />
		<button class="btn btn-secondary btn-icon btn-close" @click="$emit('update:modelValue', false)">
			<v-icon icon="mdi-close" />
		</button>
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

<style scoped lang="scss">
@use "~/assets/css/variables.scss" as *;

.screenshot-modal {
	position: relative;
}

.btn-close {
	position: absolute;
	top: $padding-card;
	right: $padding-card;
}
</style>
