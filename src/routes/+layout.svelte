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
		padding-bottom: 50px;
	}
</style>