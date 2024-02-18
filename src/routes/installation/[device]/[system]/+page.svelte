<script lang="ts">
	import SelectionCard from "$components/selectionCard.svelte";
	import { parseMd } from "$lib/shortMd";

	export let data: any;
	const editions = ["Java", "Bedrock", "Don't know"];
</script>

<div class="container">
	{#if data.system === "Windows"}
		<h1 class="text-center">Which Minecraft edition are you playing?</h1>
		<SelectionCard items={editions} />
	{:else}
		<h1 class="text-center">Installation instructions for {data.system}</h1>
		{@html parseMd(data.markdown)}
	{/if}
</div>
