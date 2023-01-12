import { error } from '@sveltejs/kit';
import { parse } from 'marked';
 
/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
    const addonRes = await fetch(`https://api.faithfulpack.net/v2/addons/${params.slug}`)
    const addonData = await addonRes.json()

    if (addonData.name == "NotFound")
        throw error(404, 'Not found');

    const fileRes = await fetch(`https://api.faithfulpack.net/v2/addons/${params.slug}/files/downloads`)
    const fileData = await fileRes.json()

    const headerRes = await fetch(`https://api.faithfulpack.net/v2/addons/${params.slug}/files/header`)
    const header = await headerRes.json()

    return {
        title: `Addon: ${addonData.name}`,
        name: addonData.name,
        slug: addonData.slug,
        image: header,
        description: await parse(addonData.description),
        information: addonData.options,
        downloads: fileData
    };
}