<script lang="ts">
    import Fa from "svelte-fa/src/fa.svelte";
    import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

    export let title: string;
    export let background: string;
    export let src: string;

    export let links: App.CardLink[];

    $: styles = src.includes('cf') ? 'transform: scale(0.8)' : '';
</script>

<div class="pack-card" style="--bg: url({background})" >
    <img src={src} alt={title} style={styles} />
    <h1 class="text-center">{title}</h1>

    <ul>
        {#each links as link }
            <li class="text-center"><a href={link.href}><span>{link.title}</span> <span><Fa icon={faChevronRight} scale={0.8} /></span></a></li>
        {/each}
    </ul>
</div>


<style lang="scss">
    .pack-card {
        background-image: var(--bg);
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5);
        color: white;
        background-position: center;
        background-size: cover;
        padding: 16px;
        border-radius: 10px;

        display: flex;
        flex-direction: column;
    }

    img {
        width: 256px;
    }

    h1 {
        width: 256px;
        text-shadow: rgba(0, 0, 0, 0.4) 0px 4px 5px;
        flex-grow: 1;
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;

        li {
            display: block;
            margin: 9px 0;
            background: black;
            color: white;
            font-weight: 300;
            border-radius: 10px;
            letter-spacing: 1.5px;

            &:last-child {
                margin-bottom: 0;
            }

            a {
                display: block;
                width: 100%;
                padding: 8px;
                color: inherit;

                & > * {
                    display: inline-block;
                    vertical-align: bottom;
                }
            }
        }
    }
</style>