import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

const projects = {
    "faithful-32x": {
        title: "Faithful 32x",
        link: "faithful-32x",
        logotext: "https://database.faithfulpack.net/images/branding/logotexts/f32_logotext.png",
        background: "https://database.faithfulpack.net/images/branding/backgrounds/f32.png"
    },
    "faithful-64x": {
        title: "Faithful 64x",
        link: "faithful-64x",
        logotext: "https://database.faithfulpack.net/images/branding/logotexts/f64_logotext.png",
        background: "https://database.faithfulpack.net/images/branding/backgrounds/f64.png"
    },
    "classic-faithful-32x-jappa": {
        title: "Classic Faithful 32x Jappa",
        link: "classic-faithful-32x-jappa",
        logotext: "https://database.faithfulpack.net/images/branding/logotexts/cf32_logotext.png",
        background: "https://database.faithfulpack.net/images/branding/backgrounds/cf32.png"
    },
    "classic-faithful-32x-programmer-art": {
        title: "Classic Faithful 32x Programmer Art",
        link: "classic-faithful-32x-programmer-art",
        logotext: "https://database.faithfulpack.net/images/branding/logotexts/cf32pa_logotext.png",
        background: "https://database.faithfulpack.net/images/branding/backgrounds/cf32pa.png"
    },
    "classic-faithful-64x": {
        title: "Classic Faithful 64x",
        link: "classic-faithful-64x",
        logotext: "https://database.faithfulpack.net/images/branding/logotexts/cf64_logotext.png",
        background: "https://database.faithfulpack.net/images/branding/backgrounds/cf64.png"
    }
}

export const load: PageLoad = async function({ params }) {
    const project = projects[params.slug]
    if (!project) throw error(404, 'Not found');

    return {
        title: project.title,
        link: project.link,
        logotext: project.logotext,
        background: project.background
    }
}