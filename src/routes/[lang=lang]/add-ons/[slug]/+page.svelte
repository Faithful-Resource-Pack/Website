<script lang="ts">
    import Fa from "svelte-fa/src/fa.svelte";
    import {
        faGithub,
        faPatreon,
        faPaypal,
        faPlaystation,
        faReddit,
        faSteam,
        faTwitter,
        faXbox,
        faYoutube,
		type IconDefinition
    } from "@fortawesome/free-brands-svg-icons";
    import {
        faCubes,
        faGlobe
    } from "@fortawesome/free-solid-svg-icons";
    
    export let data: any;

    let text_id = 'ID: ' + data.id
    let text_date_last_updated: boolean|string = (!!data.lastUpdated) && new Date(data.lastUpdated)
        ?.toLocaleDateString('pt-br')
        .split( '/' ).reverse( ).join('-')
    let text_last_updated = 'Last updated: ' + (text_date_last_updated || 'Unknown')

    let media_icons: Record<string, { fa?: IconDefinition, src?: string }> = {
        "CurseForge": { src: "/images/add-ons/curseforge.svg" },
        "GitHub": { fa: faGithub },
        "Patreon": { fa: faPatreon },
        "Paypal": { fa: faPaypal },
        "Planet Minecraft": { fa: faCubes },
        "PSN": { fa: faPlaystation },
        "Reddit": { fa: faReddit },
        "Steam": { fa: faSteam },
        "Twitter": { fa: faTwitter },
        "Website": { fa: faGlobe },
        "Xbox": { fa: faXbox },
        "YouTube": { fa: faYoutube },
        "Other": { fa: faGlobe }
      }
</script>

