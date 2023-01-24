<script lang="ts">
    export let data: any;
    import { onMount } from 'svelte';
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
 </img-comparison-slider>

<style lang="scss">
    .highlight-section {
        display: block;
        background-size: cover;
        background-position: center;
        padding-bottom: 2rem;
        margin-bottom: 2rem;

        .highlight-logotext {
            height: 200px;
        }

        .card {
            width: 30%;
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

        &:focus {
            outline: none;
        }

        img {
            width: 100%;
        }
    }
</style>