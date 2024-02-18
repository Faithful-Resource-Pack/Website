<script lang="ts">
	import Fa from "svelte-fa";
	import { faXmark } from "@fortawesome/free-solid-svg-icons";
	export let data: any;
	const TMP = data.data;
	const parseNumber = Intl.NumberFormat(undefined, {
		notation: "compact",
		maximumFractionDigits: 1,
	});
</script>

<div class="container">
	<h1 class="title text-center bold">Our Statistics</h1>
	<h2 class="text-center">See how Faithful stacks up, everywhere.</h2>

	<table>
		{#each TMP as data, i}
			<tr>
				<td><p>{data.name}</p></td>
				{#each data.values as value}
					{#if i == 0}
						<td><h1>{value}</h1></td>
					{:else if value == "X"}
						<td><p><Fa icon={faXmark} /></p></td>
					{:else if typeof value == "number"}
						<td><p>{parseNumber.format(value)}</p></td>
					{:else}
						<td><p>{value}</p></td>
					{/if}
				{/each}
			</tr>
			{#if i + 1 < TMP.length}
				<tr><td colspan="6"><hr /></td></tr>
			{/if}
		{/each}
	</table>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		text-align: center;
		overflow: hidden;
	}

	table {
		p {
			margin: 1rem 4vw;
		}

		hr {
			margin: 0 auto;
			border-top: 1px solid #bdbdbdaa;
		}
	}

	:global(html.light hr) {
		border-top: 1px solid #000000aa !important;
	}
</style>
