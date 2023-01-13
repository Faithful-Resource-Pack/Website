import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

/** @type {import('./$types').PageLoad} */
export const load = (({ params }) => {
    throw redirect(307, `../add-ons/${params.slug}`)
}) satisfies LayoutServerLoad;