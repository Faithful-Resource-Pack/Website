<template>
	<v-chip
		class="accent-textured"
		:style="{ color: chip.color }"
		:prepend-icon="chip.icon"
		:to="link ? chip.to : undefined"
		v-bind="$attrs"
	>
		<template v-if="!canDirectlyPrepend" #prepend>
			<media-icon class="mr-1 ml-n1" :icon="chip.icon" :color="chip.color" />
		</template>
		<span>{{ chip.name }}</span>
	</v-chip>
</template>

<script>
import MediaIcon from "./media-icon.vue";

import projects from "../../../public/data/projects.json";

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
				Java: { color: "#1DD96A", icon: "mdi-minecraft", name: "Java Edition" },
				Bedrock: { color: "#999999", icon: "mdi-cube", name: "Bedrock Edition" },
				// kinda stupid but it works lol
				...projects
					.filter((p) => p.addons)
					.reduce((acc, cur) => {
						acc[cur.pack_id] = cur;
						acc[cur.pack_id].icon = "faithful";
						return acc;
					}, {}),
			},
		};
	},
	computed: {
		chip() {
			return this.data[this.type];
		},
		canDirectlyPrepend() {
			return this.chip.icon.startsWith("mdi-");
		},
	},
});
</script>
