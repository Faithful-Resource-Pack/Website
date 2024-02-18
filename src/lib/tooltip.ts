import tippy, { type Props, type Content } from "tippy.js";
import { dev } from "$app/environment";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-toward.css";

function getContent(
	node: HTMLElement,
	params: Partial<Props> = {},
): {
	target: HTMLElement;
	content: Content | undefined;
} {
	let prev_sibling = node.previousElementSibling as HTMLElement | null;
	if (prev_sibling === null) throw Error("No previous sibling");

	const target = prev_sibling;
	const content = node;

	return { target, content };
}

function tooltip(node: HTMLElement, params: Partial<Props> = {}) {
	let { target, content } = getContent(node, params);

	// Support any of the Tippy props by forwarding all "params":
	// https://atomiks.github.io/tippyjs/v6/all-props/
	const tip = tippy(target, {
		content,
		animation: "shift-toward",
		placement: "right-start",
		showOnCreate: dev && false, // set to true if you want to modify the style
		hideOnClick: false,
		maxWidth: "auto",
		...params,
	});

	return {
		// If the props change, let's update the Tippy instance:
		update: (newParams: Partial<Props>) => {
			let { content } = getContent(node, params);
			tip.setProps({ content, ...newParams });
		},

		// Clean up the Tippy instance on unmount:
		destroy: () => tip.destroy(),
	};
}

export default tooltip;
