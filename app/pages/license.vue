<template>
	<h1 class="title mt-5 text-center">Faithful License</h1>
	<h3 class="text-center mb-3">
		Version 3 - 20th February 2023
		<br />
		Copyright © Faithful Resource Pack
	</h3>
	<div class="license-download">
		<nuxt-link
			class="btn block btn-secondary mb-5"
			to="https://database.faithfulpack.net/packs/LICENSE.txt"
		>
			<v-icon size="small" icon="mdi-download" />
			<span class="ml-2">Download License</span>
		</nuxt-link>
	</div>
	<h2>You may do the following:</h2>
	<ol>
		<li><p>Use our work as placeholders.</p></li>
		<li>
			<p>
				Use our work as a base or reference for your own content (e.g. modded textures, content
				creator edits).
			</p>
		</li>
		<li>
			<p>
				Use a few textures that you cannot properly make, such as painting or particle textures.
			</p>
		</li>
		<li>
			<p>Distribute a modified copy of a pack as a content creator with your videos or streams.</p>
		</li>
		<li>
			<p>Use our work for adventure maps, server resource packs, mod textures, or data packs.</p>
		</li>
	</ol>
	<h2>By doing any of the above, you agree to follow these requirements:</h2>
	<ol>
		<li>
			<p>
				Give clear credit in an appropriate place (e.g. video descriptions, pack.mcmetas, listing
				descriptions).
			</p>
		</li>
		<li>
			<p>
				Link back to our website, which you can find here:
				<nuxt-link to="https://faithfulpack.net/">https://faithfulpack.net/</nuxt-link>
			</p>
		</li>
		<li>
			<p>
				Don't take credit for work you didn't make and always give proper attribution to any work
				you use or modify. In addition, try to be somewhat specific about what you're using, as "GUI
				originally from Faithful 32x" works a lot better than "some textures from Faithful". Just be
				honest about what you're using, use common sense when in doubt, and you'll be fine.
			</p>
		</li>
		<li>
			<p>
				Do not monetize content that contains any of our work, modified or not, under any
				circumstances. This includes locking your content behind a paywall (including the Minecraft
				Marketplace) or monetizing download links. Taking voluntary donations is still allowed, but
				if it feels like you're profiting off our work don't do it.
			</p>
		</li>
		<li>
			<p>
				Don't make your projects look official when they aren't. Examples of this behavior would
				include copying our branding or marking a project as "official" in a way that would confuse
				the average viewer into believing a project is official when it isn't.
			</p>
		</li>
		<li>
			<p>
				<nuxt-link to="https://database.faithfulpack.net/packs/LICENSE.txt">This file</nuxt-link>,
				unmodified, must be included in any content which contains any of our work.
			</p>
		</li>
	</ol>
	<h2>Exceptions:</h2>
	<ol>
		<li>
			<p>
				If you're doing anything privately or undistributed to our work (e.g. custom edit for
				personal use, unpublished add-ons, mod support, personal Minecraft server resource pack, or
				edits either by you or from different packs) you can safely disregard all of these
				requirements since you are not gaining unfairly from us in any form.
			</p>
		</li>
		<li>
			<p>
				Projects not directly related to textures (e.g. website, bot) may have separate licenses
				with different terms. Check their respective pages or repositories for more information. If
				nothing is mentioned, assume that all rights remain reserved.
			</p>
		</li>
		<li>
			<p>
				If you are using textures made before March 2016 (Minecraft Release 1.9). These textures are
				licensed under Vattic's original Faithful 32x32 license, which has different requirements
				compared with this license. If you're interested, you can find the original license here
				under "Usage Guidelines":
				<nuxt-link
					to="https://web.archive.org/web/20150607220656/http://www.minecraftforum.net:80/forums/mapping-and-modding/resource-packs/1223254-faithful-32x32-pack-update-red-cat-clay-1-8"
				>
					https://web.archive.org/web/20150607220656/http://www.minecraftforum.net:80/forums/mapping-and-modding/resource-packs/1223254-faithful-32x32-pack-update-red-cat-clay-1-8
				</nuxt-link>
			</p>
		</li>
	</ol>
	<h2>We reserve the right to:</h2>
	<ol>
		<li>
			<p>
				Refuse the ability to use, distribute, or modify any work made by us for any person or
				group. This action would be final, generally only in the case of unusual circumstances.
			</p>
		</li>
		<li><p>Take legal action if you do not comply with these guidelines.</p></li>
		<li><p>Change this license at any time for any reason.</p></li>
	</ol>
</template>

<style scoped lang="scss">
ol {
	list-style-position: outside;
}

.license-download {
	width: 75%;
	margin-right: auto;
	margin-left: auto;
}
</style>
