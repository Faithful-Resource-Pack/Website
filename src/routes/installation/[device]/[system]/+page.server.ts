export const load = async function({ fetch, params }) {
    if (params.system == "Windows") return {
        system: params.system
    }

    let systemFile = await fetch(`/installation/${params.system.replace("\/", "")}.md`)

    return {
        system: params.system,
        markdown: await systemFile.text()
    }
}