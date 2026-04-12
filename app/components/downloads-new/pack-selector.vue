<template>
	<div class="download-selector my-5">
		<template v-for="{ id, label, description, to } in packs" :key="id">
			<div
				class="download-choice d-flex align-center justify-space-between ga-2 cursor-pointer"
				:class="id === selectedPack && 'selected-choice'"
				@mouseover="hoverPack(id)"
				@mouseleave="resetHover"
				@click="selectPack(id)"
			>
				<div class="d-flex align-start ga-3">
					<v-icon
						class="download-radio-icon my-2"
						:icon="id === selectedPack ? 'mdi-radiobox-marked' : 'mdi-radiobox-blank'"
					/>
					<div class="d-flex flex-column align-start">
						<span class="pack-name">{{ label }}</span>
						<span>{{ description }}</span>
					</div>
				</div>

				<!-- use opacity instead of v-show so content doesn't shift -->
				<a
					:href="id === hoveredPack ? to : undefined"
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn-secondary btn-link"
					:title="`See more about ${label}`"
					:style="{ opacity: id === hoveredPack ? '1' : '0' }"
				>
					<v-icon icon="mdi-information-outline" />
				</a>
			</div>
		</template>
	</div>
</template>

<script>
export default defineNuxtComponent({
	name: "pack-selector",
	props: {
		packs: {
			type: Array,
			required: true,
		},
		select: {
			type: String,
			required: true,
		},
		hover: {
			type: String,
			required: true,
		},
	},
	emits: ["update:select", "update:hover"],
	data() {
		return {
			selectedPack: undefined,
			hoveredPack: undefined,
			hoverTimeout: undefined,
		};
	},
	methods: {
		selectPack(pack) {
			this.selectedPack = pack;
		},
		hoverPack(pack) {
			// user is hovering over multiple at once, clear the reset
			if (this.hoverTimeout) clearTimeout(this.hoverTimeout);
			this.hoveredPack = pack;
		},
		resetHover() {
			// it looks weird to preview a pack that isn't selected
			this.hoverTimeout = setTimeout(() => {
				this.hoveredPack = this.selectedPack;
			}, 500);
		},
	},
	watch: {
		select: {
			handler(n) {
				this.selectedPack = n;
			},
			immediate: true,
		},
		selectedPack(n) {
			this.$emit("update:select", n);
		},
		hover: {
			handler(n) {
				this.hoveredPack = n;
			},
			immediate: true,
		},
		hoveredPack(n) {
			this.$emit("update:hover", n);
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables.scss" as *;

$border-thickness: 2px;

.download-selector {
	display: flex;
	flex-flow: column nowrap;
	align-items: stretch;
	gap: 8px;
}

.download-choice {
	border: $border-thickness solid rgba(white, 0.2);
	.download-info-icon {
		color: rgba(white, 0.2);
	}
	padding: $padding-card;
	border-radius: $border-radius;

	transition: $transition-button;
}

.download-choice:not(.selected-choice):hover {
	// half white half green, should unhardcode at some point
	border: $border-thickness solid rgba(#bae3a1, 0.5);
	.download-radio-icon {
		color: rgba(#bae3a1, 0.9);
	}
}

.pack-name {
	color: $text-card-title;
	font-size: 1.35rem;
}

.selected-choice {
	border: $border-thickness solid $text-green;
	background: rgba($text-green, 0.15);
	.download-radio-icon {
		color: $text-green;
	}
}

.btn-link {
	width: 2.5rem;
	height: 2.5rem;
}
</style>
