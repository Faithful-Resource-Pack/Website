// source: https://www.kirupa.com/html5/the_falling_snow_effect.htm

const SNOW_KEY = "snow";

// add css + disable snow button
document.addEventListener("DOMContentLoaded", () => {
	const snowCSS = document.createElement("link");
	snowCSS.rel = "stylesheet";
	snowCSS.href = "/css/snow.css";
	snowCSS.type = "text/css";

	let enabled = (localStorage.getItem(SNOW_KEY) || "true") === "true";

	function toggleCSS(state) {
		localStorage.setItem(SNOW_KEY, String(state));
		if (state) document.head.appendChild(snowCSS);
		else snowCSS.remove();
	}
	// disable button
	const disableButton = document.createElement("button");
	disableButton.addEventListener("click", () => {
		enabled = !enabled;
		toggleCSS(enabled);
	});
	disableButton.className = "btn btn-primary disable-snow-button";
	disableButton.prepend("Toggle Snow");
	document.querySelector("main").append(disableButton);

	// append
	toggleCSS(enabled);
});

/** @type {Snowflake[]} Array to store our Snowflake objects */
const snowflakes = [];

// Global variables to store our browser's window size
let browserWidth;
let browserHeight;

// Specify the number of snowflakes you want visible
const numberOfSnowflakes = 40;

// Flag to reset the position of the snowflakes
let resetPosition = false;

/** Represents a single snowflake object */
class Snowflake {
	constructor(element, speed, xPos, yPos) {
		// set initial snowflake properties
		this.element = element;
		this.speed = speed;
		this.xPos = xPos;
		this.yPos = yPos;
		this.scale = 1;
		// declare variables used for snowflake's motion
		this.counter = 0;
		this.sign = Math.random() < 0.5 ? 1 : -1;
		// setting an initial opacity and size for our snowflake
		this.element.style.opacity = (0.1 + Math.random()) / 3;
	}
	/** The function responsible for actually moving our snowflake */
	update() {
		// using some trigonometry to determine our x and y position
		this.counter += this.speed / 5000;
		this.xPos += (this.sign * this.speed * Math.cos(this.counter)) / 40;
		this.yPos += Math.sin(this.counter) / 40 + this.speed / 30;
		this.scale = 0.5 + Math.abs((10 * Math.cos(this.counter)) / 20);
		// setting our snowflake's position
		this.setTransform(Math.round(this.xPos), Math.round(this.yPos), this.scale, this.element);
		// if snowflake goes below the browser window, move it back to the top
		if (this.yPos > browserHeight) this.yPos = -50;
	}
	/** A performant way to set your snowflake's position and size */
	setTransform(xPos, yPos) {
		this.element.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) scale(${this.scale}, ${this.scale})`;
	}
}

/**
 * The function responsible for creating the snowflake
 */
function generateSnowflakes() {
	// get our snowflake element from the DOM and store it

	const originalSnowflakes = [".snowflake0", ".snowflake1", ".snowflake2", ".snowflake3"].map(
		(sel) => document.querySelector(sel),
	);

	// access our snowflake element's parent container
	const snowflakeContainer = originalSnowflakes[0].parentNode; // doesn't have to be zero
	snowflakeContainer.style.display = "block";

	// get our browser's size
	browserWidth = document.documentElement.clientWidth;
	browserHeight = document.documentElement.clientHeight;

	// create each individual snowflake
	for (let i = 0; i < numberOfSnowflakes / originalSnowflakes.length; ++i) {
		// set our snowflake's initial position and related properties
		const initialXPos = getPosition(50, browserWidth);
		const initialYPos = getPosition(50, browserHeight);
		const speed = 5 + Math.random() * 40;
		for (const snowflake of originalSnowflakes) {
			// clone our original snowflake and add it to snowflakeContainer
			const cloned = snowflake.cloneNode(true);
			snowflakeContainer.appendChild(cloned);
			snowflakes.push(new Snowflake(cloned, speed, initialXPos, initialYPos));
		}
	}

	// remove the original snowflake because we no longer need it visible
	originalSnowflakes.forEach((snowflake) => snowflakeContainer.removeChild(snowflake));
	moveSnowflakes();
}

/**
 * Responsible for moving each snowflake by calling its update function
 */
function moveSnowflakes() {
	snowflakes.forEach((item) => {
		item.update();
	});

	// Reset the position of all the snowflakes to a new value
	if (resetPosition) {
		browserWidth = document.documentElement.clientWidth;
		browserHeight = document.documentElement.clientHeight;

		snowflakes.forEach((item) => {
			item.xPos = getPosition(50, browserWidth);
			item.yPos = getPosition(50, browserHeight);
		});

		resetPosition = false;
	}

	requestAnimationFrame(moveSnowflakes);
}

/**
 * Returns a number between (maximum - offset) and (maximum + offset)
 */
function getPosition(offset, size) {
	return Math.round(-1 * offset + Math.random() * (size + 2 * offset));
}

/**
 * Trigger a reset of all the snowflakes' positions
 */
function setResetFlag() {
	resetPosition = true;
}

//
// It all starts here...
//
generateSnowflakes();
window.addEventListener("resize", setResetFlag, false);
