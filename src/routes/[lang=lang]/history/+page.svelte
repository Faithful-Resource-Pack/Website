<script lang="ts">
	const options = [
		{ title: "Minecraft Alpha v1.2.0 “The Halloween Update” is released.", time: "OCTOBER 30, 2010", background: "true" },
		{ title: "Vattic creates the original Faithful 32x32 post on the Minecraft Forums. The version available for download back then was still unfinished.", time: "NOVEMBER 6, 2010" },
		{ title: "Faithful 32x receives its first ever update, finishing all item textures then present in the game.", time: "NOVEMBER 14: 2010" },
		{ title: "Vattic gains his first community contributors. Ores are one of the notable textures to have been community-made. Kristoffer Zetterstrand, the original author of Minecraft's paintings, also allows Vattic to use downscaled versions of them for Faithful.", time: "LATE 2010" },
		{ title: "Faithful continued to receive updates and gain traction throughout 2011." },
		{ title: "Vattic is in his prime, being very active in the development of Faithful. He starts work on adding official mod support to the pack. He also begins building the original faithful32x32.com site, which would later be used for hosting various downloads. However, the front page would never be finished.", time: "2012" },
		{ title: "AntVenom releases the first version of his Faithful edit, FaithfulVenom.", time: "AUGUST 12, 2012" },
		{ title: "Mod support downloads are added to faithful32x32.com.", time: "LATE 2012/2013" },
		{ title: "Faithful is updated to support Minecraft 1.5.", time: "MARCH 8, 2013" },
		{ title: "Vattic updates Faithful for Minecraft 1.6.", time: "JUNE 30, 2013" },
		{ title: "With Vattic's permission, users with the names SteelBrother and SLembas publish the first official port of Faithful 32x to Minecraft: Pocket Edition on the Minecraft Forums.", time: "SEPTEMBER 17, 2013" },
		{ title: "The above mentioned Pocket Edition port would spark Faithful's first major controversy. SteelBrother and SLembas had been using monetised download links for the pack, which Vattic was strongly against. This would eventually cause Vattic to change the Faithful license.", time: "LATE 2013–EARLY 2014" },
		{ title: "Vattic finishes updating Faithful to 1.7.", time: "JUNE 25: 2014" },
		{ title: "Towards the end of 2014, Vattic's real-life situation had begun to worsen. His PC was in storage and his laptop had display issues, making texture creation difficult. He could do little more than approve textures other community members had made." },
		{ title: "Vattic releases the first part of 1.8 support for the pack.", time: "SEPTEMBER 1, 2014" },
		{ title: "Minecraft 1.8 is released.", time: "SEPTEMBER 2, 2014", background: "true" },
		{ title: "While adding more contributor textures for the 1.8 update, Vattic discovered that SLembas had submitted textures originating in the Lithos resource pack – without any permission to do so. SLembas lost Vattic's trust, and the offending textures were removed. Among other things, this drama contributed greatly to Vattic's eventual burnout.", time: "SEPTEMBER 2014" },
		{ title: "Vattic publishes his last update to Faithful on the Minecraft Forums. He would continue working on additional updates to the pack, however they would never be finished or released to the public.", time: "NOVEMBER 9, 2014" },
		{ title: "In several blog posts to the Faithful Minecraft Forum page, Vattic mentions working on an enhancement add-on pack taking advantage of MCPatcher features and the then-newly-introduced vanilla model system. A preview would be released to download later, but the pack would never be finished.", time: "LATE 2014" },
		{ title: "In early 2015, hard times fell upon Vattic. He had to work long hours and had to rely on friends and family for accommodation. Despite this, he kept updating everyone about his situation on the Minecraft Forums." },
		{ title: "Vattic makes his last ever post to the Faithful forum thread. He talks about planning to support 1.9 as soon as snapshots start releasing. Ultimately, this would never be realised as Vattic stopped being active on social media soon after.", time: "JULY 6, 2015" },
		{ title: "In response to Vattic's absence, several attempts at making add-on packs for Faithful with updated textures appear. Notable examples include tylerhyperHD's Faithful 32x Reborn and Kraineff's (then known as TheVizzy) pack. Kraineff would later accept outside contributions to his add-on for while updating it to 1.10.", time: "LATE 2015–EARLY 2016" },
		{ title: "Minecraft 1.9 is released.", time: "FEBRUARY 29, 2016", background: "true" },
		{ title: "Despite having no permission from Vattic to do so, Kraineff decides to take matters into his own hands with the 1.10 pack. He merges his add-on with the main Faithful pack and uploads it to CurseForge, claiming to be its sole new owner and maintainer. He would later use fabricated evidence to justify this.", time: "AUGUST 14, 2016" },
		{ title: "Kraineff continues to update Faithful throughout the rest of 2016 and 2017 mostly by himself. He starts adding more and more community contributions as time goes by." },
		{ title: "Jappa releases the initial draft of the Texture update, which would go on to overhaul all Minecraft textures.", time: "DECEMBER 2017", background: "true" },
		{ title: "Kraineff creates a Discord server for Faithful with the goals of building a community surrounding the pack and updating the pack more quickly with the texture update poised to require much work to redo nearly all textures. A dedicated channel is also established specifically to let members vote on submitted textures.", time: "MAY 2018" },
		{ title: "Offroaders123 publishes his unofficial Faithful port for Minecraft Bedrock Edition, which eventually becomes the most popular and legitimate Faithful port for those platforms.", time: "AUGUST 20, 2018" },
		{ title: "Faithful gets uploaded to the Minecraft Bedrock Marketplace, with its price being set to the maximum of $8. This made it the most expensive pack on the marketplace, and for a pack using mostly Vattic's work, Kraineff began to be called into question.", time: "FEBRUARY 26, 2019" },
		{ title: "ibxtoycat releases a video discussing whether the 8$ price tag was justified for Faithful on the Marketplace. Offroaders123 also pulls his Bedrock pack from any public listings in fear of copyright claims from Kraineff.", time: "EARLY MARCH 2019" },
		{ title: "A user by the name of LethalChicken joins the Faithful Discord. Eventually, he starts submitting textures with an art style differing drastically from the ones present in Faithful at the time. Even though his textures would often be disliked by the community, Kraineff liked them and would add them anyway. Over time, massive amounts of his art would be included in the pack. Due to this, most other artists would adapt their art style to match LethalChicken's, leading to the adoption of the modern Faithful style we know today.", time: "JULY 2019" },
		{ title: "to be continued" }
	];
