<script lang="ts">
    export let data: any;
    import { onMount } from 'svelte';
    import { register } from 'swiper/element/bundle';
    register();
	onMount(() => {
		import ('img-comparison-slider');
	});
</script>

<div class="highlight-section text-center" style="background-image: url({data.background})">
    <img class="highlight-logotext" src={data.logotext} alt="{data.title} logotext">
    <div class="card card-body">
        <h1>About</h1>
        <p>Blah blah blah, short description of the pack, its artstyle, quick history, blah blah blah, AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
        <div>
            <a class="btn btn-dark" href="/downloads#{data.link}">Download</a>
            <a class="btn btn-dark" href="/news/{data.link}/latest">View latest post</a>
        </div>
    </div>
</div>

<h1 class="text-center">Comparison</h1>
<img-comparison-slider class="center" value="60">
    <img
        slot="first"
        src="/images/comparisons/faithful 32x.png"
        alt="{data.title}"
    />
    <img
        slot="second"
        src="/images/comparisons/default.png"
        alt="Vanilla"
    />
    <svg slot="handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
        <path stroke="#fff" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" stroke-width="1" fill="#fff" vector-effect="non-scaling-stroke"></path>
    </svg>
</img-comparison-slider>

<h1 class="text-center">Screenshots</h1>
<swiper-container
    navigation={true}
    slides-per-view={3}
    grab-cursor={true}
    space-between={20}
    loop={true}
    autoplay-delay={3000}
    autoplay-disable-on-interaction={false}
>
    <swiper-slide><img src="https://database.faithfulpack.net/images/website/posts/32x/S_22w46a.jpg" alt="yes"></swiper-slide>
    <swiper-slide><img src="https://database.faithfulpack.net/images/website/posts/32x/R4.jpg" alt="yes"></swiper-slide>
    <swiper-slide><img src="https://database.faithfulpack.net/images/website/posts/32x/R2.jpg" alt="yes"></swiper-slide>
    <swiper-slide><img src="https://database.faithfulpack.net/images/website/posts/32x/R1.jpg" alt="yes"></swiper-slide>
    <swiper-slide><img src="https://database.faithfulpack.net/images/website/posts/32x/B20.jpg" alt="yes"></swiper-slide>
    <swiper-slide><img src="https://database.faithfulpack.net/images/website/posts/32x/B9.jpg" alt="yes"></swiper-slide>
    <swiper-slide><img src="https://database.faithfulpack.net/images/website/posts/32x/B10.jpg" alt="yes"></swiper-slide>
</swiper-container>

<style lang="scss">
    .highlight-section {
        display: block;
        background-size: cover;
        background-position: center;
        padding-bottom: 2rem;
        margin-bottom: 2rem;

        .highlight-logotext {
            width: 80%;
        }

        .card {
            width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        h1 {
            margin: 0;
        }

        .btn {
            width: 40%
        }
    }

    img-comparison-slider {
        width: 60%;
        border-radius: $border-radius;

        &:hover {
            cursor: col-resize;
        }

        &:focus {
            outline: none;
        }

        img {
            width: 100%;
        }
    }

    swiper-container {
        margin: 0 20px;

        img {
            width: 100%;
            border-radius: $border-radius;
        }
    }

    :root{--swiper-theme-color:#fff}

    @media (max-width: $width-M) {
        .highlight-section {
            .highlight-logotext{
                width: 100%;
            }
            
            .card {
                width: 90%;
            }
        }

        img-comparison-slider {
            width: 90%;
        }
    }

    @media (max-width: $width-M) {
        .highlight-section .btn {
            width: 49%;
        }
    }
</style>