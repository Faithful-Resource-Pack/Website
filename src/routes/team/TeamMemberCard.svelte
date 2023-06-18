<script lang="ts">
    import { faEarthEurope, faUniversalAccess, faLocationDot } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa/src/fa.svelte";

    export let user: {
        avatar: string,
        display: string,
        username?: string,
        id?: string,
        bio?: string,
        timezone?: string,
        city?: string,
        country?: string,
        pronouns?: string,
    };
    export let color = '#39bc9c';

    let userLocation: string;
    if (user.country && user.city)
        userLocation = `${user.city}, ${user.country}`;
    else
        if (user.country || user.city) {
            userLocation = user.country ?? user.city ?? ''; // the last bit is needed to make typescript not give an error
        }

</script>

<div class="team-card card card-body" style={`background: ${color} !important`}>
    <div class="top">
        <img class="card" src={user.avatar} alt={user.username}>
        <h2 class="display-name semibold">{user.display}</h2>
        {#if user.id && user.username}
            <a href="https://discord.com/users/{user.id}">
                <h3 class="username hoverable">@{user.username}</h3>
            </a>
        {:else if user.username}
            <h3 class="username">@{user.username}</h3>
        {/if}
    </div>
    {#if user.bio || userLocation || user.timezone || user.pronouns}
    <div class="body">
        {#if user.bio}
        <p><i>{user.bio}</i></p>
        {/if}
        <ul>
            {#if userLocation}
                <li><Fa fw icon={faLocationDot} size="lg"/>{userLocation}</li>
            {/if}
            {#if user.timezone}
                <li><Fa fw icon={faEarthEurope} size="lg"/>{user.timezone}</li>
            {/if}
            {#if user.pronouns}
                <li><Fa fw icon={faUniversalAccess} size="lg"/>{user.pronouns}</li>
            {/if}
        </ul>
    </div>
    {/if}
</div>


<style lang="scss">
    img {
        width: 164px;
        max-width: 100%;
        margin: 0 auto;
        border-radius: 10px;
    }
    p {
        width: 210px;
        max-width: 100%;
        margin: 0 auto $small-spacing;
        color: white;
        opacity: 0.75;
    }
    .team-card {
        max-width: 100%;
        padding: 0;
        text-align: center;

        .top {
            padding: $small-spacing + 22; // this way the top padding is even with the sides
            padding-bottom: $small-spacing; // but the bottom isn't super huge

            .display-name {
                margin: $small-spacing 0 0;
                color: white;
            }
            .username {
                color: white;
                margin: 0 0 0 0;
                opacity: 0.5;
                font-size: 1.1rem;
                font-family: "Faithful 32x";
                font-weight: normal !important;
                word-wrap: normal;
                transition: all 0.2s ease;
            }
        }

        .hoverable {
            &:hover {
                opacity: 1;
            }
        }

        .body {
            flex-grow: 1;
            background: rgba(0,0,0,0.3);
            padding: $small-spacing;
            display: flex;
            flex-direction: column;

            p {
                flex-grow: 1;
            }
        }
    }

    ul {
        padding: 0;
        text-align: left;
        margin-bottom: 0;
        margin-top: 0;

        li {
            list-style-type: none;
            line-height: 1.7;
            font-weight: 600;

            color: white;

            :global(*) {
                margin-right:5px;
            }
        }
    }
</style>