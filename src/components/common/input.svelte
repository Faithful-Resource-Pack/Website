<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Fa from "svelte-fa/src/fa.svelte";
	import type { IconDefinition } from "@fortawesome/free-brands-svg-icons";
	import { faXmark } from "@fortawesome/free-solid-svg-icons";

    export let placeholder: string = '';
    export let clearable: boolean = false;
    export let appendIcon: IconDefinition|undefined = undefined;
    export let value: any = '';
    export let type: string = 'text';
    function typeAction(node: HTMLInputElement) {
        node.type = type;
    }

    let classes: string;
    $: {
        let class_arr = ['input_box'];
        if(appendIcon) class_arr.push('append')
        if(value && clearable) class_arr.push('clearable')
        classes = class_arr.join(' ');
    }
    
    const dispatch = createEventDispatcher();
    const clear = () => {
        value = '';
        dispatch('clear');
    }
    const append = () => dispatch('append');

    const onkeypress = (e: KeyboardEvent) => {
        if(e.key === "Enter") return append()
        return false
    }
</script>

<div class={classes}>
    <input use:typeAction {placeholder} bind:value on:keypress={onkeypress}>
    <span class="after">
        {#if clearable && value }
            <span class="clear" role="button" tabindex="0" on:click={clear} on:keypress={() => {}}><Fa icon={faXmark} size="1.3x" /></span> 
        {/if}
        {#if appendIcon }
            <span class="append" role="button" tabindex="0" on:click={append} on:keypress={() => {}}><Fa icon={appendIcon} size="1.3x" /></span>
        {/if}
    </span>
</div>

<style lang="scss">
    .input_box {
        position: relative;

        & .after {
            position: absolute;
            gap: 12px;
            right: 12px;
            top: 0;
            bottom: 0;
            display: flex;
            align-items: center;
        }
        & .append, & .clear {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    input {
        display: block;
        width: 100%;
        padding: 12px;
        background-color: hsla(0,0%,100%,.08);
        border: 1px solid hsla(0,0%,0%,.2);
        border-bottom: thin solid white;
        border-radius: 6px 6px 0 0;
        color: inherit;
        height: 44px;
        line-height: 20px;
        transition: background-color 0.4s ease;

        &:hover {
            background: hsla(0,0%,100%,.16);
        }

        &:focus {
            outline: none;
        }

        &::placeholder {
            color: rgba(255,255,255,0.5);
        }
    }
</style>