import { derived, readable } from "svelte/store";

let settingsStore = readable<{
    loading: boolean,
    loaded: boolean,
    data: any
}>({ loading: true, loaded: false, data: undefined}, (set) => {
    Promise.all([
        fetch('https://api.faithfulpack.net/v2/settings/raw'),
        fetch('https://api.faithfulpack.net/v2/textures/tags'),
    ])
    .then(([set, res]) => Promise.all([set.json(), res.json()]))
    .then(([settings, tags]) => {
        settings.tags = tags
        set({ loading: false, loaded: true, data: settings })
    })
    .catch(err => console.error("Failed to load settings", err))

    return () => {}
})

export let loadingSettings = derived(settingsStore, store => store.loading)
export let settings = derived(settingsStore, s => (s.loaded ? s.data : null))
