<script lang="ts">
    import Fa from "svelte-fa/src/fa.svelte";
	import { faXmark } from "@fortawesome/free-solid-svg-icons";
    const TMP = [
        {
            name: " ", // nbps to ensure text doesn't get wrapped weirdly
            values: [
                "F32",
                "F64",
                "CF32",
                "CF32PA",
                "CF64"
            ]
        },
        {
            name: "CurseForge",
            values: [
                "1M",
                "2M",
                "3K",
                "100",
                "400K"
            ]
        },
        {
            name: "Modrinth",
            values: [
                "10K",
                "15K",
                "X",
                "X",
                "X"
            ]
        },
        {
            name: "Planet Minecraft",
            values: [
                "300K",
                "200K",
                "10K",
                "500",
                "15K"
            ]
        },
        {
            name: "MCPEDL",
            values: [
                "3K",
                "X",
                "X",
                "X",
                "X"
            ]
        },
    ]
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
                    <td><Fa icon={faXmark} /></td>
                {:else}
                    <td><p>{value}</p></td>
                {/if}
            {/each}
        </tr>
        {#if i + 1 < TMP.length}
            <tr><td colspan=6><hr></td></tr>
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
            border-top: 1px solid #ffffff44;
        }
    }

    :global(html.light hr) {
        border-top: 1px solid #00000044 !important;
    }

</style>