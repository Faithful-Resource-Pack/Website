export const load = async function ({ fetch, params }) {
	let systemFile = await fetch(`/installation/Windows/${params.edition}.md`);

	return {
		system: params.system,
		edition: params.edition,
		markdown: await systemFile.text(),
	};
};
