<script lang="ts">
	import {
		checkboxChoices,
		searchStore,
		CheckboxTypesValues,
		startStore,
	} from "$stores/AddonStore";
	import { derived } from "svelte/store";
	import Checkbox from "$components/common/checkbox.svelte";
	import Input from "$components/common/input.svelte";
	import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
	import { t } from "$lib/translations";

	let checkboxes = derived(searchStore, (s) => {
		return CheckboxTypesValues.map((t) =>
			checkboxChoices[t].map((c) => ({
				choice: c,
				checked: s[t].includes(c),
				disabled: s[t].includes(c) && s[t].length <= 1,
				toggle: searchStore[t === "editions" ? "toggleEdition" : "toggleResolution"],
			})),
		).flat();
	});

	const placeholder_searchbox = $t("add-ons.search.search_placeholder");
	let value_searchbox = "";
	searchStore.subscribe((s) => {
		value_searchbox = s.search;
	});

	function search() {
		searchStore.setSearch(value_searchbox);
		startStore.startSearch();
	}
</script>

<div class="card card-body">
	<div class="text-center">{$t("add-ons.search.title")}</div>
	<div class="checkboxes">
		{#each $checkboxes as checkbox}
			<Checkbox
				value={checkbox.checked}
				disabled={checkbox.disabled}
				label={checkbox.choice}
				on:change={() => {
					checkbox.toggle(checkbox.choice);
					startStore.startSearch();
				}}
			/>
		{/each}
	</div>
	<form on:submit|preventDefault={search}>
		<Input
			type="search"
			placeholder={placeholder_searchbox}
			bind:value={value_searchbox}
			clearable
			appendIcon={value_searchbox ? faMagnifyingGlass : undefined}
			on:clear={search}
			on:append={search}
		/>
	</form>
</div>

<style lang="scss">
	.checkboxes {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 1fr;
		text-align: center;
		margin: 20px 0;

		@media (max-width: 400px) {
			> :global(.checkbox) {
				display: flex;
				flex-direction: column-reverse;
				gap: 10px;
				align-items: center;
			}
		}
	}
</style>
