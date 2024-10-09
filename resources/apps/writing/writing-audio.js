import { randomItem } from "./writing.js";
let audioObject = {};
let correctCardID;
let randomNumber;

function speak() {
  setTimeout(function () {
    audioObject[randomItem].sound.play();
  }, 1000);
}

const writingSfx = {
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
  if (style === 1) {
    category = "sight-words";
    grouping = 1;
  }
  // if (style === 2) {
  //   category = "numbers";
  //   grouping = 2;
  // }
  // if (style === 3) {
  //   category = "numbers";
  //   grouping = 3;
  // }
  // if (style === 4) {
  //   category = "numbers";
  //   grouping = 4;
  // }
  // if (style === 5) {
  //   category = "numbers";
  //   grouping = 5;
  // }
  // if (style === 6) {
  //   category = "numbers";
  //   grouping = 6;
  // }
  // if (style === 7) {
  //   category = "numbers";
  //   grouping = 7;
  // }
  // if (style === 8) {
  //   category = "numbers";
  //   grouping = 1;
  // }
  // if (style === 9) {
  //   category = "numbers";
  //   grouping = 1;
  // }
  // if (style === 10) {
  //   category = "numbers";
  //   grouping = 1;
  // }
  // if (style === 11) {
  //   category = "numbers";
  //   grouping = 1;
  // }
  // if (style === 12) {
  //   category = "numbers";
  //   grouping = 1;
  // }
  try {
    if (grouping2) {
      const response = await fetch(
        `/KGPSEnglishPractice-test/api/load_audio.php?id1=${category}&id2=${grouping}&id3=${grouping2}`
      );
    } else {
      const response = await fetch(
        `/KGPSEnglishPractice-test/api/load_audio.php?id1=${category}&id2=${grouping}`
      );
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
  writingSfx,
  correctCardID,
  randomNumber,
  speak,
  getAudio,
  loadAudio,
};
