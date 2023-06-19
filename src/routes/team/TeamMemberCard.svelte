<script lang="ts">
    import { faEarthEurope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa/src/fa.svelte";
    export let user: {
        color: string,
        avatar: string,
        display: string,
        username?: string,
        id?: string,
        bio?: string,
        timezone?: string,
        city?: string,
        country?: string,
        pronouns?: string,
        socials: App.CardLink[] // this was not the intended purpose but it works really well
    };

    const lightness = (hex: string) => {
        hex = hex.replace('#', '')
        const Rlin = (parseInt(hex.substring(0, 2), 16) / 255.0) ** 2.218;
        const Glin = (parseInt(hex.substring(2, 4), 16) / 255.0) ** 2.218;
        const Blin = (parseInt(hex.substring(4, 6), 16) / 255.0) ** 2.218;

        const Ylum = Rlin * 0.2126 + Glin * 0.7156 + Blin * 0.0722; // to get best visibility on weirdly colored surfaces

        return 70 > (Math.pow(Ylum, 0.43) * 100) ? '#fff': '#000';
    }

    const textColor = lightness(user.color);

    let userLocation: string;
    if (user.country && user.city)
        userLocation = `${user.city}, ${user.country}`;
    else
        if (user.country || user.city) {
            userLocation = user.country ?? user.city ?? ''; // the last bit is needed to make typescript not give an error
        }

</script>

<div class="team-card card card-body" style={`background: ${user.color} !important; --textColor: ${textColor}`}>
    <img class="card" src={user.avatar} alt={user.username}>
    <h2 class="display-name semibold">{user.display}</h2>
    {#if user.id && user.username}
        <h3 style="margin: 0 auto;">
            <a class="username username-hover" href="https://discord.com/users/{user.id}">@{user.username}</a>
            {#if user.pronouns}
            <span class="username">• {user.pronouns}</span>
            {/if}
        </h3>
    {:else if user.username}
        <h3 class="username">@{user.username}
        {#if user.pronouns}
            • {user.pronouns}
        {/if}
        </h3>
    {:else if user.pronouns}
        <h3 class="username">{user.pronouns}</h3>
    {/if}
    {#if user.bio || userLocation || user.timezone}
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
            {#if user.socials}
                {#each user.socials as social}
                    <a href={social.href}>
                        <li class="social-hover">
                            {#if social.icon}
                                <Fa fw icon={social.icon} size="lg" />
                            {/if}
                            {social.title}
                        </li>
                    </a>
                {/each}
            {/if}
        </ul>
    </div>
    {/if}
</div>


<style lang="scss">
    .team-card {
        max-width: 100%;
        padding: 0;
        text-align: center;

        img {
            width: 100%;
            border-radius: 10px;
        }
        p {
            width: 210px;
            max-width: 100%;
            margin: 0 auto $small-spacing;
            color: var(--textColor);
            opacity: 0.75;
        }

        .display-name {
            margin: $small-spacing 0 0;
            color: var(--textColor);
        }

        .username {
            color: var(--textColor);
            margin: 0 0 0 0;
            opacity: 0.5;
            font-size: 1.1rem;
            font-family: "Faithful 32x";
            font-weight: normal !important;
            word-wrap: normal;
        }

        .username-hover {
            color: var(--textColor);
            transition: all 0.2s ease;
            &:hover {
                opacity: 1;
            }
        }

        .social-hover {
            transition: all 0.2s ease;
            &:hover {
                opacity: 0.5;
            }
        }

        .body {
            flex-grow: 1;
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

            color: var(--textColor);

            :global(*) {
                margin-right:5px;
            }
        }
    }
</style>