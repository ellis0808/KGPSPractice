const feedbackAudioObject = {
  positiveFeedback: {
    outstanding: {
      content: "Outstanding!",
      sound: new Howl({
        src: [
          "https://orchidpony8.sakura.ne.jp/KGPSEPaudio/feedback-audio/feedback-v1-outstanding.mp3",
        ],
        volume: 1,
      }),
    },
    amazing: {
      content: "Amazing!",
      sound: new Howl({
        src: [
          "https://orchidpony8.sakura.ne.jp/KGPSEPaudio/feedback-audio/feedback-v1-amazing.mp3",
        ],
        volume: 1,
      }),
    },
    excellent: {
      content: "Excellent!",
      sound: new Howl({
        src: [
          "https://orchidpony8.sakura.ne.jp/KGPSEPaudio/feedback-audio/feedback-v1-excellent.mp3",
        ],
        volume: 1,
      }),
    },
    greatJob: {
      content: "Great job!",
      sound: new Howl({
        src: [
          "https://orchidpony8.sakura.ne.jp/KGPSEPaudio/feedback-audio/feedback-v1-great-job.mp3",
        ],
        volume: 1,
      }),
    },
    goodJob: {
      content: "Good job!",
      sound: new Howl({
        src: [
          "https://orchidpony8.sakura.ne.jp/KGPSEPaudio/feedback-audio/feedback-v1-good-job.mp3",
        ],
        volume: 1,
      }),
    },
  },
  negativeFeedback: {
    betterLuckNextTime: {
      content: "Better luck next time!",
      sound: new Howl({
        src: [
          "https://orchidpony8.sakura.ne.jp/KGPSEPaudio/feedback-audio/feedback-v1-better-luck-next-time.mp3",
        ],
        volume: 0.8,
      }),
    },
  },
};

export { feedbackAudioObject };
