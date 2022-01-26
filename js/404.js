const FRAME_TIME = 12;
const tnt = document.getElementById('tnt');
const diamond = document.getElementById('diamond');
const explosion = document.getElementById('explosion');
var exploded = false;

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function boom() {
	if (!exploded) {
		for (var i = 0; i < 8; i++) {
			await sleep(FRAME_TIME*25);
			if (i % 2 === 0) tnt.src = "../image/404/tnt_side_on.png";
			else tnt.src = "../image/404/tnt_side.png";
		}
		explosion.classList.remove("hidden");
		tnt.classList.add("hidden");
		for (var i = 0; i <= 15; i++) {
			await sleep(FRAME_TIME*1.3);
			explosion.src = "../image/404/explosion_" + i + ".png";
		}
		diamond.classList.remove("hidden");
		explosion.classList.add("hidden");
		exploded = true;
	} else {
		tnt.classList.remove("hidden");
		diamond.classList.add("hidden");
		exploded = false;
	}
}