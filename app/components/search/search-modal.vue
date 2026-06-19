<template>
	<v-dialog v-model="modalOpened" attach=".site-container" max-width="600">
		<div class="card card-body" style="max-height: 85vh">
			<search-widget @close="closeModal" />
		</div>
	</v-dialog>
</template>

<script>
import SearchWidget from "~/components/search/search-widget.vue";

export default defineNuxtComponent({
	name: "search-modal",
	components: {
		SearchWidget,
	},
	props: {
		modelValue: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["update:modelValue"],
	data() {
		return {
			modalOpened: false,
		};
	},
	methods: {
		closeModal() {
			this.modalOpened = false;
		},
	},
	watch: {
		modelValue(n) {
			this.modalOpened = n;
			this.search = "";
		},
		modalOpened(n) {
			this.$emit("update:modelValue", n);
		},
	},
});
</script>
