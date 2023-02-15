<script>
    import Fa from "svelte-fa/src/fa.svelte";
	import {
		faAngleRight
	} from "@fortawesome/free-solid-svg-icons";
</script>

<div class="section green">
    <div>
        <h1>UPSCALING THE LOOK OF MINECRAFT</h1>
        <p>Faithful aims to re-create Minecraft's original textures at higher resolutions, while staying true to their original look and feel.</p>
        <a class="button" href="https://docs.faithfulpack.net/pages/textures/contributor-handbook" target="_blank" rel="noreferrer">HOW TO CONTRIBUTE<Fa icon={faAngleRight} /></a>
    </div>
    <img src="/images/about/1.png" alt="placeholder">
</div>
<div class="section">
    <img src="/images/about/2.png" alt="placeholder">
    <div>
        <h1>FREE AND OPEN-SOURCE</h1>
        <p>
            All our textures, as well as the code of all our related projects, are available on GitHub.
            <br>
            Anybody's welcome to contribute, take a look!
        </p>
        <a class="button button-theme" href="https://github.com/Faithful-Resource-Pack" target="_blank" rel="noreferrer">VISIT OUR GITHUB<Fa icon={faAngleRight} /></a>
    </div>
</div>
<div class="section blue">
    <div>
        <h1>CROSS-PLATFORM</h1>
        <p>Faithful is available for many Java Edition versions as well as Bedrock Edition. This means it can be used on all devices that support manual installation of resource packs.</p>
        <a class="button" href="/installation">HOW TO INSTALL<Fa icon={faAngleRight} /></a>
    </div>
    <img src="/images/about/3.png" alt="placeholder">
</div>
<div class="section">
    <img src="/images/about/2.png" alt="placeholder">
    <div>
        <h1>MADE BY THE COMMUNITY</h1>
        <p>The project is made possible entirely by talented volunteer artists and developers working in their free time. Faithful is all about the fans – Come talk to us and get involved!</p>
        <a class="button button-theme" href="https://discord.gg/sN9YRQbBv7" target="_blank" rel="noreferrer">JOIN OUR DISCORD<Fa icon={faAngleRight} /></a>
    </div>
</div>
<div class="section pink">
    <div>
        <h1>A HISTORY OF SOMETHING</h1>
        <p>[placeholder title] We've got an over-a-decade-long history of making quality textures for Minecraft. Being one of the first ever texture packs to be developed, Faithful has secured its place among the most well-known Minecraft projects.</p>
        <a class="button" href="/history">READ MORE<Fa icon={faAngleRight} /></a>
    </div>
    <img src="/images/about/4.png" alt="placeholder">
</div>
<div class="faq">
    <h1>ANY MORE QUESTIONS?</h1>
    <a class="button button-theme" href="/faq">VIEW FAQ<Fa icon={faAngleRight} /></a>
</div>

<style lang="scss">
    .section {
        padding: 30px 20%;
        display: flex;
        align-items: center;
        gap: 40px;

        p {
            margin-bottom: 34px;
        }
    }

    .faq {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 80px;
        // Only padding 30px and not 80px because the body already has a padding of 50px at the bottom
        padding-bottom: 30px;

        h1 {
            margin-top: 0;
            text-align: center;
        }
    }

    .button {
            background: #fff;
            font-size: 1.1rem;
            font-weight: 600;
            padding: 12px 22px;
            border-radius: $border-radius;
        }

    .green {
        background: #76c944 url("/images/background/bg_light_foreground.png") repeat;
        background-blend-mode: multiply;

        h1, p {
            color: #fff;
        }

        .button {
            color: #76c944;
        }
    }

    .blue {
        background: #3498db url("/images/background/bg_light_foreground.png") repeat;
	    background-blend-mode: multiply;
        height: 460px;

        div {
            z-index: 1;
            width: 40%;
        }

        h1, p {
            color: #fff;
        }

        img {
            height: 400px;
            position: absolute;
            right: 140px;
        }

        .button {
            color: #3498db;
        }
    }

    .pink {
        background: #ac1e63 url("/images/background/bg_light_foreground.png") repeat;
        background-blend-mode: multiply;

        h1, p {
            color: #fff;
        }

        .button {
            color: #ac1e63;
        }
    }

    @media (max-width: 1820px) {
	    .blue img {
            right: 30px;
        }
    }

    @media (max-width: $width-L) {
	    .section {
	    	padding: 30px 30px;
	    }

        .blue img {
            width: 100%;
            height: auto;
            left: 0;
            right: 0;
            padding: 0 30px;
        }
    }

    @media (max-width: $width-M) {
	    .section {
	    	flex-wrap: wrap;
            justify-content: center;

            div {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
	    }

        .blue {
            height: auto;

            div {
                width: 100%;
            }

            img {
                position: static;
                width: 100%;
                height: auto;
            }
        }
    }
</style>