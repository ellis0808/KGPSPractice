const feedbackAudioObject = {
  greatJob: {
    content: "Great job!",
    sound: new Howl({
      src: ["resources/audio/feedback-audio/feedback_v1_great_job.mp3"],
      volume: 1,
    }),
  },
  goodJob: {
    content: "Good job!",
    sound: new Howl({
      src: ["resources/audio/feedback-audio/feedback_v1_good_job.mp3"],
      volume: 1,
    }),
  },
  betterLuckNextTime: {
    content: "Better luck next time!",
    sound: new Howl({
      src: [
        "resources/audio/feedback-audio/feedback_v1_better_luck_next_time.mp3",
      ],
      volume: 0.8,
    }),
  },
};

export { feedbackAudioObject };
