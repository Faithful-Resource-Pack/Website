import { error } from "@sveltejs/kit";

const projects = {
	faithful32x: {
		title: "Faithful 32x",
		logotext: "https://database.faithfulpack.net/images/branding/site/logotexts/f32_logotext.png",
		background: "https://database.faithfulpack.net/images/branding/backgrounds/f32.png",
	},
	faithful64x: {
		title: "Faithful 64x",
		logotext: "https://database.faithfulpack.net/images/branding/site/logotexts/f64_logotext.png",
		background: "https://database.faithfulpack.net/images/branding/backgrounds/f64.png",
	},
	classicfaithful32xjappa: {
		title: "Classic Faithful 32x Jappa",
		postLink: "/classicfaithful/32x-jappa",
		logotext: "https://database.faithfulpack.net/images/branding/site/logotexts/cf32_logotext.png",
		background: "https://database.faithfulpack.net/images/branding/backgrounds/cf32.png",
	},
	classicfaithful32xprogrammerart: {
		title: "Classic Faithful 32x Programmer Art",
		postLink: "/classicfaithful/32x-programmer-art",
		logotext:
			"https://database.faithfulpack.net/images/branding/site/logotexts/cf32pa_logotext.png",
		background: "https://database.faithfulpack.net/images/branding/backgrounds/cf32pa.png",
	},
	classicfaithful64x: {
		title: "Classic Faithful 64x",
		postLink: "/classicfaithful/64x-jappa",
		logotext: "https://database.faithfulpack.net/images/branding/site/logotexts/cf64_logotext.png",
		background: "https://database.faithfulpack.net/images/branding/backgrounds/cf64.png",
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
