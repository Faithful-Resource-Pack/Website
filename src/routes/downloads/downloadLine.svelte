<script lang="ts">
	import Fa from "svelte-fa";
	import { faGithub } from "@fortawesome/free-brands-svg-icons";
	import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";

	export let version: string;
	export let download: App.Download;

	$: text_name = download.file;
	$: text_version = version === "github" ? "Repository" : version;
	$: class_release =
		{
			GitHub: "github",
			R: "green",
			B: "blue",
			A: "yellow",
			Snapshot: "black"
		}[download.file_type] || "green";
	let text_release: string;
	$: {
		if (download.file_type === "GitHub") text_release = "GitHub";
		else if (!download.file_version) text_release = download.file_type;
		else text_release = download.file_type + download.file_version;
	}
	$: latest = !!download.latest;
	$: links = download.links;
	$: text_date = download.date || "";
	let text_size: string = download.size || "";
	$: {
		if (download.size !== undefined && /^[0-9]+$/.test(download.size)) {
			const number_size = Number.parseInt(download.size, 10);
			if (!Number.isNaN(number_size)) {
				text_size = `${(number_size / 1000000).toFixed(2)} MB`;
			}
		}
	}
	const text_latest = 'Latest';
</script>

<td class="large details">
	<p>
		<span class="name">{text_name}</span>
		{#if text_release}<span class={class_release}>{text_release}</span>{/if}
		{#if latest}<span class="latest">{text_latest}</span>{/if}
	</p>
	{#if text_date}<p class="mobile">{text_date} - {text_size}</p>{/if}
</td>
{#each Object.entries(links) as [origin, link], i}
<td class="small downloads" colspan={2 / Object.entries(links).length}>
		<a href={link} class="btn btn-dark btn-dl">
			{#if origin === "curse"}
				<Fa icon={faFireFlameCurved} /><span class="link-text">Curse</span>
			{:else if origin === "github"}
				<Fa icon={faGithub} /><span class="link-text">GitHub</span>
			{:else}
				<span class="link-text">{origin}</span>
			{/if}
		</a>
</td>
{/each}
<td class="size">
	<p>{text_size}</p>
</td>
<td class="date">
	<p>{text_date}</p>
</td>

<style lang="scss">
	td {
		line-height: 1.5;
	}
	.version {
		background-color: #c02544;
		color: #fff;
	}
	.github {
		background-color: #fff;
		color: #111;
	}
	.black {
		background-color: #000;
		color: #fff;
	}
	.blue {
		background-color: #3c6fdd;
		color: #fff;
	}
	.green {
		background-color: #50ca18;
		color: #111;
	}
	.yellow {
		background-color: #d6a017;
		color: #111;
	}
	.latest {
		background-color: #fff;
		color: #111;
	}
	span {
		padding: 0.2rem 0.4rem;
		border-radius: $border-radius;
	}
	.mobile {
		display: none;
	}
	td.small {
		width: calc(50% / 6);
	}
	td.large {
		text-align: left;
		width: 45%;
	}
	p {
		margin: 0;
		padding: 0.2rem;
		font-size: 16px;
		color: #ccc;
	}
	.btn-dl {
		padding: 0.1rem 0.4rem;
		width: 90px;
	}
	span.link-text {
		padding: 0;
	}
	.btn-dl span.link-text {
		margin-left: 8px;
	}

	.downloads + .downloads > *:first-child {
		margin-left: 1px;
	}

	@media (max-width: 760px) {
		.outline {
			margin: 0;
			padding: 0;
		}
		.mobile {
			display: block;
		}
		.details .name {
			display: block;
			padding: 0;
		}
		.date,
		.size {
			display: none;
		}
    td p {
      padding: 0;
    }
		td.details {
			flex: 1 1 auto;
			padding: 0.2rem 0.4rem;
		}
		.downloads {
			flex: 0 0 30px;
			width: auto;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.btn-dl {
				width: 30px;
				height: 30px;
				line-height: 30px;
				text-align: center;
				padding: 0;
			}

			.link-text {
				display: none;
			}
		}
	}
</style>
