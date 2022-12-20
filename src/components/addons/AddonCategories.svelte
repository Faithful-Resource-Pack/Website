<script lang="ts">
	import Checkbox from "$components/common/checkbox.svelte";
	import { searchStore, startStore } from "$stores/AddonStore";

    const text_categories = "Categories";
    const ALL = 'All';
    const CATEGORIES: Record<string,string> = {
        "blocks": "blocks",
        "items": "items",
        "mobs": "mobs",
        "ui": "user interface",
        "3d": "3D",
        "consistency": "consistency",
        "utilities": "utilities",
        "redstone": "redstone",
        "fixes": "fixes",
        "pbr": "PBR",
        "funny": "funny"
    };

    const allChecked = searchStore.allCategoriesSelected(Object.keys(CATEGORIES))
    const selectAllCategories = () => {
        searchStore.clearCategories()
        Object.keys(CATEGORIES).forEach(c => {
            searchStore.toggleCategory(c)
        })
        startStore.startSearch()
    }
    const toggle = (category: string) => {
        searchStore.toggleCategory(category)
        startStore.startSearch()
    }
</script>

<div class="card card-body card-body-thin">
    <div>
        <h3>{ text_categories }</h3>
        
        <span on:click={$allChecked ? searchStore.clearCategories : selectAllCategories} on:keypress={() => {}}>
            <span class="label">{ ALL }</span>
            <Checkbox value={$allChecked} />
        </span>
    </div>
    <ul>
        {#each Object.entries(CATEGORIES) as [category, text_category] }
            <li on:click={() => toggle(category) } on:keypress={() => {}}>
                <div class="label">{ text_category[0].toUpperCase() + text_category.substring(1) }</div>
                <Checkbox
                    value={$searchStore.categories.includes(category)}
                />
            </li>
        {/each}
    </ul>
</div>

<style lang="scss">
    h3 {
        margin: 0;
        font-size: 1.5rem;
    }

    .label {
        font-size: 1.5rem;
        padding-right: 5px;
    }

    li, .label {
        cursor: pointer;
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 10px 0 0;
    }

    .card > div , .card li, .card > div > span {
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

        .card > div , .card li, .card > div > span {
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