<script lang="ts">
// [pack][x+2f][edition][x+2f][version][x+2f][tags]
import { onMount, tick } from 'svelte';

import UrlStore from '$stores/UrlStore';
import { settings } from '$stores/SettingStore';
import { gallerySearch } from '$stores/GalleryStore';
import GalleryOptions from '$components/gallery/galleryOptions.svelte';
import Fa from "svelte-fa/src/fa.svelte";
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import GalleryTooltip from '$components/gallery/galleryTooltip.svelte';

onMount(() => {
    UrlStore.subscribe((e) => {
        if(e === null) return;
        gallerySearch.update();
    })

    settings.subscribe((s) => {
        if(s === null) return;

        // first search
        tick() // leave a tick by safety
        .then(() => {
            search('first search')
        })
    })
})

$: result_class = $gallerySearch.full_width ? 'full_width' : 'container';

// TODO: temporary, remove when unused
const PACK_TO_RES: Record<string, string> = {
    'original_16x': '16x',
    'faithful_32x': '32x',
    'faithful_64x': '64x'
}

let result_el: HTMLElement;

let results: any = undefined;

function search(_origin?: string) {
    if($settings === null) return;
    let params = gallerySearch.getAllParams();
    let params_obj = [...params.entries()].reduce((acc, cur) => {
        acc[cur[0]] = cur[1]
        return acc
    }, {} as Record<string, string>);
    params_obj.res = PACK_TO_RES[params_obj.pack];
    let { res, edition, version, tag } = params_obj;

    if(edition === 'first') edition = $settings.packs[params_obj.pack].editions[0];
    if(version === 'latest') version = $settings.versions[edition][0];

    let url = `https://api.faithfulpack.net/v2/gallery/${res}/${edition}/${version}/${tag}`;

    if($gallerySearch.search_text) {
        url += `?search=${$gallerySearch.search_text}`
    }

    window.fetch(url)
    .then(res => {
        return res.json()
    })
    .then(json => {
        results = json;
    })
}

let gap: number;
let column_number: number = 0;

let font_size_not_done = {
    id: '16px',
    name: '16px',
    message: '16px',
}

function compute_grid() {
    if(result_el === null) return;
    let base_columns = $gallerySearch.items_per_row;

    // constants
    const MIN_WIDTH = 110;
    const MARGIN = 20; // .container padding (12px) + .v-list.main-container padding (8px)

    // real content width
    const width = result_el.clientWidth - MARGIN * 2;

    if (base_columns != 1) {
        // * We want to solve n * MIN_WIDTH + (n - 1) * A = width
        // * where A = 200 / (1.5 * n)
        // * => n * MIN_WIDTH + ((n*200)/(1.5*n)) - 1*200/(1.5*n) = width
        // * => n * MIN_WIDTH + 200/1.5 - 200/(1.5*n) = width
        // * multiply by n
        // * => n² * MIN_WIDTH + 200n/1.5 - 200/1.5 = width*n
        // * => n² * MIN_WITH + n * (200/1.5 - width) - 200/1.5 = 0
        // * solve that and keep positive value
        let a = MIN_WIDTH;
        let b = 200 / 1.5 - width;
        let c = -200 / 1.5;
        let delta = b * b - 4 * a * c;
        let n = (-b + Math.sqrt(delta)) / (2 * a);
        gap = 200 / (n * 1.5);
        column_number = Math.min(base_columns, Math.floor(n));
    } else {
        gap = 8;
        column_number = 1;
    }

    const font_size = width / column_number / 20;

    font_size_not_done = {
        id: `${font_size * 4}px`,
        name: `${font_size * 2}px`,
        message: `${font_size * 1.2}px`,
    };
}

let scrolled = 0;
let bottom_element: HTMLElement;
onMount(() => {
    UrlStore.subscribe(() => {
        search("url changed");
    })

    window.onresize = () => {
        tick().then(() => {
            compute_grid();
        });
    }

    gallerySearch.subscribe(() => {
        tick().then(() => {
            compute_grid();
        });
    })

    window.onscroll = () => {
        scrolled = window.scrollY;

        if(bottom_element && isScrolledIntoView(bottom_element, 600)) {
          blocks_displayed++;
        }
    }

    compute_grid();
})

let text_title_gallery = 'Gallery';
let text_not_done = "Texture is missing or blacklisted!";

