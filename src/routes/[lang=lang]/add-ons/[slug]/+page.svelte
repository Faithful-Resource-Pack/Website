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
	import ImagePreviewer from "$components/common/imagePreviewer.svelte";
	import type { PageData } from "./$types";
	import DiscordBanner from '$components/common/discordBanner.svelte';
    import { t } from "$lib/translations";

    export let data: PageData;

    let text_id = 'ID: ' + data.id
    let text_date_last_updated: boolean|string = (!!data.lastUpdated) && new Date(data.lastUpdated)
        ?.toLocaleDateString('pt-br')
        .split( '/' ).reverse( ).join('-')
    let text_last_updated = $t("add-ons.post.last_updated") + " " + (text_date_last_updated || $t("common.unknown"))

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

      let screenList = data.screenshots.map((e: string,i: number) => ({ image: e, alt: "Screenshot " + i}));
      let previewerDisplayed = false;
      let previewer: ImagePreviewer;
</script>

<div class="container">
    <h1 class="text-center title">{ data.name }</h1>
    <div class="addon-details">
        <div class="addon-details-left">
            <div class="addon-author-list">
                {#if data.authors.length == 1}
                    <h2 class="text-center">{$t("add-ons.post.author")}</h2>
                {:else}
                    <h2 class="text-center">{$t("add-ons.post.authors")}</h2>
                {/if}
                <div>
                {#each data.authors as author}
                    <div class="addon-author">
                        {#if author.uuid}
                            <img class="addon-author-skin" src="https://visage.surgeplay.com/full/256/{author.uuid}" loading="lazy" alt="{author.username}'s Skin">
                            <img class="addon-author-head" src="https://visage.surgeplay.com/head/128/{author.uuid}" loading="lazy" alt="{author.username}'s Skin">
                        {:else}
                            <img class="addon-author-skin" src="https://visage.surgeplay.com/full/256/{['X-Steve', 'X-Alex', 'X-Ari', 'X-Efe', 'X-Kai', 'X-Makena', 'X-Noor', 'X-Sunny', 'X-Zuri'][Math.floor(Math.random()*9)]}" loading="lazy" alt="Skin of {author.username}">
                            <img class="addon-author-head" src="https://visage.surgeplay.com/head/128/{['X-Steve', 'X-Alex', 'X-Ari', 'X-Efe', 'X-Kai', 'X-Makena', 'X-Noor', 'X-Sunny', 'X-Zuri'][Math.floor(Math.random()*9)]}" loading="lazy" alt="Skin of {author.username}">
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
                <h2 class="text-center">{$t("add-ons.post.downloads")}</h2>
                {#each data.downloads as download}
                    <a class="btn btn-dark block" href={download.links}>{download.key}</a>
                {/each}
            </div>
            <div id="addons-info">
                <h2 class="text-center">{$t("add-ons.post.information")}</h2>
                <div class="card card-body">
                    {#if data.information.optifine == true}
                        <div class="addon-info">
                            <img class="addon-info-img" src="/images/icon/optifine.png" loading="lazy" alt="requires optifine">
                            <p>{$t("add-ons.post.requirement")} <a href="https://optifine.net/downloads">OptiFine</a>
                        </div>
                    {/if}

                    {#each data.information.tags as info}
                        <div class="addon-info">
                            {#if info == "Java"}
                                <img class="addon-info-img" src="/images/icon/java.png" loading="lazy" alt="java support">
                                <p>{$t("add-ons.post.java")}</p>
                            {:else if info == "Bedrock"}
                                <img class="addon-info-img" src="/images/icon/bedrock.png" loading="lazy" alt="bedrock support">
                                <p>{$t("add-ons.post.bedrock")}</p>
                            {:else if info == "32x"}
                                <img class="addon-info-img" src="/images/icon/32.png" loading="lazy" alt="for 32x">
                                <p>{$t("add-ons.post.32x")}</p>
                            {:else if info == "64x"}
                                <img class="addon-info-img" src="/images/icon/64.png" loading="lazy" alt="for 64x">
                                <p>{$t("add-ons.post.64x")}</p>
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
            {#if screenList.length > 0}
                <h2 class="text-center">{$t("add-ons.post.screenshots")}</h2>
                <svelte:component
                    this={ImagePreviewer} bind:this={previewer}
                    bind:displayed={previewerDisplayed} images={screenList} />
            {/if}
            <div class="card card-body addon-description">
                <!-- required div to have vertical margin collapsing -->
                <div>{@html data.description}</div>
            </div>
        </div>
    </div>
    <DiscordBanner text="discussion" />
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

                            div:not(:empty) {
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
                box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
            }

            .addon-description {
                margin-top: 20px;
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