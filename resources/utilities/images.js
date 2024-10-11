let imageObject = {};

async function getImages() {
  try {
    const response = await fetch(
      "/KGPSEnglishPractice-test/api/load_images.php"
    );
    if (!response.ok) {
      throw new Error("There was an error", data.error);
    }

    const imageData = await response.json();

    loadImages(imageData);
  } catch (error) {
    console.error("Error getting images ", error);
  }
}

const loadImages = (imageData) => {
  imageData.map((item) => {
    return (imageObject[item.content] = {
      content: item.filename,
      link: item.link,
      altText: item.alt_text,
    });
  });
  console.log(imageObject);
};

export { getImages, imageObject };
