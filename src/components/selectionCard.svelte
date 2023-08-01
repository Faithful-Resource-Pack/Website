<script lang="ts"> //teamspeak
    import { goto } from '$app/navigation';

    export let items;
</script>

<div id="selectionCardList">
    {#each items as item}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="card"
            role="button"
            tabindex="0"
	        on:click={goto(`${encodeURIComponent(item)}`)}
        >
            <img class="noSelect" src="/images/about/2.png" alt="placeholder">
            <h2 class="text-center">{item}</h2>
        </div>
    {/each}
</div>

<style lang="scss">
    #selectionCardList {
        display: flex;
        gap: 30px;
        justify-content: center;
        flex-wrap: wrap;
    }

    .card {
        transition: all .2s;
    }
</style>