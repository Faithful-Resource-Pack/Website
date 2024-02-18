<script lang="ts">
	import { favoriteStore, addonStore } from "$stores/AddonStore";
	import { derived } from "svelte/store";
	import AddonCard from "$components/addons/AddonCard.svelte";
	import { t } from "$lib/translations";

	$: favorites = derived([favoriteStore, addonStore], ([favorites, addons]) => {
		if (addons === undefined) return [];

		return favorites.favorites
			.map((id) => addons.filter((a) => a.id === id)[0])
			.filter((a) => a !== undefined);
	});
</script>

{#if $favorites.length > 0}
	<h3 class="text-center">{$t("add-ons.favorites")}</h3>
	<div class="card card-body">
		<div class="res-grid-3">
			{#each $favorites as addon}
				<AddonCard {addon} />
			{/each}
		</div>
	</div>
	<h3 class="text-center">{$t("add-ons.all_add-ons")}</h3>
{/if}
