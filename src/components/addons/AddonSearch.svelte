<script lang="ts">
	import { checkboxChoices, searchStore, CheckboxTypesValues } from "$stores/AddonStore";
	import { derived } from "svelte/store";
    import Fa from "svelte-fa/src/fa.svelte";
	import {
		faSquareCheck,
        faSquare
	} from "@fortawesome/free-solid-svg-icons";

    let checkboxes = derived(searchStore, s => {
        return CheckboxTypesValues.map((t) => (
            checkboxChoices[t].map(c => ({
                choice: c,
                checked: s[t].includes(c),
                disabled: s[t].includes(c) && s[t].length <= 1,
                toggle: searchStore[t === 'editions' ? 'toggleEdition' : 'toggleResolution']
            }))
        )).flat()
    })

    const placeholder_searchbox = 'Search add-on name';
</script>

<div class="card card-body">
    <div class="text-center">Search</div>
    <div id="checkboxes">
        {#each $checkboxes as checkbox}
            <div class={"noselect checkbox" + (checkbox.disabled ? " disabled" : "")}>
                {#if checkbox.checked}
                    <Fa icon={faSquareCheck} size="lg" />
                {:else}
                    <Fa icon={faSquare} size="lg" />
                {/if}
                { checkbox.choice }
                <label for={'addon-search-' + checkbox.choice } on:click={() => { if(!checkbox.disabled) {checkbox.toggle(checkbox.choice) }}} on:keypress={() => {}}></label>
            </div>
        {/each}
    </div>
    <form id="searchbox">
        <input type="search" placeholder={placeholder_searchbox}>
    </form>
</div>

<style lang="scss">
    #checkboxes {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 1fr;
        text-align: center;
        margin: 20px 0;
    }
    .checkbox {
        color: white;
        position: relative;
        
        & label {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
        }

        transition: color 0.3s ease;
    }
    .checkbox.disabled {
        color: grey;
    }

    #searchbox input {
        display: block;
        width: 100%;
        padding: 12px;
        background-color: hsla(0,0%,100%,.08);
        border: 1px solid hsla(0,0%,0%,.2);
        border-bottom: thin solid white;
        border-radius: 4px 4px 0 0;
        color: inherit;
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