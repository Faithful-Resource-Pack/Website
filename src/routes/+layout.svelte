<script>
	import Header from "../components/header.svelte";
	import Footer from "../components/footer.svelte";
	import "../css/app.scss";
	import "../css/light.scss";
</script>

<Header />

<slot />

<Footer />