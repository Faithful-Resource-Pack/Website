<script>
	import { t } from "$lib/translations";
	import Fa from "svelte-fa/src/fa.svelte";
	import {
		faHouse,
		faDownload,
		faPlus,
		faWrench,
		faImages,
		faCircleQuestion,
		faCube
	} from "@fortawesome/free-solid-svg-icons";


	function toggleMenu() {
		document.getElementsByClassName("navbar-nav")[0].classList.toggle("show");
	}

	const PROJECTS = [{
		image: 'https://database.faithfulpack.net/images/branding/logos/transparent/256/f32_logo.png',
		text: 'Faithful 32x',
		link: '/faithful32x'
	},{
		image: 'https://database.faithfulpack.net/images/branding/logos/transparent/256/f64_logo.png',
		text: 'Faithful 64x',
		link: '/faithful64x'
	},{
		image: 'https://database.faithfulpack.net/images/branding/logos/transparent/256/cf32_logo.png',
		text: 'Classic Faithful 32x\nJappa',
		link: '/classicfaithful32xjappa'
	},{
		image: 'https://database.faithfulpack.net/images/branding/logos/transparent/256/cf32pa_logo.png',
		text: 'Classic Faithful 32x\nProgrammer Art',
		link: '/classicfaithful32xprogrammerart'
	},{
		image: 'https://database.faithfulpack.net/images/branding/logos/transparent/256/cf64_logo.png',
		text: 'Classic Faithful 64x',
		link: '/classicfaithful64x'
	}]

	let projectsShown = false;
</script>

