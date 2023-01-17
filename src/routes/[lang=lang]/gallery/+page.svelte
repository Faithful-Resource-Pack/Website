<script lang="ts">
// [pack][x+2f][edition][x+2f][version][x+2f][tags]
import { afterUpdate, onMount, tick } from 'svelte';
import { derived } from 'svelte/store';

import UrlStore from '$stores/UrlStore';
import { settings } from '$stores/SettingStore';
import { gallerySearch, galleryRowItems } from '$stores/GalleryStore';

import Checkbox from '$components/common/checkbox.svelte';
import Input from '$components/common/input.svelte';
import GallerySelect from '$components/gallery/gallerySelect.svelte';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Slider from '@smui/slider';
import { Image } from '@smui/image-list';

let text_title_gallery = 'Gallery';

let options = derived(settings, (s) => {
    if(!s) return null

    return Object.entries<string[]>({
        packs: ["original_16x", "faithful_32x", "faithful_64x"],
        tags: ['all', ...s.tags],
        versions: s.versions.java.map((e: string) => e.toLowerCase()),
        editions: s.editions.map((e: string) => e.toLowerCase()),
    })
    .map(([key, values]) => ({
        name: key.slice(0,-1), // TODO: use name to replace with i18n
        param: key.slice(0,-1),
        items: values,
        items_labels: values.map((v) => v) // TODO: use i18n inside map
    }))
})

onMount(() => {
    UrlStore.subscribe((e) => {
        if(e === null) return;
        gallerySearch.update();
        tick()
        .then(() => {
            search()
        })
    })
})

let placeholder_search = 'Search texture name';
let text_max_items_per_row = 'Max items per row';
let text_full_width_view = 'Full width view'; // TODO: i18n
let label_full_width_view = 'Show gallery with full width'; // TODO: i18n
let text_gallery_search = 'Search';

$: result_class = $gallerySearch.full_width ? 'full_width' : 'container';

// TODO: temporary, remove when unused
const PACK_TO_RES: Record<string, string> = {
    'original_16x': '16x',
    'faithful_32x': '32x',
    'faithful_64x': '64x'
}

let results: any = undefined;

function search() {
    let params = gallerySearch.getAllParams();
    let params_obj = [...params.entries()].reduce((acc, cur) => {
        acc[cur[0]] = cur[1]
        return acc
    }, {} as Record<string, string>);
    params_obj.res = PACK_TO_RES[params_obj.pack];
    let { res, edition, version, tag } = params_obj;

    if(version === 'latest') version = $settings.versions[edition][0];
    
    let url = `https://api.faithfulpack.net/v2/gallery/${res}/${edition}/${version}/${tag}`;
    if($gallerySearch.search_text) {
        url += `?search=${$gallerySearch.search_text}`
    }

    fetch(url)
    .then(res => {
        console.log(res)
        return res.json()
    })
    .then(json => {
        results = json;
    })
}

let result_el: HTMLElement;
let gap: number;
let column_number: number;

// TODO: use
let font_size_not_done = {
    id: '16px',
    name: '16px',
    message: '16px',
}

afterUpdate(() => {
    let base_columns = $gallerySearch.items_per_row;

    // TODO: responsive
    /* if (breakpoints.smAndDown) {
        base_columns = breakpoints.smOnly ? 2 : 1;
    } */

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
})

let text_not_done = "Texture is missing or blacklisted!";

$: styles_gallery_result = `gap: ${gap}px; grid-template-columns: repeat(${column_number}, 1fr);`
$: styles_gallery_text = Object.entries(font_size_not_done).map(([c, e]) => `--not-done-${c}: ${e}; `).join(' ')
$: styles_gallery = styles_gallery_result + ' ' + styles_gallery_text;
</script>

<h1 class="title text-center">{ text_title_gallery }</h1>

<div class="container">
    <div class="card card-body" id="search-card" bind:this={result_el}>
        {#if $options === null}
            <div>Loading settings...</div>
        {:else}
            <div id="options">
                {#each $options as option}
                    <GallerySelect {...option} />
                {/each}
                <div class="last-fields">
                    <div class="small-name">{text_max_items_per_row}</div>
                    <div id="row-slider">
                        <div>
                            <Slider
                                bind:value={$gallerySearch.items_per_row}
                                {...$galleryRowItems}
                                step={1}
                                style="--mdc-theme-primary: white; --mdc-theme-on-primary: white"
                                discrete
                                tickMarks
                                input$aria-label={text_max_items_per_row}
                            />
                        </div>
                        <div>{$gallerySearch.items_per_row}</div>
                    </div>
                </div>
                <div class="last-fields">
                    <div class="small-name">{text_full_width_view}</div>
                    <div id="full-width-checkbox">
                        <Checkbox
                            value={$gallerySearch.full_width}
                            on:change={gallerySearch.toggleFullWidth}
                            label={label_full_width_view} />
                    </div>
                </div>
            </div>
            <div>
                <div class="small-name">{text_gallery_search}</div>
                <Input
                    bind:value={$gallerySearch.search_text}
                    placeholder={placeholder_search} clearable
                    appendIcon={$gallerySearch.search_text ? faMagnifyingGlass: undefined}
                    on:clear={search} on:append={search}
                />
            </div>
        {/if}
    </div> 
</div>
<div id="results" class={result_class} style={styles_gallery}>
    {#if results === undefined}
        <p>No search started</p>
    {:else if results.length === 0}
        <p>No results</p>
    {:else}
        {#each results as texture}
            <div class="gallery-result">
                <!-- @ts-ignore -->
                <img
                    src={texture.url}
                    alt={texture.name}
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'; this.parentElement.style.background='rgba(0,0,0,0.3)';this.parentElement.classList.add('rounded')"
                />
                <div class="not-done" style="display: none;">
                    <h1 class="not-done-id">#{ texture.textureID }</h1>
                    <h3 class="not-done-name">{ texture.name }</h3>
                    <p class="not-done-message">{ text_not_done }</p>
                </div>
            </div>
        {/each}
    {/if}
</div>

<style lang="scss">
    #search-card {
        overflow: visible;

        #options {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            align-items: center;
            gap: $small-spacing;

            :global( > *) {
                flex: 1 0 calc(33% - 2*$small-spacing);
            }
            margin-bottom: $small-spacing;
        }
        
        :global(.small-name) {
            font-size: small;
            text-transform: uppercase;
            margin-bottom: 0.5em;
        }

        #row-slider {
            display: flex;
            align-items: center;
            &>div:first-child {
                :global( > *) {
                    margin-top: -3px;
                    margin-bottom: -3px;
                }
                flex-grow: 1;
            }
            & > div + div {
                text-align: center;
                width: 24px;
                margin-right: 24px;
                font-weight: 600;
            }
        }

        #full-width-checkbox {
            height: 42px;
            display: flex;
            align-items: center;
        }
    }

    :global(.full_width) {
        padding: 0 $small-spacing;
    }
    
    #results {
        margin-top: $small-spacing;
        transition: all 2s ease;
        display: grid;
        gap: 16px;
        min-height: 0;  /* NEW */
        min-width: 0;   /* NEW; needed for Firefox */

        .gallery-result {
            position: relative;
            aspect-ratio: 1/1;
            background-size: cover !important;
            background: url(/transparency-light.png);
            overflow: hidden;  /* NEW */
            min-width: 0;      /* NEW; needed for Firefox */

            :global( > *) {
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
</style>
