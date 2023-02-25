<script lang="ts">
    import Fa from "svelte-fa/src/fa.svelte";
    import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

    export let title: string;
    export let background: string;
    export let src: string;

    export let links: App.CardLink[];

    $: styles = src.includes('cf') ? 'transform: scale(0.8)' : '';
</script>

<div class="pack-card">
    <div class="bg-container">
        <img class="bg" src={background} alt={title} />
    </div>
    <img class="image" src={src} alt={title} style={styles} />
    <h2 class="text-center">{title}</h2>

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
        border-radius: $border-radius;
        position: relative;

        display: flex;
        flex-direction: column;
        align-items: center;

        & > ul {
            align-self: stretch;
        }

        & > * {
            position: relative;
        }

        &:hover .bg-container .bg {
            transform: scale(1.05);
        }
    }

    .bg-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: $border-radius;

        & > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.2s ease;
        }
    }

    .image {
        width: 256px;
        max-width: 100%;
    }

    h2 {
        width: 256px;
        max-width: 100%;
        text-shadow: rgba(0, 0, 0, 0.4) 0px 4px 5px;
        flex-grow: 1;
        color: #fff;
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
            border-radius: $border-radius;
            letter-spacing: 1.5px;

            &:last-child {
                margin-bottom: 0;
            }

            a {
                display: block;
                border-radius: $border-radius;
                width: 100%;
                padding: 8px;
                color: inherit;
                transition: all 0.2s ease-out;

                & > * {
                    display: inline-block;
                    vertical-align: bottom;
                }
            }
            > :hover {
                background: #fff;
                color: #000;
            }
        }
    }
</style>