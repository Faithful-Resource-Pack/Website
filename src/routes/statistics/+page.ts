export const load = async function({ params }) {
    const config: Object = {
        curse: [
            436482, // curse project id
            419139,
            561185,
            667237,
            414275
        ],
        modrinth: [
            'w0TnApzs',
            'r4GILswZ'
        ]
    }

    let listings: any = config;

    for (let [key, value] of Object.entries(config)) {
        let i = 0;
        listings[key] = Array(5).fill('X'); // CHANGE THIS IF MORE PROJECTS ARE ADDED IN FUTURE
        for (let id of value) {
            switch (key) {
                case 'curse':
                    const curseRes = await fetch(`https://api.cfwidget.com/${id}`);
                    const curseResponse = await curseRes.json();
                    listings[key][i] = curseResponse.downloads.total;
                    break;
                case 'modrinth':
                    const modrinthRes = await fetch(`https://api.modrinth.com/v2/project/${id}`);
                    const modrinthResponse = await modrinthRes.json();
                    listings[key][i] = modrinthResponse.downloads;
                    break;
            }
            ++i;
        }
    }

    console.log(listings.curse)
    /**
     * API LINKS TO FETCH FROM:
     * WEBSITE: WIP by robert probably maybe not
     * PMC: not available (use fallback stats)
     * MCPEDL: not available (use fallback stats)
     * ADDONS: api.faithfulpack.net/v2/addons/stats
     * MODS: not available (mods gone + not sorted by pack yet)
     */

    return { data: [
        {
            name: " ", // nbps to ensure text doesn't get wrapped weirdly
            values: [
                "F32",
                "F64",
                "CF32",
                "CF32PA",
                "CF64"
            ]
        },
        {
            name: "CurseForge",
            values: listings.curse
        },
        {
            name: "Modrinth",
            values: listings.modrinth
        },
        {
            name: "Planet Minecraft",
            values: [
                300000,
                200000,
                10000,
                500,
                15000
            ]
        },
        {
            name: "MCPEDL",
            values: [
                3000,
                "X",
                "X",
                "X",
                "X"
            ]
        },
    ] }; // why does it have to return an object aaaaaaa
};