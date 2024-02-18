<script lang="ts">
	import { onMount } from "svelte";
	import { fade, scale } from "svelte/transition";
	import Fa from "svelte-fa";
	import { faCaretLeft, faCaretRight, faTimes } from "@fortawesome/free-solid-svg-icons";

	type PreviewImage = {
		image: string | Blob;
		alt: string;
	};

	export let images: PreviewImage | PreviewImage[];
	export let currentImageIndex = 0;
	export let displayed = true;

	function imageToString(input: string | Blob) {
		return input instanceof Blob ? URL.createObjectURL(input) : input;
	}

	const imageList = Array.isArray(images) ? images : [images];
	const imageStringList = imageList.map((e) => ({ ...e, image: imageToString(e.image) }));
	const multiple = imageList.length > 1;

	$: currentImagePreview =
		imageStringList[Math.min(Math.max(currentImageIndex, 0), imageList.length - 1)];
	$: currentImageSrc = currentImagePreview.image;
	$: currentImageAlt = currentImagePreview.alt;

	export function show(index: number) {
		return () => {
			displayed = true;
			currentImageIndex = (imageStringList.length + index) % imageStringList.length;
		};
	}

	function next() {
		if (!displayed) return;
		return show(currentImageIndex + 1)();
	}
	function prev() {
		if (!displayed) return;
		return show(currentImageIndex - 1)();
	}
	function hide() {
		if (displayed) displayed = false;
	}

	function handleMouseWheel(e: WheelEvent) {
		if (displayed) e.preventDefault();
	}

	let imageNavElement: HTMLElement;
	function handleNavWheel(e: WheelEvent) {
		if (!displayed) return;
		e.preventDefault();

		imageNavElement.scrollBy({
			left: e.deltaX + e.deltaY,
			top: 0,
			behavior: "smooth",
		});
	}

	function handleKeyDown(keys: string | string[], action: Function): (e: KeyboardEvent) => void {
		let keyList: string[] = Array.isArray(keys) ? keys : [keys];

		return (e: KeyboardEvent) => {
			let match = false;
			let i = 0;

			while (!match && i < keyList.length) {
				match = e.key === keyList[i];
				i++;
			}

			if (match) {
				action();
			}
		};
	}
	const handleEscape = handleKeyDown("Escape", hide);

	let contentElement: HTMLElement;
	onMount(() => {
		document.addEventListener("keydown", handleEscape);
		contentElement.addEventListener("wheel", handleMouseWheel, {
			passive: false,
		});

		return () => {
			document.removeEventListener("keydown", handleEscape);
			contentElement.removeEventListener("wheel", handleMouseWheel);
		};
	});
</script>

{#if displayed}
	<div
		transition:fade={{ duration: 200 }}
		id="fullscreen-preview"
		on:keydown={handleEscape}
		on:click|self={hide}
	>
		<div id="hide" class="nav" on:click={hide} on:keydown={handleKeyDown("x", hide)}>
			<Fa icon={faTimes} />
		</div>
		<div
			id="current-content"
			bind:this={contentElement}
			transition:scale
			on:click|self={hide}
			on:keydown={handleEscape}
		>
			{#if multiple}
				<div class="nav" id="prev" on:click={prev} on:keydown={handleKeyDown("ArrowLeft", prev)}>
					<Fa icon={faCaretLeft} />
				</div>
				<div class="nav" id="next" on:click={next} on:keydown={handleKeyDown("ArrowRight", next)}>
					<Fa icon={faCaretRight} />
				</div>
			{/if}
			<img src={currentImageSrc} alt={currentImageAlt} />
		</div>
		{#if multiple}
			<div id="image-nav" transition:fade bind:this={imageNavElement} on:wheel={handleNavWheel}>
				<div id="image-nav-container">
					{#each imageStringList as image, i}
						<span class="preview card" on:click={show(i)} on:keydown={() => {}}>
							<img src={image.image} alt={image.alt} />
						</span>
					{/each}
				</div>
			</div>
		{/if}
	</div>
{/if}

{#if multiple}
	<div id="inline-list" class="res-grid-4">
		{#each imageStringList as image, i}
			<div class="preview card" on:click={show(i)} on:keydown={() => {}}>
				<img src={image.image} alt={image.alt} />
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	#fullscreen-preview {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba($color: black, $alpha: 0.7);
		z-index: 5000;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 1.2 * $small-spacing;

		#current-content {
			width: 100%;
			max-height: 100%;
			flex-grow: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;

			img {
				max-width: 100%;
				max-height: 100%;
			}

			.nav {
				top: 50%;
				margin-top: -14px;
			}
		}

		.nav {
			position: absolute;
			z-index: 5001;
			width: 28px;
			height: 28px;
			line-height: 28px;
			font-size: 18px;
			border-radius: 50%;
			transition: background 0.3s ease;
			color: white;
			text-align: center;
			font-weight: bold;
			user-select: none;

			&:hover {
				background-color: rgba($color: white, $alpha: 0.3);
			}

			&#prev {
				left: 0;
			}
			&#next {
				right: 0;
			}

			&#hide {
				top: $small-spacing;
				right: $small-spacing;
				font-size: 1.2em;
				width: 32px;
				height: 32px;
				line-height: 32px;
			}
		}

		#image-nav {
			margin-top: 1.2 * $small-spacing;
			overflow: auto;
			white-space: nowrap;
			height: 80px;
			text-align: center;

			.preview {
				display: inline-block;
				vertical-align: middle;

				& + .preview {
					margin-left: 0.5rem;
				}
			}

			img {
				height: 80px;
				box-shadow:
					0 3px 6px rgba(0, 0, 0, 0.16),
					0 3px 6px rgba(0, 0, 0, 0.23);
				border-radius: $border-radius;
				float: left;
			}
		}
	}

	#inline-list {
		gap: 1rem;

		& > * {
			overflow: hidden; /* NEW */
			min-width: 0; /* NEW; needed for Firefox */
		}
		img {
			cursor: pointer;
			max-width: 100%;
			max-height: 100%;
			display: block;

			@include zoomin;
		}
	}
</style>
