<script lang="ts">
    import Fa from "svelte-fa/src/fa.svelte";
	import {
		faSpinner
	} from "@fortawesome/free-solid-svg-icons";
    import { loadingStore, addonStore, resultStore, startStore } from "$stores/AddonStore";
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

    const displayed = derived([startStore, resultStore, addonStore], ([start, result, addons]) => {
        const isResult = start.started && addons !== undefined;

        return isResult ? result : addons;
    })

    const sorted = derived(displayed, (d) => d?.sort((a,b) => a.name < b.name ? -1 : (a.name==b.name ? 0 : 1)))
</script>

<div class="card card-body">
    {#if $loadingStore }
        <div><Fa icon={faSpinner} spin /> { text_loading }</div>
    {:else if $addonStore?.length === 0 || $sorted === undefined}
        <div>{ text_addon_not_found }</div>
    {:else}
        <div class="res-grid-3">
            {#each $sorted as addon}
                <AddonCard addon={addon} />
            {/each}
        </div>
    {/if}
</div>