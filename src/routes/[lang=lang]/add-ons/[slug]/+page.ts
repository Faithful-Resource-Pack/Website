import { error } from '@sveltejs/kit';
import { shortMd, parseMd } from '$lib/shortMd';

import type { PageLoad } from './$types';

export const load: PageLoad = async function({ fetch, params }) {
    const addonRes = await fetch(`https://api.faithfulpack.net/v2/addons/${params.slug}`)
    .catch((err) => { console.error('addonData', err); throw err;})
    const addonData = await addonRes.json();

    if (addonData.name == "NotFound")
        throw error(404, 'Not found');

    const fileRes = await fetch(`https://api.faithfulpack.net/v2/addons/${params.slug}/files/downloads`)
    .catch((err) => { console.error('downloads', err); throw err;})
    const fileData = await fileRes.json()

    const headerRes = await fetch(`https://api.faithfulpack.net/v2/addons/${params.slug}/files/header`)
    .catch((err) => { console.error('header', err); throw err;})
    const header = await headerRes.json()

    const AuthorRes = await fetch(`https://api.faithfulpack.net/v2/addons/${params.slug}/authors`)
    .catch((err) => { console.error('authors', err); throw err;})
    const AuthorData = await AuthorRes.json()

    const screenRes = await fetch(`https://api.faithfulpack.net/v2/addons/${params.slug}/files/screenshots`)
    .catch((err) => { console.error('screenshots', err); throw err;})
    const screenData = await screenRes.json()
    
    const desc_md = parseMd(addonData.description)
    //@ts-ignore
    let short: string | undefined = addonData.short_description
    if(short === undefined)
    {
        short = shortMd(addonData.description)
    }

    return {
        id: addonData.id,
        title: `Addon: ${addonData.name}`,
        name: addonData.name,
        slug: addonData.slug,
        image: header,
        embed_description: short,
        description: desc_md,
        information: addonData.options,
        lastUpdated: addonData.last_updated,
        downloads: fileData,
        authors: AuthorData,
        screenshots: screenData,
    };
}
