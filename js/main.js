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
    if (currentNum === 5) {
      clearInterval(intervalId)
      this.youWin()
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
  youWin() {
    const board = document.getElementById("board")
    board.classList.add("win")
    return
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

function counter() {
  let countdown = endTime - new Date().getTime()
  if (countdown < 0) {
    clearInterval(intervalId)
    countdown = 5 * 1000
    btn.disabled = false
    btn.classList.remove('inactive')
  }
  const totalSeconds = Math.floor(countdown / 1000)
  const centi = Math.floor((countdown % 1000) / 10)
  const seconds = totalSeconds % 60;
  const secondsFormatted = String(seconds).padStart(2, '0')
  const centiFormatted = String(centi).padStart(2, '0')
  timer.textContent = `${secondsFormatted}:${centiFormatted}`
}

let endTime
let intervalId
const timer = document.getElementById('timer')
const newBoard = new Board()
const btn = document.getElementById("btn")

btn.addEventListener("click", () => {
  newBoard.startGame()
  endTime = new Date().getTime() + 5 * 1000

    btn.disabled = true;
    btn.classList.add('inactive')
    intervalId = setInterval(counter, 100)
})
