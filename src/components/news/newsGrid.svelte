<script lang="ts">
	import { postStore, postListStore } from "$stores/PostStore";
	import { derived } from "svelte/store";
	import { onMount } from "svelte";

	export let limit: number | undefined = undefined;

	postStore.set(undefined);
	onMount(() => {
		fetch("https://api.faithfulpack.net/v2/posts")
			.then((res) => res.json())
			.then((data) => {
				postStore.set(data);
			});
	});

	let posts = derived(postListStore, (v) => {
		if (limit === undefined) return v;
		if (v === undefined) return v;

		return v.slice(0, limit);
	});
</script>

<div id="posts" class="container res-grid-3">
	{#if $posts === undefined}
		<h1 class="title text-center">Loading...</h1>
	{:else}
		{#each $posts as post}
			<a class="card img-card" rel="noopener" href={post.permalink}>
				{#if post.headerImg}
					<img src={post.headerImg} loading="lazy" alt={post.title} />
				{:else}
					<img
						src="https://database.faithfulpack.net/images/branding/backgrounds/forest.png"
						loading="lazy"
						alt={post.title}
					/>
				{/if}

				<h3>{post.title}</h3>
			</a>
		{/each}
	{/if}
</div>

<style lang="scss">
	#posts {
		width: 1140px;
		max-width: 100%;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.img-card > h3 {
		margin: 0;
		padding: 8px;
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%);
		width: 100%;
		color: #fff;
		font-size: 1.2rem;
	}

	@media (max-width: $width-XS) {
		#posts {
			padding-left: $small-spacing;
			padding-right: $small-spacing;
			grid-gap: $small-spacing;
		}
	}
</style>
