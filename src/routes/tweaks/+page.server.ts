import type { PageServerLoad, Actions } from ".svelte-kit/types/src/routes/tweaks/$types";
 
export const load = (async () => {
  return null;
}) satisfies PageServerLoad;
 
export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const format = data.get('format') as string;
    const modules = data.getAll('modules') as string[];
    const iconModules = data.getAll('iconModules') as string[];
    const optionsBackground = data.get('optionsBackground') as string;
    const panoOption = data.get('panoOption') as string;

    const bigStr: string = `
{
  "format":  `+format+`,
  "modules":  [`+modules+`],
  "iconModules": [`+iconModules+`],
  "optionsBackground": `+optionsBackground+`,
  "panoOption": `+panoOption+`
}
    `;
 
    return {
      success: true,
      file: bigStr
    };
  },
};