import { images } from "../utilities/images.js";

const imageDataContainer = document.querySelector(".image-data-container");
const getAllImagesBtn = document.querySelector(".get-all-images-btn");
const searchBox = document.getElementById("image-search");

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("filename").value = "";
  }, 0);
  images.getImages();

  setTimeout(populateImageTable, 500);
});

getAllImagesBtn.addEventListener("pointerdown", images.getImages);

searchBox.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchItem = document.getElementById("filename").value;

  images.getImages(searchItem);
  setTimeout(populateImageTable, 500);
});

function populateImageTable() {
  let i = 0;

  if (imageDataContainer.childNodes) {
    document.querySelectorAll(".image-row").forEach((row) => {
      row.remove();
    });
  }

  Object.keys(images.imageObject).forEach((item) => {
    ++i;
    const imageRow = document.createElement("div");
    imageRow.classList.add("image-row");
    const number = document.createElement("div");
    const imageTypeContainer = document.createElement("div");
    const imageCategoryContainer = document.createElement("div");
    const imageFileNameContainer = document.createElement("div");
    const imageFileTypeContainer = document.createElement("div");
    const imageLinkContainer = document.createElement("div");
    const imageThumbnailContainer = document.createElement("div");
    number.classList.add("number");
    imageThumbnailContainer.classList.add("thumbnail");
    number.innerText = `${i}`;
    imageTypeContainer.innerText = images.imageObject[item].type;
    imageCategoryContainer.innerText = images.imageObject[item].category;
    imageFileNameContainer.innerText = images.imageObject[item].filename;
    imageFileTypeContainer.innerText = images.imageObject[item].filetype;
    imageLinkContainer.innerText = images.imageObject[item].link;
    imageThumbnailContainer.style.backgroundImage = `url(${images.imageObject[item].link})`;
    imageRow.appendChild(number);
    imageRow.appendChild(imageTypeContainer);
    imageRow.appendChild(imageCategoryContainer);
    imageRow.appendChild(imageFileNameContainer);
    imageRow.appendChild(imageFileTypeContainer);
    imageRow.appendChild(imageLinkContainer);
    imageRow.appendChild(imageThumbnailContainer);
    imageDataContainer.appendChild(imageRow);
  });
}
