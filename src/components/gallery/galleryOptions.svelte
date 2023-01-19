<script lang="ts">
    import { gallerySearch, galleryRowItems, galleryOptionStore } from '$stores/GalleryStore';
    import GallerySelect from '$components/gallery/gallerySelect.svelte';
    import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
    import Slider from '@smui/slider';
    import Checkbox from '$components/common/checkbox.svelte';
    import Input from '$components/common/input.svelte';
    import { derived } from 'svelte/store';
	import { onMount } from 'svelte';
	import { settings } from '$stores/SettingStore';
	import { createEventDispatcher } from 'svelte';
    
	const dispatch = createEventDispatcher();

    let gallery_settings = derived([settings, gallerySearch],  ([$s1, $s2]) => ([$s1, $s2]));
    onMount(() => {
        gallery_settings.subscribe(([vSettings,_]) => {
            galleryOptionStore.update(vSettings)
        })
    })

    let options = derived(galleryOptionStore, (vOptions) => {
        if(vOptions === null) return null;
        
        return vOptions.map((e) => ({
            ...e,
            name: e.param, // TODO: i18n
            items_labels: e.items_labels ? e.items_labels : e.items.map(e => e) // TODO: user e.param and i18n
        }))
    })

    let placeholder_search = 'Search texture name';
    let text_max_items_per_row = 'Max items per row desired';
    let text_full_width_view = 'Full width view'; // TODO: i18n
    let label_full_width_view = 'Show gallery with full width'; // TODO: i18n
    let text_gallery_search = 'Search';

    function emitSearch() {
        dispatch('search');
    }
</script>

<div class="container">
    <div class="card card-body" id="search-card">
        {#if $options !== null}
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
                    on:clear={emitSearch} on:append={emitSearch}
                />
            </div>
        {/if}
    </div> 
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

        @media (max-width: $width-M) {
            #options :global( > *) {
                flex: 1 0 calc(50% - $small-spacing);
            }
        }

        @media (max-width: $width-XS) {
            #options {
                gap: 0.5em;
                margin-bottom: 0.5em;
            }
            #options :global( > *) {
                flex: 1 0 100%;
            }
            #row-slider {
                & > *:first-child:global( > *) {
                    margin-left: 0;
                }
                & > *:last-child {
                    margin-right: 0;
                }
            }
        }
    }

</style>
