import { writingAudio } from "./writing-audio.js";
import { audio } from "../../utilities/audio.js";
import { app } from "../../utilities/app-class.js";
import { scoreFunction } from "../../utilities/score.js";

class WritingApp {
  constructor() {
    this.activityId = null;
    this.style = null;
    this.stylesheet = "/KGPSEnglishPractice-test/resources/css/writing.css";
    this.time = null;
    this.randomItemArray = [];
    this.items = [];
    this.numberCorrect = 0;
    this.numberIncorrect = 0;
    this.correctAnswerPoints = null;
    this.maxNumberOfWordsToWrite = null;
  }
  run(set, time) {
    this.setStyleSheet();
    this.setStyle(set);
    this.setActivityId(this.style);
    setTimeout(() => {
      this.setTime(time);
      this.setUpApp();
      app.startApp();
      this.setCanvasFunctionality();
    }, 200);
  }
  setTime(time) {
    this.time = time;
  }
  setUpApp() {
    app.setAppVariables(
      this.time,
      this.clearBoard,
      null,
      this.createAndSetStructure,
      this.generateItems,
      this.activityId
    );
  }
  createAndSetStructure = () => {
    this.createGrid();
    this.createCanvas();
    this.createAppControls();
    this.setGridandElements();
  };
  setStyleSheet() {
    app.applyAppStyleSheet(this.stylesheet);
  }
  setStyle(set) {
    switch (set) {
      // Numbers
      case "numbers1-10":
        this.style = 1;
        writingAudio.startAudioFetch(this.style);
        break;
      case "numbers11-20":
        this.style = 2;
        writingAudio.startAudioFetch(this.style);
        break;
      case "numbers21-40":
        this.style = 3;
        writingAudio.startAudioFetch(this.style);
        break;
      case "numbers41-60":
        this.style = 4;
        writingAudio.startAudioFetch(this.style);
        break;
      case "numbers61-80":
        this.style = 5;
        writingAudio.startAudioFetch(this.style);
        break;
      case "numbers81-100":
        this.style = 6;
        writingAudio.startAudioFetch(this.style);
        break;
      case "numbers1-50":
        this.style = 7;
        writingAudio.startAudioFetch(this.style);
        break;
      case "numbers1-100":
        this.style = 8;
        writingAudio.startAudioFetch(this.style);
        break;
      case "sightwords1":
        this.style = 9;
        this.maxNumberOfWordsToWrite = 5;
        writingAudio.startAudioFetch(this.style);
        break;
      case "sightwords2":
        this.style = 10;
        writingAudio.startAudioFetch(this.style);
        break;
      case "sightwords3":
        this.style = 11;
        writingAudio.startAudioFetch(this.style);
        break;
    }
  }
  setActivityId(style) {
    if (style === 0) {
      this.activityId = 1;
    } else if (style === 1) {
      this.activityId = 2;
    } else if (style === 2) {
      this.activityId = 4;
    } else if (style === 3) {
      this.activityId = 5;
    } else if (style === 4) {
      this.activityId = 6;
    } else if (style === 5) {
      this.activityId = 16;
    } else if (style === 6) {
      this.activityId = 8;
    } else if (style === 7) {
      this.activityId = 9;
    } else if (style === 9) {
      this.activityId = 4;
    }
  }
  createGrid() {
    this.messageRow = document.createElement("div");
    this.numberCorrectRow = document.createElement("div");
    this.canvasRow = document.createElement("div");
    this.controlsRow = document.createElement("div");
    this.messageRow.classList.add("message-row");
    this.numberCorrectRow.classList.add("number-correct-row");
    this.canvasRow.classList.add("canvas-row");
    this.controlsRow.classList.add("controls-row");
  }
  createAppControls() {
    this.repeatBtn = document.createElement("div");
    this.checkBtn = document.createElement("div");
    this.undoBtn = document.createElement("div");
    this.clearBtn = document.createElement("div");
    this.skipBtn = document.createElement("div");

    this.repeatBtn.classList.add("repeat-btn", "btn");
    this.repeatBtn.innerText = "repeat";
    this.repeatBtn.addEventListener("pointerdown", writingAudio.repeat);
    this.checkBtn.classList.add("check-btn", "btn");
    this.checkBtn.innerText = "Check";
    this.undoBtn.classList.add("undo-btn", "btn");
    this.undoBtn.innerText = "Undo";
    this.clearBtn.classList.add("clear-btn", "btn");
    this.clearBtn.innerText = "Clear";
    this.clearBtn.addEventListener("pointerdown", () => {
      this.canvasController.erase();
    });
    this.skipBtn.classList.add("skip-btn", "btn");
    this.skipBtn.innerText = "Skip";
    this.skipBtn.addEventListener("pointerdown", () => {
      writingAudio.increaseArrayItemNumber();
      this.getNewWord();
    });
    this.undoBtn.addEventListener("pointerdown", (event) => {
      if (this.canvasController.trace.length === 0) {
        return;
      } else if (canvasController.trace.length === 1) {
        this.canvasController.erase();
        this.canvasController.trace.length = 0;
      } else {
        this.canvasController.undo(event);
      }
    });
    this.checkBtn.addEventListener("pointerdown", (event) => {
      if (this.canvasController.trace.length !== 0) {
        this.canvasController.recognize(event);
      } else {
        return;
      }
    });
  }
  createCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "canvas");
    this.canvas.classList.add("canvas");
    this.canvas.width = 800;
    this.canvas.height = 475;

    this.questionDisplay = document.createElement("div");
    this.questionDisplay.classList.add("question-display");
  }
  displayNumberCorrect() {
    this.numberCorrectRow.innerText = `${this.numberCorrect}/${this.maxNumberOfWordsToWrite}`;
  }
  increaseNumberCorrect() {
    ++this.numberCorrect;
  }
  setCorrecAnswerPoints() {
    if (this.numberIncorrect === 0) {
      this.correctAnswerPoints =
        this.numberCorrect * 2 +
        Math.floor(this.maxNumberOfWordsToWrite * 0.25);
    } else {
      this.correctAnswerPoints = this.numberCorrect * 2;
    }
  }
  setGrid() {
    app.grid.appendChild(this.messageRow);
    app.grid.appendChild(this.numberCorrectRow);
    app.grid.appendChild(this.canvasRow);
    app.grid.appendChild(this.controlsRow);
  }
  setGridElements() {
    this.messageRow.appendChild(this.questionDisplay);
    this.canvasRow.appendChild(this.canvas);
    this.controlsRow.appendChild(this.checkBtn);
    this.controlsRow.appendChild(this.undoBtn);
    this.controlsRow.appendChild(this.clearBtn);
    this.controlsRow.appendChild(this.skipBtn);
    app.btnContainer1.appendChild(this.repeatBtn);
  }
  setGridandElements() {
    this.setGridElements();
    this.setGrid();
  }
  setCanvasFunctionality() {
    this.canvasController = new handwriting.Canvas(
      document.getElementById("canvas"),
      3
    );
    this.canvasController.setLineWidth(10);
    this.canvasController.setOptions({
      language: "en",
      numOfReturn: 1,
    });
    this.canvasController.set_Undo_Redo(true, false);
    this.canvasController.setCallBack((input, error) => {
      if (error) {
        throw error;
      }
      this.checkAnswer(input);
    });
    return this.canvasController;
  }
  generateItems() {
    console.log(this);

    console.log(writingApp.items, writingApp.randomItemArray);

    writingApp.items.length = 0;
    console.log(audio.audioObject);

    Object.keys(audio.audioObject).forEach((item) => {
      writingApp.items.push(item);
    });
    console.log(writingApp.items);
    writingApp.getRandomItems();
  }
  getRandomItems() {
    let randomItem;
    let i;
    for (i = 0; i < this.maxNumberOfWordsToWrite; ++i) {
      randomItem =
        writingApp.items[Math.floor(Math.random() * writingApp.items.length)];

      this.randomItemArray.push(randomItem);
    }
    console.log(writingApp.randomItemArray);
    this.getNewWord();
    this.displayNumberCorrect();
  }
  getNewWord() {
    writingApp.clearCanvas();
    setTimeout(writingAudio.speak, 300);
  }
  addBorderIncorrect() {
    this.canvas.classList.add("border-error");
  }
  addBorderCorrect() {
    this.canvas.classList.add("border-correct");
  }
  removeCorrectIncorrectBorder = () => {
    if (this.canvas.classList.contains("border-error")) {
      this.canvas.classList.remove("border-error");
    }
    if (this.canvas.classList.contains("border-correct")) {
      this.canvas.classList.remove("border-correct");
    }
  };
  clearBoard() {}
  clearCanvas() {
    this.removeCorrectIncorrectBorder();
    this.canvasController.erase();
  }
  checkAnswer(input) {
    if (input[0] === writingAudio.randomWord) {
      this.addBorderCorrect();
      audio.appSfx.correct.play();
      this.increaseNumberCorrect();
      this.displayNumberCorrect();
      console.log(this.numberCorrect);
      this.checkAllCorrect();
    } else {
      audio.appSfx.incorrect.play();
      this.addBorderIncorrect();
      setTimeout(() => {
        this.clearCanvas();
        setTimeout(writingAudio.repeat, 700);
      }, 2000);
    }
  }
  checkAllCorrect() {
    if (this.numberCorrect === this.maxNumberOfWordsToWrite) {
      this.setCorrecAnswerPoints();
      console.log(this.correctAnswerPoints);
      scoreFunction.updatePositiveCount(this.correctAnswerPoints);
      audio.feedbackAudioObject.positiveFeedback.greatJob.sound.play();
      app.endRound();
    } else {
      setTimeout(this.getNewWord, 1500);
    }
  }
}

const writingApp = new WritingApp();

export { writingApp };
