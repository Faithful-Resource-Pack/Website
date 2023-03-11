<script lang="ts">
    import Fa from "svelte-fa/src/fa.svelte";
	import { faFireFlameCurved, faGlobe } from "@fortawesome/free-solid-svg-icons";
	import { faGithub } from "@fortawesome/free-brands-svg-icons";

    export let href: string;
    export let text: string;

    $: cleanedLink = href.replace(/^(-|\s)+/, '')
    $: cleanedText = text.replace(/^(-|\s)+/, '')
</script>

<a href={cleanedLink} target="_blank" rel="noreferrer" class="btn block btn-lg btn-primary fancy-card-2x my-3">
    {#if text.includes("GitHub") }
        <Fa icon={faGithub} />
    {:else if text.includes("CurseForge") }
        <Fa icon={faFireFlameCurved} />
    {:else if text.includes("PlanetMinecraft") || text.includes("PMC") || text.includes("Planet Minecraft")}
        <Fa icon={faGlobe} />
    {:else if text.includes("MCPEDL") }
        <i style="margin-right: 10px" class="fas"></i>
    {:else if text.includes("Modrinth") }
        <i style="margin-right: 10px" class="fas"></i>
    {/if }
    {cleanedText}
</a>

<style lang="scss">
	.btn-primary {
		font-family: 'Faithful 32x' !important;
		font-weight: 300;
	}
</style>