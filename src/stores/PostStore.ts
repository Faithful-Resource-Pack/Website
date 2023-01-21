import { toCamel } from '$lib/utils';
import { derived, readable } from 'svelte/store';

interface Post {
    name: string,
    title: string,
    permalink: string,
    headerImage: string,
};

let _posts = readable({
    data: undefined,
    error: undefined
} as {
    data: Record<string, Post> | undefined,
    error: Error | undefined,
}, (set) => {
    fetch('https://faithfulpack.net/posts.json')
    .then(res => res.json())
    .then((json: Record<string, any>) => {
        let modified = Object.entries(json)
        .map(([post_name, post]) => {

            let uppercased = Object.entries(post)
            .map(([post_prop, post_val]: [string, any]) => 
                ([toCamel(post_prop), post_val] as [string, any]) // pair with camel case key
            )
            .reduce((upper_post, [post_prop, post_val]) => {
                upper_post[post_prop] = post_val;
                return upper_post;
            }, {} as Record<string, any>);

            return [post_name, uppercased] as [string, any];
        }).reduce((acc: Record<string, Post>, [key, val]) => {
            acc[key] = val;
            return acc;
        }, {} as Record<string, Post>)

        console.log(modified)

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

export default postStore;
export { postStore, postStoreError, postListStore };