const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const btnRestart = document.querySelector('.time-btn__restart')
const colors = ['#de54a6', '#de5474', '#d054de', '#9254de', '#5c54de', '#5490de', '#54ded9', '#de6a54']
let time = 0
let score = 0
let isGameStarted = false

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})


function startGame() {
   setInterval(decreaseTime, 1000)
   createRandomCircle()
    setTime(time)
}




function decreaseTime() {
    if (time === 0) {
        finishGame()
    }else{
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
   
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    btnRestart.classList.remove('hide')
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}

btnRestart.addEventListener('click', restartGame)

function restartGame() {
    document.location.reload()
}

function createRandomCircle(){
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    const color = getRandomColor()
    circle.style.background = color

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max-min) + min)
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}
