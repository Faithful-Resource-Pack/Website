<script>
	import { onMount } from "svelte";
	import Fa from "svelte-fa/src/fa.svelte";
	import {
		faHouse,
		faDownload,
		faPlus,
		faWrench,
		faImages,
		faCircleQuestion
	} from "@fortawesome/free-solid-svg-icons";

	function toggleMenu() {
		document.getElementsByClassName("navbar-nav")[0].classList.toggle("show");
	}
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
					Home
				</a>
			</div>

			<div class="nav-item">
				<a class="nav-link" href="/downloads">
					<Fa icon={faDownload} />
					Downloads
				</a>
			</div>

			<div class="nav-item">
				<a class="nav-link" href="/add-ons">
					<Fa icon={faPlus} />
					Add-ons
				</a>
			</div>

			<a href="/" title="Faithful">
				<img
					src="/images/branding/f32_logo.svg"
					style="width: 48px; height: 48px"
					alt="Faithful 32x"
				/>
			</a>

			<div class="nav-item">
				<a class="nav-link" href="/modding">
					<Fa icon={faWrench} />
					Modding
				</a>
			</div>

			<div class="nav-item">
				<a class="nav-link" href="/gallery">
					<Fa icon={faImages} />
					Gallery
				</a>
			</div>

			<div class="nav-item">
				<a class="nav-link" href="/about">
					<Fa icon={faCircleQuestion} />
					About
				</a>
			</div>
		</div>
	</nav>
</header>

<style lang="scss">
	.navbar {
		position: relative;
		box-shadow: 0 0 5px 0 #000;
		padding: 10px;

		@media (max-width: 760px) {
			padding: 16px;
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
			@media (max-width: 760px) {
				display: block;
			}
		}

		.navbar-toggler {
			display: none;
			padding: 0.25rem 0.75rem;
			font-size: 1.25rem;
			background-color: transparent;
			border: 1px solid rgb(128, 128, 128);
			border-radius: 4px;

			@media (max-width: 760px) {
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

			@media (max-width: 760px) {
				align-items: flex-start;
				flex-direction: column;
				padding-left: 0;

				&:not(.show) {
					display: none;
				}
			}

			& > a {
				transition: all 0.2s ease-out;

				@media (max-width: 760px) {
					display: none;
				}

				&:hover {
					transform: scale(1.1);
				}
			}

			.nav-item {
				width: 125px;
				display: flex;
				justify-content: center;

				@media (max-width: 760px) {
					width: 100%;
					display: block;
					padding: 8px 0;
				}

				.nav-link {
					color: rgb(180, 180, 180);
					font-weight: 500;
					transition: all 0.1s ease-out;

					&:hover {
						color: rgb(220, 220, 220);
						cursor: pointer;
						transform: scale(0.95);
					}
				}
			}
		}
	}
</style>
