<script lang="ts">
	export let name: string;
	export let size = "1.5em";
	export let width = size;
	export let height = width;
	export let focusable: string | number | null | undefined = undefined;

	export let color: string | null = null;

	export let style: string = "";

	let final_styles: string;
	$: {
		let style_obj: Record<string, string> = {};
		if (color) style_obj["--fill"] = color;

		final_styles =
			Object.entries(style_obj)
				.map(([key, val]) => `${key}: ${val}; `)
				.join("") + style;
	}
</script>

<svg {focusable} {width} {height} style={final_styles}>
	<use href={`/svg/icons.svg#${name}`} />
</svg>
