import { writable, derived, type Writable } from "svelte/store";

type PostAuthor = {
    first: string,
    second: string
} | string

interface Post {
    title: string,
    permalink: string,
    date: string,
    headerImg?: string,
    id: string,
    description: string,
    downloads: Object,
    changelog?: Object,
    discontinued?: boolean,
    authors: PostAuthor[] | undefined
};

type PostStore = Array<Post>|undefined;
export let postStore: Writable<PostStore> = writable(undefined);

const postListStore = derived(postStore, v => {
    if(v === undefined) return undefined

    let as_array = Object.values(v);
    as_array.reverse()

    return as_array;
});

export default postStore;
export {
    postListStore,
};
