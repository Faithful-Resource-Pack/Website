<script lang="ts">
	import Optional from "$lib/optional";
	import contributionStore, { contributionAuthors } from "$stores/ContributionStore";
	import Fa from "svelte-fa/src/fa.svelte";
	import { faClock, faUser, faUsers, faWrench } from "@fortawesome/free-solid-svg-icons";
	import Icon from "$components/common/icon.svelte";
	import tooltip from "$lib/tooltip";
	import { gallerySearch } from "$stores/GalleryStore";
	import { derived } from "svelte/store";
	import { DateTime } from "luxon";

	export let texture: any;

	$: modded = ["assets/forge", "assets/fml", "assets/fabric", "assets/modmenu"].reduce(
		(acc, cur) => acc || texture.url.includes(cur),
		false
	);

	let pack = derived(gallerySearch, () => gallerySearch.getParam("pack") as string);

	$: mojang = $pack === "original_16x";

	$: last_contribution = Optional($contributionStore)
		.chain((contribs) => contribs[$pack])
		.chain((res_contribs) => res_contribs[texture.textureID])
		.chain((contribs) =>
			contribs.reduce((a, b) => (a = a.date > b.date ? a : b), contribs[0])
		).value;

	$: icon = Optional(last_contribution).chain((contrib) =>
		contrib.contributors.length > 1 ? faUsers : faUser
	).value;

	$: last_contribution_names = Optional(last_contribution).chain((c) =>
		(c.contributors as any[])
			.map((d: string | number) => discordIDtoName(d).replace(/\s/gm, "\u00A0"))
	).value;

	$: last_contribution_date = Optional(last_contribution).chain((c) => timestampToDate(c.date)).value;

	function discordIDtoName(id: string | number): string {
		return $contributionAuthors[id]?.username || String(id)
	}

	function timestampToDate(c: number): string {
		return DateTime.fromMillis(c).toLocaleString(DateTime.DATE_MED);
	}

	let text_modded_texture = "Modded texture";
	let text_contribution_not_found = "No contribution found in database!"; // TODO: i18n
</script>

<div class="tooltip texture-tooltip" use:tooltip>
	<h2 class="texture-title">{texture.name}</h2>
	<div class="texture-contribution">
		{#if modded}
			<div><Fa icon={faWrench} /> { text_modded_texture }</div>
		{/if}
		{#if mojang}
			<div><Icon name="mojang" color="#ec343c" size="1em" style="margin-right: 0.5em"/>Mojang Studios</div>
		{:else if last_contribution_names}
			<p><Fa {icon} /> {#each last_contribution_names as name, i}
				<span>{name}</span>{#if i < last_contribution_names.length-1}, {/if}
			{/each}</p>
			<p><Fa icon={faClock} /> {last_contribution_date}</p>
		{:else}
			<div>
				{text_contribution_not_found}
			</div>
		{/if}
	</div>
	<div class="texture-tags">
		<span class="texture-tag id-tag">
			{'#' + texture.textureID}
		</span>{#each texture.tags as tag}
			<span class="texture-tag">
				{tag}
			</span>
		{/each}
	</div>
</div>

<style lang="scss">
	$bg: rgba(39, 39, 39, 0.95);

	:global {
		.tippy-box {
			line-height: 1;
			font-size: 16px;
			background-color: $bg;
			color: white;
			text-align: left;
			pointer-events: none;
			box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.7);
		}
		.tippy-arrow {
			color: $bg;
		}
	}

	.texture-title {
		font-weight: 600;
		margin: .2em 0;
	}

	.texture-contribution {
		margin: 0.5em 0;

		> * {
			margin: 0.2em 0;
		}
	}

	$tag_spacing: 0.3em;
	.texture-tags {
		margin-left: -$tag_spacing;
	}

	.texture-tag {
		font-size: 0.8em;
		line-height: 2em;
		padding: 0 1em;
		height: 2em;
		border-radius: 1em;
		background:  adjust-color($color: $bg, $alpha: 1.0, $lightness: +10%);
		display: inline-block;
		margin-left: $tag_spacing;
	}
</style>
