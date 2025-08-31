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
@use "~/assets/css/lib/variables" as *;

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
	color: #111111;
}

.latest {
	background: white;
	color: #111111;
}

.version {
	background: $primary-button;
	color: white;
}

.green {
	background: $badge-green;
	color: #111111;
}

.yellow {
	background: $badge-yellow;
	color: #111111;
}

.black {
	background: black;
	color: white;
}

.red {
	background: $badge-red;
	color: white;
}

.blue {
	background: $badge-blue;
	color: white;
}
</style>
