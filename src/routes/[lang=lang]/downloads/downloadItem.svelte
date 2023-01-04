<script lang="ts">
	import DownloadLine from "./downloadLine.svelte";

	export let version: string;
	export let downloads: App.Download[];

	$: collapsible = downloads.length > 1;
	let opened = false;
	$: collapseIcon = opened ? "➖" : "➕";
	$: collapseClass = collapsible ? (opened ? "opened" : "collapsed") : "";
	$: downloadOffset = collapsible ? 1 : 0;
</script>

{#if collapsible}
	<tr class="collapsible" on:click={() => (opened = !opened)}>
		<td class="toggle before">
			{collapseIcon}
		</td>
		<DownloadLine {version} download={downloads[0]} />
	</tr>
{/if}
{#each downloads.slice(downloadOffset) as download}
	<tr class={collapseClass}>
		<td class="toggle before-empty" />
		<DownloadLine {version} {download} />
	</tr>
{/each}

<style>
	td {
		user-select: none;
	}
	td.before {
		cursor: pointer;
		width: 5%;
	}
	td.before-empty {
		width: 5%;
	}
  tr:hover {
    background-color: rgba(255,255,255,0.1) !important;
  }
  tr.collapsed {
    display: none;
  }
  tr.opened {
    height: autot;
  }
  @media (max-width: 760px) {
    tr {
      padding: 0.25rem 0.5rem;
      display: flex;
      align-items: stretch;
      border-radius: 0;
    }
    td.toggle {
      flex: 0 0 24px;
      padding: .2rem 0;
    }
  }
</style>
