import { parseMdList, type ListItem } from '$lib/shortMd';
import { toCamel } from '$lib/utils';
import { derived, readable } from 'svelte/store';

type PostAuthor = {
    first: string,
    second: string
} | string

interface Post {
    name: string,
    title: string,
    permalink: string,
    headerImg: string,
    downloads: Record<string, [string, string][]>,
    download: string,
    mainChangelog: string,
    changelog?: ListItem[],
    expandedChangelog?: boolean,
    singleChangelog?: boolean,
    discontinued?: boolean,
    longText: string,
    authors: PostAuthor[] | undefined
};

const readPosts = function() {
    return fetch('https://faithfulpack.net/posts.json')
    .then(res => res.json())
    .then((json: Record<string, any>) => {
        const modified = Object.entries(json)
        .map(([post_name, post]) => {

            let uppercased = Object.entries(post)
            .map(([post_prop, post_val]: [string, any]) =>
                // map post props to camelCase
                ([toCamel(post_prop), post_val] as [string, any]) // pair with camel case key
            )
            .reduce((upper_post, [post_prop, post_val]) => {
                // recreate post object 
                upper_post[post_prop] = post_val;
                upper_post[post_prop] = treatBoolean(upper_post[post_prop])
                upper_post[post_prop] = treatDownloads(post_prop, upper_post[post_prop])
                upper_post[post_prop] = treatChangelog(post_prop, upper_post[post_prop])
                return upper_post;
            }, {} as Record<string, any>);

            // return pair with post name and camelCase post
            return [post_name, uppercased] as [string, any];
        }).reduce((acc: Record<string, Post>, [key, val]) => {
            // reduce posts as { [name]: Post }
            acc[key] = val;
            return acc;
        }, {} as Record<string, Post>)

        return modified
    })
}

const readPostsByPermalink = function()
{
    return readPosts()
        .then(posts => {
            return Object.entries(posts)
            .map(([name, post]) => {
                const strippedPermalink = post.permalink.replace(/\//, '')
                return [[name, post],[strippedPermalink, post]] as [[string, Post],[string, Post]]
            }).flat()
            .reduce<Record<string, Post>>(
                (acc, [permalink, post]) => ({...acc, [permalink]: post }), {}
            )
        })
}

let _posts = readable({
    data: undefined,
    error: undefined
} as {
    data: Record<string, Post> | undefined,
    error: Error | undefined,
}, (set) => {
    readPosts()
    .then((modified) => {
        set({
            data: modified,
            error: undefined
        })
    })
    .catch((err: Error) => {
        console.error(err)
        set({ data: undefined, error: err })
    })
})

const postStore = derived(_posts, v => v.data);
const postListStore = derived(postStore, v => {
    if(v === undefined) return undefined

    let as_array = Object.values(v);
    as_array.sort((a, b) => {
        if(b.name > a.name) {
            return 1;
        }
        if (b.name < a.name) {
            return -1;
        }
        return 0;
    });

    return as_array;
});
const postStoreError = derived(_posts, v => v.error);

function countOffset(line: string): number {
    let count = 0
    while (/\s|-/.test(line[count])) {
        count++
    }
    return count
}

function treatDownloads(property: string, value: string): Record<string, [string, string]> | any {
    if(property !== 'downloads' && property != 'download') return value

    const lines = value.split('\n')
    const recordList: [string, [string, string][]][] = []
    let lastIdent = Infinity, ident
    for(let linenumber in lines) {
        const line = lines[linenumber].trimEnd()
        ident = countOffset(line)
        if(ident < lastIdent) recordList.push([line.replace(/^(-|\s)+/, '').replace(/:$/, ''), []])
        else if(recordList.length > 0)
            recordList[recordList.length-1][1].push(line.split(': ') as [string, string])
        lastIdent = ident
    }

    return recordList.reduce((occ, [key, val]) => ({...occ, [key]: val}), {})
}

function treatChangelog(property: string, value: string): ListItem[] | string {
    if(property !== 'changelog') return value;
    return parseMdList(value);
}

function treatBoolean(value: string): boolean | string {
    let lower = value.trim().toLowerCase()
    if(lower === 'true' || lower === 'false') return lower === 'true'

    return value
}

function loadChangelog(permalink: string) {
    return fetch("https://faithfulpack.net/"+permalink)
        .then((response) => {
            return response.text();
        });
}

export default postStore;
export {
    postStore, postStoreError, postListStore,
    readPosts, readPostsByPermalink, loadChangelog
};
