<script setup>
definePageMeta({
	layout: "text-container",
});
</script>

<template>
	<h1 class="title mt-5 text-center">Faithful License</h1>
	<p class="h3 text-center mb-3">
		Version 4 - Jul 31, 2026
		<br />
		Copyright © Faithful Resource Pack
	</p>
	<nuxt-link
		class="btn btn-secondary btn-more mb-5"
		to="https://database.faithfulpack.net/packs/LICENSE.txt"
	>
		<v-icon size="small" icon="mdi-download" />
		<span class="ml-2">Download License</span>
	</nuxt-link>
	<div class="card card-body body-text">
		<p>
			We (Faithful) encourage using and modifying our work for your own projects. That being said,
			there are a few ground rules to keep things fair for our artists and developers. In general,
			you'll be fine if you're being honest about what you're using and aren't trying to take
			advantage of our policies or contributors.
		</p>
		<h2>You may do the following:</h2>
		<ol>
			<li>
				Use, modify, and distribute our work for both Minecraft and non-Minecraft projects. This
				includes but is not limited to adventure maps, mods, server resource packs, content creator
				edits, and your own games or software.
			</li>
			<li>Use our work as reference material or inspiration for your own projects.</li>
			<li>Use our work as placeholder content.</li>
			<li>Produce monetized videos or streams that use our packs.</li>
		</ol>
		<h2>Requirements if doing any of the above:</h2>
		<ol>
			<li>
				Give clear credit to us in an appropriate and obvious place. This could be in a video or
				listing description, a project README or credits.txt file, or a resource pack's pack.mcmeta
				or manifest.json.
			</li>
			<li>
				Provide a clearly visible link to our website (<nuxt-link href="/"
					>https://faithfulpack.net</nuxt-link
				>).
			</li>
			<li>
				Be honest and clear about what you reference or use. When possible, don't just say that
				"some textures are from Faithful" with no further information; instead, try to cite the
				specific resource pack and content being used.
			</li>
			<li>
				Only use what you need to use. If you're making a resource pack that's mostly unmodified
				Faithful textures, consider making it an add-on that gets overlaid on top of a base pack
				instead.
			</li>
			<li>
				Either include an unmodified copy of the
				<a href="https://database.faithfulpack.net/packs/LICENSE.txt">license text file</a> or a
				link to this page with all project distributions.
			</li>
		</ol>
		<h2>You may not do the following:</h2>
		<ol>
			<li>
				Lock content using or modifying our work behind a paywall. This includes the Minecraft
				Marketplace and platforms like Patreon or Ko-fi.
			</li>
			<li>
				Use monetized download links or link shorteners. You can use reward systems offered by
				listing websites like CurseForge and Modrinth if your content is mostly your own, but avoid
				these if it's mostly unoriginal or simple edits.
			</li>
			<li>
				Indirectly take donations for content directly inspired by or based on our work. If
				Faithful-related content is one small aspect of a larger creation portfolio from which you
				receive donations, it's probably fine, but don't make our work the main reason or entire
				basis for donating to you.
			</li>
			<li>
				Use our work as a substitute for Minecraft's graphics when default textures otherwise
				wouldn't be allowed. It makes us look bad when Faithful is only seen as a free-to-use
				project that looks fairly similar to Minecraft's art, so if Mojang wouldn't want you to use
				their work, we probably don't either.
			</li>
			<li>
				Make your projects look official when they aren't. Don't copy our branding or misleadingly
				call a project "official" in a way that would confuse an average user into believing we
				officially run or endorse it.
			</li>
			<li>Use our work in cryptocurrency or NFT-based projects.</li>
			<li>Train neural networks or AI models on our work.</li>
		</ol>
		<h2>Exceptions:</h2>
		<ol>
			<li>
				Private projects that use our work don't have to follow our requirements, since you aren't
				gaining unfairly from us in any way. These include resource pack edits, texture
				compilations, and add-ons made exclusively for personal use, in addition to resource packs
				for small private Minecraft servers.
			</li>
			<li>
				This license does not exhaustively apply to all Faithful services or projects. Always check
				the specific terms of the project you're interested in before assuming this license applies
				to it.
			</li>
		</ol>
		<h2>We reserve the right to:</h2>
		<ol>
			<li>
				Refuse any person or group the ability to use, distribute, or modify any of our work. This
				action is final, but would generally only be used in the case of unusual situations.
			</li>
			<li>Take legal action if you don't comply with these terms.</li>
			<li>Change this license at any time and for any reason.</li>
		</ol>
		<p>
			Still have questions? Contact us by email at
			<a href="mailto:contact@faithfulpack.net">contact@faithfulpack.net</a>.
		</p>
	</div>
</template>
