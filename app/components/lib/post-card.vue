<template>
	<base-card v-bind="$attrs">
		<template #title>
			{{ mainTitle }}
		</template>
		<template #body>
			<p class="mb-2">{{ subtitle }}</p>
		</template>
	</base-card>
</template>
<script>
import BaseCard from "./base-card.vue";

export default defineNuxtComponent({
	name: "post-card",
	components: {
		BaseCard,
	},
	props: {
		// can use either prop or slot
		title: {
			type: String,
			required: true,
		},
		date: {
			type: [String, Number, Date],
			required: true,
		},
	},
	computed: {
		mainTitle() {
			const split = this.title.split(": ");
			// single-part title, take whole thing
			if (split.length === 1) return this.title;
			return split.slice(1).join(": ");
		},
		tags() {
			// if there's only one part then it just returns itself
			const split = this.title.split(": ");
			if (split.length === 1) return "";
			return split[0];
		},
		subtitle() {
			const date = exactDate(this.date);
			if (this.tags) return `${this.tags} • ${date}`;
			return date;
		},
	},
});
</script>
