<template>
	<span :class="classes">
		<slot v-if="$slots.default" />
	</span>
</template>

<script>
// this doesn't technically need to be a component
// but it encapsulates the styles quite nicely
export default defineNuxtComponent({
	name: "download-badge",
	props: {
		badge: {
			type: String,
			required: false,
			default: "",
		},
		dot: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	computed: {
		classes() {
			const cls = [this.dot ? "download-dot" : "download-badge"];
			if (this.badge) cls.push(this.badge);
			return cls;
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;

.download-badge,
.download-dot {
	padding: 0.2rem 0.4rem;
}

.download-dot {
	aspect-ratio: 1 !important;
	border-radius: 50%;
}

.download-badge {
	border-radius: 3px;
}

.github {
	background: white;
	color: $text-light;
}

.latest {
	background: white;
	color: $text-light;
}

.version {
	background: $btn-secondary;
	color: white;
}

.green {
	background: $text-green;
	color: $text-light;
}

.yellow {
	background: $text-yellow;
	color: $text-light;
}

.black {
	background: black;
	color: white;
}

.orange {
	background: $text-orange;
	color: white;
}

.blue {
	background: $text-blue;
	color: white;
}
</style>
