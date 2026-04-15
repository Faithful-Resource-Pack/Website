<template>
	<div class="download-selector d-flex flex-column justify-space-between" role="radiogroup">
		<h2>Select pack</h2>
		<template v-for="{ id, color, label, description, to } in packs" :key="id">
			<!-- focus/blur for keyboard navigation, mouseenter/leave for mouse navigation -->
			<label
				class="download-choice d-flex align-center cursor-pointer"
				:class="getClass(id)"
				:for="id"
				:style="getStyle(color)"
				@mouseenter="$emit('update:hover', id)"
				@mousemove="$emit('update:hover', id)"
				@mouseleave="$emit('update:hover', undefined)"
			>
				<v-icon
					:icon="id === select ? 'mdi-radiobox-marked' : 'mdi-radiobox-blank'"
					class="select-icon"
				/>
				<div class="pack-name flex-grow-1">
					<span
						>{{ label }}
						<input
							:id="id"
							name="packChoice"
							type="radio"
							:value="id"
							:checked="id === select"
							@input="$emit('update:select', id)"
						/>
					</span>
					<p>
						{{ description }}
					</p>
				</div>

				<a
					:href="to"
					target="_blank"
					rel="noopener noreferrer"
					:title="`See more about ${label}`"
					class="open-link"
				>
					<v-icon icon="mdi-arrow-top-right" />
				</a>
			</label>
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
			default: undefined,
		},
	},
	data() {
		return {
			hoverTimeout: undefined,
		};
	},
	emits: ["update:select", "update:hover"],
	methods: {
		getClass(id) {
			const classes = [];
			if (id === this.select) {
				classes.push("selected");
			} else if (id === this.hover) {
				classes.push("hover");
			}
			return classes;
		},
		getStyle(color) {
			// Some browsers still don't support custom properties
			// 0x3F = 25% of 255
			// 0x26 = 15% of 255
			return `--pack-color: ${color}; --pack-color-select: ${color}3F; --pack-color-hover: ${color}26`;
		},
	},
	watch: {
		hover(n) {
			clearTimeout(this.hoverTimeout);
			if (n !== undefined) {
				// it looks weird to preview a pack that isn't selected
				setTimeout(() => {
					this.$emit("update:hover", undefined);
				}, 1000);
			}
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables.scss" as *;

$border-thickness: 4px;
$logo_size: 96px;

h2,
.open-link {
	color: white;
}

.download-selector {
	padding: 1.25rem;
	display: flex;
	flex-flow: row nowrap;
	align-items: stretch;
	gap: 8px;
	z-index: 1;
	position: relative;
}

.download-choice {
	user-select: none;

	padding: $padding-card;
	gap: $padding-card;

	border-radius: 2px;
	border: 2px solid transparent;
	&.selected {
		background: var(--pack-color-select) !important;
		border-color: var(--pack-color);
	}
	&:hover {
		background: var(--pack-color-hover);
	}
	transition: $transition-button;

	&.selected .select-icon {
		color: var(--pack-color);
	}

	img {
		width: $logo_size;
		height: $logo_size;
	}

	p {
		margin: 0;
	}
}

a,
span {
	color: white;
}

/* Input must not be display none to keep arrows working */
input {
	width: 0;
	opacity: 0;
	overflow: hidden;
}

.pack-name {
	line-height: 1;
}

.pack-name .label {
	color: $text-card-title;
	font-size: 1.35rem;
}

.open-link {
	opacity: 0;
	border-radius: 3px;
	transition: $transition-button;

	&:hover {
		background: rgba(white, 0.2);
	}
}
.download-choice:hover .open-link,
.download-choice.selected .open-link {
	opacity: 1;
}
</style>
