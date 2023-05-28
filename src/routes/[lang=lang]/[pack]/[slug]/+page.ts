export const load = async function({ params }) {
    // Why do I need to encode things twice? No clue
    let permalink = encodeURIComponent(`/${params.pack}/${encodeURIComponent(params.slug)}`)

    if (params.slug === "latest") {
        const postRes = await fetch("https://api.faithfulpack.net/v2/posts")
        .catch((err) => { console.error('postData', err); throw err;})
        const postData = await postRes.json();

        for (const [key, pack] of Object.entries(postData).reverse()) {
            if (pack.permalink.startsWith(`/${params.pack}/`)) {
                return {
                    id: pack.id,
                    title: pack.title,
                    permalink: pack.permalink,
                    date: pack.date,
                    headerImg: pack.headerImg,
                    description: pack.description,
                    downloads: pack.downloads,
                    changelog: pack.changelog,
                    discontinued: pack.discontinued
                };
            }
         }
    }

    const postRes = await fetch(`https://api.faithfulpack.net/v2/posts/bypermalink?permalink=${permalink}`)
    .catch((err) => { console.error('postData', err); throw err;})
    const postData = await postRes.json();

    return {
        id: postData.id,
        title: postData.title,
        permalink: postData.permalink,
        date: postData.date,
        headerImg: postData.headerImg,
        description: postData.description,
        downloads: postData.downloads,
        changelog: postData.changelog,
        discontinued: postData.discontinued
    };
}