import spriteImage from './assets/sprites/nerfDart.png'

export default class Projectile {
  constructor(game, x, y, angle) {
    this.game = game
    this.width = 10
    this.height = 4
    this.x = x
    this.y = y
    this.angle = angle

    this.speed = 400
    this.damage = 2
    this.markedForDeletion = false

    const image = new Image()
    image.src = spriteImage
    this.image = image

    this.frameX = 0
    this.frameY = 0.4
  }

  update(deltaTime) {
    const velocity = {
      x: this.speed * Math.cos(this.angle),
      y: this.speed * Math.sin(this.angle),
    }

    this.x += velocity.x * (deltaTime / 1000)
    this.y += velocity.y * (deltaTime / 1000)

    if (this.x > this.game.width) {
      this.markedForDeletion = true
    }
  }

  draw(context) {
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.angle)
    context.fillStyle = '#ff7600'
    context.fillRect(0, 0, this.width, this.height)
    

    context.restore() 
  }
}
