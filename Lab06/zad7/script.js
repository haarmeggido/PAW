var images = [];
let currentImageIndex = 0;

let modalOverlay = document.getElementById('modal-overlay');

// This one gets images from the server, and that doesn't work here
// fetch('files/hitori.json')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     }).then(data => {
//       if (Array.isArray(data)) {
//         images = data.map(item => item.link);
//       } else if (typeof data === 'object') {
//         images = Object.values(data);
//       }

//       console.log(images);
      
//       createGallery();
//       saveImages();
//     })

fetch("files/json/file_list.json")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }).then(data => {
    images = data.files;
    console.log(images)
    createGallery();
    //saveImages();
  })

let images_number = 20; // can alter the number of max images displayed
images_folder = 'files/generated/';
images_list_for_modal = [];
function createGallery() {
  let gallery = document.getElementById('gallery');
  for (let i = 0; i < images.length; i++) {
    let image = document.createElement('img');
    let path_to_image = images_folder + images[i];
    image.src = path_to_image;
    images_list_for_modal.push(path_to_image);
    image.onclick = () => openModal(path_to_image, i);
    gallery.appendChild(image);
  }
}

function openModal(imageUrl) {
  let modal = document.getElementById('modal');
  let modalImage = document.getElementById('modal-image');
  modalImage.src = imageUrl;
  modal.style.display = 'block';

  modalOverlay.classList.remove("d-none");
}

function closeModal() {
  let modal = document.getElementById('modal');
  modal.style.display = 'none';
  modalOverlay.classList.add("d-none");
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  let modalImage = document.getElementById('modal-image');
  modalImage.src = images_list_for_modal[currentImageIndex];
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  let modalImage = document.getElementById('modal-image');
  modalImage.src = images_list_for_modal[currentImageIndex];
}