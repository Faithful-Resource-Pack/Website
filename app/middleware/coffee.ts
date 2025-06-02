export default defineNuxtRouteMiddleware(() => {
	const event = useRequestEvent();
	if (event) setResponseStatus(event, 418);
});
