<script>
import Fa from "svelte-fa/src/fa.svelte";
import { faGithub, faThemeco } from "@fortawesome/free-brands-svg-icons";
import {
  faInfoCircle,
  faScroll,
  faBook,
  faComment,
  faGlobe,
  faSun,
  faMoon
} from "@fortawesome/free-solid-svg-icons";

let year = new Date().getFullYear().toString();
</script>

<footer class="footer">
  <div class="footer-row">
    <div class="footer-element">
      <div class="footer-head">
        <a href="/"><img class="footer-wordmark" src="/images/branding/wordmark.png" alt="Faithful"></a>
      </div>
      <ul class="footer-content">
        <div class="btns">
          <button disabled><Fa icon={faGlobe}/></button>
          <button disabled><Fa icon={faMoon}/></button>
        </div>
        <li></li>
        <li><a class="link" href="mailto:contact@faithfulpack.net">contact@faithfulpack.net</a></li>
        <li>&copy; { year } Faithful Resource Pack</li>
      </ul>
    </div>

    
    <div class="footer-element">
      <div class="footer-head">
        <h3><Fa icon={faInfoCircle}/> Info</h3>
      </div>
      <ul class="footer-content">
        <li><a href="/installation">Installation</a></li>
        <li><a href="/license">License</a></li>
        <li><a href="/team">Team</a></li>
        <li><a href="/branding">Branding</a></li>
        <li><a href="/stats">Statistics</a></li>
      </ul>
    </div>

    <div class="footer-element">
      <div class="footer-head">
        <h3><Fa icon={faBook}/> Listings</h3>
      </div>
      <ul class="footer-content">
        <li><a href="https://www.curseforge.com/members/faithful_resource_pack/projects">CurseForge</a></li>
        <li><a href="https://modrinth.com/user/Faithful-Resource-Pack">Modrinth</a></li>
        <li><a href="https://www.planetminecraft.com/member/faithful_resource_pack">Planet Minecraft</a></li>
        <li><a href="https://mcpedl.com/user/faithful-resource-pack">MCPEDL</a></li>
        <li><a href="https://www.minecraftforum.net/members/Faithful_Resource_Pack">Minecraft Forum</a></li>
      </ul>
    </div>

    <div class="footer-element">
      <div class="footer-head">
        <h3><Fa icon={faComment}/> Media</h3>
      </div>
      <ul class="footer-content">
        <li><a href="https://twitter.com/FaithfulPack">Twitter</a></li>
        <li><a href="https://www.patreon.com/Faithful_Resource_Pack">Patreon</a></li>
        <li><a href="https://www.reddit.com/r/faithfulpack/">Reddit</a></li>
        <li><a href="https://discord.gg/sN9YRQbBv7">Main Discord</a></li>
        <li><a href="https://discord.gg/KSEhCVtg4J">CF Discord</a></li>
      </ul>
    </div>

    <div class="footer-element">
      <div class="footer-head">
        <h3><Fa icon = {faScroll}/> Resources</h3>
      </div>
      <ul class="footer-content">
        <li><a href="/news">News</a></li>
        <li><a href="https://docs.faithfulpack.net">Docs</a></li>
        <li><a href="https://status.faithfulpack.net">Status</a></li>
        <li><a href="https://translate.faithfulpack.net">Translate</a></li>
        <li><a href="https://docs.faithfulpack.net/pages/textures/contributor-handbook">Contributor's Handbook</a></li>
      </ul>
    </div>

    <div class="footer-element">
      <div class="footer-head">
        <h3><Fa icon={faGithub}/> GitHub</h3>
      </div>
      <ul class="footer-content">
        <li><a href="https://github.com/Faithful-Resource-Pack">Faithful</a></li>
        <li><a href="https://github.com/ClassicFaithful">Classic Faithful</a></li>
        <li><a href="https://github.com/Faithful-Mods">Faithful Mods</a></li>
      </ul>
    </div>
  </div>

  <div class="footer-trademark">
    <p>"Minecraft" is a trademark of Microsoft Corporation and not affiliated with this site. Visit the <a class="link" href="https://www.minecraft.net">official site</a> to get the game!</p>
  </div>
</footer>

<style lang="scss">

.footer {
  padding: 2em;
  color: $text-dark-bg;

  &-trademark {
    text-align: center;
  }

  &-element {
    width: calc(60% / 4);
    min-width: 150px;
    padding: 0 1em;
  }

  &-content {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 1em;

    > .btns {
      height: 3.6em;
      display: flex;
      gap: 4px;

      > button {
        height: 3.6em;
        width: 3.6em;
        padding: .7em;
        background: transparent;
        border: none;
        border-radius: 50%;
      }
    }

    > li {
      height: 1.8em;
      white-space: nowrap;

      > a {
        color: $text-dark-bg; 
      }

    }
  }

  &-row {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1080px;
    justify-content: center;

    >:first-child {
      width: 100%;
      max-width: 240px;
    }

    >:not(:first-child) > .footer-content > li {
      max-width: fit-content;
      animation: slide_right_out 600ms ease-in-out;

      &:hover {
        animation: slide_right_in 200ms ease-in-out forwards;
      }
    }
  }

  &-head {
    width: 100%;
    height: 2.5em;
    display: flex;
    align-items: center;
    justify-content: left;
    > a > img {
      max-width: 200px;
    }
  }
}
</style>