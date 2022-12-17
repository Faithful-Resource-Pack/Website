<script lang="ts">
	import { favoriteStore } from "$stores/AddonStore";

</script>

{#if $favoriteStore.favorites.length > 0}
<div class="card card-body">FAVORITES HERE</div>
{/if}

<style>
    .card {
        margin-bottom: 40px;
    }
</style>