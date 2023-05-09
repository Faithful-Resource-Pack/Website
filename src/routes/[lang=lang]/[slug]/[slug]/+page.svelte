<script lang="ts">
	import { onMount } from 'svelte';
	import { marked } from 'marked';
    import type { PageData } from './$types';
	import DownloadButton from '$components/common/downloadButton.svelte';
	import DiscordBanner from '$components/common/discordBanner.svelte';
	import ChangeLog from "./changeLog.svelte"
	import List from './list.svelte';

    export let data: PageData;

    $:post = data.post;
	$:post_text = post.longText;
	$:mainChangelogLoaded = data.mainChangelogLoaded;
</script>


{#if post.discontinued}
<div class="container"><h2 class="red banner">This project has been discontinued.</h2></div>
{/if}

<div class="container">
	{#if post.title}
		<h1 class="text-center title" title={post.name}>{ post.title }</h1>
	{:else}
		<h1 class="text-center title">{ post.name }</h1>
	{/if}
	<div class="post-details">
		<div class="post-details-left">
			{#if post.authors }
				<h3 class="display text-center">
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
		{#if post.downloads}
			{#if Object.entries(post.downloads).length > 1}
				<h2 class="text-center">Downloads</h2>
			{:else}
				<h2 class="text-center">Download</h2>
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
				<h2 class="text-center">Downloads</h2>
			{:else}
				<h2 class="text-center">Download</h2>
			{/if}
			{#each Object.entries(post.download) as [text, items] }
				{#each items as item}
				<DownloadButton href={item[0]} text={text} />
				{/each}
			{/each}
		{/if}
		</div>
		<div class="post-details-right">
			{#if post.headerImg}
				<img id="post-header-img" class="fancy-card-1x card" src={post.headerImg} alt={post.name} />
			{/if}

			<div class="card card-body">
				<p id="text" class="m-0">
					{@html marked.parseInline(post_text, {
						breaks: true,
					})}
				</p>
			</div>
		</div>
	</div>

	<DiscordBanner text="discussion" />

	{#if mainChangelogLoaded}
		<ChangeLog main text={mainChangelogLoaded} />
	{/if}
	{#if post.changelog}
		<h2 class="subtitle semibold my-5 text-center">Changelog</h2>
		<div class="card card-body my-5 changelog">
			<List list={post.changelog} tags={['h3','h4']} />
		</div>
	{/if}
</div>

<style lang="scss">
	.post-details {
		display: flex;
        flex-wrap: wrap;

		&-left {
			flex: 0 0 25%;
		}

		&-right {
			flex: 0 0 75%;
            padding-left: 20px;

			.card {
				margin-top: 20px;
			}
		}
	}

	#text {
		text-align: justify;
		line-height: 1.5;
	}

	#post-header-img {
		width: 100%;
	}

	@media(max-width: $width-S) {
        .post-details {
            flex-direction: column-reverse;

            &-right {
                padding-left: 0;
            }
        }
    }

</style>