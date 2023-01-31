let currentNum = 1

class Card {
  constructor() {
    this.li = document.createElement("li")
    this.li.classList.add("clicked")
    this.li.addEventListener('click', () => {
      //console.log("hi")
      this.checkIfOk()
    })
  }
  removeClicked(num) {
    this.li.classList.remove("clicked")
    this.li.textContent = num
  }
  checkIfOk() {
    if (currentNum === Number(this.li.textContent)) {
      this.li.classList.add("clicked")
      currentNum++
    } else {
      currentNum = 1
    }
    if (currentNum === 4) {
      clearTimeout(timeoutId);
    }
    // else {
    //   alert("You loose!")
    //   currentNum = 1
    // }
    // if (currentNum > 4) {
    //   alert("You Win!!")
    //   currentNum = 1
    // }
  }
}
class Board {
  constructor() {
    this.cardArray = []
    for (let i = 1; i < 5; i++) {
      this.cardArray.push(new Card(i))
    }
    this.setToBoard()
  }
  setToBoard() {
    const board = document.getElementById("board")
    this.cardArray.forEach(card => {
      board.append(card.li)
    })
  }
  startGame() {
    const number = [1, 2, 3, 4]
    this.cardArray.forEach(card => {
      const num = number.splice(Math.floor(Math.random() * number.length), 1)[0]
      card.removeClicked(num)
    })
  }
}

const newBoard = new Board()
const btn = document.getElementById("btn")
btn.addEventListener("click", () => {
  newBoard.startGame()
})

//addEventListener quand on creer la carte
//si c'est clique si c'est la premier carde dans cardArry, si oui, on enleve sinon on perd
//quand cardArray est vide on gagne

