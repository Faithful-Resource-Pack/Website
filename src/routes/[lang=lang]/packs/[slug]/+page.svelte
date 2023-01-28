<script lang="ts">
    export let data: any;
    import { onMount } from 'svelte';
    import Carousel from 'svelte-carousel';
    import { browser } from '$app/environment';
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

<!--
    Do I look like I want to do a carousel by myself? Hell nah
-->
{#if browser}
    <Carousel
        dots={false}
        particlesToShow={3}
    >
        <img src="https://database.faithfulpack.net/images/website/posts/32x/S_22w46a.jpg" alt="yes">
        <img src="https://database.faithfulpack.net/images/website/posts/32x/R4.jpg" alt="yes">
        <img src="https://database.faithfulpack.net/images/website/posts/32x/R3.jpg" alt="yes">
        <img src="https://database.faithfulpack.net/images/website/posts/32x/R2.jpg" alt="yes">
        <img src="https://database.faithfulpack.net/images/website/posts/32x/R1.jpg" alt="yes">
        <img src="https://database.faithfulpack.net/images/website/posts/32x/B20.jpg" alt="yes">
    </Carousel>
{/if}

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