const blueDiv = document.querySelector('.outside')
const redDiv = document.querySelector('.middle')
const yellowDiv = document.querySelector('.inside')

let score = 0
var blueclick = false
var redclick = false
var yellowclick = false
blueDiv.addEventListener('click', () => {
  blueclick = true
  score += 1
  console.log('blue', score)

  resetClicks()
})

redDiv.addEventListener('click', () => {
  redclick = true
  score += 2
  console.log('red', score)
})

yellowDiv.addEventListener('click', () => {
  yellowclick = true
  score += 3
  console.log('yellow', score)
})

resetClicks = () => {
  blueclick = false
  redclick = false
  yellowclick = false
}