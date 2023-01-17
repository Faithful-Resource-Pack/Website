import { derived } from 'svelte/store';
import { createJSONStore } from '$lib/createStore';
import { readable } from 'svelte/store';

const ROW_MIN = 1;
const ROW_MAX = 16;

export let galleryRowItems = readable({ min: ROW_MIN, max: ROW_MAX });

export let gallerySearch = createJSONStore('GALLERY_SEARCH', {
    items_per_row: 7,
    search_text: '',
    full_width: false
}, (store) => {
    const { subscribe, set, update } = store;

    update((gallery) => ({...gallery, items_per_row: Math.max(Math.min(gallery.items_per_row, ROW_MAX), ROW_MIN) }));

    return {
        set: function(val: any) {
            console.log('set')
            set(val)
        },
        subscribe,
        toggleFullWidth: function() {
            store.update(g => ({...g, full_width: !g.full_width}));
        },
        setItemsPerRow: function(n: number) {
            if(n < ROW_MIN || n > ROW_MAX) return;
            store.update(g => ({...g, items_per_row: n}));
        },
        setSearchText: function(value: string) {
            store.update(g => ({...g, search_text: value }));
        },
        setParam: function(param: string, value: string) {
            if(!location) return;
            let url = new URL(location.href);
            url.searchParams.set(param, value);
            
            const nextURL = url.href;

            if(location.href !== nextURL)
            {
                if('pushState' in window.history)
                {
                    window.history.pushState({},"",
                    nextURL);
                } else {
                    location.replace(nextURL);
                }
                store.update(s => s);
            }
        },
        update: function() { store.update(s => s) },
        getParam: function(param: string) {
            if(!location) return null;
            return new URL(location.href).searchParams.get(param);
        },
        getAllParams: function() {
            return new URL(location.href).searchParams;
        }
    };
})