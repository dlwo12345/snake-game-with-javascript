class Snake {
  color = 'green'
  location = { x: 0, y: 0 }

  crawl () {
    console.log('call crawl', this.location.x);
    this.location.x = this.location.x + 1
  }
}


class Game {

  board = document.getElementById('board')
  snake = new Snake()

  createBoard (rowCount, colCount) {
    for (let i = 0; i < rowCount; i++) {
      let row = this.board.insertRow(i)
      for (let j = 0; j < colCount; j++) {
        row.insertCell(j)
      }
    }
  }

  changeAllBackgroundColor () {
    const tds = this.board.getElementsByTagName('td')
    for (let td of tds) {
      td.style.backgroundColor = 'lightgray';
    }
  }

  changeBackgroundColor (x, y, color) {
    // tr == y
    // td == x
    const tr = this.board.getElementsByTagName('tr')[y]
    const td = tr.getElementsByTagName('td')[x]
    td.style.backgroundColor = color;
  }

  play () {
    this.createBoard(30, 30);
    setInterval(() => {
      this.changeAllBackgroundColor();
      this.changeBackgroundColor(this.snake.location.x, this.snake.location.y, this.snake.color);
      this.snake.crawl()
    }, 1000)
  }

}

const game = new Game()
game.play();
