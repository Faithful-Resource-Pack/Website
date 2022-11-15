<script>
	let year = new Date().getFullYear().toString();
</script>

<footer>
    <div>
        <img class="footer-wordmark" src="/images/branding/wordmark.png" alt="Faithful">
        <p>theme button here</p>
        <br>
        <a href="mailto:contact@faithfulpack.net">contact@faithfulpack.net</a>
        <p>&copy; { year } Faithful Resource Pack</p>
    </div>
    <div class="footer-nav">
        <div class="footer-row">
            <h3>Info</h3>
            <ul>
                <li>
                    <a href="/about">About</a>
                </li>
                <li>
                    <a href="/team">Team</a>
                </li>
                <li>
                    <a href="/installation">Installation</a>
                </li>
                <li>
                    <a href="/license">License</a>
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
            </ul>
        </div>
        <div class="footer-row">
            <h3>Media</h3>
            <ul>
                <li>
                    <a href="/placeholder">Github</a>
                </li>
                <li>
                    <a href="/placeholder">Twitter</a>
                </li>
                <li>
                    <a href="/placeholder">Discord</a>
                </li>
                <li>
                    <a href="/placeholder">Patreon</a>
                </li>
            </ul>
        </div>
        <div class="footer-row">
            <h3>Resources</h3>
            <ul>
                <li>
                    <a href="https://docs.faithfulpack.net">Docs</a>
                </li>
                <li>
                    <a href="https://status.faithfulpack.net">Status</a>
                </li>
                <li>
                    <a href="https://translate.faithfulpack.net">Translate</a>
                </li>
                <li>
                    <a href="/stats">Stats</a>
                </li>
            </ul>
        </div>
    </div>
    <div>
        <br>
	    <small>"Minecraft" is a trademark of Microsoft Corporation and not affiliated with this site. Visit the <a href="https://www.minecraft.net/">official site</a> to get the game!</small>
    </div>
</footer>

<style lang="scss">
    footer {
        padding: 30px;
        gap: 0 30px;
        display: flex;
        flex-wrap: wrap;
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
            gap: 0 30px;

            ul {
                list-style: none;
                padding: 0;
            }
        }
    }
</style>