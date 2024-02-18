<script lang="ts">
	import { parseMd } from "$lib/shortMd";

	export let data: any;
</script>

<div class="container">
	{#if data.edition !== "Don't know"}
		<h1 class="text-center">
			Installation instructions for {data.edition} Edition on {data.system}
		</h1>
	{/if}

	{@html parseMd(data.markdown)}
</div>