<header>
	<noscript>
		<p class="red banner m-3">Please enable JavaScript for various features to work.</p>
	</noscript>

	<nav class="navbar">
		<a class="nav-icon-mobile" href="/" title="Faithful">
			<img src="/images/branding/wordmark.png" style="height: 32px" alt="Faithful 32x" />
		</a>

		<button
			class="navbar-toggler"
			type="button"
			on:click={toggleMenu}
			data-toggle="collapse"
			data-target="#collapsibleNavbar"
			aria-label="Menu"
			data-expanded="false"
		>
			<span class="navbar-toggler-icon" />
		</button>

		<div class="navbar-nav">
			<div class="nav-item">
				<a class="nav-link" href="/">
					<Fa icon={faHouse} />
					{ $t('header.home') }
				</a>
			</div>

			<div class="nav-item" id="project-navigation-mobile"
			on:click={() => projectsShown = !projectsShown} on:keypress={() => {}}>
				<span class="nav-link dropdown-toggle" class:opened={projectsShown}>
					<Fa icon={faCube} />
					{ $t('header.projects') }
				</span>
				{#if projectsShown}
					<div class="dropdown-menu dropdown-menu-center">
						{#each PROJECTS as project}
							<div><a class="dropdown-item nav-link project" href={project.link}>
								<img src={project.image+'?h=16'} alt={project.text}
								/> {project.text}
							</a></div>
						{/each}
					</div>
				{/if}
			</div>

			<div class="nav-item">
				<a class="nav-link" href="/downloads">
					<Fa icon={faDownload} />
					{ $t('header.downloads') }
				</a>
			</div>

			<div class="nav-item">
				<a class="nav-link" href="/add-ons">
					<Fa icon={faPlus} />
					{ $t('header.addons') }
				</a>
			</div>

			<div title={$t('header.projects')} id="logo" class="nav-link" class:opened={projectsShown}
				on:click={() => projectsShown = !projectsShown} on:keypress={() => {}}>
				<img
					src="/images/branding/f32_logo.svg"
					style="width: 48px; height: 48px; display: block"
					alt="Faithful 32x"
				/>
			</div>

			<div class="nav-item">
				<a class="nav-link" href="/modding">
					<Fa icon={faWrench} />
					{ $t('header.modding') }
				</a>
			</div>

			<div class="nav-item">
				<a class="nav-link" href="/gallery">
					<Fa icon={faImages} />
					{ $t('header.gallery') }
				</a>
			</div>

			<div class="nav-item">
				<a class="nav-link" href="/about">
					<Fa icon={faCircleQuestion} />
					{ $t('header.about') }
				</a>
			</div>
		</div>
	</nav>

	<div id="project-navigation" class="desktop" class:show={projectsShown}>
		<div class="project-card btn main">
			{#each PROJECTS as project}
				<a href={project.link} class="project">
					<img src={project.image+'?h=64'} alt={project.text}
					/><pre class="text"><p>{ project.text}</p></pre>
				</a>
			{/each}
		</div>
	</div>
</header>

<style lang="scss">
	$navbar-padding: 10px;

	// include in interesting parts
	@mixin link($color, $color_hover) {
		text-decoration: none;
		color: $color;
		font-weight: 500;
		transition: all 0.1s ease-out;

		&:hover {
			color: $color_hover;
			cursor: pointer;
			transform: scale(0.95);
		}
	}

	header {
		top: 0px;
		position: sticky;
		z-index: 1000;
	}

	.navbar {
		box-shadow: 0 0 5px 0 #000;
		position: relative;
		z-index: 1000;
		padding: $navbar-padding;

		@media (max-width: $width-S) {
			padding: $small-spacing;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
		}

		a {
			text-decoration: none;
		}

		.nav-icon-mobile {
			display: none;
			@media (max-width: $width-S) {
				display: block;
			}
		}

		.navbar-toggler {
			display: none;
			padding: 0.25rem 0.75rem;
			font-size: 1.25rem;
			background-color: transparent;
			border: 1px solid rgb(128, 128, 128);
			border-radius: $border-radius;

			@media (max-width: $width-S) {
				display: block;
			}

			.navbar-toggler-icon {
				background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgb%28180, 180, 180' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
				display: inline-block;
				width: 1.5em;
				height: 1.5em;
				vertical-align: middle;
			}
		}

		.navbar-nav {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			flex-basis: 100%;

			@media (max-width: $width-S) {
				align-items: flex-start;
				flex-direction: column;
				padding-left: 0;

				&:not(.show) {
					display: none;
				}
			}

			#logo {
				cursor: pointer;
				border-radius: $border-radius;
				transition: all 0.2s ease-out;

				@media (max-width: $width-S) {
					display: none;
				}

				&:hover, &.opened {
					transform: scale(1.1);
				}

				&.opened {
					// 15
					background: rgba(235,235,235,0.2);
				}
			}

			.nav-item {
				min-width: 125px;
				display: flex;
				justify-content: center;

				@media (max-width: $width-S) {
					width: 100%;
					display: block;
					padding: 8px 0;
				}

				.nav-link {
					@include link(rgb(180, 180, 180), rgb(220, 220, 220));
					display: inline;
				}
			}
		}
	}

	#project-navigation {
		z-index: 999;
		left: 0;
		right: 0;
		position: absolute;
		text-align: center;
		opacity: 0;
		transition: all 0.2s ease-in-out;
		transform: translateY(calc(-100% - $navbar-padding));
		top: calc(100% + $navbar-padding);

		&.show {
			transform: none;
			opacity: 1;
		}

		> .project-card {
			padding: $navbar-padding;

			> * {
				display: inline-block;
				vertical-align: top;
			}
		}

		@media (max-width: $width-S) {
			display: none;
		}

		.project {
			color: inherit;
			margin: 0 $navbar-padding;
			@include link(inherit, inherit);

			& > .text {
				opacity: .8;
				margin: 0;
				font-size: 0.9em;
				font-weight: 600;

				& * {
					margin: 0;
				}

				&:hover {
					opacity: 1;
				}
			}
		}
	}

	#project-navigation-mobile {
		@media (min-width: $width-S) {
			display: none;
		}
		.dropdown-menu {
			background: transparent;
			box-shadow: none;
			font-size: inherit;
		}

		.dropdown-menu {
			margin-top: 8px;
		}
	}

	.dropdown-toggle {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.dropdown-toggle.opened::after {
		transform: rotate(180deg);
	}

	.dropdown-toggle::after {
		display: inline-block;
		margin-left: 0.255em;
		vertical-align: 0.255em;
		content: "";
		border-top: 0.3em solid;
		border-right: 0.3em solid transparent;
		border-bottom: 0;
		border-left: 0.3em solid transparent;
	}

	.dropdown-item {
		display: block;
		width: 100%;
		padding: 0.25rem 0 0.25rem 1.5rem;
		clear: both;
		font-weight: 400;
		text-align: inherit;
		white-space: nowrap;
		background-color: transparent;
		border: 0;
	}
</style>
