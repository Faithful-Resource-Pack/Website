export const load = async function ({ params }) {
	// importing from the bot repository so that if you update one the other updates automatically
	const faqRes = await fetch(
		"https://raw.githubusercontent.com/Faithful-Resource-Pack/Discord-Bot/typescript/json/faq.json",
	).catch((err) => {
		console.log("faq strings", err);
		throw err;
	});
	const faqData: FaqArray[] = await faqRes.json();

	return { faqArray: faqData }; // why does it have to return an object aaaaaaa
};
