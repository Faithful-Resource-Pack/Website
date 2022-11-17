<script>
	import Fa from "svelte-fa/src/fa.svelte";
    import {
		faGithub
	} from "@fortawesome/free-brands-svg-icons";
    import {
        faInfoCircle,
        faScroll,
        faBook,
        faComment
    } from "@fortawesome/free-solid-svg-icons";
	let year = new Date().getFullYear().toString();
</script>

<footer>
    <div>
        <a href="/"><img class="footer-wordmark" src="/images/branding/wordmark.png" alt="Faithful"></a>
        <br>
        <p>theme button here</p>
        <p>language button here</p>
        <br>
        <a class="link" href="mailto:contact@faithfulpack.net">contact@faithfulpack.net</a>
        <p>&copy; { year } Faithful Resource Pack</p>
    </div>
    <div>
    <div class="footer-nav">
        <div class="footer-row">
            <h3><Fa icon={faInfoCircle}/> Info</h3>
            <ul>
                <li>
                    <a href="/installation">Installation</a>
                </li>
                <li>
                    <a href="/license">License</a>
                </li>
                <li>
                    <a href="/team">Team</a>
                </li>
                <li>
                    <a href="/branding">Branding</a>
                </li>
                <li>
                    <a href="/stats">Statistics</a>
                </li>
            </ul>
        </div>
        <div class="footer-row">
            <h3><Fa icon={faBook}/> Listings</h3>
            <ul>
                <li>
                    <a href="https://www.curseforge.com/members/faithful_resource_pack/projects">CurseForge</a>
                </li>
                <li>
                    <a href="https://modrinth.com/user/Faithful-Resource-Pack">Modrinth</a>
                </li>
                <li>
                    <a href="https://www.planetminecraft.com/member/faithful_resource_pack">Planet Minecraft</a>
                </li>
                <li>
                    <a href="https://mcpedl.com/user/faithful-resource-pack">MCPEDL</a>
                </li>
                <li>
                    <a href="https://www.minecraftforum.net/members/Faithful_Resource_Pack">Minecraft Forum</a>
                </li>
            </ul>
        </div>
        <div class="footer-row">
            <h3><Fa icon={faComment}/> Media</h3>
            <ul>
                <li>
                    <a href="https://twitter.com/FaithfulPack">Twitter</a>
                </li>
                <li>
                    <a href="https://www.patreon.com/Faithful_Resource_Pack">Patreon</a>
                </li>
                <li>
                    <a href="https://www.reddit.com/r/faithfulpack/">Reddit</a>
                </li>
                <li>
                    <a href="https://discord.gg/sN9YRQbBv7">Main Discord</a>
                </li>
                <li>
                    <a href="https://discord.gg/KSEhCVtg4J">CF Discord</a>
                </li>
            </ul>
        </div>
        <div class="footer-row">
            <h3><Fa icon = {faScroll}/> Resources</h3>
            <ul>
                <li>
                    <a href="https://docs.faithfulpack.net">Docs</a>
                </li>
                <li>
                    <a href="https://docs.faithfulpack.net/pages/textures/contributor-handbook">Contributor's Handbook</a>
                </li>
                <li>
                    <a href="https://status.faithfulpack.net">Status</a>
                </li>
                <li>
                    <a href="https://translate.faithfulpack.net">Translate</a>
                </li>
                <li>
                    <a href="/news">News</a>
                </li>
            </ul>
        </div>
        <div class="footer-row">
            <h3><Fa icon={faGithub}/> GitHub</h3>
            <ul>
                <li>
                    <a href="https://github.com/Faithful-Resource-Pack">Faithful</a>
                </li>
                <li>
                    <a href="https://github.com/ClassicFaithful">Classic Faithful</a>
                </li>
                <li>
                    <a href="https://github.com/Faithful-Mods">Faithful Mods</a>
                </li>
            </ul>
        </div>
    </div>
    <div class="footer-trademark">
        <p>"Minecraft" is a trademark of Microsoft Corporation and not affiliated with this site. Visit the <a class="link" href="https://www.minecraft.net">official site</a> to get the game!</p>
    </div>
</footer>

<style lang="scss">
    footer {
        padding: 30px;
        gap: 0 60px;
        display: flex;
        justify-content: center;
        color: rgb(180, 180, 180);
        box-shadow: 0 0 5px 0 #000;

        .footer-row {
            a {
                color: rgb(180, 180, 180);
            }

            h3 {
                margin-top: 0;
            }
        }

        .footer-wordmark {
            max-width: 240px;
        }

        .footer-nav {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 30px 60px;

            ul {
                list-style: none;
                padding: 0;

                li + li {
                    margin-top: 12px;
                }
            }
        }
    }
</style>