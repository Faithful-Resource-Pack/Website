<script lang="ts">
	import {
		faGithub,
		faInstagram,
		faReddit,
		faSteam,
		faTwitter,
	} from "@fortawesome/free-brands-svg-icons";
	import {
		faClock,
		faCode,
		faComment,
		faCube,
		faEye,
		faGavel,
		faGem,
		faLink,
		faLocationDot,
	} from "@fortawesome/free-solid-svg-icons";
	import Fa from "svelte-fa";
	import tooltip from "$lib/tooltip";
	export let user: {
		color: string;
		avatar: string;
		display: string;
		username?: string;
		id?: string;
		bio?: string;
		timezone?: string;
		city?: string;
		country?: string;
		pronouns?: string;
		socials?: App.CardLink[]; // this was not the intended purpose but it works really well
		roles?: any[];
	};

	const lightness = (hex: string) => {
		hex = hex.replace(/#/g, "");
		const Rlin = (parseInt(hex.substring(0, 2), 16) / 255.0) ** 2.218;
		const Glin = (parseInt(hex.substring(2, 4), 16) / 255.0) ** 2.218;
		const Blin = (parseInt(hex.substring(4, 6), 16) / 255.0) ** 2.218;

		const Ylum = Rlin * 0.2126 + Glin * 0.7156 + Blin * 0.0722; // to get best visibility on weirdly colored surfaces

		return 60 > Math.pow(Ylum, 0.43) * 100 ? "#fff" : "#000";
	};

	const getIcon = (options: App.IconOptions) => {
		// trim off unnecessary info and return base url
		if (options.url) {
			const url = options.url ? options.url.replace(/https:\/\//g, "").replace(/\/.+/, "") : "none";
			switch (
				url // parsing the url rather than the name so people can add custom name fields
			) {
				case "github.com":
					return faGithub;
				case "twitter.com":
					return faTwitter;
				case "reddit.com":
					return faReddit;
				case "instagram.com":
					return faInstagram;
				case "steamcommunity.com":
					return faSteam;
				default:
					return faLink;
			}
		} else {
			switch (options.badge.toLowerCase()) {
				case "development manager":
				case "developer":
					return faCode;
				case "contributor":
					return faGem;
				case "moderator":
				case "moderation manager":
					return faGavel;
				case "council":
				case "art director council":
					return faEye;
				case "social media manager":
					return faComment;
				default:
					return faCube;
			}
		}
	};

	const textColor = lightness(user.color);

	let userLocation: string;
	if (user.country && user.city) userLocation = `${user.city}, ${user.country}`;
	else if (user.country || user.city) {
		userLocation = user.country ?? user.city ?? ""; // the last bit is needed to make typescript not give an error
	}
</script>

<div
	class="team-card card card-body"
	style={`background: ${user.color} url("/images/background/bg_light_foreground.png") repeat;
    --textColor: ${textColor}`}
>
	<img class="card" src={user.avatar} alt={user.username} />
	<h2 class="display-name semibold">{user.display}</h2>
	{#if user.id && user.username}
		<h3 style="margin: 0 auto;">
			<a class="username username-hover" href="https://discord.com/users/{user.id}"
				>@{user.username}</a
			>
			{#if user.pronouns}
				<span class="username">• {user.pronouns}</span>
			{/if}
		</h3>
	{:else if user.username}
		<h3 class="username">
			@{user.username}
			{#if user.pronouns}
				• {user.pronouns}
			{/if}
		</h3>
	{:else if user.pronouns}
		<h3 class="username">{user.pronouns}</h3>
	{/if}
	<div class="body">
		{#if user.bio}
			<p><i>{user.bio}</i></p>
		{/if}
		<ul>
			{#if userLocation}
				<li><Fa fw icon={faLocationDot} size="lg" />{userLocation}</li>
			{/if}
			{#if user.timezone}
				<li><Fa fw icon={faClock} size="lg" />{user.timezone}</li>
			{/if}
			{#if user.socials}
				{#each user.socials as social}
					<a href={social.href} target="_blank" rel="noopener noreferrer">
						<li class="social-hover">
							<Fa fw icon={getIcon({ url: social.href })} size="lg" />{social.title}
						</li>
					</a>
				{/each}
			{/if}
		</ul>
	</div>
	<div class="badges">
		{#each user.roles ?? [] as badge, i}
			<div class="badge-display" style="background-color: {badge.color};">
				<Fa size="2.5rem" color="#fff" icon={getIcon({ badge: badge.name })} />
			</div>
			<div use:tooltip>
				<span class="badge-tooltip">{badge.name}</span>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.team-card {
		max-width: 100%;
		background-blend-mode: multiply;
		padding: 0;
		text-align: center;
	}

	img {
		width: 100%;
		border-radius: $border-radius;
	}

	p {
		margin: 0 auto $small-spacing;
		color: var(--textColor);
		opacity: 0.75;
	}

	.display-name {
		font-size: 1.75rem;
		margin: $small-spacing 5px;
		color: var(--textColor);
	}

	.username {
		color: var(--textColor);
		margin: 0 auto;
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
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		padding: $small-spacing;

		p {
			display: flex;
			flex-grow: 1;
			justify-content: center;
			align-items: center;
		}
	}

	.badges {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-evenly;
		margin-bottom: 20px;

		.badge-display {
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 5px 5px;
			outline: 3px solid #fff;
			filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
			height: 3.5rem;
			width: 3.5rem;
			border-radius: 100%;
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
				margin-right: 5px;
			}
		}
	}
</style>
