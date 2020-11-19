// source : https://www.kirupa.com/html5/the_falling_snow_effect.htm

// Array to store our Snowflake objects
var snowflakes = [];

// Global variables to store our browser's window size
var browserWidth;
var browserHeight;

// Specify the number of snowflakes you want visible
var numberOfSnowflakes = 40;

// Flag to reset the position of the snowflakes
var resetPosition = false;

// Handle accessibility
var enableAnimations = false;
var reduceMotionQuery = matchMedia("(prefers-reduced-motion)");

// Handle animation accessibility preferences 
function setAccessibilityState() {
	if (reduceMotionQuery.matches) {
		enableAnimations = false;
	} else { 
		enableAnimations = true;
	}
}
setAccessibilityState();

reduceMotionQuery.addListener(setAccessibilityState);

//
// It all starts here...
//
function setup() {
	if (enableAnimations) {
		window.addEventListener("DOMContentLoaded", generateSnowflakes, false);
		window.addEventListener("resize", setResetFlag, false);
	}
}

//
// Make snow only when it's December
//
var today = new Date();
if (today.getMonth() == 11 || today.getMonth() == 0){ // January is 0
	setup();
}

//
// Constructor for our Snowflake object
//
function Snowflake(element, speed, xPos, yPos) {
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
	this.element.style.opacity = (.1 + Math.random()) / 3;
}

//
// The function responsible for actually moving our snowflake
//
Snowflake.prototype.update = function () {
	var me = this;
	// using some trigonometry to determine our x and y position
	me.counter += me.speed / 5000;
	me.xPos += me.sign * me.speed * Math.cos(me.counter) / 40;
	me.yPos += Math.sin(me.counter) / 40 + me.speed / 30;
	me.scale = .5 + Math.abs(10 * Math.cos(me.counter) / 20);
	// setting our snowflake's position
	setTransform(Math.round(me.xPos), Math.round(me.yPos), me.scale, me.element);
	// if snowflake goes below the browser window, move it back to the top
	if (me.yPos > browserHeight) {
	me.yPos = -50;
	}
}

//
// A performant way to set your snowflake's position and size
//
function setTransform(xPos, yPos, scale, el) {
	el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) scale(${scale}, ${scale})`;
}

//
// The function responsible for creating the snowflake
//
function generateSnowflakes() {
	// get our snowflake element from the DOM and store it

	var originalSnowflake0 = document.querySelector(".snowflake0");
	var originalSnowflake1 = document.querySelector(".snowflake1");
	var originalSnowflake2 = document.querySelector(".snowflake2");
	var originalSnowflake3 = document.querySelector(".snowflake3");

	// access our snowflake element's parent container
	var snowflakeContainer = originalSnowflake0.parentNode; // could be originalSnowflake0/1/2
	snowflakeContainer.style.display = "block";

	// get our browser's size
	browserWidth = document.documentElement.clientWidth;
	browserHeight = document.documentElement.clientHeight;

	// create each individual snowflake
	for (var i = 0; i < numberOfSnowflakes; i++) {
		// clone our original snowflake and add it to snowflakeContainer
		var snowflakeClone0 = originalSnowflake0.cloneNode(true);
		snowflakeContainer.appendChild(snowflakeClone0);

		var snowflakeClone1 = originalSnowflake1.cloneNode(true);
		snowflakeContainer.appendChild(snowflakeClone1);

		var snowflakeClone2 = originalSnowflake2.cloneNode(true);
		snowflakeContainer.appendChild(snowflakeClone2);

		var snowflakeClone3 = originalSnowflake3.cloneNode(true);
		snowflakeContainer.appendChild(snowflakeClone3);

		// set our snowflake's initial position and related properties
		var initialXPos = getPosition(50, browserWidth);
		var initialYPos = getPosition(50, browserHeight);
		var speed = 5 + Math.random() * 40;
		// create our Snowflake object

		var snowflakeObject0 = new Snowflake(snowflakeClone0, speed, initialXPos,	initialYPos);
		snowflakes.push(snowflakeObject0);

		var snowflakeObject1 = new Snowflake(snowflakeClone1, speed, initialXPos,	initialYPos);
		snowflakes.push(snowflakeObject1);

		var snowflakeObject2 = new Snowflake(snowflakeClone2, speed, initialXPos,	initialYPos);
		snowflakes.push(snowflakeObject2);

		var snowflakeObject3 = new Snowflake(snowflakeClone3, speed, initialXPos,	initialYPos);
		snowflakes.push(snowflakeObject3);
	}

	// remove the original snowflake because we no longer need it visible
	snowflakeContainer.removeChild(originalSnowflake0);
	snowflakeContainer.removeChild(originalSnowflake1);
	snowflakeContainer.removeChild(originalSnowflake2);
	snowflakeContainer.removeChild(originalSnowflake3);
	moveSnowflakes();
}

//
// Responsible for moving each snowflake by calling its update function
//
function moveSnowflakes() {
	if (enableAnimations) {
		for (var i = 0; i < snowflakes.length; i++) {
			var snowflake = snowflakes[i];
			snowflake.update();
		}      
	}

	// Reset the position of all the snowflakes to a new value
	if (resetPosition) {
		browserWidth = document.documentElement.clientWidth;
		browserHeight = document.documentElement.clientHeight;

		for (var i = 0; i < snowflakes.length; i++) {
			var snowflake = snowflakes[i];
			snowflake.xPos = getPosition(50, browserWidth);
			snowflake.yPos = getPosition(50, browserHeight);
		}

		resetPosition = false;
	}

	requestAnimationFrame(moveSnowflakes);
}

//
// This function returns a number between (maximum - offset) and (maximum + offset)
//
function getPosition(offset, size) {
	return Math.round(-1 * offset + Math.random() * (size + 2 * offset));
}

//
// Trigger a reset of all the snowflakes' positions
//
function setResetFlag(e) {
	resetPosition = true;
}