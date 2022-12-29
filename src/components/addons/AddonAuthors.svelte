<script lang="ts">
	import Checkbox from "$components/common/checkbox.svelte";
	import type { UserName } from "$interfaces/user";
	import { authorStore, searchStore, startStore } from "$stores/AddonStore";
	import { userNameStore } from "$stores/UserStore";
    import { derived } from "svelte/store";
    import Select from 'svelte-select';

	const text_all = "All";
	const text_authors = "Authors";

	const allChecked = searchStore.allAuthorsSelected();
    const clear = () => {
        searchStore.clearAuthors();
        startStore.startSearch();
    }
	const selectAll = () => {
        let authors = $authorStore;
        if(authors === undefined) return;
		searchStore.selectAllAuthors(authors);
        startStore.startSearch();
	};
    const floatingConfig = {autoUpdate: true}; // auto update size on results and scroll
    
    const addonUsersStore = derived([authorStore, userNameStore], ([authors, userNames]) => {
        if(authors === undefined || userNames === undefined) return null;

        return (authors
            .map(a => [a, userNames.filter(u => u.id === a)[0]] as [string, UserName | undefined])
            .filter(e => e[1] !== undefined) as [string, UserName][])
            .map(e => [e[0],e[1].username])
            .filter(e => e[1] !== undefined)
            .sort((a,b) => a[1].toLowerCase() < b[1].toLowerCase() ? -1 : (a[1].toLowerCase()==b[1].toLowerCase() ? 0 : 1))
            .map(([id, username]) => ({ value: id, label: username }));
    });

    const placeholder_author_select = 'Select authors';

    const change = (val: { detail: {value: string, label: string }[] }) => {
        if(!val.detail) {
            clear();
            return;
        }
        let detail = Array.isArray(val.detail) ? val.detail : [val.detail];
        let ids = detail.map(d => d.value);
        searchStore.clearAuthors();
        searchStore.selectAllAuthors(ids);
        startStore.startSearch();
    }

    const searchUserValues = derived([searchStore, userNameStore], ([search, userNames]): {value: string, label: string }[] | undefined => {
        if(userNames === undefined) return []

        let res = ((search.authors || [])
            .map(a => [a, userNames.filter(u => u.id === a)[0]] as [string, UserName | undefined])
            .filter(e => e[1] !== undefined) as [string, UserName][])
            .map(e => ({ value: e[0], label: e[1].username}))

        return res.length ? res : undefined
    })
</script>

{#if $addonUsersStore !== undefined}
<div class="card card-body">
	<div class="header">
		<h3>{text_authors}</h3>

		<span
			on:click={$allChecked ? clear : selectAll}
			on:keypress={() => {}}
		>
			<span class="label">{text_all}</span>
			<Checkbox value={$allChecked} />
		</span>
	</div>
    {#if !$allChecked}
        <div><Select
            items={$addonUsersStore}
            multiple searchable clearable
            placeholder={placeholder_author_select}
            --multi-select-padding=" 0 0 0 8px"
            on:input={change} value={$searchUserValues}
            on:clear={change}
            {floatingConfig}
        /></div>
    {/if}
</div>
{/if}
<style lang="scss">
    h3 {
        margin: 0;
        font-size: 1.5rem;
    }

    .label {
        padding-right: 5px;
    }

    .label {
        cursor: pointer;
    }

    .card {
        overflow: visible;
    }

    :global(.svelte-select) {
        color: black;
    }

    :global(.svelte-select .indicators ) {
        height: 40px;
    }

    :global(.svelte-select-list) {
        z-index: 1000;
        color: black;
    }

    .card > .header + * {
        margin-top: .8rem;
    }

    .card > .header , .card > .header > span {
        display: flex;
        align-items: center;

        & > *:first-child {
            flex-grow: 1;
        }
    }
</style>