<script lang="ts">
	import Fa from "svelte-fa";
	import { faGithub } from "@fortawesome/free-brands-svg-icons";
	import { t, locale, locales, loadTranslations, defaultLocale } from "$lib/translations";
	import {
		faInfoCircle,
		faScroll,
		faBook,
		faComment,
		faGlobe,
		faSun,
		faMoon,
		faCircleHalfStroke,
		faCaretDown as faChevronDown,
		faCheck,
	} from "@fortawesome/free-solid-svg-icons";
	import I18n from "./common/i18n.svelte";
	import { createSelect, melt, type CreateSelectProps } from "@melt-ui/svelte";
	import { fly } from "svelte/transition";

	import { themeStore } from "$stores/ThemeStore";
	import { derived } from "svelte/store";
	import { langStore } from "$stores/LangStore";
	import { onMount } from "svelte";

	let toggleThis = "";
	const TOGGLE_CLASS = " toggled";
	const toggle = (arg: string) => () => {
		toggleThis = toggleThis === arg ? "" : arg;
	};

	const text_theme = derived(themeStore, (v) => v[0].toUpperCase() + v.substring(1) + " Theme");
	const icon_theme = derived(themeStore, (v) => {
		switch (v) {
			case "light":
				return faSun;
			case "dark":
				return faMoon;
			default:
				return faCircleHalfStroke;
		}
	});

	onMount(async () => {
		const initLocale = localStorage.getItem("LANG") || defaultLocale;
		await loadTranslations(initLocale); // keep this just before the `return`
	});

	export const blur = (e: FocusEvent) => {
		setTimeout(() => (e.target as HTMLButtonElement).blur(), 200);
	};

	const selectChange: CreateSelectProps<string, false, any>["onSelectedChange"] = ({
		curr,
		next,
	}) => {
		if (curr !== next) langStore.set(next.value);
		return next;
	};

	const {
		elements: { trigger, menu, option },
		states: { selectedLabel, open },
		helpers: { isSelected },
	} = createSelect<string, false, any>({
		forceVisible: true,
		// this should work but doesn't, thank you melt ui
		defaultSelected: $locale,
		onSelectedChange: selectChange,
	});

	function getFlagEmoji(countryCode: string) {
		if (countryCode === "en") countryCode = "gb";
		const codePoints = countryCode
			.toUpperCase()
			.split("")
			.map((char) => 127397 + char.charCodeAt(0));
		return String.fromCodePoint(...codePoints);
	}
</script>