<div class="container">
    <h1 class="text-center title">{data.name}</h1>
    <div class="addon-details">
        <div class="addon-details-left">
            <div class="addon-author-list">
                {#if data.authors.length == 1}
                    <h2 class="text-center">Author</h2>
                {:else}
                    <h2 class="text-center">Authors</h2>
                {/if}
                <div>
                {#each data.authors as author}
                    <div class="addon-author">
                        {#if author.uuid}
                            <img class="addon-author-skin" src="https://visage.surgeplay.com/full/256/{author.uuid}" alt="Skin of {author.username}">
                            <img class="addon-author-head" src="https://visage.surgeplay.com/head/128/{author.uuid}" alt="Skin of {author.username}">
                        {:else}
                            <img class="addon-author-skin" src="https://visage.surgeplay.com/full/256/{['X-Steve', 'X-Alex', 'X-Ari', 'X-Efe', 'X-Kai', 'X-Makena', 'X-Noor', 'X-Sunny', 'X-Zuri'][Math.floor(Math.random()*9)]}" alt="Skin of {author.username}"> 
                            <img class="addon-author-head" src="https://visage.surgeplay.com/head/128/{['X-Steve', 'X-Alex', 'X-Ari', 'X-Efe', 'X-Kai', 'X-Makena', 'X-Noor', 'X-Sunny', 'X-Zuri'][Math.floor(Math.random()*9)]}" alt="Skin of {author.username}"> 
                        {/if}
                        <div class="card addon-author-name text-center">
                            <h4>{author.username}</h4>
                            <div>
                                {#each author.media as media}
                                    <a href={media.link} target="_blank" rel="noreferrer">
                                        {#if 'fa' in media_icons[media.type] }
                                            <Fa icon={media_icons[media.type].fa}/>
                                        {:else}
                                            <img width=20 height=20 src={media_icons[media.type].src} alt={media.type} />
                                        {/if}
                                    </a>
                                {/each}
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
            </div>
            <div>
                <h2 class="text-center">Downloads</h2>
                {#each data.downloads as download}
                    <a class="btn btn-dark block" href={download.links}>{download.key}</a>
                {/each}
            </div>
            <div id="addons-info">
                <h2 class="text-center">Information</h2>
                <div class="card card-body">
                    {#if data.information.optifine == true}
                        <div class="addon-info">
                            <img class="addon-info-img" src="/images/icon/optifine.png" alt="requires optifine">
                            <p>This add-on requires <a href="https://optifine.net/downloads">OptiFine</a>
                        </div>
                    {/if}

                    {#each data.information.tags as info}
                        <div class="addon-info">
                            {#if info == "Java"}
                                <img class="addon-info-img" src="/images/icon/java.png" alt="java support">
                                <p>This add-on supports Java Edition</p>
                            {:else if info == "Bedrock"}
                                <img class="addon-info-img" src="/images/icon/bedrock.png" alt="bedrock support">
                                <p>This add-on supports Bedrock Edition</p>
                            {:else if info == "32x"}
                                <img class="addon-info-img" src="/images/icon/32.png" alt="for 32x">
                                <p>This add-on was made for Faithful 32x</p>
                            {:else if info == "64x"}
                                <img class="addon-info-img" src="/images/icon/64.png" alt="for 64x">
                                <p>This add-on was made for Faithful 64x</p>
                            {/if}
                        </div>
                    {/each}
                </div>
                <div class="card card-body" id="info-list">
                    <ul>
                        <li>{text_id}</li>
                        <li>{text_last_updated}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="addon-details-right">
            <img class="addon-header" src="https://database.faithfulpack.net/images/addons/{data.slug}/header" alt="{data.name} header">
            <div class="card card-body addon-description">
                <!-- required div to have vertical margin collapsing -->
                <div>{@html data.description}</div>
            </div>
        </div>
    </div>
    <p class="banner purple">
        <a href="https://discord.gg/sN9YRQbBv7">Start a discussion in our Discord!</a>
    </p>
</div>

<style lang="scss">
    $spacing: 20px;

    .addon-details {
        display: flex;
        flex-wrap: wrap;

        &-left {
            flex: 0 0 25%;

            .addon-author-list {
                h2 {
                    margin-top: 0;
                }

                & > div {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-evenly;

                    .addon-author {
                        display: flex;
                        align-items: center;
                        flex-direction: column;

                        & > img {
                            margin-bottom: 10px;
                        }

                        &-head {
                            display: none;
                        }

                        &-name {
                            max-width: max-content;

                            h4 {
                                margin: 8px 16px;
                            }

                            div {
                                margin-bottom: 6px;
                            }

                            a {
                                margin: 0 4px;
                                color: #fff;

                                img {
                                    vertical-align: middle;
                                }
                            }
                        }
                    }
                }
            }

            div {
                .btn {
                    margin-bottom: 10px;
                }

                .addon-info {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    

                    &:not(:last-child) {
                        margin-bottom: 10px;
                    }

                    .addon-info-img {
                        max-height: 56px;
                        max-width: 56px;
                        border-radius: $border-radius;
                    }

                    p {
                        margin: 0;
                    }
                }
            }

            #addons-info .card + .card {
                margin-top: $spacing;
            }

            #addons-info #info-list ul {
                margin: 0;
                padding-left: 1em;
            }
        }

        &-right {
            flex: 0 0 75%;
            padding-left: $spacing;

            .addon-header {
                width: 100%;
                border-radius: $border-radius;
                margin-bottom: 20px;
                box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
            }

            // Markdown description css 
            & .addon-description > div {
                & > :global(*:first-child) {
                    margin-top: 0;
                }
                & > :global(*:last-child) {
                    margin-bottom: 0;
                }
            }
        }
    }

    .banner {
        margin: $spacing 0;
    }

    @media(max-width: $width-S) {
        .addon-details {
            flex-direction: column-reverse;

            &-right {
                padding-left: 0;
            }

            .addon-author-list h2 {
                margin-top: revert;
            }

            #addons-info .card + .card {
                margin-top: 15px;
            }
        }
    }

    @media(max-width: $width-L) {
        .addon-author-skin {
            display: none;
        }
        .addon-author-head {
            display: block !important;
        }
    }
</style>