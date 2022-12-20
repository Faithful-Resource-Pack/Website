<script lang="ts">
	import Checkbox from "$components/common/checkbox.svelte";
	import type { UserName } from "$interfaces/user";
	import { authorStore, searchStore, startStore } from "$stores/AddonStore";
	import { userNameStore } from "$stores/UserStore";
    import { derived } from "svelte/store"

	const text_all = "All";
	const text_authors = "Authors";

	const allChecked = searchStore.allAuthorsSelected();
    const clear = () => searchStore.clearAuthors();
	const selectAll = () => {
        let authors = $authorStore;
        if(authors === undefined) return;
		searchStore.selectAllAuthors(authors);
        startStore.startSearch();
	};
	const toggle = (category: string) => {
		searchStore.toggleAuthor(category);
        startStore.startSearch();
	};
    
    const addonUsersStore = derived([authorStore, userNameStore], ([authors, userNames]) => {
        if(authors === undefined || userNames === undefined) return undefined;

        return (authors
            .map(a => [a, userNames.filter(u => u.id === a)[0]] as [string, UserName | undefined])
            .filter(e => e[1] !== undefined) as [string, UserName][])
            .map(e => [e[0],e[1].username])
            .filter(e => e[1] !== undefined)
            .sort((a,b) => a[1].toLowerCase() < b[1].toLowerCase() ? -1 : (a[1].toLowerCase()==b[1].toLowerCase() ? 0 : 1));
    });
</script>

{#if $addonUsersStore !== undefined}
<div class="card card-body">
	<div>
		<h3>{text_authors}</h3>

		<span
			on:click={$allChecked ? clear : selectAll}
			on:keypress={() => {}}
		>
			<span class="label">{text_all}</span>
			<Checkbox value={$allChecked} />
		</span>
	</div>
	<ul>
		{#each $addonUsersStore as [author_id, author]}
			<li on:click={() => toggle(author_id)} on:keypress={() => {}}>
				<div class="label">{author}</div>
				<Checkbox value={$searchStore.authors.includes(author_id)} />
			</li>
		{/each}
	</ul>
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

    li, .label {
        cursor: pointer;
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 10px 0 0;

        max-height: 8.1rem;
        overflow: auto;
        background: #242424;
    }

    .card > div , .card li, .card > div > span {
        display: flex;
        align-items: center;

        & > *:first-child {
            flex-grow: 1;
        }
    }

    @media only screen and (max-width: 992px) and (min-width: 600px) {
        ul {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            justify-content: flex-end;
        }

        .card > div , .card li, .card > div > span {
            display: flex;
            align-items: center;
            flex-basis: 30%;

            & > *:first-child {
                flex-basis: 60%;
                flex-grow: 0;
            }
        }
    }
</style>