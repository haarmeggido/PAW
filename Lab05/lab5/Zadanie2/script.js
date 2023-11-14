
const images = [
  "img/cat1.png",
  "img/cat2.png",
  "img/cat3.png",
  "img/cat4.png",
  "img/cat5.png",
];
const colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "purple"
];

let currentIndex = 0;

function changeImage() {
  const img = document.getElementsByClassName(".js-changesrc")[0];
  img.src = images[currentIndex];
  img.style.borderColor = colors[currentIndex];

  currentIndex = (currentIndex + 1) % images.length;
}