<footer class="footer">
	<div id="shadow"></div>
	<div class="footer-row">
		<div id="wordmark-element" class="footer-element">
			<div class="footer-head">
				<a href="/"
					><img class="footer-wordmark" src="/images/branding/wordmark.png" alt="Faithful" /></a
				>
			</div>
			<ul class="footer-content">
				<div class="btns">
					<button class="dropdown" use:melt={$trigger} aria-label="Languages">
						<Fa icon={faGlobe} />
						<span class="h6">{$selectedLabel || "Select a Language"}</span>
						<Fa icon={faChevronDown} />
					</button>
					{#if $open}
						<div class="dropdown-menu" use:melt={$menu} transition:fly={{ duration: 100, y: -5 }}>
							{#each $locales as locale}
								<div class="dropdown-item" use:melt={$option({ value: locale, label: $t(locale) })}>
									{#if $isSelected(locale)}
										<div class="dropdown-check">
											<Fa icon={faCheck} size="sm" />
										</div>
									{/if}
									{$t(locale) + " " + getFlagEmoji(locale)}
								</div>
							{/each}
						</div>
					{/if}

					<button on:click={themeStore.next} on:focus={blur}>
						<Fa icon={$icon_theme} /><span class="h6">{$text_theme}</span>
					</button>
				</div>
				<li><a class="link" href="mailto:contact@faithfulpack.net">contact@faithfulpack.net</a></li>
				<li>&copy; {new Date().getFullYear().toString()} Faithful Resource Pack</li>
			</ul>
		</div>

		<div class="footer-element">
			<div
				class={"footer-head" + (toggleThis === "Info" ? TOGGLE_CLASS : "")}
				role="button"
				tabindex="0"
				on:click={toggle("Info")}
				on:keypress={() => {}}
			>
				<h3>
					<Fa icon={faInfoCircle} />
					{$t("footer.info.title")}
					<Fa icon={faChevronDown} size="sm" />
				</h3>
			</div>
			<ul class="footer-content">
				<li><a href="/installation">{$t("footer.info.installation")}</a></li>
				<li><a href="/license">{$t("footer.info.license")}</a></li>
				<li><a href="/team">{$t("footer.info.team")}</a></li>
				<li>
					<a href="https://docs.faithfulpack.net/pages/manuals/branding-guidelines"
						>{$t("footer.info.branding")}</a
					>
				</li>
				<li><a href="/stats">{$t("footer.info.stats")}</a></li>
			</ul>
		</div>

		<div class="footer-element">
			<div
				class={"footer-head" + (toggleThis === "Listings" ? TOGGLE_CLASS : "")}
				role="button"
				tabindex="0"
				on:click={toggle("Listings")}
				on:keypress={() => {}}
			>
				<h3>
					<Fa icon={faBook} />
					{$t("footer.listings.title")}
					<Fa icon={faChevronDown} size="sm" />
				</h3>
			</div>
			<ul class="footer-content">
				<li>
					<a href="https://www.curseforge.com/members/faithful_resource_pack/projects">CurseForge</a
					>
				</li>
				<li><a href="https://modrinth.com/user/Faithful-Resource-Pack">Modrinth</a></li>
				<li>
					<a href="https://www.planetminecraft.com/member/faithful_resource_pack"
						>Planet Minecraft</a
					>
				</li>
				<li><a href="https://mcpedl.com/user/faithful-resource-pack">MCPEDL</a></li>
				<li>
					<a href="https://www.minecraftforum.net/members/Faithful_Resource_Pack"
						>{$t("footer.listings.minecraft_forum")}</a
					>
				</li>
			</ul>
		</div>

		<div class="footer-element">
			<div
				class={"footer-head" + (toggleThis === "Media" ? TOGGLE_CLASS : "")}
				role="button"
				tabindex="0"
				on:click={toggle("Media")}
				on:keypress={() => {}}
			>
				<h3>
					<Fa icon={faComment} />
					{$t("footer.media.title")}
					<Fa icon={faChevronDown} size="sm" />
				</h3>
			</div>
			<ul class="footer-content">
				<li><a href="/news">{$t("footer.resources.news")}</a></li>
				<li><a href="https://twitter.com/FaithfulPack">Twitter</a></li>
				<li><a href="https://www.reddit.com/r/faithfulpack/">Reddit</a></li>
				<li><a href="https://discord.gg/sN9YRQbBv7">{$t("footer.media.main_discord")}</a></li>
				<li><a href="https://discord.gg/KSEhCVtg4J">{$t("footer.media.cf_discord")}</a></li>
			</ul>
		</div>

		<div class="footer-element">
			<div
				class={"footer-head" + (toggleThis === "Resources" ? TOGGLE_CLASS : "")}
				role="button"
				tabindex="0"
				on:click={toggle("Resources")}
				on:keypress={() => {}}
			>
				<h3>
					<Fa icon={faScroll} />
					{$t("footer.resources.title")}
					<Fa icon={faChevronDown} size="sm" />
				</h3>
			</div>
			<ul class="footer-content">
				<li><a href="/faq">FAQ</a></li>
				<li><a href="https://docs.faithfulpack.net">{$t("footer.resources.docs")}</a></li>
				<li><a href="https://status.faithfulpack.net">{$t("footer.resources.status")}</a></li>
				<li><a href="https://translate.faithfulpack.net">{$t("footer.resources.translate")}</a></li>
				<li>
					<a href="https://docs.faithfulpack.net/pages/manuals/contributor-handbook"
						>Contributor's Handbook</a
					>
				</li>
			</ul>
		</div>

		<div class="footer-element">
			<div
				class={"footer-head" + (toggleThis === "GitHub" ? TOGGLE_CLASS : "")}
				role="button"
				tabindex="0"
				on:click={toggle("GitHub")}
				on:keypress={() => {}}
			>
				<h3><Fa icon={faGithub} /> GitHub <Fa icon={faChevronDown} size="sm" /></h3>
			</div>
			<ul class="footer-content">
				<li><a href="https://github.com/Faithful-Resource-Pack">Faithful</a></li>
				<li><a href="https://github.com/ClassicFaithful">Classic Faithful</a></li>
			</ul>
		</div>
	</div>

	<div class="footer-trademark">
		<p>
			<I18n
				path="footer.minecraft_trademark"
				slots={{
					website: ' <a class="link" href="https://www.minecraft.net" target="_blank">$1</a>',
				}}
			/>
		</p>
	</div>
</footer>

<style lang="scss">
	.dropdown {
		&-menu {
			border-radius: $border-radius;
			padding: 8px;
		}

		&-item {
			position: relative;
			padding: 6px 0 6px 32px;
			border-radius: $border-radius;
		}

		&-check {
			position: absolute;
			left: 8px;
		}
	}

	.footer {
		padding: 2em;
		color: $text-dark-bg;
		position: relative;

		@media (max-width: $width-XS) {
			padding: 16px;
			text-align: center;
		}

		&-trademark {
			text-align: center;
			@media (max-width: $width-S) {
				p {
					margin-bottom: 0;
				}
			}
		}

		&-content {
			list-style: none;
			padding: 0;
			margin: 0;
			margin-top: 1em;

			> li {
				height: 1.8em;
				display: flex;
				@media (max-width: $width-S) {
					display: block;
				}
				white-space: nowrap;

				> a {
					color: $text-dark-bg;
					transition: all 0.1s ease-out;

					&:hover {
						color: rgb(220, 220, 220);
						cursor: pointer;
						transform: scale(0.95);
					}
				}
			}
		}

		&-row {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			gap: 50px;

			> :first-child {
				max-width: 240px;
				@media (max-width: $width-S) {
					max-width: none;
				}
			}

			@media (max-width: $width-XS) {
				display: block;
			}
		}

		&-head {
			width: 100%;
			height: 2.5em;
			display: flex;
			align-items: center;
			justify-content: left;
			> a > img {
				max-width: 200px;
			}

			& > h3 :global(svg + svg) {
				display: none;
			}
		}

		&-center {
			text-align: center;
			justify-content: center;
		}

		#shadow {
			position: absolute;
			bottom: 100%;
			left: 0;
			right: 0;
			height: 5px;
			overflow: hidden;

			&:after {
				content: "";
				display: block;
				position: absolute;
				box-shadow: 0 5px 5px 5px #000;
				bottom: 0;
				left: 0;
				right: 0;
			}
		}
	}

	#wordmark-element {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.footer-wordmark {
			transition: all 0.2s ease-out;
			&:hover {
				transform: scale(1.05);
			}
		}

		.footer-content {
			margin-top: 0;
			flex-grow: 1;
			display: flex;
			flex-direction: column;

			.btns {
				flex-grow: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;

				> button {
					flex-grow: 1;
					display: flex;
					align-items: center;
					background: transparent;
					border: none;
					border-radius: $border-radius;

					&:hover {
						backdrop-filter: none;
					}

					& :global(.svelte-fa) {
						width: 26px;
						height: 26px !important;
					}

					> span {
						margin-left: 1rem;
						font-size: 1.2em;
					}
				}
			}
		}
	}

	@media (max-width: $width-XS) {
		#wordmark-element {
			.footer-content > .btns {
				flex-direction: row;
				justify-content: center;
				margin: -$small-spacing;
				margin-bottom: 0;

				button {
					padding: $small-spacing;
					justify-content: center;
				}
			}
			.footer-wordmark {
				display: none;
			}
			.footer-content {
				display: block;
			}
		}

		.footer-head {
			@include noselect();

			display: block;
			height: auto;

			& > h3 {
				margin-top: 8px;
				margin-bottom: 0;

				& :global(svg + svg) {
					display: inline !important;
				}
			}
		}

		:global(.footer-head.toggled + .footer-content) {
			display: inline-block;

			background: rgba(0, 0, 0, 0.4);
			background-color: rgba(0, 0, 0, 0.4);
			padding: 0 1rem !important;
			border-radius: 6px;
			margin-top: 6px !important;

			> li {
				height: auto !important;
				padding: 0.25rem 1.5rem;
			}
		}

		:global(.footer-head.toggled) h3 :global(svg + svg) {
			transform: rotate(180deg);
		}

		:global(.footer-content) {
			display: none;
		}
	}
</style>
