<script lang="ts">
    import DiscordBanner from "$components/common/discordBanner.svelte";
    import PackCardList from "$components/home/packCardList.svelte";
    import NewsGrid from "$components/news/newsGrid.svelte";

    const SEE_MORE = "See More";
    const projects = {
        links: [
            [{href: "/packs/faithful-32x", title: SEE_MORE}],
            [{href: "/packs/faithful-64x", title: SEE_MORE}],
            [{href: "/packs/classic-faithful-32x-jappa", title: "New Textures (Jappa)"},
                {href: "/packs/classic-faithful-32x-programmer-art", title: "Classic Textures (PA)"}],
            [{href: "/packs/classic-faithful-64x", title: SEE_MORE}],
        ],
        urls: [
            {
                title: "Faithful 32x",
                background: "https://database.faithfulpack.net/images/branding/site/posters/poster_32.png",
                src: "https://database.faithfulpack.net/images/branding/logos/transparent/256/f32_logo.png"
            },
            {
                title: "Faithful 64x",
                background: "https://database.faithfulpack.net/images/branding/site/posters/poster_64.png",
                src: "https://database.faithfulpack.net/images/branding/logos/transparent/256/f64_logo.png"
            },
            {
                title: "Classic Faithful 32x",
                background: "https://database.faithfulpack.net/images/branding/site/posters/poster_cf32.png",
                src: "https://database.faithfulpack.net/images/branding/logos/transparent/256/cf32_logo.png"
            },
            {
                title: "Classic Faithful 64x",
                background: "https://database.faithfulpack.net/images/branding/site/posters/poster_cf64.png",
                src: "https://database.faithfulpack.net/images/branding/logos/transparent/256/cf64_logo.png"
            },
        ]
    }
    const extras = {
        links: [
            [{href: "/add-ons", title: SEE_MORE }],
            [{href: "/modding", title: SEE_MORE}]
        ],
        urls: [
            {
                title: "Add-ons",
                background: "https://database.faithfulpack.net/images/branding/site/posters/poster_addons.png",
                src: "https://database.faithfulpack.net/images/branding/logos/transparent/256/addons_logo.png"
            },
            {
                title: "Mod Support",
                background: "https://database.faithfulpack.net/images/branding/site/posters/poster_mods.png",
                src: "https://database.faithfulpack.net/images/branding/logos/transparent/256/mods_logo.png"
            }
        ]
    }
</script>

<div class="highlight-section text-center">
    <div id="upspace"></div>
    <img class="highlight-wordmark" src="/images/branding/wordmark.png" alt="Faithful Wordmark">
    <h2 class="regular">Providing a higher-resolution experience since 2010.</h2>
    <DiscordBanner text="contribute" />
</div>

<h1 class="title text-center">Faithful Projects</h1>

<PackCardList items={projects} />

<p id="handy-guide" class="text-center">
    Not sure which one to pick? Check out our <a href="/installation" class="subbed">handy guide</a>.
</p>

<h1 class="title text-center">Faithful Extras</h1>

<PackCardList items={extras} />

<h1 class="title text-center">Faithful News</h1>


<NewsGrid limit={6} />
<br>
<a class="btn btn-dark col-6 center text-center" href="/news" id="more_news">{ SEE_MORE }</a>

<style lang="scss">
    $spacing: 2rem;

    .highlight-section {
        display: block;
        background-image: url(/images/background/placeholder_background.jpg);
        background-size: cover;
        background-position: center;
        padding: 0 $spacing 1px;

        #upspace {
            height: 80px;
        }

        .highlight-wordmark {
            margin-top: 50px;
            filter: drop-shadow(0 0 10px #000);
            max-width: 100%;
        }

        h2 {
            color: #fff;
            text-shadow: rgba(0, 0, 0, 0.4) 0px 4px 5px;
        }

        h2, :global(.banner.purple) {
            margin-top: $spacing;
            margin-bottom: $spacing;
        }
        :global(.banner.purple) {
		    width: 60%;
        }
    }

    #handy-guide {
        margin: $spacing 0;
        font-size: 1.1rem;
        font-weight: 500;
    }

    @media (max-width: $width-XS) {
        #upspace {
            display: none;
        }

        .highlight-wordmark {
            margin-top: 2rem;
        }

        .highlight-section, .highlight-section h2, :global(.highlight-section .banner.purple), #handy-guide {
            padding-left: $small-spacing;
            padding-right: $small-spacing;
        }

        #more_news {
            width: calc(100% - 2*$small-spacing);
        }
    }
</style>