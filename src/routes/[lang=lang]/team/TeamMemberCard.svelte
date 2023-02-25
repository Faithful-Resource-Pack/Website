<script lang="ts">
    import { faEarthEurope, faGamepad, faHeart, faUniversalAccess } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa/src/fa.svelte";
    import { t } from '$lib/translations';

    export let user: {
        avatar: string,
        username: string,
        description: string,
        city?: string,
        country?: string,
        hobbies: string,
        pronouns?: string,
        favorite_game?: string
    };
    export let color = '#39bc9c';

    let user_location = $t('team.default_location');
    if(user.country || user.city) {
        if(!user.country && !user.city) {
            user_location = user.country || user.city;
        } else {
            user_location = `${user.country}, ${user.city}`;
        }
    }
</script>

<div class="team-card card card-body" style={`background: ${color} !important`}>
    <div class="top">
        <img class="card" src={user.avatar} alt={user.username}>
        <h2 class="username">{user.username}</h2>
    </div>
    <div class="body">
        <p><i>{user.description}</i></p>
        <ul>
            <li><Fa fw icon={faEarthEurope} size="lg"/>{user_location}</li>
            <li><Fa fw icon={faHeart} size="lg"/>{user.hobbies}</li>
            <li><Fa fw icon={faUniversalAccess} size="lg"/>{user.pronouns}</li>
            {#if !user.pronouns}
                <li><Fa fw icon={faGamepad} size="lg"/>{user.favorite_game}</li>
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