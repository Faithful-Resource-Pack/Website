<template>
	<v-dialog v-model="modalOpened" :max-width="$vuetify.display.mdAndUp ? '70vw' : undefined">
		<v-carousel
			v-model="currentImageIndex"
			:show-arrows="sources.length > 1"
			hide-delimiters
			theme="dark"
			height="auto"
			:width="$vuetify.display.mdAndUp ? '70vw' : undefined"
		>
			<v-carousel-item v-for="src in sources" :key="src" :src />
		</v-carousel>
		<button class="btn btn-secondary btn-icon btn-close" @click="$emit('update:open', false)">
			<v-icon icon="mdi-close" />
		</button>
		<!-- the default delimiters are hideous so it's reimplemented here -->
		<div class="d-flex flex-row justify-center ga-1 my-3">
			<v-btn
				v-for="(src, i) in sources"
				:key="src"
				icon
				variant="text"
				size="x-small"
				@click="$emit('update:modelValue', i)"
			>
				<v-icon
					icon="mdi-circle-medium"
					size="x-large"
					:class="currentImageIndex === i ? 'selected' : 'deselected'"
				/>
			</v-btn>
		</div>
	</v-dialog>
</template>

<script>
export default defineNuxtComponent({
	name: "screenshot-modal",
	props: {
		open: {
			type: Boolean,
			required: true,
		},
		modelValue: {
			type: Number,
			required: true,
		},
		sources: {
			type: Array,
			required: true,
		},
	},
	emits: ["update:open", "update:modelValue"],
	data() {
		return {
			modalOpened: false,
			currentImageIndex: 0,
		};
	},
	watch: {
		open(n) {
			this.modalOpened = n;
		},
		modalOpened(n) {
			this.$emit("update:open", n);
		},
		modelValue(n) {
			this.currentImageIndex = n;
		},
		currentImageIndex(n) {
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

.selected {
	color: white;
}
.deselected {
	color: rgba(white, 0.4);
}
</style>
