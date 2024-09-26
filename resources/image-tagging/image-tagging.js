// const imageTypeContainer = document.querySelector(".image-type-container");
// const imageCategoryContainer = document.querySelector(".image-type-container");
// const imageFileNameContainer = document.querySelector(".image-type-container");
// const imageFileTypeContainer = document.querySelector(".image-type-container");
// const imageLinkContainer = document.querySelector(".image-type-container");
// const imageThumbnailContainer = document.querySelector(".image-type-container");
const imageDataContainer = document.querySelector(".image-data-container");
async function loadImages() {
  try {
    const response = await fetch(
      "/KGPSEnglishPractice-test/api/load-images.php"
    );
    const imageData = await response.json();
    console.log(imageData.images);

    let i = 0;
    imageData.images.forEach((item) => {
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
      imageTypeContainer.innerText = item.type;
      imageCategoryContainer.innerText = item.category;
      imageFileNameContainer.innerText = item.filename;
      imageFileTypeContainer.innerText = item.filetype;
      imageLinkContainer.innerText = item.link;
      imageThumbnailContainer.style.backgroundImage = `url(${item.link})`;
      imageRow.appendChild(number);
      imageRow.appendChild(imageTypeContainer);
      imageRow.appendChild(imageCategoryContainer);
      imageRow.appendChild(imageFileNameContainer);
      imageRow.appendChild(imageFileTypeContainer);
      imageRow.appendChild(imageLinkContainer);
      imageRow.appendChild(imageThumbnailContainer);
      imageDataContainer.appendChild(imageRow);
    });

    if (!response.ok) {
      throw new Error("Network response was not okay");
    }
  } catch (error) {
    console.log("There was an error", error);
  }
}

window.addEventListener("load", () => {
  loadImages();
});

document.getElementById("search-entry").addEventListener("submit", () => {
  const searchItem = document.getElementById("filename").value;
  imageSearch(searchItem);
});

async function imageSearch(searchItem) {
  try {
    const response = await fetch(
      `/KGPSEnglishPractice-test/api/load-images.php=?${searchItem}}`
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error("Network response not okay");
    }
  } catch (error) {
    console.log("There was an error loading the images");
  }
}
