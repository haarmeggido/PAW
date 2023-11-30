const blueDiv = document.querySelector('.outside')
const redDiv = document.querySelector('.middle')
const yellowDiv = document.querySelector('.inside')
const bluepoints = document.querySelector('.blue-points')
const redpoints = document.querySelector('.red-points')
const yellowpoints = document.querySelector('.yellow-points')
const switchPropagationButton = document.querySelector('.js-switch-propagation')
const resetButton = document.querySelector('.js-reset')
const switchOrderButton = document.querySelector('.js-switch-order')

let score = 0
let score_old = 0
var propagation = true
var order = true
var blueclick = false
var redclick = false
var yellowclick = false
const scoreDiv = document.querySelector('.score')
const infoDiv = document.querySelector('.info-js')

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
    updateInfo()
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
  if (propagation){
    yellowclick = true
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
  propagation = true
  if(!order){
    order = true
    scoring.blue = 1
    scoring.red = 1
    scoring.yellow = 3
    bluepoints.innerHTML = "1 point"
    redpoints.innerHTML = "2 points"
    yellowpoints.innerHTML = "5 points"
  }
})

switchOrderButton.addEventListener('click', () => {
  order = !order
  console.log(`switch order to ${order}`)
  if (order){
    scoring.blue = 1
    scoring.red = 1
    scoring.yellow = 3
    bluepoints.innerHTML = "1 point"
    redpoints.innerHTML = "2 points"
    yellowpoints.innerHTML = "5 points"
  }
  else{
    scoring.blue = 5
    scoring.red = -3
    scoring.yellow = -1
    bluepoints.innerHTML = "5 points"
    redpoints.innerHTML = "2 points"
    yellowpoints.innerHTML = "1 point"
  }
})

updateScore = () => {
  scoreDiv.innerHTML = score
  checkScore()
}
checkScore = () => {
  if(score > 30){
    //yellowDiv.classList.add('d-none')
    yellowDiv.classList.add('disabled')
  }
  if(score > 50){
    //redDiv.classList.add('d-none')
    redDiv.classList.add('disabled')
  }
}

updateInfo = () => {
  let difference = score - score_old
  if (difference == scoring.blue){
    infoDiv.innerHTML = "You clicked blue, points added: " + difference

  }
  else if (difference == scoring.red + scoring.blue){
    infoDiv.innerHTML = "You clicked red, points added: " + difference
    console.log(`difference: ${difference}`)
  }
  else if (difference == scoring.yellow + scoring.red + scoring.blue){
    infoDiv.innerHTML = "You clicked yellow, points added: " + difference
    console.log(`difference: ${difference}`)
  }
  console.log(`difference: ${difference}`)
  score_old = score
}