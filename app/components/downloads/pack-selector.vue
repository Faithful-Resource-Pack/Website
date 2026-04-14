<template>
	<div class="download-selector my-5 d-flex text-center justify-space-between" role="radiogroup">
		<template v-for="{ id, color, label, description, to } in packs" :key="id">
			<!-- focus/blur for keyboard navigation, mouseenter/leave for mouse navigation -->
			<label
				class="card download-choice text-center cursor-pointer"
				:class="getClass(id)"
				:for="id"
				:style="getStyle(color)"
				@mouseenter="$emit('update:hover', id)"
				@mouseleave="$emit('update:hover', undefined)"
			>
				<v-icon
					:icon="id === select ? 'mdi-radiobox-marked' : 'mdi-radiobox-blank'"
					class="select-icon"
				/>
				<img
					class="download-preview download-logo mx-auto"
					:src="`https://database.faithfulpack.net/images/branding/logos/transparent/hd/${id}_logo.png`"
					:alt="`${label} Logo`"
				/>
				<p class="pack-name">
					<component
						:is="id === hover ? 'a' : 'span'"
						:href="to"
						:aria-hidden="id !== hover"
						target="_blank"
						rel="noopener noreferrer"
						class="label"
						:title="`See more about ${label}`"
						>{{ label }}
					</component>
				</p>
				<hr class="mx-auto my-2" />
				<p class="mb-2">
					{{ description }}
				</p>
				<input
					:id="id"
					name="packChoice"
					type="radio"
					:value="id"
					:checked="id === select"
					@input="$emit('update:select', id)"
				/>
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
			return `--pack-color: ${color}; --pack-color-select: ${color}E5; --pack-color-hover: ${color}7F`;
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables.scss" as *;

$border-thickness: 4px;
$logo_size: 96px;

.download-selector {
	display: flex;
	flex-flow: row nowrap;
	align-items: stretch;
	gap: 8px;
	z-index: 1;
	position: relative;
}

.download-choice {
	flex: 1 1 0;
	user-select: none;

	border-radius: $border-radius;
	border: $border-thickness solid transparent;
	&.selected {
		border-color: var(--pack-color-select) !important;
	}
	&:hover {
		border-color: var(--pack-color-hover);
	}
	transition: $transition-button;

	overflow: visible;
	position: relative;
	.select-icon {
		position: absolute;
		/* top: -$border-radius;
		left: -$border-radius;
		transform: translate(-33%, -33%); */
	}
	&.selected .select-icon {
		color: var(--pack-color-select);
	}

	padding: $padding-card;

	img {
		width: $logo_size;
		height: $logo_size;
	}

	p {
		margin: 0;
	}

	.label {
		border-bottom: 2px solid var(--pack-color);
	}

	a {
		color: inherit;
	}

	input {
		display: none;
	}
}

.pack-name {
	color: $text-card-title;
	font-size: 1.35rem;
}
</style>
