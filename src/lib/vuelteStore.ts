import { browser } from '$app/environment';
import { onDestroy, onMount } from 'svelte';
import type { Writable } from "svelte/store";

export interface Vuelte {
    set<T>(key: string, value: T): void
    get<T>(key: string): T
    listen<T>(key: string, value: (n: T,o: T) => void): Function
}

export function getVuelte(): Vuelte {
    return ((window as any).vuelte as Vuelte)
}

export function wrapVuelteStore<T>(key: string, writable: Writable<T>): Writable<T> {
    let vueUnwatch: Function | undefined;

    // Vue to Svelte
    onMount(() => {
        vueUnwatch = ((window as any).vuelte as Vuelte).listen<T>(key, (n, o) => {
            ((window as any).vuelte as Vuelte).set(key, n)
        })
    })

    // Svelte to Vue
    const svelteUnsubscribe = writable.subscribe(n => {
        if(browser) {
            getVuelte().set(key, n);
        }
    })

    onDestroy(() => {
        if(typeof(vueUnwatch) === "function") vueUnwatch()
        svelteUnsubscribe()
    })

    return writable
}
