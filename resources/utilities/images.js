let imageObject = {};

async function getImages(category, grouping, grouping2) {
  try {
    const response = await fetch(
      "/KGPSEnglishPractice-test/api/load_images.php"
    );
    if (!response.ok) {
      throw new Error("There was an error", data.error);
    }

    const data = await response.json();

    const imageData = data.images;

    console.log(imageData);

    loadImages(imageData);
  } catch (error) {
    console.error("Error getting images ", error);
  }
}

function loadImages(imageData) {
  imageData.map((item) => {
    return (imageObject[item.content] = {
      content: item.filename,
      link: item.link,
      altText: item.alt_text,
    });
  });
  console.log(imageObject);
}

export { getImages, imageObject };
