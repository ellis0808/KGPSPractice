let audioObject = {};

async function getAudio(category, grouping, grouping2) {
  try {
    let response;
    if (grouping2 !== null) {
      console.log("test 1");

      response = await fetch(
        `/KGPSEnglishPractice-test/api/load_audio.php?id1=${category}&id2=${grouping}&id3=${grouping2}`
      );
      console.log("test 2");
    } else if (grouping2 === null) {
      console.log("test 3");

      response = await fetch(
        `/KGPSEnglishPractice-test/api/load_audio.php?id1=${category}&id2=${grouping}`
      );
      console.log("test 5");
    }
    if (!response.ok) {
      throw new Error("Network response was not okay");
    }
    const audioData = await response.json();
    console.log("test 6");

    console.log(audioData);

    loadAudio(audioData);
  } catch (error) {
    console.log("There was an error ", error);
  }
}

function loadAudio(audioData) {
  audioData.map((item) => {
    return (audioObject[item.content] = {
      content: item.content,
      sound: new Howl({
        src: [item.link],
        volume: 0.5,
      }),
    });
  });
  console.log(audioObject);
}

export { getAudio, audioObject };
