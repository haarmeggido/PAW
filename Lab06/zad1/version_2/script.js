const blockOne = document.querySelector('#block-one')
const blockTwo = document.querySelector('#block-two')
const blockThree = document.querySelector('#block-three')
const infoOne = document.querySelector('#info-one')
const infoTwo = document.querySelector('#info-two')
const infoThree = document.querySelector('#info-three')

const startStopButton = document.querySelector('#start-stop')
const resetButton = document.querySelector('#reset')
const changeOrderButton = document.querySelector('#change-order')

const logger = document.querySelector('#logger')
const counter = document.querySelector('#counter')

let sum = 0;
const smallThreshold = 30;
const bigThreshold = 50;

let order = false;
let propagate = true;

const points = {
    first: 1,
    second: 2,
    third: 3,
};

const controlThresholds = function () {
    if (sum >= bigThreshold) {
        blockTwo.removeEventListener('click', two, order)
        blockTwo.style.backgroundColor = 'black'
        updateMessage("Removed event listener from second button.")
    } else if (sum >= smallThreshold) {
        blockThree.removeEventListener('click', three, order)
        blockThree.style.backgroundColor = 'black'
        updateMessage("Removed event listener from third button.")
    }
}

const updateMessage = function (logMessage) {
    const newLog = document.createElement('p')

    newLog.innerText = logMessage
    newLog.style.padding = '0'
    newLog.style.margin = '5px'
    newLog.style.fontSize = 'medium'

    logger.appendChild(newLog)
}
const clearLogger = function () {
    while (logger.firstChild) {
        logger.removeChild(logger.firstChild)
    }
}
const changeOrder = function () {
    blockOne.removeEventListener('click', one, order)
    blockTwo.removeEventListener('click', two, order)
    blockThree.removeEventListener('click', three, order)


    order = !order;
    [points.first, points.third] = [points.third, points.first]

    blockOne.addEventListener('click', one, order)
    blockTwo.addEventListener('click', two, order)
    blockThree.addEventListener('click', three, order)

    infoOne.innerText = points.first
    infoTwo.innerText = points.second
    infoThree.innerText = points.third

    controlThresholds()
}

const one = (event) => {
    sum += points.first
    counter.innerText = sum

    if (!propagate) {
        event.stopPropagation()
    }

    controlThresholds()

    updateMessage(`Clicked on the gray block. Added to sum ${points.first}.`)
}
const two = (event) => {
    sum += points.second
    counter.innerText = sum

    if (!propagate) {
        event.stopPropagation()
    }

    controlThresholds()

    updateMessage(`Clicked on the red block. Added to sum ${points.second}.`)
}
const three = (event) => {
    sum += points.third
    counter.innerText = sum

    if (!propagate) {
        event.stopPropagation()
    }

    controlThresholds()

    updateMessage(`Clicked on the yellow block. Added to sum ${points.third}.`)
}
blockOne.addEventListener('click', one, order)
blockTwo.addEventListener('click', two, order)
blockThree.addEventListener('click', three, order)

startStopButton.addEventListener('click', () => {
    propagate = !propagate
    updateMessage(`Changed the propagation to: ${propagate}.`)
})
resetButton.addEventListener('click', () => {
    sum = 0
    counter.innerText = sum

    if (order) {
        changeOrder()
    }

    propagate = true

    blockTwo.style.backgroundColor = 'red'
    blockTwo.addEventListener('click', two, order)
    blockThree.style.backgroundColor = 'yellow'
    blockThree.addEventListener('click', three, order)

    clearLogger()
    updateMessage("Restarted configuration.")
})
changeOrderButton.addEventListener('click', () => {
    changeOrder()
    updateMessage("Changed the order of the event listeners.")
})