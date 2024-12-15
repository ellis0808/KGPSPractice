import {
  setStyle,
  setActivityId,
  activityId,
} from "./writing-set-style-and-activity-id.js";
import { writingAudio } from "./writing-audio.js";
import { audio } from "../../utilities/audio.js";
import { app } from "../../utilities/app-class.js";

class WritingApp {
  constructor() {
    this.activityId = null;
    this.stylesheet = "/KGPSEnglishPractice-test/resources/css/writing.css";
    this.time = null;
    this.correctAnswerPoints = 1;
    this.maxNumberOfWordsToWrite = 10;
  }
  run(set, time) {
    this.setStyleSheet();
    setStyle(set);
    this.setActivityId();
    setTimeout(() => {
      this.setTime(time);
      this.setUpApp();
      app.setForeignElements();
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
      this.activateEventListeners,
      this.createAndSetStructure,
      this.generateItems,
      this.activityId
    );
  }
  createAndSetStructure() {
    this.createGrid();
    this.createAppControls();
    this.createGridElements();
    this.setGridandElements();
  }
  setStyleSheet() {
    app.applyAppStyleSheet(this.stylesheet);
  }
  setActivityId() {
    setActivityId();
    this.activityId = activityId;
  }
  createGrid() {
    this.messageRow = document.createElement("div");
    this.canvasRow = document.createElement("div");
    this.canvasRow = document.createElement("div");
    this.controlsRow = document.createElement("div");
    this.messageRow.classList.add("message-row");
    this.canvasRow.classList.add("canvas-row");
    this.controlsRow.classList.add("controls-row");
  }
  createAppControls() {
    this.repeatBtn = document.createElement("div");
    this.checkBtn = document.createElement("div");
    this.undoBtn = document.createElement("div");
    this.clearBtn = document.createElement("div");

    this.repeatBtn.classList.add("repeat-btn", "btn");
    this.repeatBtn.innerText = "repeat";
    this.repeatBtn.addEventListener("pointerdown", writingAudio.repeat);
    this.checkBtn.classList.add("check-btn", "btn");
    this.checkBtn.innerText = "Check";
    this.undoBtn.classList.add("undo-btn", "btn");
    this.clearBtn.classList.add("clear-btn", "btn");
    this.clearBtn.innerText = "Clear";
    this.clearBtn.addEventListener("pointerdown", () => {
      this.canvasController.erase();
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
    checkBtn.addEventListener("pointerdown", (event) => {
      if (this.canvasController.trace.length !== 0) {
        this.canvasController.recognize(event);
      } else {
        return;
      }
    });
  }
  createGridElements() {
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "canvas");
    this.canvas.classList.add("canvas");
    this.canvas.width = 800;
    this.canvas.height = 475;

    this.questionDisplay = document.createElement("div");
    this.questionDisplay.classList.add("question-display");
  }
  setGrid() {
    app.grid.appendChild(this.messageRow);
    app.grid.appendChild(this.canvasRow);
    app.grid.appendChild(this.controlsRow);
  }
  setGridElements() {
    this.messageRow.appendChild(this.questionDisplay);
    this.canvasRow.appendChild(this.canvas);
    this.controlsRow.appendChild(this.checkBtn);
    this.controlsRow.appendChild(this.undoBtn);
    this.controlsRow.appendChild(this.clearBtn);
    app.btnContainer1.appendChild(this.repeatBtn);
  }
  setGridandElements() {
    this.setGrid();
    this.setGridElements();
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
    this.items = [];
    this.items.length = 0;
    Object.keys(audio.audioObject).forEach((item) => {
      this.items.push(item);
    });
    console.log(this.items);
  }
  getRandomItem() {
    this.randomItemArray = [];
    let randomItem;
    let i;
    for (i = 0; i < this.maxNumberOfWordsToWrite; ++i) {
      randomItem = this.items[Math.floor(Math.random() * this.items.length)];

      this.randomItemArray.push(randomItem);
    }
  }
  getNewWord() {
    resetCanvas();
    setTimeout(writingAudio.speak, 300);
  }
  addBorderIncorrect() {
    this.canvas.classList.add("border-error");
  }
  addBorderCorrect() {
    this.canvas.classList.add("border-correct");
  }
  removeCorrectIncorrectBorder() {
    if (this.canvas.classList.contains("border-error")) {
      this.canvas.classList.remove("border-error");
    }
    if (this.canvas.classList.contains("border-correct")) {
      this.canvas.classList.remove("border-correct");
    }
  }
  clearCanvas() {
    this.removeCorrectIncorrectBorder();
    this.canvasController.erase();
  }
  checkAnswer(input) {
    if (input[0] === writingAudio.randomWord) {
      this.addBorderCorrect();
      audio.appSfx.correct.play();
      setTimeout(this.getNewWord, 1500);
    } else {
      audio.appSfx.incorrect.play();
      this.addBorderIncorrect();
      setTimeout(() => {
        this.clearCanvas();
        setTimeout(writingAudio.repeat, 700);
      }, 2000);
    }
  }
}

const writingApp = new WritingApp();

export { writingApp };
