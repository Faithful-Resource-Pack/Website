<script lang="ts">
	import PackCard from "./packCard.svelte";

	export let items: CardList;

	$: urls = items.urls;
	$: links = items.links;
</script>

<div id="packCardList">
	{#each urls as url, url_i}
		<PackCard {...url} links={links[url_i]} />
	{/each}
</div>

<style lang="scss">
	#packCardList {
		display: flex;
		gap: 30px;
		justify-content: center;
		flex-wrap: wrap;
	}

	@media (max-width: $width-XS) {
		#packCardList {
			padding: $small-spacing;

			& > :global(.pack-card) {
				width: 100%;
			}
			gap: $small-spacing;
		}
	}
</style>
