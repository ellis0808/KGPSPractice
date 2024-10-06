import { cardText } from "./card-touch-index.js";
let audioObject = {};
let correctCardID;
let randomNumber;

function updateRandomNumber() {
  randomNumber = Math.floor(Math.random() * cardText.length);

  return randomNumber;
}
function speak() {
  updateRandomNumber();

  const randomWord = cardText[randomNumber];

  setTimeout(function () {
    audioObject[randomWord].sound.play();
  }, 1000);

  return (correctCardID = randomNumber);
}

const cardTouchSfx = {
  correcCard: new Howl({
    src: ["/KGPSEPaudio/sfx/sfx-correct-1.mp3"],
  }),
  incorrectCard: new Howl({
    src: ["/KGPSEPaudio/sfx/sfx-incorrect-1.mp3"],
  }),
  startApp: new Howl({
    src: ["/KGPSEPaudio/sfx/sfx-select-3.mp3"],
    volume: 0.5,
    onplayerror: function () {
      sound.once("unlock", function () {
        sound.play();
      });
    },
  }),
};

async function getAudio(style) {
  // these two variables will be used to retrieve the associated audio links from the server; they follow the format of the 'audio_data' table, so refernce the category and grouping from there
  let category;
  let grouping;
  let grouping2;
  if (style === 1 || style === 2) {
    category = "alphabet";
    grouping = 1;
  }
  if (style === 3) {
    category = "sight-words";
    grouping = 2;
  }
  if (style === 4) {
    category = "sight-words";
    grouping = 2;
    grouping2 = 3;
  }
  if (style === 5) {
    category = "sight-words";
    grouping = 2;
    grouping2 = 4;
  }
  if (style === 6) {
    category = "phonics";
    grouping = 1;
  }
  try {
    if (grouping2) {
      const response = await fetch(
        `/KGPSEnglishPractice-test/api/load_audio.php?id1=${category}&id2=${grouping}&id3=${grouping2}`
      );
      return response;
    } else {
      const response = await fetch(
        `/KGPSEnglishPractice-test/api/load_audio.php?id1=${category}&id2=${grouping}`
      );
      return response;
    }
    if (!response.ok) {
      throw new Error("Network response was not okay");
    }
    const audioData = await response.json();

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
}

export {
  audioObject,
  cardTouchSfx,
  correctCardID,
  randomNumber,
  speak,
  getAudio,
  loadAudio,
};
