export const load = async function({ params }) {
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
                "1M",
                "2M",
                "3K",
                "100",
                "400K"
            ]
        },
        {
            name: "Modrinth",
            values: [
                "10K",
                "15K",
                "X",
                "X",
                "X"
            ]
        },
        {
            name: "Planet Minecraft",
            values: [
                "300K",
                "200K",
                "10K",
                "500",
                "15K"
            ]
        },
        {
            name: "MCPEDL",
            values: [
                "3K",
                "X",
                "X",
                "X",
                "X"
            ]
        },
    ] }; // why does it have to return an object aaaaaaa
};