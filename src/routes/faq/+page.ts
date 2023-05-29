export const load = async function({ params }) {
    const faqRes = await fetch("https://raw.githubusercontent.com/Faithful-Resource-Pack/Discord-Bot/javascript/resources/strings.json")
    .catch((err) => { console.log('faq strings', err); throw err; });
    const faqData: App.FaqArray[] = (await faqRes.json()).faq;

    return { faqArray: faqData }; // why does it have to return an object aaaaaaa
};