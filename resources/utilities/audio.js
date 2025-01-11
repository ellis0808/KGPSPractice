import { BASE_PATH } from "./get-base-path.js";
class Audio {
  constructor() {
    this.audioObject = {};
    this.navigationSfx = {
      startApp: new Howl({
        src: ["/KGPSEPaudio/sfx/sfx-select-3.mp3"],
        volume: 0.5,
        onplayerror: function () {
          sound.once("unlock", function () {
            sound.play();
          });
        },
      }),
      selectMenu: new Howl({
        src: ["/KGPSEPaudio/sfx/sfx-select-1.mp3"],
        volume: 0.5,
      }),
      backToPreviousMenu: new Howl({
        src: ["/KGPSEPaudio/sfx/sfx-select-1-reversed.mp3"],
        volume: 0.5,
      }),
    };
    this.appSfx = {
      correct: new Howl({
        src: ["/KGPSEPaudio/sfx/sfx-correct-1.mp3"],
      }),
      incorrect: new Howl({
        src: ["/KGPSEPaudio/sfx/sfx-incorrect-1.mp3"],
      }),
      poppop: new Howl({
        src: ["/KGPSEPaudio/sfx/sfx-poppop-1.mp3"],
        volume: 0.8,
      }),
      cancel: new Howl({
        src: ["/KGPSEPaudio/sfx/sfx-cancel-1.mp3"],
        volume: 0.8,
      }),
      newRound: new Howl({
        src: ["/KGPSEPaudio/sfx/sfx-success-1.mp3"],
        volume: 0.5,
      }),
    };
    this.feedbackAudioObject = {
      positiveFeedback: {
        outstanding: {
          content: "Outstanding!",
          sound: new Howl({
            src: ["/KGPSEPaudio/feedback-audio/feedback-v1-outstanding.mp3"],
            volume: 1,
          }),
        },
        amazing: {
          content: "Amazing!",
          sound: new Howl({
            src: ["/KGPSEPaudio/feedback-audio/feedback-v1-amazing.mp3"],
            volume: 1,
          }),
        },
        excellent: {
          content: "Excellent!",
          sound: new Howl({
            src: ["/KGPSEPaudio/feedback-audio/feedback-v1-excellent.mp3"],
            volume: 1,
          }),
        },
        greatJob: {
          content: "Great job!",
          sound: new Howl({
            src: ["/KGPSEPaudio/feedback-audio/feedback-v1-great-job.mp3"],
            volume: 1,
          }),
        },
        goodJob: {
          content: "Good job!",
          sound: new Howl({
            src: ["/KGPSEPaudio/feedback-audio/feedback-v1-good-job.mp3"],
            volume: 1,
          }),
        },
      },
      negativeFeedback: {
        betterLuckNextTime: {
          content: "Better luck next time!",
          sound: new Howl({
            src: [
              "/KGPSEPaudio/feedback-audio/feedback-v1-better-luck-next-time.mp3",
            ],
            volume: 0.8,
          }),
        },
      },
    };
  }
  async getAudio(category, grouping, grouping2) {
    try {
      let response;
      if (grouping2 !== null) {
        response = await fetch(
          `${BASE_PATH}api/load_audio.php?id1=${category}&id2=${grouping}&id3=${grouping2}`
        );
      } else if (grouping2 === null) {
        response = await fetch(
          `${BASE_PATH}api/load_audio.php?id1=${category}&id2=${grouping}`
        );
      }
      if (!response.ok) {
        throw new Error("Network response was not okay");
      }
      const audioData = await response.json();
      console.log(audioData);

      this.loadAudio(audioData);
    } catch (error) {
      console.log("There was an error ", error);
    }
  }
  async getAudioMix(
    category,
    grouping1,
    grouping2,
    grouping3,
    grouping4,
    grouping5
  ) {
    try {
      let response;
      if (grouping5 !== null) {
        response = await fetch(
          `${BASE_PATH}api/load_audio_mix.php?id1=${category}&id2=${grouping1}&id3=${grouping2}&id4=${grouping3}&id5=${grouping4}&id6=${grouping5}`
        );
      } else if (grouping5 === null) {
        response = await fetch(
          `${BASE_PATH}api/load_audio_mix.php?id1=${category}&id2=${grouping1}&id3=${grouping2}&id4=${grouping3}&id5=${grouping4}`
        );
      } else if (grouping4 === null) {
        response = await fetch(
          `${BASE_PATH}api/load_audio_mix.php?id1=${category}&id2=${grouping1}&id3=${grouping2}&id4=${grouping3}`
        );
      } else if (grouping3 === null) {
        response = await fetch(
          `${BASE_PATH}api/load_audio_mix.php?id1=${category}&id2=${grouping1}&id3=${grouping2}`
        );
      }

      if (!response.ok) {
        throw new Error("Network response was not okay");
      }
      const audioData = await response.json();

      this.loadAudio(audioData);
    } catch (error) {
      console.log("There was an error ", error);
    }
  }
  loadAudio(audioData) {
    this.audioObject = {};
    audioData.map((item) => {
      return (this.audioObject[item.content] = {
        content: item.content,
        sound: new Howl({
          src: [item.link],
          volume: 0.5,
        }),
      });
    });
  }
}
const audio = new Audio();

export { audio };
