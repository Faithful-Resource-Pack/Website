<script setup>
definePageMeta({
	layout: "no-container",
});
</script>

<template>
	<div class="green-background">
		<div class="container about-container">
			<div class="about-text">
				<h1 class="colored-title">Upscaling the Look of Minecraft</h1>
				<p>
					Faithful recreates Minecraft's original textures in higher resolutions while staying true
					to their original look and feel.
					<br /><br />
					With multiple resolutions and styles, everyone can find a pack they like!
				</p>
				<chevron-link
					class="about-button"
					to="https://discord.gg/sN9YRQbBv7"
					target="_blank"
					rel="noreferrer"
				>
					Join our Discord
				</chevron-link>
			</div>
			<img class="about-image" src="/image/about/faithful.gif" alt="gif of creeper textures" />
		</div>
	</div>
	<div class="container about-container">
		<img class="about-image" src="/image/about/foss.png" alt="github screenshot" />
		<div class="about-text">
			<h1 class="colored-title">Free and Open-Source</h1>
			<p>
				The project is made possible entirely by talented volunteer artists and developers working
				in their free time.
				<br /><br />
				All of our textures, as well as the code of all our related projects, are available on
				GitHub. Take a look and see how the magic happens!
			</p>
			<chevron-link
				class="about-button"
				to="https://github.com/Faithful-Resource-Pack"
				target="_blank"
				rel="noreferrer"
			>
				Visit our GitHub
			</chevron-link>
		</div>
	</div>
	<div class="blue-background">
		<div class="container about-container">
			<div class="about-text">
				<h1 class="colored-title">Cross-platform</h1>
				<p>
					Faithful is available for both the most popular Java Edition versions as well as Bedrock
					Edition.
					<br /><br />
					This means it can be used on all devices that support manual installation of resource
					packs, from phones to even certain consoles.
				</p>
				<chevron-link class="about-button" to="/downloads">View Downloads</chevron-link>
			</div>
			<img class="about-image" src="/image/about/platforms.png" alt="supported platforms" />
		</div>
	</div>
	<div class="container about-container">
		<img class="about-image" src="/image/about/community.png" alt="the faithful community" />
		<div class="about-text">
			<h1 class="colored-title">Made by the Community</h1>
			<p>
				All Faithful textures are voted on by the public before being added, and anyone can submit a
				texture to any project with no strings attached.
				<br /><br />
				Simply read our contribution handbook and follow the steps—it's that easy to make your mark
				on Faithful forever!
			</p>
			<chevron-link
				class="about-button"
				to="https://docs.faithfulpack.net/pages/manuals/contributor-handbook"
				target="_blank"
				rel="noreferrer"
			>
				How to Contribute
			</chevron-link>
		</div>
	</div>
	<div class="pink-background">
		<div class="container about-container">
			<div class="about-text">
				<h1 class="colored-title">A History of Expertise</h1>
				<p>
					We've got over a decade of experience making quality textures for Minecraft, with a rich
					history spanning from the first releases up to today.
					<br /><br />
					As one of the first ever texture packs to be developed, having started all the way back in
					2010, Faithful has secured its place among the most well-known Minecraft projects.
				</p>
				<chevron-link class="about-button" to="/stats">See our Stats</chevron-link>
			</div>
			<img class="about-image" src="/image/about/history.png" alt="our history" />
		</div>
	</div>
	<div class="container faq-section">
		<h1 class="mb-4">Any More Questions?</h1>
		<chevron-link class="about-button" to="/faq">View our FAQ</chevron-link>
	</div>
</template>

<script>
import ChevronLink from "~/components/lib/chevron-link.vue";

export default defineNuxtComponent({
	components: {
		ChevronLink,
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/lib/variables" as *;

.about-image {
	max-height: 384px;
	filter: drop-shadow(0 10px 10px #00000077);
}

// override container class for flex content
.about-container {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 40px;

	h1 {
		text-transform: uppercase;
	}

	p {
		// add a bit of padding between the button and text
		padding-bottom: 1.25rem;
	}
}

.faq-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 80px;
	padding-bottom: 80px;

	h1 {
		margin-top: 0;
		text-align: center;
		text-transform: uppercase;
	}
}

.about-button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 12px 22px;
	// prevent weird button wrapping issues
	white-space: nowrap;
	text-transform: uppercase;
	line-height: 1;
	transition: all 0.2s ease;
	&:hover {
		opacity: 0.66;
	}
}

.green-background {
	// both light/dark mode use white text
	p {
		color: #fff;
	}

	.about-button {
		background: white !important;
		color: $bg-green !important;
	}
}

.blue-background {
	p {
		color: #fff;
	}

	.about-button {
		background: white !important;
		color: $bg-blue !important;
	}
}

.pink-background {
	p {
		color: #fff;
	}

	.about-button {
		background: white !important;
		color: $bg-pink !important;
	}
}

// isn't a standard breakpoint but it's the max size images render nicely at
@media (max-width: 1080px) {
	// center content and display vertically on mobile
	.about-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		max-width: 95%;
	}
}

@media (max-width: 1280px) {
	// override container class to fix margins
	.container {
		max-width: 95% !important;
	}
}
</style>
