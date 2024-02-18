<script>
    import Fa from "svelte-fa";
	import {
		faAngleRight
	} from "@fortawesome/free-solid-svg-icons";
</script>

<div class="section green">
    <div>
        <h1 class="normal">UPSCALING THE LOOK OF MINECRAFT</h1>
        <p>
            Faithful aims to re-create Minecraft's original textures in higher resolutions, while staying true to their original look and feel.
            <br><br>
            With multiple resolutions and styles, everyone can find a pack they like!
        </p>
        <a class="button button-theme" href="https://discord.gg/sN9YRQbBv7" target="_blank" rel="noreferrer">JOIN OUR DISCORD<Fa icon={faAngleRight} /></a>
    </div>
    <img src="/images/about/1.png" alt="placeholder">
</div>
<div class="section">
    <img src="/images/about/2.png" alt="placeholder">
    <div>
        <h1 class="normal">FREE AND OPEN-SOURCE</h1>
        <p>
            As a community-run pack, all our textures are voted on before being added, and we prioritise community feedback above all.
            <br><br>
            All our textures, as well as the code of all our related projects, are available on GitHub. Take a look and see how the magic happens!
        </p>
        <a class="button button-theme" href="https://github.com/Faithful-Resource-Pack" target="_blank" rel="noreferrer">VISIT OUR GITHUB<Fa icon={faAngleRight} /></a>
    </div>
</div>
<div class="section blue">
    <div>
        <h1 class="normal">CROSS-PLATFORM</h1>
        <p>
            Faithful is available for both the most popular Java Edition versions as well as Bedrock Edition.
            <br><br>
            This means it can be used on all devices that support manual installation of resource packs, from phones to even certain consoles.
        </p>
        <a class="button" href="/installation">HOW TO INSTALL<Fa icon={faAngleRight} /></a>
    </div>
    <img src="/images/about/3.png" alt="placeholder">
</div>
<div class="section">
    <img src="/images/about/2.png" alt="placeholder">
    <div>
        <h1 class="normal">MADE BY THE COMMUNITY</h1>
        <p>
            The project is made possible entirely by talented volunteer artists and developers working in their free time.
            <br><br>
            Simply read our contribution handbook and follow the steps — it's that easy to make your mark on Faithful forever!
        </p>
        <a class="button" href="https://docs.faithfulpack.net/pages/manuals/contributor-handbook" target="_blank" rel="noreferrer">HOW TO CONTRIBUTE<Fa icon={faAngleRight} /></a>
    </div>
</div>
<div class="section pink">
    <div>
        <h1 class="normal">A HISTORY OF EXPERTISE</h1>
        <p>
            We've got over a decade of experience making quality textures for Minecraft, with a rich history spanning from the first posts up to today.
            <br><br>
            Being one of the first ever texture packs to be developed, starting all the way back in 2010, Faithful has secured its place among the most well-known Minecraft projects.
        </p>
        <a class="button" href="/history">READ MORE<Fa icon={faAngleRight} /></a>
    </div>
    <img src="/images/about/4.png" alt="placeholder">
</div>
<div class="faq">
    <h1 class="normal">ANY MORE QUESTIONS?</h1>
    <a class="button button-theme" href="/faq">VIEW OUR FAQ<Fa icon={faAngleRight} /></a>
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
        br {
            margin-bottom: 100px;
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
        background: white;
        color: black;
        font-size: 1.1rem;
        font-weight: 600;
        padding: 12px 22px;
        border-radius: $border-radius;
        transition: all 0.2s ease;
        &:hover {
            opacity: 0.66;
            color: initial;
        }
    }

    .green {
        background: #0d0d0d url("/images/background/bg_light_background.png") repeat;
        background-blend-mode: screen;

        h1 {
            color: #76c944;
        }

        p {
            color: #fff;
        }

        .button {
            background: white !important;
            color: #76c944 !important;
        }
    }

    .blue {
        background: #0d0d0d url("/images/background/bg_light_background.png") repeat;
	    background-blend-mode: screen;
        height: 460px;

        div {
            z-index: 1;
            width: 40%;
        }

        h1 {
            color: #3498db;
        }

        p {
            color: #fff;
        }

        img {
            height: 400px;
            position: absolute;
            right: 140px;
        }

        .button {
            background: white !important;
            color: #3498db !important;
        }
    }

    .pink {
        background: #0d0d0d url("/images/background/bg_light_background.png") repeat;
	    background-blend-mode: screen;

        h1 {
            color: #db5697;
        }

        p {
            color: #fff;
        }

        .button {
            background: white !important;
            color: #ac1e63 !important;
        }
    }

    :global(html.light) {
        .button {
            background: black;
            color: white;
        }

        .green {
            background: #76c944 url("/images/background/bg_light_foreground.png") repeat;
            background-blend-mode: multiply;

            h1 {
                color: #fff;
            }
        }

        .blue {
            background: #3498db url("/images/background/bg_light_foreground.png") repeat;
            background-blend-mode: multiply;

            h1 {
                color: #fff;
            }
        }

        .pink {
            background: #ac1e63 url("/images/background/bg_light_foreground.png") repeat;
            background-blend-mode: multiply;

            h1 {
                color: #fff;
            }
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