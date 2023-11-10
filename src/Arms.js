import spriteImage from './assets/sprites/armarFlip.png'

export default class Arms {
  constructor(game) {
    this.game = game
    this.width = 45
    this.height = 15
    this.x = this.game.player.x +this.game.player.width /2
    this.y = this.game.player.y + this.game.player.height / 2

    this.angle = 0

    const image = new Image()
    image.src = spriteImage
    this.image = image

    this.frameX = 0
    this.frameY = 1

    // flip sprite direction
    this.flip = false
  }

  update(deltaTime) {
  
    if (this.game.input.mouseX > this.game.player.x + this.game.player.width / 2) {
      this.flip = true
      this.x = this.game.player.x +this.game.player.width / 2 -7
    } else if (this.game.input.mouseX < this.game.player.x + this.game.player.width / 2) {
      this.flip = false
      this.x = this.game.player.x +this.game.player.width / 2 + 8
    }

    
    this.y = this.game.player.y + this.game.player.height / 4 +6

    this.angle = Math.atan2(
      this.game.input.mouseY - (this.y + this.height / 2),
      this.game.input.mouseX - (this.x + this.width / 2)
    )
  }

  draw(context) {
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.angle)



    if (this.flip ===true) {
      context.scale(1, 1)
    }
    if (this.flip ===false) {
      context.scale(1, -1)
    }

    
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height - 14,
      this.width,
      this.height,
      this.flip ? 0 : 0 ,
      0,
      this.width,
      this.height
    )
    

    context.restore() 
  }
}
