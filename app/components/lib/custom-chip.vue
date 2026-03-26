<template>
	<v-chip
		class="accent-textured"
		:style="{ color: chip.color }"
		:prepend-icon="chip.icon"
		:to="link ? chip.to : undefined"
	>
		<template v-if="!canDirectlyPrepend" #prepend>
			<media-icon class="mr-1 ml-n1" :icon="chip.icon" :color="chip.color" />
		</template>
		<span>{{ chip.text }}</span>
	</v-chip>
</template>

<script>
import MediaIcon from "./media-icon.vue";

export default defineNuxtComponent({
	name: "custom-chip",
	components: {
		MediaIcon,
	},
	props: {
		type: {
			type: String,
			required: true,
		},
		link: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	data() {
		return {
			data: {
				Java: { color: "#1DD96A", icon: "mdi-minecraft", text: "Java Edition" },
				Bedrock: { color: "#EEEEEE", icon: "mdi-cube", text: "Bedrock Edition" },
				"Faithful 32x": {
					color: "#00A2FF",
					icon: "faithful",
					text: "Faithful 32x",
					to: "/faithful32x",
				},
				"Faithful 64x": {
					color: "#FF0092",
					icon: "faithful",
					text: "Faithful 64x",
					to: "/faithful64x",
				},
				"Classic Faithful 32x": {
					color: "#5ED900",
					icon: "faithful",
					text: "Classic Faithful 32x",
					to: "/classic32x",
				},
				"Classic Faithful 64x": {
					color: "#BE42FF",
					icon: "faithful",
					text: "Classic Faithful 64x",
					to: "/classic64x",
				},
			},
			translate: {
				"32x": "Faithful 32x",
				"64x": "Faithful 64x",
			},
		};
	},
	computed: {
		chip() {
			if (Object.keys(this.translate).includes(this.type))
				return this.data[this.translate[this.type]];
			return this.data[this.type];
		},
		canDirectlyPrepend() {
			return this.chip.icon.startsWith("mdi-");
		},
	},
});
</script>
