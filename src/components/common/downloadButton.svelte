<script lang="ts">
	import Fa from "svelte-fa";
	import {
		faFireFlameCurved,
		faEarthEurope,
		faWrench,
		faCube,
	} from "@fortawesome/free-solid-svg-icons";
	import { faGithub } from "@fortawesome/free-brands-svg-icons";

	export let href: string;
	export let text: string;

	$: cleanedLink = href.replace(/^(-|\s)+/, "");
	$: cleanedText = text.replace(/^(-|\s)+/, "");
</script>

<a href={cleanedLink} target="_blank" rel="noreferrer" class="btn btn-primary block">
	{#if text.includes("GitHub")}
		<Fa icon={faGithub} />
	{:else if text.includes("CurseForge")}
		<Fa icon={faFireFlameCurved} />
	{:else if text.includes("PlanetMinecraft") || text.includes("PMC") || text.includes("Planet Minecraft")}
		<Fa icon={faEarthEurope} />
	{:else if text.includes("MCPEDL")}
		<Fa icon={faCube} />
	{:else if text.includes("Modrinth")}
		<Fa icon={faWrench} />
	{/if}
	{cleanedText}
</a>

<style lang="scss">
	.btn {
		margin-bottom: 10px;
	}
</style>
