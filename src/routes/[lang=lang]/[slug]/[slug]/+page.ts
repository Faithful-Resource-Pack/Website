/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
    let permalink = encodeURIComponent(url.pathname.substring(3))

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