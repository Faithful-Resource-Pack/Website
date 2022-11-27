<script lang="ts">
	import PackCardList from "../components/home/packCardList.svelte";

    const SEE_MORE = 'See more';
    const projects = {
        links: [
            [{href: '/faithful-32x', title: SEE_MORE}],
            [{href: '/faithful-64x', title: SEE_MORE}],
            [{href: '/classic-faithful-32x-jappa', title: 'New Textures (Jappa)'},
             {href: '/classic-faithful-32x-pa', title: 'Classic Textures (PA)'}],
            [{href: '/classic-faithful-64x', title: SEE_MORE}],
        ],
        urls: [
            { 
                title: "Faithful 32x",
                background: "https://database.faithfulpack.net/images/branding/backgrounds/f32.png",
                src: "https://database.faithfulpack.net/images/branding/logos/transparent/256/f32_logo.png"},
            { 
                title: "Faithful 64x",
                background: "https://database.faithfulpack.net/images/branding/backgrounds/f64.png",
                src: "https://database.faithfulpack.net/images/branding/logos/transparent/256/f64_logo.png"
            },
            { 
                title: "Classic Faithful 32x",
                background: "https://database.faithfulpack.net/images/branding/backgrounds/cf32.png",
                src: "https://database.faithfulpack.net/images/branding/logos/transparent/256/cf32_logo.png"
            },
            {
                title: "Classic Faithful 64x",
                background: "https://database.faithfulpack.net/images/branding/backgrounds/cf64.png",
                src: "https://database.faithfulpack.net/images/branding/logos/transparent/256/cf64_logo.png"
            },
        ]
    }
    const extras = {
        links: [
            [{href: '/add-ons', title: SEE_MORE }],
            [{href: '/modding', title: SEE_MORE}]
        ],
        urls: [
            {
                title: "Add-ons",
                background: "https://database.faithfulpack.net/images/branding/backgrounds/add-ons.png",
                src: "https://database.faithfulpack.net/images/branding/logos/transparent/256/addons_logo.png"
            },
            {
                title: "Mods support",
                background: "https://database.faithfulpack.net/images/branding/backgrounds/mods.png",
                src: "https://database.faithfulpack.net/images/branding/logos/transparent/256/mods_logo.png"
            }
        ]
    }

    // TODO: change with real posts
    const posts: App.Post[] = [
  {
    "permalink": "https://faithfulpack.net/faithful32x/22w46a",
    "title": "Faithful 32x – Snapshot 22w46a",
    "headerImage": "https://database.faithfulpack.net/images/website/posts/32x/S_22w46a.jpg"
  },
  {
    "permalink": "https://faithfulpack.net/faithful64x/B6",
    "title": "Faithful 64x Beta 6",
    "headerImage": "https://database.faithfulpack.net/images/website/posts/64x/B6.jpg"
  },
  {
    "permalink": "https://faithfulpack.net/faithful32x/R3",
    "title": "Faithful 32x – October 2022 Releases",
    "headerImage": "https://database.faithfulpack.net/images/website/posts/32x/R3.jpg"
  },
  {
    "permalink": "https://faithfulpack.net/License%20Update",
    "title": "An Update To Our License",
    "headerImage": "https://database.faithfulpack.net/images/website/posts/other/steve_license.jpg"
  },
  {
    "permalink": "https://faithfulpack.net/faithful32xDungeons/The%20Fate%20of%20Faithful%20Dungeons",
    "title": "The Fate of Faithful Dungeons",
    "headerImage": "https://database.faithfulpack.net/images/website/posts/32xDungeons/discontinue.jpg"
  },
  {
    "permalink": "https://faithfulpack.net/faithful32x/R2",
    "title": "Faithful 32x – August 2022 Releases",
    "headerImage": "https://database.faithfulpack.net/images/website/posts/32x/R2.jpg"
  }
];
</script>
<div class="highlight-section text-center">
    <div id="upspace"></div>
    <img class="highlight-wordmark" src="/images/branding/wordmark.png" alt="Faithful Wordmark">
    <h1>Providing a higher-resolution experience<br> since 2010.</h1>
    <p class="banner purple">
        Join 
        <a href="https://discord.gg/sN9YRQbBv7">our Discord</a>
        now and contribute to the project!
    </p>
</div>

<h1 class="title text-center">Faithful Projects</h1>

<PackCardList items={projects} />

<p id="handy-guide" class="text-center">
    Not sure which one to pick? Check out our <a href="/handy-guide" class="subbed">handy guide</a>.
</p>

<h1 class="title text-center">Faithful Extras</h1>

<PackCardList items={extras} />

<h1 class="title text-center">Faithful News</h1>

<div id="posts" class="res-grid-3">
    {#each posts as post}
    <a class="card img-card" rel="noopener" href="{ post.permalink }">
        {#if post.headerImage }
            <img src={ post.headerImage } loading="lazy" alt={ post.title }>
        {:else}
            <img src="https://database.faithfulpack.net/images/website/posts/placeholder.jpg" loading="lazy" alt={ post.title }>
        {/if}

        <h3>{ post.title }</h3>
    </a>
    {/each}
</div><br>
<a class="btn btn-dark col-6 center text-center" href="/news">{ SEE_MORE }</a>

<style lang="scss">
    $spacing: 2rem;

    .highlight-section {
        display: block;
        background-image: url(/images/placeholder_background.png);
        background-size: cover;
        background-position: center;
        padding: 0 $spacing 1px;

        #upspace {
            height: 88px;   
        }

        .highlight-wordmark {
            margin-top: 50px;
            filter: drop-shadow(0 0 10px #000);
            max-width: 100%;
        }

        h1 {
            color: #fff;
            text-shadow:rgba(0, 0, 0, 0.4) 0px 4px 5px;
            font-weight: 500;
            font-size: 2rem;
        }

        h1, .banner.purple {
            margin: $spacing 0;
        }

        .banner.purple {
            width: 60%;
            margin-left: auto;
            margin-right: auto  ;
            max-width: 100%;
            font-size: 1.2rem;
            font-weight: 600;
        }
    }

    .title {
        font-size: 3.4rem;
        margin: $spacing 0;
    }

    #handy-guide {
        margin: $spacing 0;
        font-size: 1.1rem;
        font-weight: 500;
    }

    #posts {
        width: 1140px;
        max-width: 100%;
        margin: 0 auto;
        font-size: 0.8rem;
    }

    .img-card > h3 {
        margin: 0;
        padding: 8px;
        background: linear-gradient(0deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%);
        width: 100%;
    }
</style>