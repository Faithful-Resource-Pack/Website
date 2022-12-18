import { createJSONStore } from "$lib/createStore";
import { toggleInArray, toggleMin } from "$lib/utils";
import type { Addon } from "src/interfaces/addons";
import { writable, derived, type Writable } from "svelte/store";

export let addonStore: Writable<Array<Addon>|undefined> = writable(undefined);

export let loadingStore = derived(addonStore, aS => aS === undefined);

export let favoriteStore = createJSONStore('ADDON_FAVORITES', {
    favorites: []
} as App.FavoriteAddonStore, writable => {
    const { subscribe, update } = writable;

    return {
        subscribe,
        toggle: (addon_id: string) => {
            update(v => ({
                favorites: toggleInArray(v.favorites, addon_id)
            }))
        }
    };
})

export const CheckboxTypesValues = [
	"editions",
	"resolutions"
] as const;
export type CheckboxType = typeof CheckboxTypesValues[number];

export type CheckboxChoices = {
    [K in CheckboxType]: string[]
}

export const checkboxChoices: CheckboxChoices = {
    editions: ['Java', 'Bedrock'],
    resolutions: ['32x', '64x'],
}

export let searchStore = createJSONStore('ADDON_SEARCH', {
    categories: [],
    ...JSON.parse(JSON.stringify(checkboxChoices)), // deep copy
    search: ''
} as App.SearchAddonStore, writable => {
    const { subscribe, update } = writable;
    return {
        subscribe,
        clearCategories() {
            update(v => {
                v.categories = []
                return v
            })
        },
        clearSearch() {
            update(v => {
                v.search = ''
                return v
            })
        },
        toggleCategory: (category: string) => update(v => ({ ...v, categories:  toggleInArray(v.categories, category) })),
        toggleEdition: (edition: string)   => update(v => ({ ...v, editions:    toggleMin(v.editions, edition) })),
        toggleResolution: (res: string)    => update(v => ({ ...v, resolutions: toggleMin(v.resolutions, res) })),
        setSearch: (search: string)        => update(v => ({ ...v, search }))
    }
})