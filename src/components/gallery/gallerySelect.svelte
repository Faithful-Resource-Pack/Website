<script lang="ts">
    import { gallerySearch } from '$stores/GalleryStore';
	import { onMount } from 'svelte';
    import Select from 'svelte-select';
	import { writable } from 'svelte/store';

    export let name: string;
    export let param: string;
    export let items: string[];
    export let items_labels: string[];

    $: select_items = items.map((e, i) => ({
        value: e,
        label: items_labels[i]
    }));

    const floatingConfig = {
        flip: false,
        strategy: "absolute",
        autoUpdate: false,
        placement: 'bottom'
    }; // auto update size on results and scroll

    let value = writable<string>('');

    onMount(() => {
        let res = gallerySearch.getParam(param);
        if(res !== null) $value = res;

        gallerySearch.subscribe(() => {
            let actual = gallerySearch.getParam(param);
            if(actual != $value && actual != null)
            {
                $value = actual;
            }
        })
    })
    let change = (e: any) => {
        gallerySearch.setParam(param, e.detail.value);
    }
</script>

<div class="gallery-select">
    <div class="small-name">
        { name }
    </div>
    <Select
        class="select"
        searchable={false}
        items={select_items}
        clearable={false}
        on:input={change}
        value={$value}
        {floatingConfig}
    />
</div>

<style>
    :global(.svelte-select) {
        color: black;
    }

    :global(.svelte-select .indicators ) {
        height: 40px;
    }

    :global(.svelte-select-list) {
        z-index: 1000;
        color: black;
    }
</style>