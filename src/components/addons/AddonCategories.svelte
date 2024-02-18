<script lang="ts">
	import Checkbox from "$components/common/checkbox.svelte";
	import { searchStore, startStore } from "$stores/AddonStore";
	import { t } from "$lib/translations";

	const text_categories = $t("add-ons.categories.title");
	const ALL = $t("common.all");
	const CATEGORIES: Record<string, string> = {
		blocks: $t("add-ons.categories.blocks"),
		items: $t("add-ons.categories.items"),
		mobs: $t("add-ons.categories.mobs"),
		ui: $t("add-ons.categories.user_interface"),
		"3d": $t("add-ons.categories.3d"),
		consistency: $t("add-ons.categories.consistency"),
		utilities: $t("add-ons.categories.utilities"),
		redstone: $t("add-ons.categories.redstone"),
		fixes: $t("add-ons.categories.fixes"),
		pbr: $t("add-ons.categories.pbr"),
		funny: $t("add-ons.categories.funny"),
	};

	const allChecked = searchStore.allCategoriesSelected(Object.keys(CATEGORIES));
	const selectAllCategories = () => {
		searchStore.clearCategories();
		Object.keys(CATEGORIES).forEach((c) => {
			searchStore.toggleCategory(c);
		});
		startStore.startSearch();
	};
	const toggle = (category: string) => {
		searchStore.toggleCategory(category);
		startStore.startSearch();
	};
</script>

<div class="card card-body card-body-thin">
	<div>
		<h3>{text_categories}</h3>

		<span
			on:click={$allChecked ? searchStore.clearCategories : selectAllCategories}
			on:keypress={() => {}}
		>
			<span class="label">{ALL}</span>
			<Checkbox value={$allChecked} />
		</span>
	</div>
	<ul>
		{#each Object.entries(CATEGORIES).sort() as [category, text_category]}
			<li on:click={() => toggle(category)} on:keypress={() => {}}>
				<div class="label">{text_category}</div>
				<Checkbox value={$searchStore.categories.includes(category)} />
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	h3 {
		margin: 0;
		font-size: 1.5rem;
	}

	li {
		padding: 2px 0;
	}

	.label {
		padding-right: 5px;
		text-transform: capitalize;
	}

	li,
	.label {
		cursor: pointer;
	}

	ul {
		list-style-type: none;
		padding: 0;
		margin: 10px 0 0;
	}

	.card > div,
	.card li,
	.card > div > span {
		display: flex;
		align-items: center;

		& > *:first-child {
			flex-grow: 1;
		}
	}

	@media only screen and (max-width: 992px) and (min-width: 600px) {
		ul {
			display: flex;
			flex-wrap: wrap;
			gap: 12px;
			justify-content: flex-end;
		}

		.card > div,
		.card li,
		.card > div > span {
			display: flex;
			align-items: center;
			flex-basis: 30%;

			& > *:first-child {
				flex-basis: 60%;
				flex-grow: 0;
			}
		}
	}
</style>
