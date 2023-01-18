import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ((pageLoad) => {
    // https://kit.svelte.dev/docs/load#using-url-data
    let params: URLSearchParams = pageLoad.url.searchParams;

    const PARAMS_DEFAULT = [
        ['pack', 'faithful_32x'],
        ['edition', 'java'],
        ['version', 'latest'],
        ['tag', 'all']
    ]

    let changed = false
    PARAMS_DEFAULT.forEach(def => {
        let val = params.get(def[0])
        if(!val) {
            val = def[1]
            changed = true
        }
        params.set(def[0], val)
    });

    // hash not accessible
    const absoluteURL = pageLoad.url.pathname + pageLoad.url.search;

    if(changed) {
        throw redirect(301, absoluteURL)
    }

    return {
        pack: params.get('pack') || 'faithful_32x',
        edition: params.get('edition') || 'java',
        version: params.get('version') || 'latest',
        tag: params.get('tag') || 'all',
        show: params.get('show'),
        title: 'Gallery'
    }
});
