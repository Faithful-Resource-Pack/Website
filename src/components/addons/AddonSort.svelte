<script lang="ts">
	import {
		SORT_TYPES,
		SORT_TYPES_DEFAULT,
		loadingStore,
		resultStore,
		sortStore,
	} from "$stores/AddonStore";
	import { t } from "$lib/translations";
	import { derived } from "svelte/store";
	import I18n from "$components/common/i18n.svelte";

	const results = derived(resultStore, (result) => {
		return result.length;
	});
</script>

{#if !$loadingStore}
	<div class="card card-body">
		<div id="results_found">
			<I18n path="add-ons.sort.found_results" payload={{ count: $results }} />
		</div>
		{#if $results > 0}
			<div id="sortby_label">
				{$t("add-ons.sort.sort_by")}
			</div>
			<div id="sortby_select">
				<select bind:value={$sortStore}>
					{#each SORT_TYPES as type}
						<option value={type} selected={$sortStore == "" && type === SORT_TYPES_DEFAULT}>
							{$t("add-ons.sort.types." + type)}
						</option>
					{/each}
				</select>
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	.card {
		flex-direction: row;
		padding-top: calc($small-spacing / 2);
		padding-bottom: calc($small-spacing / 2);
	}
	#results_found {
		flex-grow: 1;
	}
	#sortby_select {
		margin-left: calc($small-spacing / 2);
	}
</style>
