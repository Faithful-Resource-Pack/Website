<template>
	<v-dialog v-model="modalOpen" attach=".site-container" max-width="600">
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
			modalOpen: false,
		};
	},
	methods: {
		closeModal() {
			this.modalOpen = false;
		},
	},
	watch: {
		modelValue(n) {
			this.modalOpen = n;
			this.search = "";
		},
		modalOpen(n) {
			this.$emit("update:modelValue", n);
		},
	},
});
</script>
