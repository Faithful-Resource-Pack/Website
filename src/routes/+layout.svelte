<script>
	import Header from "../components/header.svelte";
	import Footer from "../components/footer.svelte";
	import "../css/app.scss";
	import "../css/light.scss";
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