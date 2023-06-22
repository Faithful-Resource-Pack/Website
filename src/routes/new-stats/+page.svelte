<script lang="ts">
    const TMP = [
        {
            name: " ", // nbps to ensure text doesn't get wrapped weirdly
            values: ["Website", "CurseForge", "Planet Minecraft", "Modrinth", "MCPEDL"]
        },
        {
            name: "F32",
            values: ["a ton", "a lot"]
        },
        {
            name: "F64",
            values: ["a lot", "even more"]
        },
        {
            name: "CF32J",
            values: ["ehh", "not much"]
        },
        {
            name: "CF32PA",
            values: ["probably not much", "very little"]
        },
        {
            name: "CF64",
            values: ["ehhhhhhhh", "pretty good tbh"]
        },
    ]
</script>

<div class="container">
    <h1 class="title text-center bold">Our Statistics</h1>
    <h2 class="text-center">See how Faithful stacks up. The numbers don't lie!</h2>

    <table>
        {#each TMP as data}
        <div class="column">
            <h1>{data.name}</h1>
            {#each data.values as listing}
                <p>{listing}</p>
            {/each}
        </div>
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
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        border-collapse: collapse;

        * {
            margin-bottom: 2rem;
        }

        .column * {
            display: flex;
            flex-flow: column nowrap;
            grid-row-gap: 1px;
        }
    }

</style>