---
title: License
---

<!-- 
How add a language support ? 
	1. copy the english div, set style="display: none"
	2. translate to the language you want add support
	3. add flag of the main country where your language is speaked in /image/license
	4. add a buttons following existing one.
-->

<div class="row">
	<div class="col">
		<button class="btn btn-block nav-link" onclick="Display('English')">
			<img src="{{ site.baseurl }}/image/license/en.png" height="24" class="d-inline-block" alt="FlagDE">
			EN
		</button>
	</div>
	<div class="col">
		<button class="btn btn-block nav-link" onclick="Display('French')">
			<img src="{{ site.baseurl }}/image/license/fr.png" height="24" class="d-inline-block" alt="FlagFR">
			FR
		</button>
	</div>
	<div class="col">
		<button class="btn btn-block nav-link disabled" onclick="Display('German')">
			<img src="{{ site.baseurl }}/image/license/de.png" height="24" class="d-inline-block" alt="FlagDE">
			DE
		</button>
	</div>
	<div class="col">
		<button class="btn btn-block nav-link disabled" onclick="Display('Poland')">
			<img src="{{ site.baseurl }}/image/license/pl.png" height="24" class="d-inline-block" alt="FlagPL">
			PL
		</button>
	</div>
	<div class="col">
		<button class="btn btn-block nav-link" onclick="Display('Romanian')">
			<img src="{{ site.baseurl }}/image/license/ro.png" height="24" class="d-inline-block" alt="FlagRO">
			RO
		</button>
	</div>
	<div class="col">
		<button class="btn btn-block nav-link disabled" onclick="Display('Spanish')">
			<img src="{{ site.baseurl }}/image/license/es.png" height="24" class="d-inline-block" alt="FlagES">
			ES
		</button>
	</div>
</div>

<br>

<div id="memory" style="display: none;">English</div>
<script>
	function Display(id) {
		var memory = document.getElementById('memory')
		var old_lang = document.getElementById(memory.innerHTML);
		var new_lang = document.getElementById(id);
		var warn = document.getElementById('warning')

		old_lang.style.display = 'none';
		new_lang.style.display = 'block';

		memory.innerHTML = id;

		if (id != 'English'){
			warn.style.display = 'block';
		} else {
			warn.style.display = 'none';
		}
	}
</script>

<div id="English">
	<h1>Compliance Resource Pack License</h1>
	<p align="justify">
		BY USING COMPLIANCE YOU AGREE TO THESE TERMS AND CONDITIONS. IF YOU DISTRIBUTE COMPLIANCE IN ANY FORM, THIS LICENSE MUST BE INCLUDED INSIDE OF THE ZIP FILE.
	</p>

	<h2>Definitions</h2>
	<p align="justify">
		The pack refers to any copyrightable work licensed under this license.
		<br>
		The Compliance Team staff refers to the persons in possession of the Discord accounts with the online nicknames Sei#0721, jogurciQ#7641, Juknum#6148, PeJohn#4519, Pomik108#1378 and RobertR11#7841.
		<br>
		A pack can be considered to be an add-on if it can only work in combination with the original pack in a way that makes sense.
		<br>
		A pack can be considered to be a streamer pack or a youtuber pack if it was made by or on behalf of a streamer or a youtuber.
	</p>

	<h2>Distribution of The Pack</h2>
	<p align="justify">
		If you wish to distribute the pack (whether that is a modified copy or an identical copy), you have to comply with the following terms and conditions:
		<ol>
			<li>You are required to get permission from the Compliance Team staff.</li>
			<li>You are required to link back to https://www.compliancepack.net in an appropriate place.</li>
			<li>You may not make money off of the pack in any form.</li>
			<li>You are required to include this license in all copies.</li>
		</ol>
	</p>

	<h2>Exceptions</h2>
	<p align="justify">
		You are not required to get permission from the Compliance Team staff if your pack can be considered to be an add-on.
	</p>

	<h2>Usage of The Pack</h2>
	<p>
		The pack may be used...
		<ul>
			<li>For placeholder textures.</li>
			<li>For replacing a small amount of textures you are unable to make yourself.</li>
			<li>For streamer or youtuber packs.</li>
			<li>During a stream or a video.</li>
			<li>As a base for mod or map textures.</li>
		</ul>
	</p>

	<h2>Final Note</h2>
	<p align="justify">
		The Compliance Team staff has the final say over any distribution and usage of the pack. We have the right to deny anyone the distribution or re-use of the pack. If you do not follow the terms and conditions of this license, legal action may be taken.
	</p>
</div>

