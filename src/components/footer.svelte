<script>
	let year = new Date().getFullYear().toString();
</script>

<footer>
    <div>
        <img class="footer-wordmark" src="/images/branding/wordmark.png" alt="Faithful">
        <br>
        <p>theme button here</p>
        <p>language button here</p>
        <br>
        <a href="mailto:contact@faithfulpack.net">contact@faithfulpack.net</a>
        <p>&copy; { year } Faithful Resource Pack</p>
    </div>
    <div>
    <div class="footer-nav">
        <div class="footer-row">
            <h3>Info</h3>
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
                    <a href="https://docs.faithfulpack.net">Docs</a>
                </li>
                <li>
                    <a href="/branding">Branding</a>
                </li>
            </ul>
        </div>
        <div class="footer-row">
            <h3>Listings</h3>
            <ul>
                <li>
                    <a href="/placeholder">CurseForge</a>
                </li>
                <li>
                    <a href="/placeholder">Modrinth</a>
                </li>
                <li>
                    <a href="/placeholder">Planet Minecraft</a>
                </li>
                <li>
                    <a href="/placeholder">MCPEDL</a>
                </li>
                <li>
                    <a href="/placeholder">Minecraft Forum</a>
                </li>
            </ul>
        </div>
        <div class="footer-row">
            <h3>Media</h3>
            <ul>
                <li>
                    <a href="/placeholder">Twitter</a>
                </li>
                <li>
                    <a href="/placeholder">Patreon</a>
                </li>
                <li>
                    <a href="/placeholder">Reddit</a>
                </li>
                <li>
                    <a href="/placeholder">Main Discord</a>
                </li>
                <li>
                    <a href="/placeholder">CF Discord</a>
                </li>
            </ul>
        </div>
        <div class="footer-row">
            <h3>Resources</h3>
            <ul>
                <li>
                    <a href="/placeholder">Faithful Guidelines</a>
                </li>
                <li>
                    <a href="/placeholder">CF Guidelines</a>
                </li>
                <li>
                    <a href="/palceholder">Contributor's Handbook</a>
                </li>
                <li>
                    <a href="https://status.faithfulpack.net">Status</a>
                </li>
                <li>
                    <a href="/stats">Statistics</a>
                </li>
                <li>
                    <a href="https://translate.faithfulpack.net">Translate</a>
                </li>
            </ul>
        </div>
        <div class="footer-row">
            <h3>Repositories</h3>
            <ul>
                <li>
                    <a href="/placholder">Faithful</a>
                </li>
                <li>
                    <a href="/placeholder">Classic Faithful</a>
                </li>
                <li>
                    <a href="/placeholder">CF32 Mods</a>
                </li>
            </ul>
        </div>
        </div>
        <div class="mc-trademark">
            <p>"Minecraft" is a trademark of Microsoft Corporation and not affiliated with this site. Visit the <a href="https://www.minecraft.net/">official site</a> to get the game!</p>
        </div>
    </div>
</footer>

<style lang="scss">
    footer {
        padding: 30px;
        gap: 0 60px;
        display: flex;
        justify-content: center;
        color: rgb(180, 180, 180);

        a {
            color: rgb(180, 180, 180);
        }

        .footer-wordmark {
            max-width: 240px;
        }

        .footer-nav {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 0 60px;

            ul {
                list-style: none;
                padding: 0;

                li + li {
                    margin-top: 6px;
                }
            }
        }

        .mc-trademark a {
            text-decoration: underline;
        }
    }
</style>