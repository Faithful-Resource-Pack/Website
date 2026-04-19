import { error } from "@sveltejs/kit";

const projects = {
	faithful32x: {
		title: "Faithful 32x",
		logotext: "https://database.faithfulpack.net/images/branding/site/logotexts/f32_logotext.png",
		background: "https://database.faithfulpack.net/images/branding/backgrounds/f32_background.png",
	},
	faithful64x: {
		title: "Faithful 64x",
		logotext: "https://database.faithfulpack.net/images/branding/site/logotexts/f64_logotext.png",
		background: "https://database.faithfulpack.net/images/branding/backgrounds/f64_background.png",
	},
	classic32x: {
		title: "Classic Faithful 32x Jappa",
		logotext: "https://database.faithfulpack.net/images/branding/site/logotexts/cf32_logotext.png",
		background:
			"https://database.faithfulpack.net/images/branding/backgrounds/cf32j_background.png",
	},
	"classic32x-progart": {
		title: "Classic Faithful 32x Programmer Art",
		logotext:
			"https://database.faithfulpack.net/images/branding/site/logotexts/cf32pa_logotext.png",
		background: "https://database.faithfulpack.net/images/branding/backgrounds/cf32_background.png",
	},
	classic64x: {
		title: "Classic Faithful 64x",
		logotext: "https://database.faithfulpack.net/images/branding/site/logotexts/cf64_logotext.png",
		background: "https://database.faithfulpack.net/images/branding/backgrounds/cf64_background.png",
	},
};

export const load = async function ({ params }) {
	const project = projects[params.pack];
	if (!project) throw error(404, "Not found");

	return {
		title: project.title,
		link: params.pack,
		postLink: project.postLink,
		logotext: project.logotext,
		background: project.background,
	};
};
