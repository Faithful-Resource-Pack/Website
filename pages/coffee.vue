<script setup>
definePageMeta({
	middleware: "coffee",
});
</script>

<template>
	<coffee-page />
</template>

<script>
import CoffeePage from "~/components/coffee-page.vue";

export default defineNuxtComponent({
	components: {
		CoffeePage,
	},
});
</script>
