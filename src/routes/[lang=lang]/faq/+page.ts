import type { Load } from "@sveltejs/kit";

export const load: Load = async () => {
    const faqRes = await fetch("https://raw.githubusercontent.com/Faithful-Resource-Pack/Discord-Bot/javascript/resources/strings.json")
    .catch((err) => { console.log('faq strings', err); throw err; });
    const faqData = await faqRes.json();

    return { faqArray: faqData.faq }; // why does it have to return an object aaaaaaa
};