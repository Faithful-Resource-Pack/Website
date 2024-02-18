<script lang="ts">
	import SelectionCard from "$components/selectionCard.svelte";

	const devices = ["PC", "Mobile", "Console"];
</script>

<div class="container">
	<h1 class="text-center">What device are you playing on?</h1>
	<SelectionCard items={devices} />
</div>
