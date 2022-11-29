<script lang="ts">
import { page } from '$app/stores';
import PackSection from './packSection.svelte';
</script>

<svelte:head>
    <title>Downloads - Faithful</title>
</svelte:head>

<h1 class="title text-center">Downloads</h1>

{#each $page.data.packs as pack}
<PackSection pack={pack} />
{/each}

<style>
</style>