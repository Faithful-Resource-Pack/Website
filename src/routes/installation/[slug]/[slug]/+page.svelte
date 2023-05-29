<script lang="ts">
    import { page } from '$app/stores';  
    import SelectionCard from "$components/selectionCard.svelte";

    let selection = $page.url.pathname.slice(0, -1).split("/").pop();
    const editions = [
        "Java",
        "Bedrock",
        "Don't know"
    ]
</script>

<div class="container">
    {#if selection === "Windows" }
        <h1 class="text-center">Which Minecraft edition are you playing?</h1>
        <SelectionCard items={editions} />
    {:else}
        <p>balls</p>
    {/if}
</div>