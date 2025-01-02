<template>
	<body class="background">
		<navbar />
		<main class="foreground">
			<slot v-if="noContainer" />
			<div v-else class="container">
				<slot />
			</div>
		</main>
		<column-footer />
	</body>
</template>

<script>
import Navbar from "~/components/navigation/navbar.vue";
import ColumnFooter from "~/components/navigation/column-footer.vue";

export default {
	name: "main-layout",
	components: {
		Navbar,
		ColumnFooter,
	},
	props: {
		noContainer: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
