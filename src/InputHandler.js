export default class InputHandler {
  constructor(game) {
    this.game = game
    this.mouseX = 0
    this.mouseY = 0

    const startButton = document.getElementById("start")
    const unpauseButton = document.getElementById("unpause")
    const controlButton = document.getElementById("controls")
    const closeButton = document.getElementById("close")

    startButton.addEventListener("click", () => {
      document.getElementById("start-menu").style.display = "none"
      this.game.paused = !this.game.paused
      this.game.gameStarted = true
    })

    unpauseButton.addEventListener("click", () => {
      document.getElementById("pause-menu").style.display = "none"
      this.game.paused = !this.game.paused
    })

    controlButton.addEventListener("click", () => {
      document.getElementById("controls-menu").style.display = "flex"
      this.game.gameStarted = false
    })

    closeButton.addEventListener("click", () => {
      document.getElementById("controls-menu").style.display = "none"
      this.game.gameStarted = true
    })


    window.addEventListener('keydown', (event) => {
      if (
        (event.key === 'ArrowUp' ||
          event.key === 'ArrowDown' ||
          event.key === 'ArrowLeft' ||
          event.key === 'ArrowRight' ||
          event.key === 'w' ||
          event.key === 'a' ||
          event.key === 's' ||
          event.key === 'd' ||
          event.key === 'W' ||
          event.key === 'A' ||
          event.key === 'S' ||
          event.key === 'D') &&
        this.game.keys.indexOf(event.key) === -1
      ) {
        this.game.keys.push(event.key)
      }

      if (event.key === 'p') {
        this.game.debug = !this.game.debug
      }

      if (event.key === 'Escape') {
        if (this.game.gameStarted) {
          this.game.paused = !this.game.paused
          if(this.game.paused) {
            document.getElementById("pause-menu").style.display = "flex"
          }
          else if (!this.game.paused) {
            document.getElementById("pause-menu").style.display = "none"
          }
        }
      }

      if (event.key === 'r' || event.key === 'R') {
        this.game.player.reloadTimer = this.game.gameTime
        this.game.player.reloading = true
      }
    })

    window.addEventListener('keyup', (event) => {
      if (this.game.keys.indexOf(event.key) > -1) {
        this.game.keys.splice(this.game.keys.indexOf(event.key), 1)
      }
    })

    window.addEventListener('mousemove', (event) => {
      this.mouseX = event.clientX - this.game.canvasPosition.left
      this.mouseY = event.clientY - this.game.canvasPosition.top
    })

    window.addEventListener('mousedown', (event) => {
      this.game.player.shoot(this.mouseX, this.mouseY)
    })
  }
}
