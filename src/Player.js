import Projectile from './Projectile.js'

export default class Player {
  constructor(game) {
    this.game = game
    this.width = 32
    this.height = 64
    this.x = this.game.width / 2 - this.width / 2
    this.y = this.game.height / 2 - this.height / 2

    this.projectiles = []

    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 6

    this.maxAmmo = 20
    this.ammo = 20
    this.totalAmmo = 120
    this.ammoTimer = 0
    this.ammoInterval = 500

    this.lives = 50
    this.killstreak = 0
    this.kills = 0

    this.reloadTimer = 0
    this.reloading = false
  }

  update(deltaTime) {

    if (this.lives <= 0) {
      this.game.gameOver = true
    }

    if ((this.game.keys.includes('ArrowLeft') || this.game.keys.includes('a') || this.game.keys.includes('A')) && this.x - this.maxSpeed >= 0) {
      this.speedX = -this.maxSpeed
    } else if ((this.game.keys.includes('ArrowRight') || this.game.keys.includes('d') || this.game.keys.includes('D')) && this.x - this.maxSpeed < this.game.width - this.width) {
      this.speedX = this.maxSpeed
      console.log(this.game.width)
    } else {
      this.speedX = 0
    }

    if ((this.game.keys.includes('ArrowUp') || this.game.keys.includes('w') || this.game.keys.includes('W')) && this.y - this.maxSpeed >= 0) {
      this.speedY = -this.maxSpeed
    } else if ((this.game.keys.includes('ArrowDown') || this.game.keys.includes('s') || this.game.keys.includes('S')) && this.y - this.maxSpeed < this.game.height - this.height) {
      this.speedY = this.maxSpeed
    } else {
      this.speedY = 0
    }

    this.y += this.speedY
    this.x += this.speedX



    if (this.reloading === true) {
      if (this.reloadTimer - this.game.gameTime < -2000) {
        if (this.ammo != 0) {
          this.totalAmmo -= 20-this.ammo
          this.ammo = 20
        }
        else {
          if (this.totalAmmo >= 20) {
            this.ammo = 20
            this.totalAmmo -= 20
          }
          else if (this.totalAmmo < 20) {
            this.ammo += this.totalAmmo
            this.totalAmmo = 0
          }
        }
        this.reloading = false
      }
    }


    // projectiles
    this.projectiles.forEach((projectile) => {
      projectile.update(deltaTime)
    })
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    )
  }

  draw(context) {
    context.fillStyle = '#f00'
    context.fillRect(this.x, this.y, this.width, this.height)
    if (this.game.debug) {
      context.strokeStyle = '#000'
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.lineWidth = 1
      context.beginPath()
      const dx = this.game.input.mouseX - (this.x + this.width / 2)
      const dy = this.game.input.mouseY - (this.y + this.height / 2)
      const maxLength = 60
      const angle = Math.atan2(dy, dx)
      const x = this.x + this.width / 2 + maxLength * Math.cos(angle)
      const y = this.y + this.height / 2 + maxLength * Math.sin(angle)
      context.moveTo(this.x + this.width / 2, this.y + this.height / 2)
      context.lineTo(x, y)
      context.stroke()
    }

    this.projectiles.forEach((projectile) => {
      projectile.draw(context)
    })
  }

  shoot(mouseX, mouseY) {
    // get angle between player and mouse
    const angle = Math.atan2(
      mouseY - (this.y + this.height / 2),
      mouseX - (this.x + this.width / 2)
    )

    if (this.ammo > 0) {
      this.ammo--
      this.projectiles.push(
        new Projectile(
          this.game,
          this.x + this.width / 2,
          this.y + this.height / 2,
          angle
        )
      )
    }

    if (this.ammo < 1 && this.reloading === false) {
      this.reloadTimer = this.game.gameTime
      this.reloading = true
    }
  }
}
