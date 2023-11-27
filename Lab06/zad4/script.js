
// Get the "screen" and "red_dot" elements
const screen = document.querySelector('.screen');
const redDot = document.querySelector('.red_dot');

dotPosition = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};
console.log(dotPosition);
// Add a click event listener to the document
document.addEventListener('click', (event) => {
  // Check if the click occurred inside the "screen" div
  const clickX = event.clientX;
  const clickY = event.clientY; 
  if (event.target.closest('.screen')) {
    // Smoothly move the "red_dot" element to the click point

    newX = clickX - dotPosition.x;
    newY = clickY - dotPosition.y;
    redDot.style.transition = 'transform 0.5s';
    redDot.style.transform = `translate(${clickX - dotPosition.x}px, ${clickY - dotPosition.y}px)`;
    // dotPosition.x = clickX;
    // dotPosition.y = clickY;
    

    // setTimeout(() => {
    // const message = document.querySelector('.message');
    // message.textContent = 'Adios';
    // }, 1000);
  } else {
    // Display an alert if the click occurred outside the "screen" div
    alert(`Click outside the screen!\n position: ${clickX}, ${clickY}`);
  }
});
