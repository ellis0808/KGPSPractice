const imageTypeContainer = document.querySelector(".image-type-container");
const imageCategoryContainer = document.querySelector(".image-type-container");
const imageFileNameContainer = document.querySelector(".image-type-container");
const imageFileTypeContainer = document.querySelector(".image-type-container");
const imageLinkContainer = document.querySelector(".image-type-container");
const imageThumbnailContainer = document.querySelector(".image-type-container");

async function loadImages(params) {
  try {
    const response = await fetch(
      "/KGPSEnglishPractice-test/api/load-images.php"
    );
    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error("Network response was not okay");
    }
  } catch (error) {
    console.log("There was an error", error);
  }
}
