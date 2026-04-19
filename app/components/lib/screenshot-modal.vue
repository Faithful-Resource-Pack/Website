<template>
	<v-dialog v-model="modalOpened" :max-width="$vuetify.display.mdAndUp ? '80vw' : undefined">
		<v-carousel
			v-model="currentImageIndex"
			:show-arrows="sources.length > 1"
			hide-delimiters
			theme="dark"
			height="auto"
			:width="$vuetify.display.mdAndUp ? '80vw' : undefined"
		>
			<v-carousel-item v-for="src in sources" :key="src" :src />
		</v-carousel>
		<button class="btn btn-secondary btn-icon btn-close" @click="$emit('update:open', false)">
			<v-icon icon="mdi-close" />
		</button>
		<!-- the default delimiters are genuinely hideous so it's reimplemented here -->
		<div class="delimiters ga-n5">
			<v-btn
				v-for="(src, i) in sources"
				:key="src"
				icon
				variant="text"
				size="16px"
				@click="$emit('update:modelValue', i)"
			>
				<v-icon
					icon="mdi-circle-medium"
					size="16px"
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

.delimiters {
	position: absolute;
	bottom: $padding-card;
	padding: 4px;
	margin: $padding-card;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	background: rgba(black, 0.5);
	// 4px padding + 16px buttons
	border-radius: 20px;
}

@media screen and (max-width: $breakpoint-xs) {
	// put under image and allow wrap
	.delimiters {
		position: static;
		flex-wrap: wrap;
		transform: none;
		margin: 1rem;
	}
}

.selected {
	color: white;
}
.deselected {
	color: rgba(white, 0.3);
}
</style>
