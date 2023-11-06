import Item from "./Item"
import spriteImage from './assets/sprites/gaming.png'

export default class Ammo extends Item {
  constructor(game, x, y) {
    super(game)
    this.width = 31
    this.height = 34
    this.x = x
    this.y = y
    this.speed = 0
    this.lives = 1
    this.color = '#0f0'
    this.type = 'ammo'
  
    const image = new Image()
    image.src = spriteImage
    this.image = image

    this.frameX = 0
    this.frameY = 0.4
    this.maxFrame = 0
    this.fps = 10
    this.timer = 0
    this.interval = 1000 / this.fps

  }

  update() {
    if (this.timer > this.interval) {
      this.frameX++
      this.timer = 0
    } else {
      this.timer += this.fps
    }

    // reset frameX when it reaches maxFrame
    if (this.frameX >= this.maxFrame) {
      this.frameX = 0
    }
  }
}
