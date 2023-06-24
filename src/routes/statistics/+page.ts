export const load = async function({ params }) {
    /**
     * API LINKS TO FETCH FROM:
     * WEBSITE: WIP by robert probably maybe not
     * CURSE: api.cfwidget.com/<project id>
     * MODRINTH: api.modrinth.com/v2/project/<project id>
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
            values: [
                1000000,
                2000000,
                3000,
                100,
                400000
            ]
        },
        {
            name: "Modrinth",
            values: [
                10000,
                15000,
                "X",
                "X",
                "X"
            ]
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