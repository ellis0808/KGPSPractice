import { writingAudio } from "./writing-audio.js";
import { audio } from "../../utilities/audio.js";
import { appContainer } from "../../utilities/app-container-class.js";
import { scoreAssessment, scoreFunction } from "../../utilities/score.js";
import { timerFunction } from "../../utilities/timer.js";
import { BASE_PATH } from "../../utilities/get-base-path.js";
import { user } from "../../utilities/user-object.js";

class WritingApp {
  constructor() {
    this.currentApp = ["writingApp."];
    this.activityType = "writing";
    this.activityName = null;
    this.style = null;
    this.stylesheet = `${BASE_PATH}resources/css/writing.css`;
    this.time = null;
    this.randomItemArray = [];
    this.items = [];
    this.stats = this.initializeStats();
    this.totalElapsedTime = null;
    this.bestTime = null;
    this.numberCorrect = 0;
    this.numberIncorrect = 0;
    this.answerAttempts = 0;
    this.shortQuestionsArray = [];
    this.mediumQuestionsArray = [];
    this.longQuestionsArray = [];
    this.correctShortAnswersArray = [];
    this.correctMediumAnswersArray = [];
    this.correctLongAnswersArray = [];
    this.incorrectShortAnswersArray = [];
    this.incorrectMediumAnswersArray = [];
    this.incorrectLongAnswersArray = [];
    this.correctAnswerPoints = 0;
    this.maxNumberOfWordsToWrite = 5;
    this.currentProblemNumber = 1;
    this.writingAppClass = ["writing-app"];
    this.endSessionItems = [
      ".message-row",
      ".number-correct-row",
      ".canvas-row",
      ".controls-row",
      ".repeat-btn",
    ];
    this.endSessionFeedback = scoreAssessment.writing;
  }
  run(set, time) {
    this.setStyleSheet();
    this.setActivityName(set);
    this.getBestTime(user.id, writingApp.activityType, writingApp.activityName);
    writingAudio.startAudioFetch(set);
    setTimeout(() => {
      this.setTime(time);
      this.setUpApp();
      appContainer.startApp();
      this.setCanvasFunctionality();
    }, 200);
  }
  setTime(time) {
    this.time = time;
  }
  setUpApp() {
    appContainer.setAppVariables(
      this.currentApp[0],
      this.time,
      this.clearBoard,
      null,
      this.createAndSetStructure,
      this.generateItems,
      this.activityName,
      this.endSessionItems,
      this.endSessionFeedback
    );
  }
  setActivityName(set) {
    this.activityName = set;
  }
  sendStats(stats) {
    appContainer.getStats(stats);
  }
  initializeStats() {
    return {
      userID: user.id,
      userAccess: user.access,
      activityType: this.activityType,
      activityName: this.activityName,
      totalElapsedTime: 0,
      questionCount: 0,
      correctAnswerCount: 0,
      incorrectAnswerCount: 0,
      answerAttempts: 0,
      questionsShort: [],
      questionsMedium: [],
      questionsLong: [],
      correctAnswersShort: [],
      correctAnswersMedium: [],
      correctAnswersLong: [],
      incorrectAnswersShort: [],
      incorrectAnswersMedium: [],
      incorrectAnswersLong: [],
    };
  }
  resetStats() {
    this.stats = this.initializeStats();
  }
  updateStats() {
    this.stats.userID = user.id;
    this.stats.userAccess = user.access;
    this.stats.activityName = this.activityName;
    this.stats.correctAnswerCount = this.numberCorrect;
    this.stats.incorrectAnswerCount = this.numberIncorrect;
    this.stats.answerAttempts = this.answerAttempts;
    this.stats.questionsShort = this.shortQuestionsArray;
    this.stats.correctAnswersShort = this.correctShortAnswersArray;
    this.stats.incorrectAnswersShort = this.incorrectShortAnswersArray;
  }
  createAndSetStructure = () => {
    this.createGrid();
    this.createCanvas();
    this.createAppControls();
    this.setGridandElements();
  };
  setStyleSheet() {
    appContainer.applyAppStyleSheet(this.stylesheet);
  }
  createGrid() {
    this.messageRow = document.createElement("div");
    this.numberCorrectRow = document.createElement("div");
    this.canvasRow = document.createElement("div");
    this.controlsRow = document.createElement("div");
    this.messageRow.classList.add("message-row", this.writingAppClass);
    this.numberCorrectRow.classList.add(
      "number-correct-row",
      this.writingAppClass
    );
    this.canvasRow.classList.add("canvas-row", this.writingAppClass);
    this.controlsRow.classList.add("controls-row", this.writingAppClass);
  }
  createAppControls() {
    this.repeatBtn = document.createElement("div");
    this.checkBtn = document.createElement("div");
    this.undoBtn = document.createElement("div");
    this.clearBtn = document.createElement("div");
    this.skipBtn = document.createElement("div");

    this.repeatBtn.classList.add("repeat-btn", "btn", this.writingAppClass);
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
      this.skip();
    });
    this.undoBtn.addEventListener("pointerdown", (event) => {
      if (this.canvasController.trace.length === 0) {
        return;
      } else if (this.canvasController.trace.length === 1) {
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
    this.canvas.classList.add("canvas", this.writingAppClass);
    this.canvas.width = 800;
    this.canvas.height = 475;

    this.questionDisplay = document.createElement("div");
    this.questionDisplay.classList.add("question-display");
  }
  setBestTimeDisplay() {
    this.bestTimeDisplay = document.createElement("div");
    this.bestTimeDisplay.classList.add("best-time-display");
    this.displayBestTime();
    appContainer.btnContainer1.appendChild(this.bestTimeDisplay);
  }
  displayBestTime() {
    if (!this.bestTime) {
      this.bestTime = 0;
    }
    const m = Math.floor(this.bestTime / 60);
    const s = this.bestTime % 60;
    if (s < 10) {
      this.bestTimeDisplay.textContent = `${m}:0${s}`;
    } else {
      this.bestTimeDisplay.textContent = `${m}:${s}`;
    }
  }
  displayNumberCorrect() {
    this.numberCorrectRow.innerText = `${this.numberCorrect}/${this.maxNumberOfWordsToWrite}`;
  }
  hideNumberCorrect() {
    this.numberCorrect.classList.add("hide");
  }
  showNumberCorrect() {
    this.numberCorrect.classList.remove("hide");
  }
  removeNumberCorrect() {
    this.numberCorrect.remove;
  }
  resetNumberCorrect() {
    this.numberCorrect = 0;
  }
  resetNumberIncorrect() {
    this.numberIncorrect = 0;
  }
  resetArrays() {
    this.randomItemArray.length = 0;
    this.items.length = 0;
    this.shortQuestionsArray = [];
    this.mediumQuestionsArray = [];
    this.longQuestionsArray = [];
    this.correctShortAnswersArray = [];
    this.correctMediumAnswersArray = [];
    this.correctLongAnswersArray = [];
    this.incorrectShortAnswersArray = [];
    this.incorrectMediumAnswersArray = [];
    this.incorrectLongAnswersArray = [];
    writingAudio.resetArrayItemNumber();
  }
  increaseNumberCorrect() {
    ++this.numberCorrect;
  }
  increaseNumberIncorrect() {
    ++this.numberIncorrect;
  }
  increaseCurrentProblemNumber() {
    ++this.currentProblemNumber;
  }
  resetCurrentProblemNumber() {
    this.currentProblemNumber = 1;
  }
  increaseAnswerAttempts() {
    ++this.answerAttempts;
  }
  resetAnswerAttempts() {
    this.answerAttempts = 0;
  }
  setCorrectAnswerPoints() {
    if (this.numberIncorrect === 0) {
      this.correctAnswerPoints =
        this.numberCorrect * 2 +
        Math.floor(this.maxNumberOfWordsToWrite * 0.25);
    } else if (this.numberIncorrect > 0) {
      this.correctAnswerPoints = this.numberCorrect * 2;
    }
  }
  setGrid() {
    appContainer.grid.appendChild(this.messageRow);
    appContainer.grid.appendChild(this.numberCorrectRow);
    appContainer.grid.appendChild(this.canvasRow);
    appContainer.grid.appendChild(this.controlsRow);
  }
  setGridElements() {
    this.messageRow.appendChild(this.questionDisplay);
    this.canvasRow.appendChild(this.canvas);
    this.controlsRow.appendChild(this.checkBtn);
    this.controlsRow.appendChild(this.undoBtn);
    this.controlsRow.appendChild(this.clearBtn);
    this.controlsRow.appendChild(this.skipBtn);
    this.controlsRow.appendChild(this.repeatBtn);
    this.setBestTimeDisplay();
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
    writingApp.items.length = 0;

    Object.keys(audio.audioObject).forEach((item) => {
      writingApp.items.push(item);
    });
    writingApp.getRandomItems();
  }
  getRandomItems() {
    let randomItem;
    let i;
    for (i = 0; i < this.maxNumberOfWordsToWrite; ++i) {
      randomItem =
        writingApp.items[Math.floor(Math.random() * writingApp.items.length)];

      this.randomItemArray.push(randomItem);
      this.shortQuestionsArray.push(randomItem);
    }
    this.getNewWord();
    this.displayNumberCorrect();
  }
  getNewWord() {
    writingApp.clearCanvas();
    setTimeout(writingAudio.speak, 300);
  }
  skip() {
    writingAudio.increaseArrayItemNumber();
    this.getNewWord();
    this.increaseCurrentProblemNumber();
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
  clearBoard() {
    timerFunction.goalIncomplete();
    writingApp.resetNumberCorrect();
    writingApp.resetNumberIncorrect();
    writingApp.resetAnswerAttempts();
    writingApp.resetCurrentProblemNumber();
    writingApp.resetArrays();
    writingApp.clearCanvas();
    this.resetStats();
  }
  clearCanvas() {
    this.removeCorrectIncorrectBorder();
    this.canvasController.erase();
  }
  checkAnswer(input) {
    this.increaseAnswerAttempts();
    if (input[0] === writingAudio.randomWord) {
      this.addBorderCorrect();
      audio.appSfx.correct.play();
      this.increaseNumberCorrect();
      this.displayNumberCorrect();
      this.correctShortAnswersArray.push(input);

      setTimeout(() => {
        if (this.currentProblemNumber > this.maxNumberOfWordsToWrite) {
          this.endRound();
        } else {
          this.getNewWord();
        }
      }, 1500);
    } else {
      audio.appSfx.incorrect.play();
      this.addBorderIncorrect();
      this.increaseNumberIncorrect();
      this.incorrectShortAnswersArray.push(input);
      setTimeout(() => {
        this.clearCanvas();
        setTimeout(writingAudio.repeat, 700);
      }, 2000);
    }
    if (!timerFunction.goalMet) {
      this.increaseCurrentProblemNumber();
    }
  }
  endRound() {
    if (this.numberCorrect === this.maxNumberOfWordsToWrite) {
      this.stats.totalElapsedTime = timerFunction.time;
    }
    this.updateStats();
    this.setCorrectAnswerPoints();
    this.sendStats(this.stats);
    scoreFunction.updatePositiveCount(this.correctAnswerPoints);
    timerFunction.goalCompleted();
  }
  async getBestTime(id1, id2, id3) {
    try {
      const response = await fetch(
        `${BASE_PATH}api/get_best_time.php?id1=${id1}&id2=${id2}&id3=${id3}`
      );

      if (!response.ok) {
        throw new Error("Network response was not okay");
      }
      const data = await response.json();
      if (data) {
        writingApp.bestTime = data.best_time;
      }
    } catch (error) {
      console.error(
        "Error retrieving best time from activity records: ",
        error
      );
    }
  }
}

const writingApp = new WritingApp();

export { writingApp };
