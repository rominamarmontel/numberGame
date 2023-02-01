
class Card {
  constructor() {
    this.score = 0
    this.li = document.createElement("li")
    this.li.classList.add("clicked")
    this.li.addEventListener('click', () => {
      this.checkIfOk()
    })
  }
  removeClicked(num) {
    this.li.classList.remove("clicked")
    this.li.textContent = num
  }
  checkIfOk() {//もしもHTMLの数字が現在の数字と同じなら
    //li要素にクラスclickedを追加する→グレー
    if (currentNum === Number(this.li.textContent)) {
      this.li.classList.add("clear")
      currentNum++//現在の数字に１足す
    } else {//もしも数字が同じでないなら現在の数字は１のまま
      currentNum = 1
      this.li.classList.add("lost")
      this.gameIsOver()
      return
    }


    // if (clearInterval(intervalId) && currentNum < 10) {
    //   this.youLost()
    //   this.endGameLost()
    // }
    if (currentNum === 10) {//もしも現在の数字が10になったら
      clearInterval(intervalId)//カウンターを止める
      this.youWin()
      this.endGameWin()
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
  youLost() {
    const board = document.getElementById("board")
    board.classList.add("lost")
    endGameLost()
  }
  youWin() {
    const board = document.getElementById("board")
    board.classList.add("win")
    endGameWin()
  }
  displayScore() {
    this.score += 10
    const scoreElement = document.getElementById("score > span")
    scoreElement.textContent = `${this.score}`
  }
}

class Board {
  constructor() {
    this.cardArray = []
    for (let i = 1; i < 10; i++) {
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
    const number = [1, 2, 3, 4, 5, 6, 7, 8, 9]
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
    countdown = 10 * 1000
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


let currentNum = 1
const modal1 = document.getElementById('dialog1')
const modal2 = document.getElementById('dialog2')
const resetbtn = document.getElementById('resetbutton')
let endTime
let intervalId
const timer = document.getElementById('timer')
const newBoard = new Board()
const btn = document.getElementById("btn")

btn.addEventListener("click", () => {
  newBoard.startGame()
  endTime = new Date().getTime() + 10 * 1000

    btn.disabled = true;
    btn.classList.add('inactive')
    intervalId = setInterval(counter, 100)
})

function endGameLost() {
  setTimeout(() => {//setTimeout関数
    modal1.showModal()//モダル表示
  }, 200)
}
function endGameWin() {
  setTimeout(() => {//setTimeout関数
    modal2.showModal()//モダル表示
  }, 200)
}

resetbtn.addEventListener('click', () => {
  console.log("reset")
  dialog2.remove()
  newBoard.setToBoard()
})
