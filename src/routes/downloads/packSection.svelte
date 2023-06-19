<script lang="ts">
	import DownloadTable from "./downloadTable.svelte";

    export let pack: App.Pack;

    const coming_soon = 'Coming soon';
    const project_discontinued = 'This project has been discontinued.';
</script>

<div class="pack" style={`--pack-background: url(${pack.background_url})`}>
    <h2 class="semibold subtitle">{@html pack.name.replace('\n', '<br>') }</h2>

    {#if pack.editions.length === 0 || pack.editions.map(e => e.downloads).reduce((sum, d) => sum + Object.keys(d).length, 0) === 0}
        <p class="coming-soon"><i>{ coming_soon }</i></p>
    {:else}
        {#each pack.editions as edition}
        <h3>{edition.name}</h3>

        {#if edition.name.toLowerCase().includes('dungeons')}
        <div class="container">
            <h2 class="red banner">{ project_discontinued }</h2>
        </div>
        {/if}

        <div class="container">
            <DownloadTable downloads={edition.downloads} />
        </div>
        {/each}
    {/if}
</div>

<style lang="scss">
    .pack {
        background-size: cover;
        background-position: center;
        background-image: var(--pack-background);
        text-align: center;
        padding: 1.7rem 0;

        & > h2, & > h3, & > .coming-soon {
            color: white;
            text-shadow: rgba(0, 0, 0, 0.4) 0px 4px 5px;
        }

        & > .coming-soon {
            font-size: 1.5em;
        }

        & > h3 {
            font-size: 1.7rem;
            margin: 1.2rem 0;
            font-weight: 500;
        }

        @media screen and (max-width: $width-S) {
            h3 {
		        font-size: 1.25rem;
            }
        }
    }
</style>