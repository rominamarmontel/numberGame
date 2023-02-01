let currentNum = 1
let endTime
let intervalId
const modal1 = document.getElementById('dialog1')
const modal2 = document.getElementById('dialog2')
const resetbtn1 = document.querySelector('.resetbutton_lost')
const resetbtn2 = document.querySelector('.resetbutton_win')
const timer = document.getElementById('timer')
const btn = document.getElementById('btn')

function againTheGame() {
  return startGame()
  // currentNum = 1
  // const board = document.getElementById("board")
  // board.classList.remove("win")
  // board.classList.remove("lost")
  // const li = board.getElementsByTagName("li")
  // console.log(li)
  // li.classList.replace("clear", "clicked")

  // console.log(li.innerHTML)
  // console.log(board)

  // removeClicked()
  // checkIfOk()
  // setToBoard()
  // startGame()
}

class Card {
  constructor() {
    this.score = 0
    this.li = document.createElement('li')
    this.li.classList.add('clicked')
    this.li.addEventListener('click', () => {
      this.checkIfOk()
    })
  }
  removeClicked(num) {
    this.li.classList.remove('clicked')
    this.li.textContent = num
  }
  checkIfOk() {
    //もしもHTMLの数字が現在の数字と同じなら
    //li要素にクラスclickedを追加する→グレー
    if (currentNum === Number(this.li.textContent)) {
      this.li.classList.add('clear')
      currentNum++ //現在の数字に１足す
    } else {
      //もしも数字が同じでないなら現在の数字は１のまま
      clearInterval(intervalId)
      this.li.classList.add('lost')
      this.youLost()
      this.endGameLost()
      currentNum = 1
    }

    //もしも入力数字が10まで達したら
    if (currentNum === 10) {
      //もしも現在の数字が10になったら
      clearInterval(intervalId) //カウンターを止める
      this.youWin()
      currentNum = 1
    }
    if (currentNum > 10) {
      clearInterval(intervalId)
      this.youLost()
      currentNum = 1
    }
  }
  youLost() {
    const board = document.getElementById('board')
    board.classList.add('lost')
    endGameLost()
  }
  youWin() {
    const board = document.getElementById('board')
    board.classList.add('win')
    endGameWin()
  }
  displayScore() {
    this.score += 10
    const scoreElement = document.getElementById('score > span')
    scoreElement.textContent = `${this.score}`
  }
}

//------------------------------------------------------------------------------
class Board {
  constructor() {
    this.cardArray = []
    for (let i = 1; i < 10; i++) {
      this.cardArray.push(new Card(i))
    }
    this.setToBoard()
  }
  setToBoard() {
    const board = document.getElementById('board')
    this.cardArray.forEach((card) => {
      board.append(card.li)
    })
  }
  startGame() {
    const number = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    this.cardArray.forEach((card) => {
      const num = number.splice(Math.floor(Math.random() * number.length), 1)[0]
      card.removeClicked(num)
    })
  }
}
const newBoard = new Board()

//------------------------------------------------------------------------------
btn.addEventListener('click', () => {
  newBoard.startGame()
  endTime = new Date().getTime() + 10 * 1000
  btn.disabled = true
  btn.classList.add('inactive')
  intervalId = setInterval(counter, 10)
})
//------------------------------------------------------------------------------
function counter() {
  let countdown = endTime - new Date().getTime()
  if (countdown <= 0) {
    const board = document.getElementById('board')
    board.classList.add('lost')
    endGameLost()
    clearInterval(intervalId)
    countdown = 10 * 1000
    btn.disabled = false
    btn.classList.remove('inactive')
  }
  const totalSeconds = Math.floor(countdown / 1000)
  const centi = Math.floor((countdown % 1000) / 10)
  const seconds = totalSeconds % 60
  const secondsFormatted = String(seconds).padStart(2, '0')
  const centiFormatted = String(centi).padStart(2, '0')
  timer.textContent = `${secondsFormatted}:${centiFormatted}`
}

//-----------------------------------------------------------------------------

//------------------------------------------------------------------------------
function endGameLost() {
  setTimeout(() => {
    modal1.showModal()
  }, 200)
}
function endGameWin() {
  setTimeout(() => {
    modal2.showModal()
  }, 200)
}
//------------------------------------------------------------------------------
resetbtn1.addEventListener('click', () => {
  console.log('reset')
  modal1.close()
  againTheGame()
})
resetbtn2.addEventListener('click', () => {
  console.log('reset')
  modal2.close()
  againTheGame()
})
//------------------------------------------------------------------------------
