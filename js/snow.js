/* global matchMedia, requestAnimationFrame */
// source : https://www.kirupa.com/html5/the_falling_snow_effect.htm

const month = new Date().getMonth()
// december because indexed from 0
if (month == 11 && !matchMedia('(prefers-reduced-motion)').matches) {

  // Custom CSS
  const snowCSS = document.createElement("link")
  snowCSS.rel = "stylesheet"
  snowCSS.href = "/css/snow.css"
  snowCSS.type = "text/css"
  document.getElementsByTagName("head")[0].appendChild(snowCSS)

  // Array to store our Snowflake objects
  const snowflakes = []

  // Global variables to store our browser's window size
  let browserWidth
  let browserHeight

  // Specify the number of snowflakes you want visible
  const numberOfSnowflakes = 40

  // Flag to reset the position of the snowflakes
  let resetPosition = false

  //
  // It all starts here...
  //
  window.addEventListener('DOMContentLoaded', generateSnowflakes, false)
  window.addEventListener('resize', setResetFlag, false)

  //
  // Constructor for our Snowflake object
  //
  class Snowflake {
    constructor(element, speed, xPos, yPos) {
      // set initial snowflake properties
      this.element = element
      this.speed = speed
      this.xPos = xPos
      this.yPos = yPos
      this.scale = 1
      // declare variables used for snowflake's motion
      this.counter = 0
      this.sign = Math.random() < 0.5 ? 1 : -1
      // setting an initial opacity and size for our snowflake
      this.element.style.opacity = (0.1 + Math.random()) / 3
    }
    //
    // The function responsible for actually moving our snowflake
    //
    update() {
      // using some trigonometry to determine our x and y position
      this.counter += this.speed / 5000
      this.xPos += this.sign * this.speed * Math.cos(this.counter) / 40
      this.yPos += Math.sin(this.counter) / 40 + this.speed / 30
      this.scale = 0.5 + Math.abs(10 * Math.cos(this.counter) / 20)
      // setting our snowflake's position
      setTransform(Math.round(this.xPos), Math.round(this.yPos), this.scale, this.element)
      // if snowflake goes below the browser window, move it back to the top
      if (this.yPos > browserHeight) {
        this.yPos = -50
      }
    }
  }

  //
  // A performant way to set your snowflake's position and size
  //
  function setTransform (xPos, yPos, scale, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) scale(${scale}, ${scale})`
  }

  //
  // The function responsible for creating the snowflake
  //
  function generateSnowflakes () {
    // get our snowflake element from the DOM and store it

    const originalSnowflake0 = document.querySelector('.snowflake0')
    const originalSnowflake1 = document.querySelector('.snowflake1')
    const originalSnowflake2 = document.querySelector('.snowflake2')
    const originalSnowflake3 = document.querySelector('.snowflake3')

    // access our snowflake element's parent container
    const snowflakeContainer = originalSnowflake0.parentNode // could be originalSnowflake0/1/2
    snowflakeContainer.style.display = 'block'

    // get our browser's size
    browserWidth = document.documentElement.clientWidth
    browserHeight = document.documentElement.clientHeight

    // create each individual snowflake
    for (let i = 0; i < numberOfSnowflakes / 4; i++) {
      // clone our original snowflake and add it to snowflakeContainer
      const snowflakeClone0 = originalSnowflake0.cloneNode(true)
      snowflakeContainer.appendChild(snowflakeClone0)

      const snowflakeClone1 = originalSnowflake1.cloneNode(true)
      snowflakeContainer.appendChild(snowflakeClone1)

      const snowflakeClone2 = originalSnowflake2.cloneNode(true)
      snowflakeContainer.appendChild(snowflakeClone2)

      const snowflakeClone3 = originalSnowflake3.cloneNode(true)
      snowflakeContainer.appendChild(snowflakeClone3)

      // set our snowflake's initial position and related properties
      const initialXPos = getPosition(50, browserWidth)
      const initialYPos = getPosition(50, browserHeight)
      const speed = 5 + Math.random() * 40
      // create our Snowflake object

      const snowflakeObject0 = new Snowflake(snowflakeClone0, speed, initialXPos, initialYPos)
      snowflakes.push(snowflakeObject0)

      const snowflakeObject1 = new Snowflake(snowflakeClone1, speed, initialXPos, initialYPos)
      snowflakes.push(snowflakeObject1)

      const snowflakeObject2 = new Snowflake(snowflakeClone2, speed, initialXPos, initialYPos)
      snowflakes.push(snowflakeObject2)

      const snowflakeObject3 = new Snowflake(snowflakeClone3, speed, initialXPos, initialYPos)
      snowflakes.push(snowflakeObject3)
    }

    // remove the original snowflake because we no longer need it visible
    snowflakeContainer.removeChild(originalSnowflake0)
    snowflakeContainer.removeChild(originalSnowflake1)
    snowflakeContainer.removeChild(originalSnowflake2)
    snowflakeContainer.removeChild(originalSnowflake3)
    moveSnowflakes()
  }

  //
  // Responsible for moving each snowflake by calling its update function
  //
  function moveSnowflakes() {
    snowflakes.forEach((item) => {
      item.update()
    })

    // Reset the position of all the snowflakes to a new value
    if (resetPosition) {
      browserWidth = document.documentElement.clientWidth
      browserHeight = document.documentElement.clientHeight

      snowflakes.forEach((item) => {
        item.xPos = getPosition(50, browserWidth)
        item.yPos = getPosition(50, browserHeight)
      })

      resetPosition = false
    }

    requestAnimationFrame(moveSnowflakes)
  }

  //
  // This function returns a number between (maximum - offset) and (maximum + offset)
  //
  function getPosition(offset, size) {
    return Math.round(-1 * offset + Math.random() * (size + 2 * offset))
  }

  //
  // Trigger a reset of all the snowflakes' positions
  //
  function setResetFlag() {
    resetPosition = true
  }
}
