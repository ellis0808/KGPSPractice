let imageObject = {};

async function getImages(unit, grouping, grouping2) {
  try {
    let response;
    if (!unit && !grouping && !grouping2) {
      response = await fetch("/KGPSEnglishPractice-test/api/load_images.php");
    } else if (unit && !grouping && !grouping2) {
      response = await fetch(
        `/KGPSEnglishPractice-test/api/load_images.php?id1=${unit}`
      );
    } else if (grouping2 !== null) {
      response = await fetch(
        `/KGPSEnglishPractice-test/api/load_images.php?id1=${unit}&id2=${grouping}&id3=${grouping2}`
      );
    } else if (unit && grouping && grouping2 === null) {
      response = await fetch(
        `/KGPSEnglishPractice-test/api/load_images.php?id1=${unit}&id2=${grouping}`
      );
    }
    if (!response.ok) {
      throw new Error("There was an error", data.error);
    }

    const imageData = await response.json();

    console.log(imageData);

    loadImages(imageData);
  } catch (error) {
    console.error("Error getting images ", error);
  }
}

function loadImages(imageData) {
  imageObject = {};
  imageData.map((item) => {
    return (imageObject[item.filename] = {
      id: item.image_id,
      type: item.type,
      category: item.category,
      filename: item.filename,
      filetype: imageData.filetype,
      link: item.link,
      content: item.content,
      altText: item.alt_text,
      unit: item.unit,
      grouping: item.grouping,
    });
  });
  console.log(imageObject);
}

export { getImages, imageObject };
