import Enemy from './Enemy.js'
import spriteImage from './assets/sprites/ghost.png'

export default class Skeleton extends Enemy {
  constructor(game, x, y) {
    super(game)
    this.width = 40
    this.height = 70
    this.x = x
    this.y = y
    this.speed = 1
    this.lives = Math.floor(Math.random() * 3) + 6
    this.color = 'transparent'
    this.type = 'skeleton'
    this.damage = 10

    const image = new Image()
    image.src = spriteImage
    this.image = image

    this.frameX = 0
    this.frameY = 0.19
    this.maxFrame = 8
    this.fps = 12
    this.timer = 0
    this.interval = 1000 / this.fps

    // flip sprite direction
    this.flip = false
  }

  update(player) {
    const dx = player.x - this.x // calculate the x distance to the player
    const dy = player.y - this.y // calculate the y distance to the player
    const distance = Math.sqrt(dx * dx + dy * dy) // calculate the total distance to the player
    const speedX = (dx / distance) * this.speed // calculate the x speed towards the player
    const speedY = (dy / distance) * this.speed // calculate the y speed towards the player
    this.x += speedX // move the enemy towards the player on the x axis
    this.y += speedY // move the enemy towards the player on the y axis

    if (this.x > player.x) {
      this.flip = true
    }
    else if (this.x < player.x) {
      this.flip = false
    }
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
