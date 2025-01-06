<template>
	<main-layout>
		<slot />
	</main-layout>
</template>

<script>
import MainLayout from "~/layouts/main-layout.vue";
export default {
	components: {
		MainLayout,
	},
};
</script>
