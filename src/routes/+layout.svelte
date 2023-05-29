<script lang="ts">
	import { page } from '$app/stores';
	import Header from "$components/header.svelte";
	import Footer from "$components/footer.svelte";

	import "../css/app.scss";
	import "../css/light.scss";
	
	import { themeValueWatch } from "$stores/ThemeStore";
	import { onMount } from "svelte";
	import { derived } from 'svelte/store';

	// HEAD data
	const title = derived(page, (p) =>  (p?.data?.title ? (p.data.title + ' - Faithful') : 'Faithful'))
	const description = derived(page, (p) => {
		return p.data.embed_description || p.data.description || "Providing a higher-resolution Minecraft experience since 2010. Available in 32x and 64x for Java and Bedrock."
	})
	const image = derived(page, (p) => {
		return p.data.image || "https://database.faithfulpack.net/images/branding/site/banners/universal_banner.png"
	})

	onMount(() => {
		themeValueWatch((isDark) => {
			document.body.parentElement?.classList[(isDark) ? 'remove' : 'add']('light');
		})
		console.log("%cHey!", "font-size:24px;color:orange");
		console.log("%cAre you trying to look through our code?\nThis website is open source and you can find it here:\nhttps://github.com/Faithful-Resource-Pack/Website", "font-size:18px")
		console.log("%cAnd remember not to paste any code in here that someone gave you", "font-size:14px")
	})
</script>

<svelte:head>
	<title>{ $title }</title>
	<meta property="og:url" content="{ $page.url.href }" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="{$title}" />
	<meta property="og:description" content="{$description}" />
	<meta property="og:image" content="{ $image }" />
</svelte:head>

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta property="twitter:domain" content="{ $page.url.hostname }">
<meta property="twitter:url" content="{ $page.url.href }">
<meta name="twitter:description" content="{ $description }" />
<meta property="twitter:image" content="{ $image }" />

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