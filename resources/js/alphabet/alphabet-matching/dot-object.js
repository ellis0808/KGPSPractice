// end dot object

class Dot {
  constructor() {
    this.id = null;
    this.text = null;
    this.isConnected = false;
    this.connection = null;
    this.final = false;
  }
  createEndDot() {
    const newDot = document.createElement("div");

    newDot.classList.add("end-dot", "dot", "end-target");
    newDot.style.zIndex = "30";
  }
  isCorrect(event) {
    if (this.text === line.text) {
      line.element.classList.add("correctPulse");
      const correctEndDot = document.querySelectorAll(`[line-id="${line.id}"]`);
      correctEndDot.forEach((item) => {
        if (!item.classList.contains("dot-enclosure")) {
          item.classList.add("correctPulse");
        } else if (item.classList.contains("dot-enclosure")) {
          item.children[0].classList.add("correctPulse");
        }
      });
      const bufferLoader = new BufferLoader(
        audioContext,
        ["../../resources/audio/sfx/クイズ正解5.mp3"],
        finishedLoading
      );
      bufferLoader.load();
      updatePositiveCount(1);
      scoreDisplay.classList.add("pulse");
      checkAllCorrect();
    } else {
      event.target.removeAttribute("line-id");
      event.target.classList.remove("correctPulse");
      removeCorrectPulse();
      updateNegativeCount(1);
    }
  }
  connectDot() {
    this.connection = line.id;
    this.isConnected = true;
  }
  disconnectDot() {
    this.connection = null;
    this.isConnected = false;
  }
}

export { Dot };
