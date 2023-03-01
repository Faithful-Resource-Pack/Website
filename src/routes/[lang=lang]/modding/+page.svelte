<script>
    import ModPackCard from "$components/mods/modPackCard.svelte";
    import { t } from "$lib/translations";

    const projects = {
        links: [
            {href: "/modding/faithful-32x" },
            {href: "/modding/classic-faithful-32x",}
        ],
        urls: [
            {
                title: "Faithful 32x",
                background: "https://database.faithfulpack.net/images/branding/site/posters/poster_32.png",
                src: "https://database.faithfulpack.net/images/branding/logos/transparent/256/f32_logo.png",
            },
            {
                title: "Classic Faithful 32x",
                background: "https://database.faithfulpack.net/images/branding/site/posters/poster_cf32.png",
                src: "https://database.faithfulpack.net/images/branding/logos/transparent/256/cf32_logo.png"
            },
        ]
    }
</script>

<div id="mods_header" class="text-center">
    <img class="background_transition" src="/images/background/Mods.jpg" alt="Mods background">
    <div id="mods_header_text">
        <h1 class="title middle">
            <img class="title-image" src="https://database.faithfulpack.net/images/branding/logos/transparent/128/mods_logo.png" alt="Mods"
            /><span class="h1 bold">{$t("modding.title")}</span>
        </h1>
        <h2>{$t("modding.description")}</h2>
        <p><i><a href="/modding/installation">{$t("modding.how_to_install")}</a></i></p>
        <br>
        <h1>{$t("modding.choose_pack")}</h1>
    </div>
</div>

<div id="packCardList">
    {#each projects.urls as url, url_i}
        <ModPackCard {...url} links={projects.links[url_i]} />
    {/each}
</div>

<style lang="scss">
    $overflow: 200px;

    #mods_header {
        position: relative;
        overflow: hidden;
        padding: 1px 0 $overflow;
        margin-bottom: -$overflow;

        &_text {
            position: relative;

            h1, h2, p {
                color: #fff;
            }
        }

        p i a {
            color: inherit;
            text-decoration: underline;
        }
    }

    #packCardList {
        display: flex;
        gap: 30px;
        justify-content: center;
        flex-wrap: wrap;
    }

    @media (max-width: $width-XS) {
        #packCardList {
            padding: $small-spacing;
            
            :global( > *) {
                width: 100%;
            }
            gap: $small-spacing;
        }
    }
</style>