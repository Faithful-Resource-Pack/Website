<script lang="ts">
	import type { ListItem } from "$lib/shortMd";

    export let list: ListItem[];
    export let level: number = 0;
    export let tags: string[] = [];

    $: itemTag = tags[0] || 'li';
    $: listTag = itemTag === 'li' ? 'ul' : 'div';
</script>

{#if list.length === 2 && typeof(list[0]) === 'string' && Array.isArray(list[1]) && level == 0}
    <svelte:self tags={tags} list={list[1]} />
{:else}
<svelte:element this={listTag} class={`list list-level-${level}`}>
{#each list as item}
    {#if Array.isArray(item)}
        <svelte:self list={item} level={level+1} tags = {tags.slice(1)}/>
    {:else}
        <svelte:element this={itemTag}>{item.replace(/^"/, '').replace(/"$/, '')}</svelte:element>
    {/if}
{/each}
</svelte:element>
{/if}
