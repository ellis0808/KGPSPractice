class Audio {
  constructor() {
    this.audioObject = {};
  }
  async getAudio(category, grouping, grouping2) {
    try {
      let response;
      if (grouping2 !== null) {
        response = await fetch(
          `/KGPSEnglishPractice-test/api/load_audio.php?id1=${category}&id2=${grouping}&id3=${grouping2}`
        );
      } else if (grouping2 === null) {
        response = await fetch(
          `/KGPSEnglishPractice-test/api/load_audio.php?id1=${category}&id2=${grouping}`
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
