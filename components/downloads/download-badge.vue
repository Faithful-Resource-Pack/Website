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

<style lang="scss" scoped>
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
	background-color: rgb(255, 255, 255);
	color: #111;
}

.latest {
	background-color: #fff;
	color: #111;
}

.version {
	background-color: #343a40;
	color: #fff;
}

.green {
	background-color: rgb(80, 202, 24);
	color: #111;
}

.yellow {
	background-color: rgb(214, 160, 23);
	color: #111;
}

.black {
	background-color: #000;
	color: #fff;
}

.red {
	background-color: rgb(223, 28, 67);
	color: #fff;
}

.blue {
	background-color: rgb(44, 139, 222);
	color: #fff;
}
</style>
