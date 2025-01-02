<template>
	<main-layout>
		<slot />
	</main-layout>
</template>

<script>
import MainLayout from "~/components/navigation/main-layout.vue";
export default {
	components: {
		MainLayout,
	},
};
</script>
