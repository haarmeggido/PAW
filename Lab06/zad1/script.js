const blueDiv = document.querySelector('.outside')
const redDiv = document.querySelector('.middle')
const yellowDiv = document.querySelector('.inside')
const switchPropagationButton = document.querySelector('.js-switch-propagation')
const resetButton = document.querySelector('.js-reset')
const switchOrderButton = document.querySelector('.js-switch-order')

let score = 0
var propagation = true
var order = true
var blueclick = false
var redclick = false
var yellowclick = false
scoreDiv = document.querySelector('.score')

scoring = {
  blue: 1,
  red: 1,
  yellow: 3
}
blueDiv.addEventListener('click', () => {
  if (propagation){
    blueclick = true
    score += scoring.blue
    console.log('blue', score)
    updateScore()
  }
})


redDiv.addEventListener('click', () => {
  if (propagation){
  redclick = true

    score += scoring.red
    console.log('red', score)
    updateScore()
  }
})

yellowDiv.addEventListener('click', () => {
  yellowclick = true
  if (propagation){
    score += scoring.yellow
    console.log('yellow', score)
    updateScore()
  }
})

resetClicks = () => {
  blueclick = false
  redclick = false
  yellowclick = false
}

switchPropagationButton.addEventListener('click', () => {
  propagation = !propagation

  console.log('switch propagation')
})

resetButton.addEventListener('click', () => {
  score = 0
  updateScore()
  yellowDiv.classList.remove('d-none')
  yellowDiv.classList.remove('disabled')
  redDiv.classList.remove('d-none')
  redDiv.classList.remove('disabled')
})

switchOrderButton.addEventListener('click', () => {
  order = !order
  console.log(`switch order to ${order}`)
  if (order){
    scoring.blue = 1
    scoring.red = 1
    scoring.yellow = 3
  }
  else{
    scoring.blue = 5
    scoring.red = -3
    scoring.yellow = -1
  }
})

updateScore = () => {
  scoreDiv.innerHTML = score
  checkScore()
}
checkScore = () => {
  if(score > 30){
    yellowDiv.classList.add('d-none')
    yellowDiv.classList.add('disabled')
  }
  if(score > 50){
    redDiv.classList.add('d-none')
    redDiv.classList.add('disabled')
  }
}

