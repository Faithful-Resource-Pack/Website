<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Fa from "svelte-fa/src/fa.svelte";
	import {
		faSquareCheck,
        faSquare
	} from "@fortawesome/free-solid-svg-icons";

    export let value: boolean;
    export let label: string = '';
    export let disabled: boolean = false;

    const dispatch = createEventDispatcher();

	const change = () => dispatch('change', !value);
</script>

<span class={'noselect checkbox' + (disabled ? " disabled" : "")}>
    <Fa icon={value ? faSquareCheck : faSquare} size="lg" />
    { label }
    <div class="click_zone" on:click={() => { if(!disabled) change() }} on:keypress={() => {}}></div>
</span>

<style lang="scss">
    .checkbox {
        color: white;
        position: relative;
        
        & .click_zone {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
        }

        transition: color 0.2s ease;
    }
    .checkbox.disabled {
        color: rgb(184, 184, 184);
    }
</style>