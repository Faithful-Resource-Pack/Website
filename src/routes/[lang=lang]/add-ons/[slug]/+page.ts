import { error } from '@sveltejs/kit';
import { marked } from 'marked';
//@ts-ignore
import TextRenderer from 'kramed-text-renderer';
import DOMPurify from 'isomorphic-dompurify';
import type { PageLoad } from './$types';

export const load: PageLoad = async function({ fetch, params }) {
    const addonRes = await fetch(`https://api.faithfulpack.net/v2/addons/${params.slug}`)
    const addonData = await addonRes.json()

    if (addonData.name == "NotFound")
        throw error(404, 'Not found');

    const fileRes = await fetch(`https://api.faithfulpack.net/v2/addons/${params.slug}/files/downloads`)
    const fileData = await fileRes.json()

    const headerRes = await fetch(`https://api.faithfulpack.net/v2/addons/${params.slug}/files/header`)
    const header = await headerRes.json()

    const AuthorRes = await fetch(`https://api.faithfulpack.net/v2/addons/${params.slug}/authors`)
    const AuthorData = await AuthorRes.json()
    
    const desc_md = DOMPurify.sanitize(await marked.parse(addonData.description))
    //@ts-ignore
    let short: string | undefined = addonData.short_description
    if(short === undefined)
    {
        let renderer = TextRenderer()
        renderer.heading = function() { return '' }
        renderer.listitem = function(text: string) { return `- ${text}\n` }
        renderer.text = function(t: string) { return t }
        marked.use();
        
        const desc_txt = DOMPurify.sanitize(marked.parse(addonData.description, {
            renderer
        })).replace(/\n+ ?/g, ' ').trim()

        short = `${desc_txt.split(' ').reduce(([acc, done]: [string, boolean], cur: string): [string, boolean] => {
            if(!done && acc.length + cur.length + 1 < 158) acc += ' ' + cur
            else done = true
            return [acc, done]
        }, ['', false])[0]}...`.substring(1) // remove first space
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
    };
}
