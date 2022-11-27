<script lang="ts">
    import PackCard from "./packCard.svelte";

    export let items: App.CardList;

    $: urls = items.urls;
    $: links = items.links;
</script>

<div id="packCardList">
    {#each urls as url, url_i}
        <PackCard {...url} links={links[url_i]} />
    {/each}
</div>

<style>
    #packCardList {
        display: flex;
        gap: 30px;
        justify-content: center;
    }
</style>