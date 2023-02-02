let currentNum = 1
let endTime
let intervalId
let monkeyPosition = 0
const modal1 = document.getElementById('dialog1')
const modal2 = document.getElementById('dialog2')
const modal3 = document.getElementById('dialog3')
const resetbtn1 = document.querySelector('.resetbutton_lost')
const resetbtn2 = document.querySelector('.resetbutton_win')
const resetbtn3 = document.querySelector('.resetbutton_newGame')
const timer = document.getElementById('timer')
const btn = document.getElementById('btn')
const monkey = document.querySelector(".monkey")
const btn_audio = document.getElementById('btn_audio')
//btn_audio.currentTime = 0
//------------------------------------------------------------------------------
class Card {
  constructor() {
    this.li = document.createElement('li')
    this.li.classList.add('clicked')
    this.li.addEventListener('click', () => {
      this.checkIfOk()
      btn_audio.play()

    })
  }
  removeClicked(num) {
    this.li.classList.remove('clicked')
    this.li.textContent = num
  }
  checkIfOk() {
    if (currentNum === Number(this.li.textContent)) {
      this.li.classList.add('clear')
      currentNum++
    } else {
      clearInterval(intervalId)
      this.li.classList.add('lost')
      this.youLost()
      this.endGameLost()
      currentNum = 1
    }
    if (currentNum === 10) {
      clearInterval(intervalId)
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
    monkeyPosition += 20
    monkey.style.bottom = monkeyPosition + "%"
    if (monkeyPosition === 60) {
      monkey.src = "./images/monkey-win.png"
      monkeyPosition = 0
      gameOverWin()
    } else {
      endGameWin()
    }
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
    monkey.style.bottom = monkeyPosition + "%"
    const number = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    this.cardArray.forEach((card) => {
      const num = number.splice(Math.floor(Math.random() * number.length), 1)[0]
      card.removeClicked(num)
    })
  }
}
const newBoard = new Board()
//------------------------------------------------------------------------------
//modal3.show()
function againTheGame() {
  const board = document.getElementById("board")
  board.classList.remove("win")
  board.classList.remove("lost")
  const li = board.querySelectorAll("li")
  li.forEach(ele => {
    if (ele.classList.contains("clear")) {
      ele.classList.remove("clear")
      ele.classList.add("clicked")
      ele.textContent = ""
      currentNum = 1
    } else if (ele.classList.contains("lost")) {
      ele.classList.remove("lost")
      ele.classList.add("clicked")
      ele.textContent = ""
      currentNum = 1
    } else if (ele.classList.contains("clicked")) {
      ele.classList.remove("clicked")
      ele.classList.add("clicked")
      ele.textContent = ""
      currentNum = 1
    } else {
      ele.textContent = ""
      ele.classList.add("clicked")
      currentNum = 1
    }
  })
}
//------------------------------------------------------------------------------
btn.addEventListener('click', () => {
  newBoard.startGame()
  endTime = new Date().getTime() + 10 * 1000
  btn.disabled = true
  btn.classList.add('inactive')
  intervalId = setInterval(counter, 10)
  document.getElementById('btn_audio').currentTime = 0;
  document.getElementById('btn_audio').play();
})
//------------------------------------------------------------------------------
// function audio() {
//   document.getElementById('btn_audio').currentTime = 0; //連続クリックに対応
//   document.getElementById('btn_audio').play(); //クリックしたら音を再生
// }
window.addEventListener('DOMContentLoaded', function(){
  const audioElement = document.querySelector("audio");
  audioElement.addEventListener('loadeddata', (e)=> {
    //audioElement.muted = true;
    //audioElement.autoplay = true;
  });
});
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
function gameOverWin() {
  setTimeout(() => {
    modal3.showModal()
  }, 200)
}
//------------------------------------------------------------------------------
resetbtn1.addEventListener('click', () => {
  modal1.close()
  againTheGame()
})
resetbtn2.addEventListener('click', () => {
  modal2.close()
  againTheGame()
})
resetbtn3.addEventListener('click', () => {
  modal3.close()
  monkey.src = "./images/monkey.png"
  againTheGame()
})

function audio() {
  document.getElementById('btn').currentTime = 0; //連続クリックに対応
  document.getElementById('btn').play(); //クリックしたら音を再生
}
