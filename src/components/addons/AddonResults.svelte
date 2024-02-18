<script lang="ts">
    import Fa from "svelte-fa";
	import {
		faSpinner
	} from "@fortawesome/free-solid-svg-icons";
    import { loadingStore, addonStore, resultStore, startStore, sortedResultStore, sortStore } from "$stores/AddonStore";
	import { userNameStore } from "$stores/UserStore";
	import { onMount } from "svelte";
	import { derived } from "svelte/store";
	import AddonCard from "./AddonCard.svelte";

    addonStore.set(undefined)
    onMount(() => {
        fetch('https://api.faithfulpack.net/v2/addons/approved')
            .then(res => res.json())
            .then(data => {
                addonStore.set(data)
            })
        fetch('https://api.faithfulpack.net/v2/users/names')
            .then(res => res.json())
            .then(data => {
                userNameStore.set(data)
            })
    })

    const text_loading = 'Loading...';
    const text_addon_not_found = 'No add-on found'

    const displayed = sortedResultStore;

    $: showDate = derived(sortStore, type => type.startsWith('date'))
    $: {
        console.log($showDate, $sortStore);
    }
</script>

{#if $loadingStore }
<div class="card card-body">
    <div><Fa icon={faSpinner} spin /> { text_loading }</div>
</div>
{:else}
<div id="results" class="card card-body">
    {#if $addonStore?.length === 0 || $displayed === undefined}
        <div>{ text_addon_not_found }</div>
    {:else}
        <div class="res-grid-3">
            {#each $displayed as addon}
                <AddonCard addon={addon} showDate={$showDate} />
            {/each}
        </div>
    {/if}
</div>
{/if}

<style lang="scss">
    @media(max-width: $width-XS) {
        #results {
            @include transparent;
            overflow: visible;

            > div.res-grid-3 {
                grid-gap: $small-spacing;
            }
        }
    }
</style>