<!-- Translated to French by Juknum#6148 -->
<div id="French" style="display: none;">
	<h1>License du Pack de Ressources Compliance</h1>
	<p align="justify">
		EN UTILISANT COMPLIANCE, VOUS ACCEPTEZ CES TERMES ET CONDITIONS. SI VOUS LE REDISTRIBUER QUEL QU'EN SOIT LA FORME, CETTE LICENSE DOIT ETRE INCLUSE DANS LE FICHIER ZIP.
	</p>

	<h2>Définitions</h2>
	<p align="justify">
		Le Pack de Ressources fait référence à tout travail protégeable par droit d'auteur sous cette license.
		<br>
		L'équipe Compliance se réfère à et est composée des personnes dont leurs pseudonymes Discords sont: Sei#0721, jogurciQ#7641, Juknum#6148, PeJohn#4519, Pomik108#1378 et RobertR11#7841.
		<br>
		Le Pack de Ressources peut être considéré comme étant un "add-on" (une extension) s'il ne peut fonction qu'en combinaison avec le Pack de Ressources Originel tout en ayant du sens.
		<br>
		Le Pack de Ressources peut être considéré comme étant un "Pack de Ressources de Streamer" ou comme étant un "Pack de Ressources de Vidéaste" s'il a été créer par ou au nom d'un streamer ou d'un vidéaste
	</p>

	<h2>Distribution du Pack de Ressources</h2>
	<p align="justify">
		Si vous souhaitez distribuer ce pack de ressources (qu'il soit modifié ou une copie exacte), vous devez vous conformez avec les termes et conditions suivantes:
		<ol>
			<li>Vous devez avoir la permission par l'un des membres de l'équipe du Compliance.</li>
			<li>Vous devez attacher un lien retournant vers https://www.compliancepack.net dans un lieu approprié.</li>
			<li>Vous ne pouvez pas gagner d'argent avec le pack distribué, sous quelque forme que ce soit.</li>
			<li>Vous devez inclure cette license dans toutes les copies</li>
		</ol>
	</p>

	<h2>Exceptions</h2>
	<p align="justify">
		Vous n'avez pas besoin d'obtenir une permission de l'équipe du Compliance si votre Pack de Ressources peut-être considéré comme étant un "add-on" (une extension).
	</p>

	<h2>Utilisation du Pack de Ressources</h2>
	<p>
		Le Pack de Ressources peut être utilisé...
		<ul>
			<li>Pour un Ressource Pack personnel.</li>
			<li>Pour remplacer une petite quantité de textures que vous n'êtes pas capable de faire par vous-même.</li>
			<li>Pour un Pack de Ressources pour Streamer et/ou Vidéaste.</li>
			<li>Lors d'un live et/ou d'une vidéo.</li>
			<li>Comme une base pour un Mod ou une Map.</li>
		</ul>
	</p>

	<h2>Notes Finales</h2>
	<p align="justify">
		Le personnel de l'équipe du Compliance a le dernier mot sur la distribution et l'utilisation du Pack de Ressources. Nous avons le droit de refuser à quiconque la distribution ou la réutilisation du Pack de Ressources. Si vous ne suivez pas les termes et conditions de cette license, des poursuites judiciaires peuvent être engagées.
	</p>
</div>

<!-- Translated to Romanian by Ozzymand#1575 -->
<div id="Romanian" style="display: none;">
	<h1>Licență Compliance Resource Pack</h1>
	<p align="justify">
		PRIN FOLOSIREA PACHETULUI COMPLIACE SUNTEȚI DE ACORD CU TERMENI ȘI CONDIȚIILE. DACĂ DISTRIBUIȚI PACHETUL COMPLIANCE ÎN ORICE FORMĂ, ACEASTĂ LICENȚĂ TREBUIE SĂ FIE INCULSĂ IN FIȘIERUL ZIP.
	</p>

	<h2>Definiții</h2>
	<p align="justify">
		Pachetul se referă la toate lucrările sub această licență care dețin toate drepturile de autor.
		<br>
		Staff-ul Compliance se referă la persoanele în possesia următoarelor conturi de discord: Sei#0721, jogurciQ#7641, Juknum#6148, PeJohn#4519, Pomik108#1378 și RobertR11#7841.
		<br>
		Un pachet poate fi considerat ca o adiție doar dacă poate să meargă in combinație cu pachetul original intr-o metodă ce are sens.
		<br>
		Un pachet poate fi considerat ca al unui streamer sau al unui youtuber dacă acesta este creat de sau în numele acelui streamer sau youtuber.
	</p>

	<h2>Distribuirea pachetului</h2>
	<p align="justify">
		Dacă dorești să distribui pachetul (acesta fiind o copie modificată sau originalul), trebuie să te conformezi cu următorii termeni si condiții:
		<ol>
			<li>Trebuie să ceri permisia Staff-ului Compliance.</li>
			<li>Trebuie să pui un link către https://www.compliancepack.net intr-un loc potrivit.</li>
			<li>Nu trebuie să faci bani sub nici o formă din pachet.</li>
			<li>Toate copiile trebuie să includă licența.</li>
		</ol>
	</p>

	<h2>Excepții</h2>
	<p align="justify">
		Nu ai nevoie de permisia Staff-ului Compliance dacă pachetul tau poate fi considerat o adiție.
	</p>

	<h2>Folosirea pachetului</h2>
	<p>
		Pachetul poate fi folosit pentru...
		<ul>
			<li>Pentru texturi temporare.</li>
			<li>Pentru a schimba cantități mici de texturi pe care nu le puteți face dumneavoastră.</li>
			<li>Pentru pachete intenționate pentru streameri sau youtuberi.</li>
			<li>În timpul unui stream sau al unui video.</li>
			<li>Ca o textură de bază pentru un mod sau o hartă.</li>
		</ul>
	</p>

	<h2>Notă finală</h2>
	<p align="justify">
		Staff-ul Compliance deține utlimul cuvânt asupra distribuirea și folosirea pachetului. Avem dreptul de a refuza abilitatea de a distribuii și de a refolosi acest pachet oricui. Dacă nu te conformezi cu termenii si condițiile acestei licențe, acțiuni legal vor fi luate.
	</p>
</div>

<div id="warning" style="display: none;">
	<p align="center"><small>The translation may be inexact, if you find anything wrong, report it on our <a href="https://github.com/Compliance-Resource-Pack/Website">GitHub</a> or <a data-toggle="tooltip" data-placement="top" title="See Above">Discord</a></small></p>
</div>
