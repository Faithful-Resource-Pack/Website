import { createStore } from "$lib/createStore";
import type { Readable } from "svelte/store";

const LIGHT = 'light';
const DARK = 'dark';
const DEFAULT = 'auto';
const VALUES = [DEFAULT, DARK, LIGHT] as const;
type ThemeValue = typeof VALUES[number];

export let themeStore = createStore<ThemeValue,Readable<ThemeValue> & {
    next: () => void
}>('THEME', DEFAULT, v => v as ThemeValue, (w) => {
    let { subscribe, update } = w;

    return {
        subscribe,
        next: function() {
            update(v => {
                let i = VALUES.indexOf(v);
                let next = (i+1)%VALUES.length;
                return VALUES[next];
            })
        }
    }
})

export let themeValueWatch = function(listener: (isDark: boolean, value: ThemeValue) => void) {
    let lastValue: ThemeValue;

    let isDark = function() {
        const value = lastValue;
        return value !== LIGHT && (value === DARK || window.matchMedia("(prefers-color-scheme: dark)").matches)
    }

    themeStore.subscribe(v => {
        lastValue = v;
        listener(isDark(), lastValue);
    });
    
    window.matchMedia("(prefers-color-scheme: dark)").onchange = (ev) => {
        if(ev.matches) listener(isDark(), lastValue);
    };
    window.matchMedia("(prefers-color-scheme: light)").onchange = (ev) => {
    if(ev.matches) listener(isDark(), lastValue);
    };
}