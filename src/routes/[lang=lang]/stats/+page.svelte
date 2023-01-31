<script lang="ts">
	import { t } from "$lib/translations";
	import { modStatsStore } from "$stores/ModStore";
	import { postListStore } from "$stores/PostStore";
	import { addonStatsStore, addonStore } from "$stores/AddonStore";
	import { derived } from "svelte/store";
	import { onMount } from "svelte";

	const count_32_releases = derived(postListStore, (v) => {
		return v === undefined
			? 0
			: v.filter(
					(p) => p.permalink.includes("compliance32x") || p.permalink.includes("faithful32x")
			  ).length;
	});
	const count_64_releases = derived(postListStore, (v) => {
		return v === undefined
			? 0
			: v.filter(
					(p) => p.permalink.includes("compliance64x") || p.permalink.includes("faithful64x")
			  ).length;
	});

    onMount(() => {
        fetch('https://api.faithfulpack.net/v2/addons/approved')
            .then(res => res.json())
            .then(data => {
                addonStore.set(data);
            });
    })
</script>

<div class="container text-center">
	<h1 class="display-3 my-5">{$t("stats.title.page")}</h1>

	<h2 class="display-4 my-5">{$t("stats.title.main_pack")}</h2>
	<div class="res-grid-2">
		<h3>{$t("stats.title.32_releases")}</h3>
		<h3><span class="badge badge-primary">{$count_32_releases}</span></h3>
		<h3>{$t("stats.title.64_releases")}</h3>
		<h3><span class="badge badge-primary">{$count_64_releases}</span></h3>
	</div>

	<h2 class="display-4 my-5 ">{$t("stats.title.add_ons")}</h2>
	{#if $addonStatsStore !== undefined}
	    <div class="res-grid-2">
            {#each Object.entries($addonStatsStore) as [res, edition_record]}
                {#each Object.entries(edition_record) as [edition, value]}
                    <div>
                        <h3><span>
                            { $t(`stats.add_ons.${res}.${edition}`) }
                        </span><div class="badge-container">
                            <span class="badge badge-primary">{ value }</span>
                        </div></h3>
                    </div>
                {/each}
            {/each}
        </div>
	{:else}
		<div>{$t("common.loading")}</div>
        {(console.log($addonStatsStore), '')}
	{/if}

	<h2 class="display-4 my-5 ">{$t("stats.title.mods")}</h2>
	{#if $modStatsStore !== undefined}
        <div class="res-grid-3">
            {#each Object.entries($modStatsStore) as [key, value]}
                <div>
                    <h3>{$t("stats.mods." + key)}</h3>
                    <h3><span class="badge badge-primary">{value}</span></h3>
                </div>
            {/each}
        </div>
	{:else}
		<div>{$t("common.loading")}</div>
	{/if}
</div>

<style lang="scss">
    h3, .badge {
        font-size: 1.2em;
    }
    .badge {
        text-align: center;
        display: inline-block;
        padding: 0.25em 0.4em;
        font-size: 75%;
        font-weight: 700;
        line-height: 1;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: 12px;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        margin: 10px;
    }
    .badge-primary {
        color: #fff;
        background-color: #007bff;
    }

    @media (min-width: $width-XS) {
        .badge-container {
            display: inline;
        }
    }

    h3 * {
        font-family: inherit;
    }

    h3 .badge {
        font-weight: normal;
    }
    
    @media (min-width: $width-L) {
        .container {
           max-width: 1140px;
        }
    }
</style>
