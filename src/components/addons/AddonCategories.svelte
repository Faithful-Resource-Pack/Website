<script lang="ts">
    const text_categories = "Categories";
    const CATEGORIES: Record<string,string> = {
        "all": "all",
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
</script>

<div class="card card-body">
    <h3>{ text_categories }</h3>
    <ul>
        {#each Object.entries(CATEGORIES) as [category, text_category] }
            <li>{ text_category[0].toUpperCase() + text_category.substring(1) }</li>
        {/each}
    </ul>
</div>

<style lang="scss">
    h3 {
        margin: 0;
        font-size: 1.5rem;
    }

    ul {
        list-style-type: none;
        padding: 0;
        font-size: 1.5rem;
        margin: 10px 0 0;
    }
</style>