<script lang="ts">
	import Header from "$components/header.svelte";
	import Footer from "$components/footer.svelte";
	import { onMount } from 'svelte';

	// Will only log to browser console
	onMount(() => {
		console.log("%cHey!", "font-size:24px;color:orange");
		console.log("%cAre you trying to look through our code?\nThis website is open source and you can find it here:\nhttps://github.com/Faithful-Resource-Pack/Website", "font-size:18px")
		console.log("%cAnd remember not to paste any code in here that someone gave you", "font-size:14px")
	});
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