const lines_per_block = 5;
$: results_per_block = column_number * lines_per_block;
let blocks_displayed = 1;
$: results_displayed = results_per_block * blocks_displayed;
$: sliced_results = results ? results.slice(0,results_displayed) : undefined;

$: styles_gallery_result = `gap: ${gap}px; grid-template-columns: repeat(${column_number}, 1fr);`
$: styles_gallery_text = Object.entries(font_size_not_done).map(([c, e]) => `--not-done-${c}: ${e}; `).join(' ')
$: styles_gallery = styles_gallery_result + ' ' + styles_gallery_text;

function handleImageError(e: Event) {
    let target = e.target as HTMLImageElement;
    target.style.display='none';
    let next = target.nextElementSibling as HTMLElement | null;
    if(next) next.style.display='flex';
    let parent = target.parentElement as HTMLElement | null;
    if(parent) {
        parent.style.background='rgba(0,0,0,0.3)';
    }
}

function handleImageLoaded(e: Event) {
    let target = e.target as HTMLImageElement;
    target.style.display='inherit';
    let next = target.nextElementSibling as HTMLElement | null;
    if(next) next.style.display='none';
    let parent = target.parentElement as HTMLElement | null;
    if(parent) {
        parent.style.background='inherit';
    }
}

function go_up() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

function isScrolledIntoView(el: HTMLElement, margin: number = 0) {
    let rect = el.getBoundingClientRect();
    let elemTop = rect.top;
    let elemBottom = rect.bottom;

    let isVisible = elemTop < window.innerHeight + margin && elemBottom >= 0;
    return isVisible;
}
</script>

<h1 class="title text-center bold">{ text_title_gallery }</h1>

<GalleryOptions on:search={() => search()} />

<div id="results" class={result_class} style={styles_gallery} bind:this={result_el}>
    {#if !results}
        <p>No search started</p>
    {:else if results.length === 0}
        <p>No results</p>
    {:else}
        {#each sliced_results as texture}
            <div class="gallery-result">
                <div class="content tooltip-target">
                    <img
                        src={texture.url}
                        alt={texture.name}
                        on:load={handleImageLoaded}
                        on:error={handleImageError}
                    />
                    <div class="not-done" style="display: none;">
                        <h1 class="not-done-id">#{ texture.textureID }</h1>
                        <h3 class="not-done-name">{ texture.name }</h3>
                        <p class="not-done-message">{ text_not_done }</p>
                    </div>
                </div>

                <GalleryTooltip {texture} />
            </div>
        {/each}
    {/if}
    <div class="bottomElement" bind:this={bottom_element}></div>
</div>

<div id="uparrow" class={scrolled > 300 ? 'show' : ''} on:click={go_up} on:keypress={() => {}}>
    <Fa icon={faArrowUp} size="lg"/>
</div>

<style lang="scss">
    :global(.full_width) {
        padding: 0 $small-spacing;
    }

    #results {
        margin-top: $small-spacing;
        display: grid;
        gap: 16px;
        min-height: 0;  /* NEW */
        min-width: 0;   /* NEW; needed for Firefox */

        .gallery-result {
            position: relative;
            aspect-ratio: 1/1;
            background-size: cover !important;
            overflow: hidden;  /* NEW */
            min-width: 0;      /* NEW; needed for Firefox */

            .content, .content:global( > *) {
                aspect-ratio: 1/1;
                position: absolute;
                height: 100%;
                width: 100%;
                object-fit: contain;
                image-rendering: pixelated;
            }

            .not-done {
                padding: 0.25rem;
                text-align: center;
                aspect-ratio: 1;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                > * {
                    margin: 0;
                }

                .not-done-id {
                    font-size: var(--not-done-id);
                }

                .not-done-name {
                    font-size: var(--not-done-name);
                }

                .not-done-message {
                    font-size: var(--not-done-message);
                }
            }
        }
    }

    @media (max-width: $width-S) {
        #results {
            grid-template-columns: repeat(2, 1fr) !important;
        }
    }

    @media (max-width: $width-XS) {
        #results {
            grid-template-columns: repeat(1, 1fr) !important;
        }
    }

    #uparrow {
        position: fixed;
        color: white;
        bottom: 64px;
        right: 64px;
        z-index: 202;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        opacity: 0;
        transform: scale(0);
        transition: opacity .3s ease, background .3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover {
            background: rgba(255,255,255,0.3);
        }

        &:global(.show) {
            transform: scale(1);
            opacity: 1;
        }
    }

    :global(html.light) #uparrow {
        background: white;
        color: grey;
    }
</style>