</script>

<div class="container">
    <h1 class="text-center">Faithful's History</h1>

	<div class="timeline">
		{#each options as option}
			<div class="timeline-item">
				<p class="timeline-date {option.background ? "text-background" : ""}">{option.time || ""}</p>
				<div class="timeline-seperator">
					<span class="timeline-dot"></span>
					<span class="timeline-connector"></span>
				</div>
				<p class={option.background ? "text-background" : ""}>{option.title}</p>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.timeline {
		display: flex;
    	flex-direction: column;

		&-item {
			display: flex;
		}

		p {
			flex: 1;
			margin: 0 12px 30px 12px;
		}

		&-date {
			text-align: right;
		}

		&-seperator {
			align-items: center;
    		display: flex;
    		flex: 0;
    		flex-direction: column;
		}

		&-dot {
    		background-color: #fff;
    		border: 2px solid #fff;
    		border-radius: 50%;
    		margin: 8px 0;
    		padding: 4px;
		}

		&-connector {
			background-color: #bdbdbd;
    		flex-grow: 1;
    		width: 2px;
		}
	}

    p {
        font-size: 20px;
    }

	:global(html.light .text-background) {
		color: #5f5f5f !important;
	}

	.text-background {
		color: #9e9e9e;
	}

	:global(html.light .timeline-dot) {
		background-color: #000 !important;
    	border: 2px solid #000 !important;
	}
</style>