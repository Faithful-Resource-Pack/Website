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

	onMount(() => {
		document.querySelectorAll('[data-toggle="dropdown"]').forEach((item) => {
			item.addEventListener("click", () => {
				item.parentNode.classList.toggle("show");
			});
		});
	});
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
				<a class="nav-link" href="/addons">
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
				<span class="nav-link dropdown-toggle" data-toggle="dropdown">
					<Fa icon={faWrench} />
					Modding
				</span>
				<div class="dropdown-menu dropdown-menu-center">
					<a class="dropdown-item" href="/mods">Mods</a>
					<a class="dropdown-item" href="/modpacks">Modpacks</a>
				</div>
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

				.dropdown-toggle::after {
					content: "";
					border-top: 0.3em solid;
					border-right: 0.3em solid transparent;
					border-left: 0.3em solid transparent;
					display: inline-block;
					margin-left: 4px;
					vertical-align: middle;
				}

				&.show {
					.dropdown-menu {
						display: block;
					}
					.nav-link {
						color: #fff;
					}
					.dropdown-toggle::after {
						transform: rotate(180deg);
					}
				}

				.dropdown-menu {
					display: none;
					position: absolute;
					top: 100%;
					box-shadow: 0 0 10px rgba(0, 0, 0, 20%);
					border-radius: 4px;

					@media (max-width: 760px) {
						position: static;
						background-color: transparent;
						box-shadow: none;
						margin: 0;
						padding: 0;
					}

					.dropdown-item {
						display: block;
						padding: 8px 18px;
						border-radius: 4px;

						@media (max-width: 760px) {
							color: rgb(180, 180, 180);
							background: none;
						}
					}
				}
			}
		}
	}
</style>
