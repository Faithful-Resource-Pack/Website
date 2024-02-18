<script lang="ts">
	import { parseMd } from "$lib/shortMd";

	let innerWidth: number;

	// have fun translating this
	// missing mobile layout
	// also someone needs to mark which events are important
	const options = [
		{
			text: "Minecraft Alpha v1.2.0 “The Halloween Update” is released.",
			year: 2010,
			time: "October 30",
			importance: "low",
		},
		{
			text: "Vattic creates the original Faithful 32x32 post on the Minecraft Forums. The version available for download back then was still unfinished.",
			year: 2010,
			time: "November 6",
			importance: "normal",
			references: [
				"https://web.archive.org/web/20150701024216/http://www.minecraftforum.net/forums/mapping-and-modding/resource-packs/1223254-faithful-32x32-pack-update-red-cat-clay-1-8",
			],
		},
		{
			text: "Faithful 32x receives its first ever update, finishing all item textures then present in the game.",
			year: 2010,
			time: "November 14",
			importance: "important",
			references: [
				"https://web.archive.org/web/20150701024216/http://www.minecraftforum.net/forums/mapping-and-modding/resource-packs/1223254-faithful-32x32-pack-update-red-cat-clay-1-8?comment=6",
			],
		},
		{
			text: "Vattic gains his first community contributors, with Zombuster's ores being one of the first textures contributed. Kristoffer Zetterstrand, the original author of Minecraft's paintings, also allows Vattic to use downscaled versions of them for Faithful.",
			year: 2010,
			time: "Late 2010",
			importance: "normal",
		},
		{ text: "Minecraft Beta 1.0 is released.", year: 2010, time: "December 14", importance: "low" },
		{
			text: "Faithful continued to receive updates and gain traction throughout 2011.",
			year: 2011,
			importance: "normal",
		},
		{ text: "Minecraft Beta 1.7.3 is released.", year: 2011, time: "July 8", importance: "low" },
		{ text: "Minecraft 1.0.0 is released.", year: 2011, time: "November 18", importance: "low" },
		{
			text: "Vattic is very active in the development of Faithful. He starts work on adding official mod support to the pack and builds the first Faithful site at faithful32x32.com. While this was initially planned to be used much more, it would only ever really host downloads and mod support packs, as the front page would never even be completed before Vattic's disappearance.",
			year: 2012,
			importance: "normal",
			references: ["https://web.archive.org/web/20121125105237/http://www.faithful32x32.com/"],
		},
		{
			text: "HiTeeN becomes the first person to make a 64x64 texture pack based on Vattic's textures. At first it's met with backlash for not being original enough, but the pack would later receive Vattic's personal approval.",
			year: 2012,
			time: "August 3",
			importance: "normal",
			references: [
				"https://www.minecraftforum.net/forums/mapping-and-modding-java-edition/resource-packs/1242446-faithful-64x64",
			],
		},
		{
			text: "AntVenom, a popular content creator on YouTube, releases the first version of his Faithful edit, FaithfulVenom.",
			year: 2012,
			time: "August 12",
			importance: "normal",
			references: ["https://www.youtube.com/watch?v=CcJIAQ-syOQ"],
		},
		{
			text: "Mod support downloads are added to faithful32x32.com.",
			year: 2012,
			time: "Late 2012/2013",
			importance: "normal",
			references: [
				"https://web.archive.org/web/20130103002249/http://www.faithful32x32.com/modsupport.html",
			],
		},
		{
			text: "Faithful is updated to support Minecraft 1.5 and 1.6.",
			year: 2013,
			time: "Mid 2013",
			importance: "normal",
		},
		{
			text: "Minecraft 1.7.2 “The Update that Changed the World” is released.",
			year: 2013,
			time: "October 25",
			importance: "low",
		},
		{
			text: "With Vattic's permission, users SteelBrother and SLembas publish the first official port of Faithful 32x to Minecraft: Pocket Edition on the Minecraft Forums.",
			year: 2013,
			time: "September 13",
			importance: "normal",
			references: [
				"https://web.archive.org/web/20140317094133/http://www.minecraftforum.net/topic/2211976-08132xandroidiosfaithful-32x32-pe-update-bug-report/",
			],
		},
		{
			text: "The above mentioned Pocket Edition port would spark Faithful's first major controversy. SteelBrother and SLembas had been using monetised download links for the pack, which Vattic was strongly against. This would eventually cause Vattic to change the Faithful license.",
			year: 2013,
			time: "Late 2013 – Early 2014",
			importance: "normal",
			references: [
				"https://github.com/mullak99s-Faithful/mullak99sFaithful/commit/abe7c07c8743a85f536c68e822693b638029f226",
			],
		},
		{
			text: "HiTeeN is forced to abandon his Faithful 64x due to being drafted to the military. He would eventually return to the Internet but he would never resume work on the pack.",
			year: 2014,
			time: "June 15",
			importance: "normal",
			references: [
				"https://www.minecraftforum.net/forums/mapping-and-modding-java-edition/resource-packs/1242446-faithful-64x64?comment=886",
			],
		},
		{
			text: "Vattic finishes updating Faithful to 1.7.",
			year: 2014,
			time: "June 25",
			importance: "normal",
		},
		{
			text: "Towards the end of 2014, Vattic's real-life situation had begun to worsen. His PC was in storage and his laptop had display issues, making texture creation difficult. He could do little more than approve textures other community members had made.",
			year: 2014,
			importance: "normal",
		},
		{
			text: "Vattic releases the first part of 1.8 support for the pack.",
			year: 2014,
			time: "September 1",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1105993574438424636/Screen_Shot_2023-05-10_at_4.03.32_PM.png",
			],
		},
		{
			text: "Minecraft 1.8 “The Bountiful Update” is released.",
			year: 2014,
			time: "September 2",
			importance: "low",
		},
		{
			text: "While adding more contributor textures for the 1.8 update, Vattic discovered that SLembas had submitted textures originating in the Lithos resource pack – without any permission to do so. SLembas lost Vattic's trust, and the offending textures were removed. Among other things, this drama contributed greatly to Vattic's eventual burnout.",
			year: 2014,
			time: "September",
			importance: "normal",
			references: [
				"https://web.archive.org/web/20180118194335/http://www.minecraftforum.net/members/Vattic/posts?page=2",
			],
		},
		{
			text: "Vattic publishes his last update to Faithful on the Minecraft Forums. He would continue working on additional updates to the pack, however they would never be finished or released to the public.",
			year: 2014,
			time: "November 9",
			importance: "normal",
		},
		{
			text: "In several blog posts to the Faithful Minecraft Forum page, Vattic mentions working on an enhancement add-on pack taking advantage of MCPatcher features and the then-newly-introduced vanilla model system. A preview would be released to download later, but the pack would never be finished.",
			year: 2014,
			time: "Late 2014",
			importance: "normal",
			references: [
				"https://web.archive.org/web/20180117131647/http://www.minecraftforum.net/members/Vattic/posts#post:ForumPosts",
			],
		},
		{
			text: "In early 2015, hard times fell upon Vattic. He had to work long hours and had to rely on friends and family for accommodation. Despite this, he kept updating everyone about his situation on the Minecraft Forums.",
			year: 2015,
			time: "Early 2015",
			importance: "normal",
		},
		{
			text: "Vattic makes his last ever post to the Faithful forum thread. He talks about planning to support 1.9 as soon as snapshots start releasing. Ultimately, this would never be realised as Vattic stopped being active on social media soon after.",
			year: 2015,
			time: "July 6",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1105993245147811870/Screen_Shot_2023-05-10_at_4.02.09_PM.png",
			],
		},
		{
			text: "In response to Vattic's absence, several attempts at making add-on packs for Faithful with updated textures appear. Notable examples include tylerhyperHD's Faithful 32x Reborn and Kraineff's (then known as TheVizzy) pack. Kraineff would later accept outside contributions to his add-on while updating it to 1.10.",
			year: 2015,
			time: "Late 2015 – Early 2016",
			importance: "normal",
			references: [
				"https://github.com/tylerhyperHD/Vattics-Faithful-32x-Reborn-for-1.9",
				"https://minecraft-inside.com/minecraft-resource-packs/13-faithful-32x.html",
			],
		},
		{
			text: "Minecraft 1.9 “The Combat Update” is released.",
			year: 2016,
			time: "February 29",
			importance: "low",
		},
		{
			text: "Despite having no permission from Vattic to do so, Kraineff decides to take matters into his own hands with the 1.10 pack. He merges his add-on with the main Faithful pack and uploads it to CurseForge, claiming to be its sole new owner and maintainer. He would later use fabricated evidence to justify this.",
			year: 2016,
			time: "August 14",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1105992785426915408/Screen_Shot_2023-05-10_at_4.00.22_PM.png",
				"https://cdn.discordapp.com/attachments/449853256294727680/467629992470118400/browser_2018-07-13_02-37-08.png",
			],
		},
		{
			text: "Kraineff continues to update Faithful throughout the rest of 2016 and 2017 mostly by himself. He starts adding more and more community contributions as time goes by.",
			year: 2016,
			importance: "normal",
		},
		{
			text: "Minecraft 1.12 “The World of Colour Update” is released.",
			year: 2017,
			time: "June 7",
			importance: "low",
		},
		{
			text: "Jappa releases the initial draft of the Texture update, which would go on to overhaul all Minecraft textures.",
			year: 2017,
			time: "December",
			importance: "low",
		},
		{
			text: "Kraineff creates a Discord server for Faithful with the goals of building a community surrounding the pack and updating the pack more quickly with the texture update poised to require much work to redo nearly all textures. A dedicated channel is also established specifically to let members vote on submitted textures.\nTo help him with management of Faithful, Kraineff soon promotes an user called Ninventoo to an Administrator position and grants him editing access to the Faithful website.",
			year: 2018,
			time: "May",
			importance: "normal",
		},
		{
			text: "Minecraft 1.13 “Update Aquatic” is released.",
			year: 2018,
			time: "July 18",
			importance: "normal",
		},
		{
			text: "Offroaders123 publishes his unofficial Faithful port for Minecraft Bedrock Edition, which eventually becomes the most popular and legitimate Faithful port for those platforms.",
			year: 2018,
			time: "August 20",
			importance: "normal",
			references: ["https://youtu.be/kgZYBTlwaVs?t=246"],
		},
		{
			text: "Faithful gets uploaded to the Minecraft Bedrock Marketplace, with its price being set to the maximum of $8. This made it the most expensive pack on the marketplace, and for a pack using mostly Vattic's work, Kraineff began to be called into question.",
			year: 2019,
			time: "February 26",
			importance: "normal",
			references: [
				"https://www.reddit.com/r/MCPE/comments/av2xgd/faithful_x32_now_on_marketplace/",
			],
		},
		{
			text: "ibxtoycat releases a video discussing if Faithful's $8 price tag was justified on the Marketplace. Offroaders123 also pulls his Bedrock pack from any public listings in fear of copyright claims from Kraineff.",
			year: 2019,
			time: "Early March",
			importance: "normal",
			references: ["https://youtu.be/bHhD2Fyc1hc", "https://youtu.be/kgZYBTlwaVs?t=311"],
		},
		{
			text: "Minecraft 1.14 “Village & Pillage” is released.",
			year: 2019,
			time: "April 23",
			importance: "low",
		},
		{
			text: "Faithful is updated to support 1.14 the Village and Pillage Update, marking the first full release of the pack with Texture Update art. At this time however, many programmer art textures still remained unchanged. Many of these would stay in Faithful until late 2020.",
			year: 2019,
			time: "April 26",
			importance: "normal",
			references: [
				"https://web.archive.org/web/20190830144145/https://faithful.team/news/2019-04-26-faithful-1-14-v1/",
			],
		},
		{
			text: "A user by the name of LethalChicken joins the Faithful Discord. Eventually, he starts submitting textures with an art style differing drastically from the ones present in Faithful at the time. Even though his textures would often be disliked by the community, Kraineff preferred them and would add them anyway. Over time, massive amounts of his art would be included in the pack. Due to this, most other artists would adapt their art style to match LethalChicken's, leading to the adoption of the modern Faithful style we know today.",
			year: 2019,
			time: "July",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1111968345055563787/image.png",
				"https://discord.com/channels/316475124616527882/449853256294727680/607114568459747339",
				"https://cdn.discordapp.com/attachments/875553600670162955/1111970465217523802/image.png",
				"https://discord.com/channels/316475124616527882/449853256294727680/618983816337293353",
			],
		},
		{
			text: "A separate Discord server is created for Faithful add-on packs. This is where they'd be hosted prior to Kraineff's website update.",
			year: 2019,
			time: "August",
			importance: "normal",
		},
		{
			text: "Minecraft 1.15 “Buzzy Bees” is released.",
			year: 2019,
			time: "December 10",
			importance: "normal",
		},
		{
			text: "Kraineff becomes increasingly more hands-off during this period, eventually leaving all the needed work to community contributions. Despite this, he maintains his online presence.",
			year: 2019,
			time: "Late 2019 – Early 2020",
			importance: "normal",
		},
		{
			text: "Minecraft Dungeons is released, and another separate Discord server is created to port Faithful 32x and to research Minecraft: Dungeons modding. This new project, dubbed Faithful: Dungeons, would however remain stagnant for some time due to the lack of modding tools for the game.",
			year: 2020,
			time: "May 26",
			importance: "normal",
		},
		{
			text: "Kraineff migrates the Faithful website to a new framework. Due to this change, he's able to allow the community to submit add-ons to the site. He puts Sei in charge of approving add-ons and creating website posts for them.",
			year: 2020,
			time: "April",
			importance: "normal",
		},
		{
			text: "Pomi108, a contributor and one of the to-be Faithful managers, questions Kraineff's authority on multiple occasions and is repeatedly banned for it. Other moderators, disagreeing with Kraineff's decisions, subsequently unban her. This happens several times. During the same period, LethalChicken is also banned many times by the moderators for breaking actual server rules (being toxic/rude etc.) but is pardoned by Kraineff each time, presumably for having a high stake in Faithful at the time.\nThis behaviour painted Kraineff as a hypocrite in many people's eyes, and they grew increasingly unsatisfied with his administration.",
			year: 2020,
			time: "Early - Mid 2020",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1108520583337091162/Screen_Shot_2023-05-17_at_3.24.54_PM.png",
			],
		},
		{
			text: "Minecraft 1.16 “The Nether Update” is released.",
			year: 2020,
			time: "June 23",
			importance: "low",
		},
		{
			text: "Harya, a well-known contributor, starts a new resource pack project: Faithful 64x. JogurciQ had initially helped Harya with textures but left before the pack's first release. Eventually, a Discord server separate from the main one would be created for it. Kraineff would approve of this initially, but would later deny any involvement with it.\nAt around the same time, a user called FHLX starts his own Faithful 64x variant and names it **EM64D**. Its textures originally being simple bilinear upscales of existing 32x textures, the pack would later be renamed to Faithful Traditional and shift its focus towards recreating Vattic's style in 64x. This would lay the foundation for what would eventually become Classic Faithful as we know it today.",
			year: 2020,
			time: "July 5",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1108520115839975434/Screen_Shot_2023-05-17_at_3.23.04_PM.png",
				"https://cdn.discordapp.com/attachments/875553600670162955/1108519780715089951/Screen_Shot_2023-05-17_at_3.21.44_PM.png",
			],
		},
		{
			text: "Thanks to the release of the Minecraft: Dungeons Mod Kit by the Dokucraft Team, work on Faithful: Dungeons is able to begin. The mod would see the first beta release shortly after.\nIn addition, a Discord bot to assist with community voting and Dungeons modding is created for the project. This would eventually become **CompliBot**, used today on the modern Faithful Discord servers.",
			year: 2020,
			time: "Summer",
			importance: "normal",
		},
		{
			text: "Due to Kraineff's absence, Sei makes use of his ability to create posts on the website and starts compiling and publishing new revisions of Faithful himself by compiling the latest submitted textures. This is a welcome change for the community.",
			year: 2020,
			time: "Mid 2020",
			importance: "normal",
		},
		{
			text: "Having previously obtained permission from HiTeeN to use his textures, FHLX publishes the first release of EM64D.",
			year: 2020,
			time: "October 16",
			importance: "normal",
			references: ["https://www.planetminecraft.com/texture-pack/classic-faithful-64x/"],
		},
		{
			text: "Kraineff returns to the server and is outraged to see what's been happening during his time away. He goes on to remove most moderators' permissions, leaving only a loyal handful with any sort of power.\nNaturally, people take notice and start talking about current events on the server. After some initial arguments and confrontations with him, Kraineff bans Pomi108 and then everyone who dared speak against him, stating that \"he's banning toxic people\", and that \"he doesn't want democracy here\".\nA direct message group is created to attempt direct negotiation with Kraineff, however he proves to be unable to take any criticism whatsoever. Juknum, one of the first banned members, creates a new Discord server as a result. Many other users would follow and join soon. This server would later become the current Faithful server as we know it.\nFinally, as the day is coming to a close, a large-scale boycott of Kraineff and a mass exodus from his server is organised on all the smaller sister servers that had been partnered with Faithful up to that point, but were never under Kraineff's control. Faithful Traditional also renamed back to EM64D and entirely cut ties with Kraineff. Over the coming days, most prominent artists from the community would hear the call and move to the newly established server.",
			year: 2020,
			time: "November 5",
			importance: "normal",
			references: [
				"https://drive.google.com/file/d/1q8RcgaCcvhdyU8oEu6HP8INF8S2yUkzg/view",
				"https://drive.google.com/file/d/1mrHIZUd7s_xfOu1Ziay--FjkpeP58rjg/view",
				"https://cdn.discordapp.com/attachments/774035395246817311/866408757055193128/Snimek_obrazovky_2020-09-09_v_15.30.30.png",
				"https://media.discordapp.net/attachments/433512481005240324/1101559743178350672/Snimek_obrazovky_2023-04-28_v_19.23.14.png",
			],
		},
		{
			text: "In the new server, the community is trying to figure its new identity and direction out. Most of the day is spent talking about the future of the project. Eventually it becomes clear that seizing control of Faithful from Kraineff wouldn't be immediately possible, and as such it would be necessary to continue as a separate project for the time being. Several ideas for a new name are discussed, but one comes out on top – **Compliance**. (Other proposals included Authentic, Loyal, Ardent, Essential and Pristine.)\nMeanwhile, in the old Faithful server, Kraineff lies about owning the Faithful name as a registered trademark. This would soon be proved completely false.",
			year: 2020,
			time: "November 6",
			importance: "normal",
			references: [
				"https://media.discordapp.net/attachments/774035395246817311/774072710426787891/unknown.png?width=904&height=97",
			],
		},
		{
			text: "The project name is voted on and confirmed by the community. A logo concept that was drafted by JogurciQ and KateSixtyThree would later be adapted and subsequently formally accepted as the official branding.\nHarya and Faithful 64x also join Compliance's cause, rebranding to Compliance 64x.",
			year: 2020,
			time: "November 6 - 13",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/433512481005240324/1101563511978610738/Snimek_obrazovky_2023-04-28_v_19.39.36.png",
				"https://cdn.discordapp.com/attachments/433512481005240324/1101563511664021605/Snimek_obrazovky_2023-04-28_v_19.39.44.png",
				"https://cdn.discordapp.com/attachments/433512481005240324/1101563511332679751/Snimek_obrazovky_2023-04-28_v_19.39.56.png",
			],
		},
		{
			text: "Having gathered viable textures from the old server's texture submission channel and several other sources, large community votes are held to determine the base of the to-be Compliance resource pack.",
			year: 2020,
			time: "November 14 - 18",
			importance: "normal",
		},
		{
			text: "The first Alpha of Compliance 32x is released to the public. This build was compiled from the textures that had been voted on, as well as many edits made by the newly-established Art Director Council. Alphas would continue to be released almost every week until January 2021.",
			year: 2020,
			time: "November 24",
			importance: "normal",
			references: [
				"https://faithfulpack.net/compliance32x/A1",
				"https://discord.com/channels/773983706582482946/773993493562785812/780887476951842886",
			],
		},
		{
			text: "After bouncing between multiple acronyms, FHLX creates the Emulated Vattic (EM) project as a wider family for EM64D. Plans for a 32x pack also begin, but FHLX is unsuccessful in finding a manager for the time being.",
			year: 2020,
			time: "December 17",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1106792840484376696/Screen_Shot_2023-05-12_at_8.59.31_PM.png",
				"https://cdn.discordapp.com/attachments/875553600670162955/1105992080926441473/Screen_Shot_2023-05-10_at_3.57.35_PM.png",
			],
		},
		{
			text: "As a part of their effort to contact Vattic, several Compliance users (Cituation, TheRandomGamer and FHLX) make an issue post on his only GitHub repository. To everyone's surprise, Vattic responds. What he says in his message would absolutely shatter everyone's beliefs up to that point:\n\n*\"Hello, I never gave anyone permission to keep the pack going. My disappearance is complicated and I'll not go into it here. I am open to talk about what is going on. Might be best to move things onto a private channel.\"*\n\nVattic is soon reached via Discord, where he's able to prove his identity with original Faithful texture PSD files as well as other means. He confirms that the Twitter conversation screenshot that Kraineff had been using to justify his leader position at Faithful is completely fake – and that he'd been lying to everyone for years.\nThis was huge news. Kraineff having doctored the screenshot meant that potentially millions from Faithful's Marketplace and CurseForge listings had been made without any permission from Vattic whatsoever. Kraineff's actions were both extremely morally wrong and more importantly illegal.\nEventually, it is decided to keep quiet about Vattic's return for the time being to stop Kraineff getting involved too early.",
			year: 2020,
			time: "",
			importance: "normal",
			references: [
				"https://github.com/Vattic/vattic.github.io/issues/1",
				"https://cdn.discordapp.com/attachments/790357161355640842/790357481121120286/image0.png",
				"https://cdn.discordapp.com/attachments/433512481005240324/1101820131224584253/Snimek_obrazovky_2023-04-29_v_12.38.03.png",
				"https://cdn.discordapp.com/attachments/433512481005240324/1101820130935193610/Snimek_obrazovky_2023-04-29_v_12.39.37.png",
			],
		},
		{
			text: "Compliance 32x enters its Beta stage. This update was the first to be released for Minecraft: Bedrock edition, and the first one to be published on PlanetMinecraft and CurseForge.\nThe first version of the Compliance Texturing Guidelines is also published on this date. They outlined the basic requirements for a good texture, but were too vague and would soon prove ineffective.",
			year: 2021,
			time: "January 30",
			importance: "normal",
			references: [
				"https://faithfulpack.net/compliance32x/B1",
				"https://gist.github.com/Pomi108/2257f47eb42350ba39fc6ec32548448c",
			],
		},
		{
			text: "After seeing a user called Evorp post Vattic-styled textures in the Compliance Discord, FHLX invites him to lead the 32x equivalent of EM64D. Evorp accepts, and quickly starts making textures for the pack that would become **EM32D** and ultimately **Classic Faithful 32x**.",
			year: 2021,
			time: "February 2",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1104867642868768838/Screen_Shot_2023-05-07_at_1.29.28_PM.png",
				"https://cdn.discordapp.com/attachments/875553600670162955/1104867105381285939/Screen_Shot_2023-05-07_at_1.27.20_PM.png",
			],
		},
		{
			text: "FHLX asks Vattic for permission to use his textures for EM32D and is given his blessing. This would cement the position of EM as the only true continuation of Vattic's Faithful.",
			year: 2021,
			time: "February 12",
			importance: "normal",
		},
		{
			text: "LethalChicken joins the Compliance server out of curiosity. He quickly finds out about Kraineff's lack of ownership and is outraged, since by this point he has the majority of contributions within the pack. He leaves Faithful and Kraineff shortly after and joins forces with Compliance.\nWith Kraineff's main source of textures gone, he becomes increasingly desperate to keep the pack up to date, allowing more and more questionable textures into his build of the pack and eventually falling significantly behind on updates.",
			year: 2021,
			time: "March 23",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1104844066702753943/Screen_Shot_2023-05-07_at_11.55.24_AM.png",
				"https://cdn.discordapp.com/attachments/773987767989305385/813452557372358756/image0.png",
			],
		},
		{
			text: "Evorp releases the first build of EM32D to the public. He also tries to publish it on PlanetMinecraft, but the pack is soon removed by the site moderators due to them not knowing that EM had received permission from Vattic to use his textures. Fortunately this would be able to be proven successfully and the EM32D post would be restored by June 11.",
			year: 2021,
			time: "May 23",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/814198781301096449/849105731327230027/Screen_Shot_2021-05-31_at_7.02.55_PM.png",
				"https://cdn.discordapp.com/attachments/875553600670162955/1104857362856157324/Screen_Shot_2023-05-07_at_12.48.34_PM.png",
			],
		},
		{
			text: 'The first Compliance April Fools Event takes place. For this occasion, a joke "Compliance 16x" pack is announced.',
			year: 2021,
			time: "April 1",
			importance: "normal",
			references: ["https://faithfulpack.net/compliance16x/R1"],
		},
		{
			text: "Minecraft 1.17 “Caves and Cliffs: Part 1” is released.",
			year: 2021,
			time: "June 8",
			importance: "low",
		},
		{
			text: "AntVenom asks about the increasing amount of missing textures in Faithful on a now-private Discord channel in Kraineff's server. FHLX notices his comments and sends him a direct message explaining the situation in greater detail. A group chat with the Compliance and EM managers is soon formed with the goal of bringing Kraineff's actions to light through AntVenom's reach as a content creator. Over the next few months, Compliance and EM managers work to compile evidence against Kraineff, preparing for multiple copyright strikes against Faithful on the Bedrock Marketplace upon the release of AntVenom's video.",
			year: 2021,
			time: "June 24",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1104853113204133898/Screen_Shot_2023-05-07_at_12.31.45_PM.png",
				"https://cdn.discordapp.com/attachments/875553600670162955/1104857768919318708/Screen_Shot_2023-05-07_at_12.50.14_PM.png",
			],
		},
		{
			text: "Many of the existing Compliance sister Discord servers (Mods, Tweaks, Add-ons and Dungeons) are all merged into a single server, now called Compliance Extras. This is done to increase activity and consolidate the large number of servers being maintained at once.",
			year: 2021,
			time: "July 2",
			importance: "normal",
			references: [
				"https://discord.com/channels/773983706582482946/773993493562785812/860449047394779166",
				"https://cdn.discordapp.com/attachments/875553600670162955/1105070887373394050/Snimek_obrazovky_2023-05-08_v_11.56.41.png",
			],
		},
		{
			text: "The current guidelines for making Compliance/Faithful 32x textures are introduced. Being remade from scratch since the last iteration, great care had been taken to make sure the art style of the pack would be defined as clearly as possible. Many long-standing Compliance/Faithful contributors had participated in the writing of the new guidelines, with the process taking over a month to finish.\nThe decision is also taken to enforce these guidelines much more strictly. This is a sweeping change from the preceding situation, when many non-compliant textures had been able to be submitted even though they were breaking the guidelines.",
			year: 2021,
			time: "July 19",
			importance: "normal",
			references: [
				"https://discord.com/channels/773983706582482946/773993493562785812/866671445488304168",
				"https://cdn.discordapp.com/attachments/875553600670162955/1105076952156610581/Snimek_obrazovky_2023-05-08_v_12.20.42.png",
				"https://docs.faithfulpack.net/pages/manuals/f32-texturing-guidelines",
			],
		},
		{
			text: 'Due to the above change, in an event that would come to be colloquially known as "the texture snap", many placeholder and low-quality textures that had been featured in Compliance 32x previously are removed. Beta 11 is the last update that includes the old, placeholder textures.',
			year: 2021,
			time: "July 20",
			importance: "normal",
			references: [
				"https://faithfulpack.net/compliance32x/Announcement%20Regarding%20Placeholder%20Textures",
			],
		},
		{
			text: "The EM logo is overhauled using a community vote. Multiple revisions are made to suit user feedback and the most liked one becomes the project's emblem, using the same base design as the Classic Faithful project does today. This voting procedure would create the precedent that the Faithful logo would then follow months later.",
			year: 2021,
			time: "August 6",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1104854965954031676/Screen_Shot_2023-05-07_at_12.39.03_PM.png",
				"https://cdn.discordapp.com/attachments/875553600670162955/1104855107310473306/Screen_Shot_2023-05-07_at_12.39.37_PM.png",
			],
		},
		{
			text: "A server used to publicly test a new layout for Kraineff's Discord is created by Ninventoo. This server would later serve as a redirect to Compliance servers during the events of December 2021, since many invite links would still be posted on Kraineff's server.",
			year: 2021,
			time: "August 4",
			importance: "normal",
		},
		{
			text: "The Compliance Web App is introduced, allowing for easy submission of add-ons to the website, among other things.",
			year: 2021,
			time: "August 28",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1105155270344183818/Snimek_obrazovky_2023-05-08_v_17.31.40.png",
				"https://discord.com/channels/773983706582482946/773993493562785812/881176619736268810",
			],
		},
		{
			text: "The main concept behind Faithful's logo is created by Pomi108. Further rebranding plans take place with the purchase of Faithful's future domain, https://faithfulpack.net, and the decision to utilise a logo contest to determine Compliance's future branding.",
			year: 2021,
			time: "Early September",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1104852078368661525/Screen_Shot_2023-05-07_at_12.27.39_PM.png",
				"https://cdn.discordapp.com/attachments/875553600670162955/1104869242995740702/Screen_Shot_2023-05-07_at_1.35.49_PM.png",
				"https://cdn.discordapp.com/attachments/875553600670162955/1104854241601921024/Screen_Shot_2023-05-07_at_12.36.14_PM.png",
			],
		},
		{
			text: "As a part of the ongoing anniversary celebrations, Compliance 32x releases Beta 16 with many changes and improvements, and refreshes its text logos.",
			year: 2021,
			time: "November 5",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1105158716115927141/image.png",
				"https://cdn.discordapp.com/attachments/875553600670162955/1108524674134057000/Screen_Shot_2023-05-17_at_3.41.13_PM.png",
			],
		},
		{
			text: "Minecraft 1.18 “Caves and Cliffs: Part 2” is released.",
			year: 2021,
			time: "November 30",
			importance: "low",
		},
		{
			text: "Compliance 32x is published on MCPEDL.",
			year: 2021,
			time: "December 6",
			importance: "normal",
			references: ["https://mcpedl.com/faithful-32x/"],
		},
		{
			text: "EM32D is finished. A programmer art version called EM32T is planned over the coming weeks.",
			year: 2021,
			time: "December 15",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1105999844948054037/Screen_Shot_2023-05-10_at_4.28.26_PM.png",
				"https://cdn.discordapp.com/attachments/875553600670162955/1106000456150437918/Screen_Shot_2023-05-10_at_4.30.50_PM.png",
			],
		},
		{
			text: "A year after the initial restoration of contact with Vattic, AntVenom's video is released and the Compliance and EM servers grow rapidly over the coming days.\nVattic also opens a GoFundMe, which ends up raising over £2,000.\nThe Compliance and EM managers additionally try to reason with Kraineff in a private chat, but he still refuses to relinquish the Faithful name, despite his reputation having been shattered and his Discord being locked down a few months later.\nThis inability to reason would eventually lead to Kraineff receiving multiple copyright strikes on the Bedrock Marketplace. The first would be by Vattic shortly after the video's release, using a detailed list of Vattic's textures still in Kraineff's Faithful made by Evorp a few months prior. Subsequent ones would additionally be made by Faithful contributors.",
			year: 2021,
			time: "December 19",
			importance: "normal",
			references: [
				"https://www.youtube.com/watch?v=kgZYBTlwaVs",
				"https://cdn.discordapp.com/attachments/875553600670162955/1104865411603898399/Screen_Shot_2023-05-07_at_1.20.35_PM.png",
				"https://www.gofundme.com/f/vattic-appreciation-fund?utm_source=customer&utm_medium=copy_link_all&utm_campaign=m_pd+share-sheet",
				"https://cdn.discordapp.com/attachments/875553600670162955/1107007762191351928/Screen_Shot_2023-05-13_at_11.13.33_AM.png",
				"https://cdn.discordapp.com/attachments/875553600670162955/1107008240186822727/Screen_Shot_2023-05-13_at_11.15.26_AM.png",
			],
		},
		{
			text: "In a now deleted post, Kraineff publishes a long-winded statement aimed against Compliance filled with lies and misleading information. Pomi108 responds with her own letter, debunking everything in Kraineff's write-up.",
			year: 2021,
			time: "December 22",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1108827492220932186/image.png",
				"https://ptb.discord.com/channels/773983706582482946/898289100803678228/923347747329962024",
				"https://docs.google.com/document/d/1HprLS26jNqdLCE4k_NbjS3KPz2uNQs3mf-Mx72iWEYg",
			],
		},
		{
			text: 'Emulated Vattic rebrands to Classic Faithful. EM32D is rebranded to **Classic Faithful 32x Jappa**, EM64D to **Classic Faithful 64x**, and the then-planned EM32T is changed to **Classic Faithful 32x Programmer Art**. However, Compliance would stay in a transitional period, being called "Faithful Compliance" and later "Faithful / Compliance" until a few months later.\nKraineff also removes all the files from his Faithful listing on CurseForge for unknown reasons.',
			year: 2021,
			time: "December 29",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1104865590306422804/Screen_Shot_2023-05-07_at_1.21.19_PM.png",
				"https://cdn.discordapp.com/attachments/875553600670162955/1104868387647144036/Screen_Shot_2023-05-07_at_1.32.25_PM.png",
				"https://cdn.discordapp.com/attachments/875553600670162955/1108452121055084584/image.png",
				"https://ptb.discord.com/channels/773983706582482946/773983707299184703/925861961038700665",
				"https://cdn.discordapp.com/attachments/875553600670162955/1108452737861042186/image.png",
				"https://ptb.discord.com/channels/773983706582482946/773983707299184703/925871366752833556",
			],
		},
		{
			text: "Classic Faithful 32x Programmer Art begins public development, following the completion of its Jappa counterpart a few weeks prior.",
			year: 2022,
			time: "January 1",
			importance: "normal",
		},
		{
			text: "The Compliance 64x server is merged into the Compliance 32x server. This is done to consolidate activity and increase awareness and contributions for 64x.",
			year: 2022,
			time: "January 15",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1107024494331170877/Screen_Shot_2023-05-13_at_12.20.00_PM.png",
			],
		},
		{
			text: "The Classic Faithful and Compliance management teams merge into one. This is a precursor to the eventual merge of the projects as a whole.",
			year: 2022,
			time: "Febrary 12",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1105990054750461952/Screen_Shot_2023-05-10_at_3.49.27_PM.png",
			],
		},
		{
			text: "Kraineff's Faithful post mysteriously disappears from CurseForge. It's not certain whether he did it himself or whether the CurseForge staff team was involved, but the post would never be reinstated.",
			year: 2022,
			time: "Febrary 19",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1108454156534034625/image.png",
				"https://ptb.discord.com/channels/773983706582482946/773983707299184703/944578556950892615",
			],
		},
		{
			text: "Many Compliance staff and community members participate in that year's r/place event on Reddit, trying to build the logo of the project. After several relocations and four days of fierce defence, Compliance is able to secure its spot on the canvas at (1428, 119).",
			year: 2022,
			time: "April 1 - 4",
			importance: "normal",
			references: ["https://place-atlas.stefanocoding.me/#twvks0"],
		},
		{
			text: "After months of work by the staff team, Compliance drops the dual naming scheme and finally fully rebrands to Faithful everywhere. Along with this, Classic Faithful is added to the site and the manager teams and project officially merge under the larger Faithful umbrella.\nThe initial plan had been to get Kraineff to drop the Faithful name first, but very soon it became clear that he was never going to do that willingly. Nonetheless, the rebrand goes through.",
			year: 2022,
			time: "April 9",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1108832715492565012/image.png",
				"https://ptb.discord.com/channels/773983706582482946/898289100803678228/962430221905195099",
				"https://docs.google.com/document/d/1YTVhqemdGEGU4EIOkawypRjqa_C6mCCXknl6xmJxns8/edit#bookmark=id.fyl0ohtbuf92",
				"https://docs.google.com/document/d/1YTVhqemdGEGU4EIOkawypRjqa_C6mCCXknl6xmJxns8/edit#bookmark=id.fyl0ohtbuf92",
			],
		},
		{
			text: "Classic Faithful 32x Programmer Art is finished for Java Edition after just over four months of intensive development. The Classic Faithful team shifts their focus towards 64x and introduces proper Bedrock Edition support over the coming months.",
			year: 2022,
			time: "April 10",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1105999226938335282/Screen_Shot_2023-05-10_at_4.25.58_PM.png",
			],
		},
		{
			text: "A series of polls is held with the aim of deciding the future of Faithful's logos. The people vote for a change, and submissions for a new logo design are opened four days later.",
			year: 2022,
			time: "April 11",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1108838836542373939/image.png",
				"https://ptb.discord.com/channels/773983706582482946/958951682128117761/963112773087277086",
			],
		},
		{
			text: "After some more votes and many logo submissions, it is decided that Evorp's logo, that had been used as a placeholder at that time, would be kept.",
			year: 2022,
			time: "May 10",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1108839049327808562/image.png",
				"https://ptb.discord.com/channels/773983706582482946/898289100803678228/973664705136697354",
			],
		},
		{
			text: "Minecraft 1.19 “The Wild Update” is released.",
			year: 2022,
			time: "June 7",
			importance: "low",
		},
		{
			text: "Faithful 64x reaches one million downloads on CurseForge.",
			year: 2022,
			time: "June 19",
			importance: "normal",
		},
		{
			text: "Faithful 32x for Java Edition is finished, with all textures in the most recent Minecraft version at the time being complete.",
			year: 2022,
			time: "July 1",
			importance: "normal",
			references: ["https://faithfulpack.net/faithful32x/R1"],
		},
		{
			text: "After several previous disappearances and multiple DMCA strikes from former contributors, Kraineff's Faithful is removed from the Bedrock Marketplace for good.",
			year: 2022,
			time: "July 16",
			importance: "normal",
		},
		{
			text: "After months of work, Classic Faithful 32x guidelines are created, following a similar structure and style to the Faithful 32x guidelines made a year prior. However, unlike Faithful, a texture redo list is created rather than outright removing the offending textures, which would be steadily worked on over the coming months.",
			year: 2022,
			time: "August 22",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1106001065050120222/Screen_Shot_2023-05-10_at_4.33.16_PM.png",
				"https://docs.google.com/document/d/1lw5EvJhVbubNPm3ZiOXAr8Aos9gCkmz-rh03uIMuqY0/",
			],
		},
		{
			text: "Faithful 32x is posted on Modrinth thanks to the site receiving resource pack support.",
			year: 2022,
			time: "August 28",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1109501513631535214/image.png",
				"https://discord.com/channels/773983706582482946/773993493562785812/1013222954760421476",
			],
		},
		{
			text: "Faithful: Dungeons is officially discontinued due to the lack of motivation and low activity of the game.",
			year: 2022,
			time: "September 16",
			importance: "normal",
			references: [
				"https://cdn.discordapp.com/attachments/875553600670162955/1109572316846886953/image.png",
				"https://faithfulpack.net/faithful32xDungeons/The%20Fate%20of%20Faithful%20Dungeons",
			],
		},
		{
			text: "Faithful's license receives a major update. It no longer requires written permission for re-use of textures, as well as rewriting the existing clauses in a more readable manner.",
			year: 2022,
			time: "September 27",
			importance: "normal",
			references: ["https://faithfulpack.net/faithful/License%20Update"],
		},
		{
			text: "The Faithful Extras server is merged into the main Faithful server, since many projects had since become defunct or inactive and therefore fewer channels were needed than initially thought. Classic Faithful remains separate still.",
			year: 2022,
			time: "October 4",
			importance: "normal",
		},
		{
			text: "All Faithful 32x textures for legacy versions of Minecraft are finished and published in the pack's 3rd release.",
			year: 2022,
			time: "October 24",
			importance: "normal",
			references: ["https://faithfulpack.net/faithful32x/R3"],
		},
		{
			text: "Faithful 32x reaches one million downloads on CurseForge.",
			year: 2023,
			time: "January 29",
			importance: "normal",
		},
		{
			text: "Faithful 64x achieves 2 million downloads on CurseForge.",
			year: 2023,
			time: "February 17",
			importance: "normal",
		},
		{
			text: "April Fools is celebrated with the release of a fully AI-generated Faithful resource pack at 128x resolution. The textures had been generated using Topaz Gigapixel AI.",
			year: 2023,
			time: "April 1",
			importance: "normal",
			references: ["https://faithfulpack.net/newfaithful/release"],
		},
		{ text: "???", year: "???", importance: "low" },
		{
			text: "The Heat Death of the universe occurs.",
			year: "10^10^10^76",
			time: "January 3",
			importance: "low",
		},
	];

	// I can't believe this is the only way I managed to do this
	let i = 0;
	let j = 0;
	function generateReferences(references: string[], mobile: boolean) {
		return references
			.map((reference) => {
				if (mobile) {
					j++;
					return `<sup><a href="${reference}">[${j}]</a></sup>`;
				}
				i++;
				return `<sup><a href="${reference}">[${i}]</a></sup>`;
			})
			.join(" ");
	}
