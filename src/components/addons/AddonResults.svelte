<script lang="ts">
    import Fa from "svelte-fa/src/fa.svelte";
	import {
		faSpinner
	} from "@fortawesome/free-solid-svg-icons";
    import { loadingStore, addonStore } from "$stores/AddonStore";

    addonStore.set(undefined)
    setTimeout(() => {
        addonStore.set([])
    }, 2000)

    const text_loading = 'Loading...';
    const text_addon_not_found = 'No add-on found'
</script>

<div class="card card-body">
    {#if $loadingStore }
        <div><Fa icon={faSpinner} spin /> { text_loading }</div>
    {:else if $addonStore?.length === 0}
        <div>{ text_addon_not_found }</div>
    {:else}
        RESULTS HERE
    {/if}
</div>