<script lang="ts">
    import { faEarthEurope, faGamepad, faComment, faUniversalAccess, faLocationDot } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa/src/fa.svelte";

    export let user: {
        avatar: string,
        username: string,
        discord_tag: string,
        bio?: string,
        timezone?: string,
        city?: string,
        country?: string,
        pronouns?: string,
    };
    export let color = '#39bc9c';

    let user_location: string;
    if (user.country && user.city)
        user_location = `${user.city}, ${user.country}`;
    else
        if (user.country || user.city) {
            user_location = user.country ?? user.city ?? ''; // the last bit is needed to make typescript not give an error
        }

</script>

<div class="team-card card card-body" style={`background: ${color} !important`}>
    <div class="top">
        <img class="card" src={user.avatar} alt={user.username}>
        <h2 class="username">{user.username}<span id="tag">{user.discord_tag}</span></h2>
    </div>
    <div class="body">
        {#if user.bio}
        <p><i>{user.bio}</i></p>
        {/if}
        <ul>
            {#if user_location}
                <li><Fa fw icon={faLocationDot} size="lg"/>{user_location}</li>
            {/if}
            {#if user.timezone}
                <li><Fa fw icon={faEarthEurope} size="lg"/>{user.timezone}</li>
            {/if}
            {#if user.pronouns}
                <li><Fa fw icon={faUniversalAccess} size="lg"/>{user.pronouns}</li>
            {/if}
        </ul>
    </div>
</div>


<style lang="scss">
    img {
        width: 165px;
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
            padding: $small-spacing;

            .username {
                margin: $small-spacing 0 0;
                color: white;

                #tag {
                    margin: $small-spacing 0 0;
                    opacity: 0.75;
                    font-size: 1.1rem;
                    font-family: "Faithful 32x";
                }
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