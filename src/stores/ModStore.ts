import { readable, derived } from 'svelte/store';

let _dataStore = readable({
    data: undefined,
    error: undefined
} as {
    data: Record<string, any> | undefined,
    error: Error | undefined,
}, (set) => {
    fetch('https://api.faithfulpack.net/v2/mods/raw')
    .then(res => res.json())
    .then((json: Record<string, any>) => {
        set({
            data: json,
            error: undefined
        })
    })
    .catch((err: Error) => {
        console.error(err)
        set({ data: undefined, error: err })
    })
})

const modStore = derived(_dataStore, v => v.data);

const modStoreError = derived(_dataStore, v => v.error);


const modStatsStore = derived(modStore, mods => {
    if(mods === undefined) return undefined;

    const versionList: string[] = [];
    let resourcePacks = 0;
    let modAmount = 0;

    Object.values(mods).map(e => e.resource_pack.versions).forEach((versions: string[]) => {
        versions.forEach(version => {
            // version sum
            if (!versionList.includes(version)) versionList.push(version);

            // resource pack sum
            ++resourcePacks;
        });
        // mod sum
        ++modAmount;
    });

    return {
        minecraftVersions: versionList.length,
        resourcePackStored: resourcePacks,
        modsSupported: modAmount,
    };
});

export default modStore;
export { modStore, modStoreError, modStatsStore };
