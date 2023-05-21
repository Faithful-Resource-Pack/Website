<script lang="ts">
	import { marked } from 'marked';
    import type { PageData } from './$types';
	import DownloadButton from '$components/common/downloadButton.svelte';
	import DiscordBanner from '$components/common/discordBanner.svelte';
	import ChangeLog from "./changeLog.svelte"

    export let data: PageData;
</script>


{#if data.discontinued}
<div class="container"><h2 class="red banner">This project has been discontinued.</h2></div>
{/if}

<div class="container">
	{#if data.title}
		<h1 class="text-center title">{ data.title }</h1>
	{:else}
		<h1 class="text-center title">{ data.title }</h1>
	{/if}
	<div class="post-details">
		{#if data.downloads}
			<div class="post-details-left">
				<!--{#if data.authors }
					<h3 class="display text-center">
						By&nbsp;
						{#each data.authors as author, i}
							{#if typeof(author) === 'string' }
								{#if i != data.authors.length }
									{ author },
								{:else}
									{ author }
								{/if}
							{:else}
								{#if i != data.authors.length }
									<a href="{ author.first }">{ author.first }</a>,
								{:else}
									<a href="{ author.first }">{ author.first }</a>
								{/if}
							{/if}
						{/each}
					</h3>
				{/if}-->

				{#if Object.keys(data.downloads).length > 1}
					<h2 class="text-center">Downloads</h2>
				{:else}
					<h2 class="text-center">Download</h2>
				{/if}
				{#each Object.entries(data.downloads) as [title, items] }
					<h3 class="my-3 text-center">{title}</h3>
					{#each items as item}
						<DownloadButton href={item.url} text={item.name} />
					{/each}
				{/each}

			</div>
		{/if}
		<div class={data.downloads ? "post-details-right" : ""}>
			{#if data.headerImg}
				<img id="post-header-img" class="fancy-card-1x card" src={data.headerImg} alt={data.title} />
			{/if}

			<div class="card card-body">
				<p id="text" class="m-0">
					{@html marked.parseInline(data.description, {
						breaks: true,
					})}
				</p>
			</div>
		</div>
	</div>

	<DiscordBanner text="discussion" />

	{#if data.changelog}
		<h2 class="subtitle semibold my-5 text-center">Changelog</h2>
		<div class="card card-body my-5 changelog">
			<ChangeLog changelog={data.changelog} />
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
		}

		div.card {
			margin-top: 20px;
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