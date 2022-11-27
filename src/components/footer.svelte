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
	import Theme from "./theme.svelte";

let year = new Date().getFullYear().toString();
</script>

<footer class="footer">
  <div id="shadow"></div>
  <div class="footer-row">
    <div class="footer-element">
      <div class="footer-center footer-head">
        <a href="/"><img class="footer-wordmark" src="/images/branding/wordmark.png" alt="Faithful"></a>
      </div>
      <ul class="footer-content">
        <div class="btns">
          <button disabled><Fa style="width: 32px !important; height: 32px !important;" icon={faGlobe} /></button>
          <button disabled><Theme /></button>
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
  position: relative;

  &-trademark {
    text-align: center;
  }

  &-content {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 1em;

    > .btns {
      height: 3.6em;
      display: flex;
      justify-content: center;
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
      display: flex;
      white-space: nowrap;

      > a {
        color: $text-dark-bg;
        transition: all 0.1s ease-out;

        &:hover {
          color: rgb(220, 220, 220);
          cursor: pointer;
          transform: scale(0.95);
        }
      }
    }
  }

  &-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 50px;

    >:first-child {
      max-width: 240px;
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

  &-center {
    text-align: center;
    justify-content: center;
  }

  #shadow {
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
    height: 5px;
    overflow: hidden;

    &:after {
      content: "";
      display: block;
      position: absolute;
      box-shadow: 0 5px 5px 5px #000;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
}

#globe {
  height: 32px;
  width: 32px;
}
</style>