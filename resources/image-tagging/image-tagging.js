import { getImages, imageObject } from "../utilities/images.js";

const imageDataContainer = document.querySelector(".image-data-container");
const getAllImagesBtn = document.querySelector(".get-all-images-btn");
const searchBox = document.getElementById("image-search");

window.addEventListener("load", () => {
  getImages();

  setTimeout(populateImageTable, 500);
});

getAllImagesBtn.addEventListener("pointerdown", getImages);

searchBox.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchItem = document.getElementById("filename").value;
  console.log(searchItem);

  getImages(searchItem);
  setTimeout(populateImageTable, 500);
  searchBox.textContent = "";
});

function populateImageTable() {
  let i = 0;

  if (imageDataContainer.childNodes) {
    document.querySelectorAll(".image-row").forEach((row) => {
      console.log(row);
      row.remove();
    });
  }
  console.log(Object.values(imageObject));

  Object.keys(imageObject).forEach((item) => {
    console.log(item);

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
    imageTypeContainer.innerText = imageObject[item].type;
    imageCategoryContainer.innerText = imageObject[item].category;
    imageFileNameContainer.innerText = imageObject[item].filename;
    imageFileTypeContainer.innerText = imageObject[item].filetype;
    imageLinkContainer.innerText = imageObject[item].link;
    imageThumbnailContainer.style.backgroundImage = `url(${imageObject[item].link})`;
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
