<script lang="ts">
    export let light = true

    $: cssClass = light ? 'sun' : 'moon'

    const toggle = (event: MouseEvent | KeyboardEvent) => {
        if('code' in event) {
		    let code = event.code
            if(code === '84') {
                light = !light
            }
        } else {
            light = !light
        }
    }

    const preloadImageUrls = [
        'https://api.faithfulpack.net/v2/textures/1238/url/faithful_64x/latest',
        'https://api.faithfulpack.net/v2/textures/1241/url/faithful_64x/latest'
    ]
</script>
{#each preloadImageUrls as image}
    <link rel="preload" as="image" href={image} />
{/each}
<div id="holder" class={cssClass} on:click={toggle} on:keydown={toggle}>
    <div id="container">
        <div class="sun" /><div class="moon" />
    </div>
</div>

<style scoped lang="scss">
    #holder {
        background-color: black;
        overflow: hidden;

        #container {
            transition: margin-left .3s ease;
            width: 64px;
        }

        &.moon #container {
            margin-left: -32px;
        }
    }

    div {
        height: 32px;
        width: 32px;

        #container > div {
            background-position: -48px -48px;
            display: inline-block;
            vertical-align: top;
        }
    }

    .sun {
        background-image: url(https://api.faithfulpack.net/v2/textures/1238/url/faithful_64x/latest);
    }
    .moon {
        background-image: url(https://api.faithfulpack.net/v2/textures/1241/url/faithful_64x/latest);
    }
</style>