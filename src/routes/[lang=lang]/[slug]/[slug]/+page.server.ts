import { shortMd } from '$lib/shortMd';
import { error } from '@sveltejs/kit';
import { readPostsByPermalink, loadChangelog } from "$stores/PostStore";

/** @type {import('./$types').PageServerLoad} */
export function load({ params, url }) {
    return readPostsByPermalink()
    .then(async (posts) => {
        let post_found = posts[`${url.pathname.split("/")[2]}/${params.slug}`]
        if(!post_found) {
            throw error(404, "Post not found")
        }

        let mainChangelogLoaded = undefined
        if(post_found.mainChangelog) {
            mainChangelogLoaded = await loadChangelog(post_found.mainChangelog).catch(() => undefined)
        }
        
        return {
            mainChangelogLoaded,
            title: post_found.title || '',
            post: post_found,
            image: post_found.headerImg,
            embed_description: shortMd(post_found.longText)
        }
    })
    .catch((err) => {
        console.error(err)
        throw err
    })
}