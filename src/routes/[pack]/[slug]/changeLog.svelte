<script lang="ts">
	export let changelog: Object;
</script>

<!--
    honestly what the fuck am I doing here
    also doesn't fully work on larger changelogs like the full release for 32x because help
-->
{#if changelog}
	<div id="changelog">
		{#each Object.entries(changelog) as header}
			<h1>{header[0]}</h1>
			{#each Object.entries(header[1]) as category}
				<h2>{category[0]}</h2>
				<ul>
					{#each Object.entries(category[1]) as entry}
						{#if Array.isArray(entry[1])}
							<h3>{entry[0]}</h3>
							<ul>
								{#each Object.entries(entry[1]) as subentry}
									<li>{subentry[1]}</li>
								{/each}
							</ul>
						{:else}
							<li>{entry[1]}</li>
						{/if}
					{/each}
				</ul>
			{/each}
		{/each}
	</div>
{/if}

<style lang="scss">
	#changelog {
		margin-left: 18px;
		li {
			margin-bottom: 10px;
		}
	}
</style>
