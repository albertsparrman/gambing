export default class Item {
    constructor(game, color) {
      this.game = game
      this.x = 0
      this.y = 0
      this.markedForDeletion = false
      this.color = color
      this.type = 'item'
    }
  
    update() {
      if (this.x < 0 || this.x > this.game.width) this.markedForDeletion = true
      if (this.y < 0 || this.y > this.game.height) this.markedForDeletion = true
    }
  
    draw(context) {
      if (this.game.debug) {
        context.strokeRect(this.x, this.y, this.width, this.height)
        context.fillStyle = 'black'
        context.font = '20px Arial'
        context.fillText(this.lives, this.x, this.y - 5)
        context.font = '12px Arial'
        context.fillText(`x: ${this.x.toFixed()}`, this.x + 20, this.y - 5)
        context.fillText(`y: ${this.y.toFixed()}`, this.x + 20, this.y - 20)
      }


    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height - 14,
      this.width,
      this.height,
      this.flip ? this.x * -1 - this.width : this.x,
      this.y,
      this.width,
      this.height
    )

    context.restore()
    }
  }
  