class MCAnimation {

  // NOTE: The 'width' and 'height' properties in MCMETA are not supported.
  
  constructor(src, mcmeta) {
    this.texture = new Image()
    this.texture.src = src

    this.mcmeta = typeof mcmeta === 'object' ? mcmeta : { animation:{} }
    if (!this.mcmeta.animation) {
      this.mcmeta.animation = {}
    }

    this.canvas = document.createElement('canvas')
    this.canvas.className = 'mc-animation'
    this.context = this.canvas.getContext('2d')

    this.frames = []
    this.currentFrame = 0
    this.ticks = 0

    // Finish the initialization once the texture is loaded
    this.texture.addEventListener('load', () => this.init())
  }

  init() {
    // Set the canvas' size to match the texture
    this.canvas.width = this.texture.width
    this.canvas.height = this.texture.width

    // Default frametime
    let frametime = Math.max(this.mcmeta.animation.frametime || 1, 1)

    // Check if the animation has non-default frame order or varying frame durations
    if (Array.isArray(this.mcmeta.animation.frames) && this.mcmeta.animation.frames.length > 0) {
      // If the animation should interpolate between frames or
      // if any of the frames has a duration that is not a multiple of 'frametime',
      // the animation should be updated every game tick (50ms)
      if (this.mcmeta.animation.interpolate || (this.mcmeta.animation.frames.find(e => typeof e === 'object' && e.time % frametime != 0))) {
        this.interval = 1
      } else {
        this.interval = frametime
      }

      // Convert frames from the MCMETA format
      for (let i = 0; i < this.mcmeta.animation.frames.length; i++) {
        const frame = this.mcmeta.animation.frames[i]

        // Default frame duration
        if (typeof frame === 'number') {
          this.frames.push({
            index: frame,
            duration: frametime / this.interval
          })

        // Non-default frame duration
        } else {
          this.frames.push({
            index: frame.index,
            duration: Math.max(frame.time, 1) / this.interval
          })
        }
      }

    // Default frame order, no varying frame durations
    } else {
      // If the animation should interpolate between frames, the animation should be updated every game tick (50ms)
      if (this.mcmeta.animation.interpolate) {
        this.interval = 1
      } else {
        this.interval = frametime
      }

      // Create frames
      let n = this.texture.height / this.texture.width
      for (let i = 0; i < n; i++) {
        this.frames.push({
          index: i,
          duration: frametime / this.interval
        })
      }
    }

    this.draw()
    this.play()
  }

  draw(frame = 0, ticks = 0) {
    // Clear the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // Use nearest-neighbour filtering if the texture is smaller than the canvas
    this.context.imageSmoothingEnabled = this.texture.width > this.canvas.width

    // Draw frame
    this.context.globalAlpha = 1
    this.context.drawImage(
      this.texture,
      0, this.texture.width * this.frames[frame].index,
      this.texture.width, this.texture.width,
      0, 0,
      this.canvas.width, this.canvas.height
    )

    // If interpolation is enabled, draw the next frame with the correct opacity
    if (this.mcmeta.animation.interpolate) {
      this.context.globalAlpha = ticks / this.frames[frame].duration
      this.context.drawImage(
        this.texture,
        0, this.texture.width * this.frames[(frame + 1) % this.frames.length].index,
        this.texture.width, this.texture.width,
        0, 0,
        this.canvas.width, this.canvas.height
      )
    }
  }

  update() {
    // Redraw only when there is a new frame to draw
    if (this.frames[this.currentFrame].duration <= ++this.ticks) {
      this.currentFrame = (this.currentFrame + 1) % this.frames.length
      this.ticks = 0

      this.draw(this.currentFrame, this.ticks)

      if (typeof this.onNewFrame === 'function') {
        this.onNewFrame()
      }

    // Interpolated animations need to redraw every update/game tick
    } else if (this.mcmeta.animation.interpolate) {
      this.draw(this.currentFrame, this.ticks)
    }
  }

  play() {
    if (this.frames.length > 1) {
      this.timer = setInterval(() => {
        window.requestAnimationFrame(() => this.update())
      }, 50 * this.interval)

    // There is only one frame, no need to keep it updated, just draw it once
    } else {
      window.requestAnimationFrame(() => this.draw())
    }

    this.canvas.classList.add('playing')
  }

  pause() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }

    this.canvas.classList.remove('playing')
  }

  stop() {
    this.pause()
    this.currentFrame = 0

    this.canvas.classList.remove('playing')
  }

  get frameIndex() {
    if (this.frames.length > 0){
      return this.frames[this.currentFrame].index
    } else {
      return 0
    }
  }

  get playing() {
    return this.timer != null
  }

}