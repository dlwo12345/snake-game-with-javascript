class Snake {
  location = { tr: 0, td: 0 }

  crawl () {
    this.location.td = this.location.td + 1
  }
}

class Game {

  snake = new Snake()

  createBoard (trCount, tdCount) {
    let table = '<table>'
    for (let i = 0; i < trCount; i++) {
      table += '<tr>'
      for (let j = 0; j < tdCount; j++) {
        table += `<td id = ${i}-${j}></td>`
      }
      table += '</tr>'
    }
    table += '</table>'
    $('#board').append(table)
  }

  changeAllBackgroundColor () {
    $('td').removeClass('snake')
  }

  changeBackgroundColor (tr, td) {
    $(`#${tr}-${td}`).addClass('snake')
  }

  play () {
    this.createBoard(30, 30)
    setInterval(() => {
      this.changeAllBackgroundColor()
      this.changeBackgroundColor(this.snake.location.tr, this.snake.location.td)
      this.snake.crawl()
    }, 1000)
  }

}

const game = new Game()
game.play()
