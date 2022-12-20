import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store'

export function createStore<T, V>(key: string, default_value: T, parse: (v: string) => T, obj: (v: Writable<T>) => V, serialize: (val: T) => string = (val) => String(val)): V {
    let initial: T;
    if(browser) {
        const val = window.localStorage.getItem(key);
        initial = val ? parse(val) : default_value;
    } else {
        initial = default_value;
    }

    if(typeof initial == 'object' && !Array.isArray(initial))
    {
        Object.keys(default_value as object).forEach(key => {
            if(!(key in (initial as object)))
                (initial as Record<string, any>)[key] = (default_value as Record<string, any>)[key]
        });
    }

    const my_writable = writable(initial);
    my_writable.subscribe(v => {
        if (browser) {
            window.localStorage.setItem(key, serialize(v));
        }
    });
    return obj(my_writable);
}

export function createJSONStore<T, V>(key: string, default_value: T, obj: (v: Writable<T>) => V) {
    return createStore<T,V>(key, default_value, s => JSON.parse(s), obj, v => JSON.stringify(v));
}