<script lang="ts">
	import { page } from "$app/stores";
	import SelectionCard from "$components/selectionCard.svelte";

	let selection = $page.url.pathname.slice(0, -1).split("/").pop();
	const devices = {
		PC: ["Windows", "macOS", "Linux", "ChromeOS"],
		Mobile: ["iOS/iPadOS", "Android"],
		Console: ["Xbox", "PlayStation", "Nintendo Switch"],
	};
</script>

<div class="container">
	<h1 class="text-center">What {selection === "Console" ? "console" : "system"} are you using?</h1>
	{#if selection === "Mobile"}
		<SelectionCard items={devices.Mobile} />
	{:else if selection === "Console"}
		<SelectionCard items={devices.Console} />
	{:else}
		<SelectionCard items={devices.PC} />
	{/if}
</div>
