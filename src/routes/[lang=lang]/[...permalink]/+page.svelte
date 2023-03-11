<script lang="ts">
	import { onMount } from 'svelte';
	import { marked } from 'marked';
    import type { PageData } from './$types';
	import DownloadButton from '$components/common/downloadButton.svelte';
	import DiscordBanner from '$components/common/discordBanner.svelte';
	import ChangeLog from "./changeLog.svelte"
	
    export let data: PageData;

    $:post = data.post;
	$:post_text = post.longText;
	$:mainChangelodLoaded = data.mainChangelogLoaded;

	onMount(() => {
		console.log(post)
	})
</script>


{#if post.discontinued}
	<h2 class="red banner">This project has been discontinued.</h2>
{/if}

{#if post.title}
	<h2 class="display-3 my-5 text-center">{ post.title }</h2>
{:else}
	<h2 class="display-3 my-5 text-center">Unknown Title</h2>
{/if}

<div class="container">
	{#if post.headerImg}
		<img id="post-header-img" class="fancy-card-1x card" src={post.headerImg} alt={post.name} />
	{/if}

	<div class="card card-body my-5">
		<p id="text" class="h4 m-0">
			{@html marked.parseInline(post_text, {
				breaks: true,
			})}
		</p>
	</div>
	{#if post.authors }
		<h3 class="display my-5 text-center">
			By&nbsp;
			{#each post.authors as author, i}
				{#if typeof(author) === 'string' }
					{#if i != post.authors.length }
						{ author },
					{:else}
						{ author }
					{/if}
				{:else}
					{#if i != post.authors.length }
						<a href="{ author.first }">{ author.first }</a>,
					{:else}
						<a href="{ author.first }">{ author.first }</a>
					{/if}
				{/if}
			{/each}
		</h3>
	{/if}
	{#if post.downloads && Array.isArray(post.downloads) }
		<h2 class="display-4 my-5 text-center">Downloads</h2>
		{#each post.downloads as item}
			<h1 class="my-3" style="text-align: center">{ item[0] }</h1>
			{#each item[1] as subitem}
				<p style="text-align: center">
					<a href="{ subitem[1] }" class="btn block btn-lg btn-primary">
						{ subitem[0] }
					</a>
				</p>
			{/each}
			<br>
		{/each}
	{/if}
	{#if post.downloads}
		{#if Object.entries(post.downloads).length > 1}
			<h2 class="display-4 my-5 text-center">Downloads</h2>
		{:else}
			<h2 class="display-4 my-5 text-center">Download</h2>
		{/if}
		{#each Object.entries(post.downloads) as [title, items] }
			<h3 class="my-3 text-center">{title}</h3>
			{#each items as item}
			<DownloadButton href={item[1]} text={item[0]} />
			{/each}
		{/each}
	{/if}
	{#if post.download}
		{#if Object.entries(post.download).length > 1}
			<h2 class="display-4 my-5 text-center">Downloads</h2>
		{:else}
			<h2 class="display-4 my-5 text-center">Download</h2>
		{/if}
		{#each Object.entries(post.download) as [text, items] }
			{#each items as item}
			<DownloadButton href={item[0]} text={text} />
			{/each}
		{/each}
	{/if}

	<DiscordBanner text="discussion" />

	{#if mainChangelodLoaded}
		<ChangeLog main text={mainChangelodLoaded} />
	{/if}
</div>

<style lang="scss">
	@media (min-width: $width-L) {
		.container {
			max-width: 1140px;
		}
	}

	#text {
		text-align: justify;
		line-height: 1.5;
	}

	#post-header-img {
		width: 100%;
	}
</style>