<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<svelte:head>
    <title>Addon: {data.title} - Faithful</title>
</svelte:head>

<div class="container">
    <h1 class="text-center title">{data.title}</h1>
    <img class="addon-header" src="https://database.faithfulpack.net/images/addons/{data.slug}/header" alt="{data.title} header">
    <div class="addon-details">
        <div class="addon-author">
            <h2 class="text-center">Author</h2>
            <p>idk please someone create a skin renderer with threlte or something (threlte is threejs for svelte)</p>
        </div>
        <div class="addon-details-right">
            <div class="card card-body addon-description">
                <p align="justify">{data.description}</p>
            </div>
            <div class="addon-details-bottom">
                <div>
                    <h2 class="text-center">Downloads</h2>
                    {#each data.downloads as download}
                        <a class="btn btn-dark block" href={download.links}>{download.key}</a>
                    {/each}
                </div>
                <div>
                    <h2 class="text-center">Information</h2>
                    <div class="card card-body">
                        {#if data.information.optifine == true}
                            <div class="addon-info">
                                <img src="/images/icon/optifine.png" alt="requires optifine">
                                <p>This add-on requires <a href="https://optifine.net/downloads">OptiFine</a>
                            </div>
                        {/if}

                        {#each data.information.tags as info}
                            <div class="addon-info">
                                {#if info == "Java"}
                                    <img src="/images/icon/java.png" alt="java support">
                                    <p>This add-on supports Java Edition</p>
                                {:else if info == "Bedrock"}
                                    <img src="/images/icon/bedrock.png" alt="bedrock support">
                                    <p>This add-on supports Bedrock Edition</p>
                                {:else if info == "32x"}
                                    <img src="/images/icon/32.png" alt="for 32x">
                                    <p>This add-on was made for Faithful 32x</p>
                                {:else if info == "64x"}
                                    <img src="/images/icon/64.png" alt="for 64x">
                                    <p>This add-on was made for Faithful 64x</p>
                                {/if}
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <p class="banner purple">
        <a href="https://discord.gg/sN9YRQbBv7">Start a discussion in our Discord!</a>
    </p>
</div>

<style lang="scss">
    .addon-header {
        width: 100%;
        border-radius: $border-radius;
        margin-bottom: 20px;
    }

    .addon-details {
        display: flex;
        flex-wrap: wrap;

        .addon-author {
            flex: 0 0 25%;

            h2 {
                margin-top: 0;
            }
        }

        .addon-details-right {
            flex: 0 0 75%;
            
            .addon-details-bottom {
                display: flex;
                gap: 20px;

                div {
                    flex-basis: 0;
                    flex-grow: 1;
                    
                    .btn {
                        margin-bottom: 10px;
                    }

                    .addon-info {
                        display: flex;
                        gap: 10px;

                        &:not(:last-child) {
                            margin-bottom: 10px;
                        }

                        img {
                            max-height: 56px;
                            max-width: 56px;
                            border-radius: $border-radius;
                        }
                    }
                }
            }
        }
    }
</style>