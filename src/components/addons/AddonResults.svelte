<script lang="ts">
    import Fa from "svelte-fa/src/fa.svelte";
	import {
		faSpinner
	} from "@fortawesome/free-solid-svg-icons";
    import { loadingStore, addonStore, resultStore, startStore } from "$stores/AddonStore";
	import { onMount } from "svelte";
	import { derived } from "svelte/store";

    addonStore.set(undefined)
    onMount(() => {
        fetch('https://api.faithfulpack.net/v2/addons/approved')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                addonStore.set(data)
            })
    })

    const text_loading = 'Loading...';
    const text_addon_not_found = 'No add-on found'

    const displayed = derived([startStore, resultStore, addonStore], ([start, result, addons]) => {
        const isResult = start.started && addons !== undefined;

        return isResult ? result : addons;
    })
</script>

<div class="card card-body">
    {#if $loadingStore }
        <div><Fa icon={faSpinner} spin /> { text_loading }</div>
    {:else if $addonStore?.length === 0}
        <div>{ text_addon_not_found }</div>
    {:else}
        RESULTS HERE:
        <div>
            { JSON.stringify($displayed)}
        </div>
    {/if}
</div>