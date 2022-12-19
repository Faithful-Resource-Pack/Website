<script lang="ts">
    import Fa from "svelte-fa/src/fa.svelte";
	import { faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
    import type { Addon, AddonTagArray, AddonTag } from "$interfaces/addons";
	import { favoriteStore } from "$stores/AddonStore";
    export let addon: Addon;

    $: [resolutions, editions] = addon.options.tags.reduce((acc: [AddonTagArray,AddonTagArray], cur: AddonTag[number]) => {
        let i: 0|1 = Number.isNaN(Number.parseInt(cur[0])) ? 1 : 0;
        acc[i].push(cur);
        return acc;
    }, [[],[]]);

    type FlagArray = (AddonTag[number] | "optifine")[];
    $: flags = (addon.options.optifine ? [...editions, "optifine"] : editions) as FlagArray;

    const src_flags = {
        "Java": "/images/icon/java.png",
        "Bedrock": "/images/icon/bedrock.png",
        "optifine": "/images/icon/optifine.png",
    } as Record<FlagArray[number], string>;

    const alt_flags = {
        "Java": "available for Java Edition",
        "Bedrock": "available for Bedrock Edition",
        "optifine": "requires optifine",
    } as Record<FlagArray[number], string>;;
</script>
<div class="hovering-effect">
	<a href={'/add-ons/' + addon.slug } class="card img-card">
        <span class={"addon-favorite " + ($favoriteStore.favorites.includes(String(addon.id)) ? "remove" : "add")} on:click|preventDefault={() => favoriteStore.toggle(String(addon.id))} on:keypress={() => {}}>
            <Fa icon={$favoriteStore.favorites.includes(String(addon.id)) ? faXmark : faStar } size="1x" translateY={-0.2} />
        </span>
        <img
			src={`https://api.faithfulpack.net/v2/addons/${ addon.id }/header`}
			loading="lazy"
            alt={addon.name}
		/>
		<div class="img-card-shadow" />
        <div class="img-bottom">
            <div class="addon-tags">
                {#each resolutions as resolution }
                    <p>{ resolution }</p>
                {/each}
            </div>
            <h3>{addon.name}</h3>
        </div>
        <div class="addon-flags" style="margin-bottom: 5px;">
            {#each flags as flag}
                <img
                    src={src_flags[flag]}
                    alt={alt_flags[flag]}
                    loading="lazy"
                />
            {/each}
        </div>
	</a>
</div>

<style lang="scss">
    .hovering-effect {
        transition: transform .2s;

        &:hover {
            transform: scale(1.025);
        }
    }
    .img-card-shadow {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        -webkit-box-shadow: inset 5px 5px 50px 25px rgba(0,0,0,0.5);
        box-shadow: inset 5px 5px 50px 25px rgba(0,0,0,0.5);
    }
    .img-card > .img-bottom {
        right: 37px;

        h3 {
            font-size: 1rem;
            font-weight: 600;
        }
    }
    .addon-flags {
        position: absolute;
        bottom: 5px;
        right: 5px;
        display: flex;
        flex-direction: column;

        & > img {
            height: 32px;
            width: 32px;
            border-radius: 6px;
            margin-top  : 5px;

            & + img {
                margin-right: 5px;
            }
        }
    }
    .addon-tags {
        display: flex;
        flex-direction: row;
        margin-bottom: calc(-8px - 3px);
        margin-left: 8px;

        & > p {
            margin: 0 5px 0 0;
        }
    }
    .addon-favorite {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        padding: 8px;

        &.add {
            color: rgba(0,0,0,0.5);
        }
        &.remove {
            color: red;
        }
    }
</style>