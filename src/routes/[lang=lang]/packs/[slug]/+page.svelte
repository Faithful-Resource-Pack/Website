<script lang="ts">
    export let data: any;
    import { onMount } from 'svelte';
    import { register } from 'swiper/element/bundle';
    import { t } from "$lib/translations";

    register();
	onMount(() => {
		import ('img-comparison-slider');

        const swiperEl = document.querySelector('swiper-container');
        const swiperParams = {
            navigation: true,
            slidesPerView: 3,
            grabCursor: true,
            spaceBetween: 20,
            loop: true,
            autoplayDelay: 3000,
            autoplayDisableOnInteraction: false,
            breakpoints: {
                600: {
                    slidesPerView: 1,
                },
                992: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 3,
                }
            },
        };

        Object.assign(swiperEl, swiperParams);
        swiperEl.initialize();
	});
</script>

<div class="highlight-section text-center" style="background-image: url({data.background})">
    <img class="highlight-logotext" src={data.logotext} alt="{data.title} logotext">
    <div class="card card-body">
        <h1>{$t("packs.about")}</h1>
        <p>{@html $t(`packs.${data.link}`)}</p>
        <div>
            <a class="btn btn-dark" href="/downloads#{data.link}">Download</a>
            <a class="btn btn-dark" href="/news/{data.link}/latest">View latest post</a>
        </div>
    </div>
</div>

<div class="container">
    <h1 class="text-center">{$t("packs.comparison")}</h1>
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
</div>

<h1 class="text-center">{$t("packs.screenshots")}</h1>
<swiper-container>
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
            max-width: 800px;
            padding: 20px;
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