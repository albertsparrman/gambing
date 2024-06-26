import InputHandler from './InputHandler.js'
import Player from './Player.js'
import UserInterface from './UserInterface.js'
import Ammo from './Ammo.js'
import Pumpkin from './Pumpkin.js'
import Skeleton from './Skeleton.js'
import Ghost from './Ghost.js'
import Health from './Health.js'
import Arms from './Arms.js'

export default class Game {
  constructor(width, height, canvasPosition) {
    this.width = width
    this.height = height
    this.canvasPosition = canvasPosition
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)
    this.player = new Player(this)
    this.arms = new Arms(this)
    this.keys = []
    this.enemies = []
    this.items = []
    this.gameOver = false
    this.gameStarted = false
    this.paused = true
    this.gravity = 1
    this.debug = false
    this.gameTime = 0
    this.enemyTimer = 0
    this.enemyInterval = 1000
  }

  update(deltaTime) {
    if (!this.gameOver) {
      if (!this.paused) {
        this.gameTime += deltaTime
      }
      else if (this.paused) {
        return
      }
    }
    else if (this.gameOver) {
      document.getElementById("gameOver").style.display = "flex"
      return
    }




    if (this.enemyTimer > this.enemyInterval) {
      let items = ['north', 'west', 'south', 'east']
      let directions = items[Math.floor(Math.random() * items.length)]
      let x = 0
      let y = 0
      if (directions === 'north') {
        y = 0
        x = Math.random() * this.width
      } else if (directions === 'west') {
        y = Math.random() * this.height
        x = 0
      } else if (directions === 'south') {
        y = this.height
        x = Math.random() * this.width
      } else if (directions === 'east') {
        y = Math.random() * this.height
        x = this.width
      }


      let spawnChance = Math.random()
      if (this.player.kills < 4) {
        if (spawnChance < 0.9) {
          this.enemies.push(new Pumpkin(this, x, y))
        }
        else {
          x = Math.floor(Math.random() * this.width)
          this.items.push(new Ammo(this, x, y))
        }
      }

      else if (this.player.kills >= 4 && this.player.kills < 10) {
        this.enemyInterval = 800
        if (spawnChance < 0.5) {
          this.enemies.push(new Pumpkin(this, x, y))
        }
        else if (spawnChance >= 0.5 && spawnChance < 0.9) {
          this.enemies.push(new Skeleton(this, x, y))
        }
        else {
          x = Math.floor(Math.random() * this.width)
          this.items.push(new Ammo(this, x, y))
        }
      }

      else {
        this.enemyInterval = 700
        if (spawnChance < 0.3) {
          this.enemies.push(new Pumpkin(this, x, y))
        }
        else if (spawnChance >= 0.3 && spawnChance < 0.7) {
          this.enemies.push(new Skeleton(this, x, y))
        }
        else if (spawnChance >= 0.7 && spawnChance < 0.9) {
          this.enemies.push(new Ghost(this, x, y))
        }
        else {
          x = Math.floor(Math.random() * this.width)
          this.items.push(new Ammo(this, x, y))
        }
      }

      this.enemyTimer = 0
    } else {
      this.enemyTimer += deltaTime
    }
    this.player.update(deltaTime)
    this.arms.update(deltaTime)

    this.enemies.forEach((enemy) => {
      enemy.update(this.player)
      if (this.checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true
        if (this.player.lives - enemy.damage > 0) {
          this.player.lives -= enemy.damage
        }
        else {
          this.player.lives = 0
        }
      }
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          enemy.lives -= projectile.damage
          if (enemy.lives <= 0) {
            if (Math.random() < 0.2) {
              this.items.push(new Health(this, enemy.x, enemy.y))
            }
            enemy.markedForDeletion = true
            this.player.kills++
          }
          projectile.markedForDeletion = true
        }
      })
    })
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)

    this.items.forEach((item) => {
      item.update(this.player)
      if (this.checkCollision(this.player, item)) {
        item.markedForDeletion = true
        if (item.type === 'ammo') {
          this.player.totalAmmo += 20
        }
        if (item.type === 'health') {
          if (this.player.lives <= 80) {
            this.player.lives += 20
          }
          else if (this.player.lives > 80 && this.player.lives < 100) {
            this.player.lives = 100
          }
        }
      }
    })
    this.items = this.items.filter((item) => !item.markedForDeletion)
  }


  draw(context) {
    this.items.forEach((item) => {
      item.draw(context)
    })
    this.enemies.forEach((enemy) => {
      enemy.draw(context)
    })
    this.player.draw(context)
    this.arms.draw(context)
    this.ui.draw(context)
  }

  checkCollision(object1, object2) {
    return (
      object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.height + object1.y > object2.y
    )
  }
}
