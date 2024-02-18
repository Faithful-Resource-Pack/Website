<script lang="ts">
	import { page } from "$app/stores";
	import PackSection from "./packSection.svelte";
</script>

<h1 class="title text-center bold">Downloads</h1>

{#each $page.data.packs as pack}
	<PackSection {pack} />
{/each}

<style>
</style>