</script>

<svelte:window bind:innerWidth />

<div class="container">
	<h1 class="text-center title">Faithful's History</h1>

	<div class="timeline">
		{#each options as option, i}
			{#if (i != 0 && option.year != options[i - 1].year) || i == 0}
				<div class="anchor-title">
					<div class="anchor" id={`${options[i].year}`}></div>
					<h1 class="year text-center"><a href={"#" + option.year}>{option.year}</a></h1>
				</div>
			{/if}
			{#if innerWidth <= 768}
				<div class="timeline-item">
					<div class="timeline-date-mobile">
						<span
							class={option.importance === "low"
								? "timeline-dot"
								: option.importance === "normal"
									? "timeline-square"
									: "timeline-diamond"}
						></span>
						<h3 class="timeline-date {option.importance === 'low' ? 'text-background' : ''}">
							{option.time || ""}
						</h3>
					</div>
					<div class="timeline-text-mobile">
						<div class="timeline-separator">
							<span class="timeline-connector"></span>
						</div>
						<p class={option.importance === "low" ? "text-background" : ""}>
							{@html parseMd(option.text, true)}
							{#if option.references}
								{@html generateReferences(option.references, false)}
							{/if}
						</p>
					</div>
				</div>
			{:else}
				<div class="timeline-item">
					<h3 class="timeline-date {option.importance === 'low' ? 'text-background' : ''}">
						{option.time || ""}
					</h3>
					<div class="timeline-separator">
						<span
							class={option.importance === "low"
								? "timeline-dot"
								: option.importance === "normal"
									? "timeline-square"
									: "timeline-diamond"}
						></span>
						{#if (i != 0 && options[i + 1] && option.year == options[i + 1].year) || i == 0}
							<span class="timeline-connector"></span>
						{/if}
					</div>
					<p class={option.importance === "low" ? "text-background" : ""}>
						{@html parseMd(option.text, true)}
						{#if option.references}
							{@html generateReferences(option.references, true)}
						{/if}
					</p>
				</div>
			{/if}
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
			flex: 4;
			margin: 0 12px 30px 12px;
		}

		h3 {
			flex: 1;
			margin: 3px 12px 30px 12px;
		}

		h3.text-background {
			margin: 5px 12px 30px 12px;
		}

		&-date {
			order: 1;
			text-align: right;

			&-mobile {
				align-items: center;
				display: flex;
				flex: 0;
			}
		}

		&-text-mobile {
			display: flex;
		}

		&-separator {
			align-items: center;
			display: flex;
			flex: 0;
			order: 2;
			flex-direction: column;
		}

		&-dot {
			background-color: #5f5f5f;
			border: 2px solid #5f5f5f;
			border-radius: 50%;
			margin: 8px 0;
			padding: 4px;
		}

		&-square {
			background-color: #fff;
			border: 2px solid #fff;
			margin: 8px 0;
			padding: 4px;
		}

		&-diamond {
			background-color: #fff;
			border: 2px solid #fff;
			margin: 8px 0;
			padding: 4px;
			transform: rotateY(0deg) rotate(45deg);
		}

		&-connector {
			background-color: #fff;
			flex-grow: 1;
			width: 6px;
		}
	}

	@media only screen and (max-width: $width-S) {
		.timeline {
			p {
				margin: 12px;
			}

			h3,
			h3.text-background {
				margin: 0 12px 2px 12px;
			}

			&-item {
				flex-direction: column;
				align-items: flex-start;
			}

			&-connector {
				margin-left: 3px;
			}
		}
	}

	p {
		order: 3;
		font-size: 20px;
	}

	:global(html.light .text-background) {
		color: #5f5f5f !important;
	}

	.text-background {
		color: #9e9e9e;
	}

	h3.text-background {
		font-size: 16px;
	}

	:global(html.light .timeline-square, html.light .timeline-diamond) {
		background-color: #000 !important;
		border: 2px solid #000 !important;
	}

	:global(html.light .timeline-connector) {
		background-color: #000 !important;
	}

	.anchor-title {
		position: relative;
	}

	.anchor {
		position: absolute;
		margin-top: -60px;
	}

	.year {
		& a {
			color: inherit;
		}
	}
</style>
