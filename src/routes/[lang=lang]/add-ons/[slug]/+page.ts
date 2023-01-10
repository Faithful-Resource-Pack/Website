import { error } from '@sveltejs/kit';
 
/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
    const addonRes = await fetch(`https://api.faithfulpack.net/v2/addons/${params.slug}`)
    const addonData = await addonRes.json()

    if (addonData.name == "NotFound")
        throw error(404, 'Not found');

    const fileRes = await fetch(`https://api.faithfulpack.net/v2/addons/${params.slug}/files/downloads`)
    const fileData = await fileRes.json()

    return {
        title: addonData.name,
        slug: addonData.slug,
        description: addonData.description,
        information: addonData.options,
        downloads: fileData
    };
}