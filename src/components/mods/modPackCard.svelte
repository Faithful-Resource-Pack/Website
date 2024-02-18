<script lang="ts">
	export let title: string;
	export let background: string;
	export let src: string;

	export let links: App.CardLink[];

	$: styles = src.includes("cf") ? "transform: scale(0.8)" : "";
</script>

<a href={links.href}>
	<div class="pack-card">
		<div class="bg-container">
			<img class="bg" src={background} alt={title} />
		</div>
		<img class="image" {src} alt={title} style={styles} />
		<h2 class="text-center">{title}</h2>
	</div>
</a>

<style lang="scss">
	.pack-card {
		background-image: var(--bg);
		box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5);
		color: white;
		background-position: center;
		background-size: cover;
		padding: 16px;
		border-radius: $border-radius;
		position: relative;
		height: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;

		& > * {
			position: relative;
		}

		&:hover .bg-container .bg {
			transform: scale(1.1);
		}
	}

	.bg-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: $border-radius;

		& > img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: all 0.5s;
		}
	}

	.image {
		width: 256px;
		max-width: 100%;
	}

	h2 {
		width: 256px;
		max-width: 100%;
		text-shadow: rgba(0, 0, 0, 0.4) 0px 4px 5px;
		flex-grow: 1;
		color: #fff;
	}
</style>
