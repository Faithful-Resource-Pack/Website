<script>
	import Header from "../components/header.svelte";
	import Footer from "../components/footer.svelte";
	import "../css/app.scss";
	import "../css/light.scss";
	import { themeValueWatch } from "$stores/ThemeStore";
	import { onMount } from "svelte";

	onMount(() => {
		themeValueWatch((isDark) => {
			document.body.parentElement.classList[(isDark) ? 'remove' : 'add']('light');
		})
	})
</script>

<Header />

<main>
	<slot />
</main>

<Footer />

<style lang="scss">
	main {
		// css trick for margin inside
		margin: -1px 0 0;
		padding: 1px 0 50px;
	}
</style>