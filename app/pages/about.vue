<script setup>
definePageMeta({
	layout: "no-container",
});
</script>

<template>
	<div class="green-background">
		<div class="container about-container">
			<div class="about-text body-text">
				<h1 class="colored-title">Upscaling the Look of Minecraft</h1>
				<p>
					Faithful recreates Minecraft's original textures in higher resolutions while staying true
					to their original look and feel.
					<br /><br />
					With a variety of resolutions and styles, there's something for everyone!
				</p>
				<chevron-link class="btn btn-lg btn-about" to="/downloads">Get Started</chevron-link>
			</div>
			<img class="about-image" src="/image/about/faithful.gif" alt="gif of creeper textures" />
		</div>
	</div>
	<div class="container about-container">
		<img class="about-image" src="/image/about/history.png" alt="our history" />
		<div class="about-text body-text">
			<h1 class="colored-title">A History of Expertise</h1>
			<p>
				We've got over a decade of experience making quality textures for Minecraft, with a rich
				history spanning from the first releases up to today.
				<br /><br />
				As one of the first ever texture packs to be developed, having started all the way back in
				2010, Faithful has become a cult classic of the Minecraft community.
			</p>
			<chevron-link
				class="btn btn-lg btn-about"
				to="https://discord.gg/sN9YRQbBv7"
				target="_blank"
				rel="noopener noreferrer"
			>
				Join our Discord
			</chevron-link>
		</div>
	</div>
	<div class="blue-background">
		<div class="container about-container">
			<div class="about-text body-text">
				<h1 class="colored-title">Play How You Want</h1>
				<p>
					Faithful supports both Java and Bedrock Edition, and can be installed on computers,
					phones, and even certain consoles.
					<br /><br />
					Our community made add-ons also support a wide variety of editions and versions, so you
					can make Faithful truly yours no matter how you like to play.
				</p>
				<chevron-link class="btn btn-lg btn-about" to="/addons">View Add-ons</chevron-link>
			</div>
			<img class="about-image" src="/image/about/platforms.png" alt="supported platforms" />
		</div>
	</div>
	<div class="container about-container">
		<img class="about-image" src="/image/about/community.png" alt="the faithful community" />
		<div class="about-text body-text">
			<h1 class="colored-title">Made by the Community</h1>
			<p>
				All Faithful textures are voted on by the public before being added, and anyone can submit a
				texture to any project with no strings attached.
				<br /><br />
				Simply read our contribution handbook and follow the steps—it's that easy to make your mark
				on Faithful forever!
			</p>
			<chevron-link
				class="btn btn-lg btn-about"
				to="https://docs.faithfulpack.net/pages/manuals/contributor-handbook"
				target="_blank"
				rel="noopener noreferrer"
			>
				How to Contribute
			</chevron-link>
		</div>
	</div>
	<div class="pink-background">
		<div class="container about-container">
			<div class="about-text body-text">
				<h1 class="colored-title">Free and Open-Source</h1>
				<p>
					The project is made possible entirely by talented volunteer artists and developers working
					in their free time.
					<br /><br />
					All of our textures, as well as the code of all our related projects, are available on
					GitHub. Take a look and see how the magic happens!
				</p>
				<chevron-link
					class="btn btn-lg btn-about"
					to="https://github.com/Faithful-Resource-Pack"
					target="_blank"
					rel="noopener noreferrer"
				>
					Visit our GitHub
				</chevron-link>
			</div>
			<img class="about-image" src="/image/about/foss.png" alt="github screenshot" />
		</div>
	</div>
	<div class="container faq-section">
		<h1 class="colored-title mb-4">Any More Questions?</h1>
		<chevron-link class="btn btn-lg btn-about" to="/faq">Check the FAQ</chevron-link>
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
@use "~/assets/css/variables" as *;

.about-image {
	max-height: 384px;
	filter: drop-shadow($shadow-image);
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

.btn-about {
	// need to override btn-lg style
	// todo: refactor button code to Not require this
	margin-bottom: 0 !important;
	transition: $transition-button;
	&:hover {
		opacity: 0.66;
	}
}

// universal styles across both themes
.green-background {
	p {
		color: $text-colored-banner;
	}

	.btn-about {
		background: white !important;
		color: $bg-green !important;
	}
}
.blue-background {
	p {
		color: $text-colored-banner;
	}

	.btn-about {
		background: white !important;
		color: $bg-blue !important;
	}
}
.pink-background {
	p {
		color: $text-colored-banner;
	}

	.btn-about {
		background: white !important;
		color: $bg-pink !important;
	}
}

// isn't a standard breakpoint but it's the max size images render nicely at
@media screen and (max-width: 1080px) {
	// center content and display vertically on mobile
	.about-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		max-width: 95%;
	}
}

@media screen and (max-width: $breakpoint-xl) {
	// override container class to fix margins
	.container {
		max-width: 95% !important;
	}
}
</style>
