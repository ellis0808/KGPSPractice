import { sessionCheck, sessionData } from "../../login/session-check.js";
import {
  mainContainer,
  navBar,
  body,
  menuContainer,
  stylesheet,
} from "../../utilities/variables";
import {
  setStyle,
  setActivityId,
} from "./writing-set-style-and-activity-id.js";
import { writingSfx } from "./writing-audio.js";
import { removeMenuPage } from "../../utilities/main-menu-display-toggle.js";

function writingApp(set) {
  sessionCheck();
  setStyle(set);
  setTimeout(() => {
    mainContainer.appendChild(appContainer);
    appContainer.appendChild(topRow);
    appContainer.appendChild(secondRow);
    appContainer.appendChild(canvasRow);
    appContainer.appendChild(bottomRow);
    appContainer.appendChild(btnContainer2);
  }, 0);

  stylesheet.setAttribute(
    "href",
    "/KGPSEnglishPractice-test/resources/css/writing.css"
  );
  removeMenuPage();

  setTimeout(() => {
    displayStartBtn();
  }, 200);
  appContainer.classList.remove("hide");
}

const displayStartBtn = () => {
  btnContainer2.appendChild(startBtn);
};

const startRound = () => {
  topRow.appendChild(repeatBtn);
  secondRow.appendChild(questionDisplay);
  canvasRow.appendChild(canvas);
  bottomRow.appendChild(clearBtn);
  bottomRow.appendChild(undoBtn);
  bottomRow.appendChild(checkBtn);
  displayQuestion();
  setTimeout(() => {
    getRandomItem();
  }, 1000);
};

// Main Structure Containers
const appContainer = document.createElement("div");
appContainer.classList.add("container", "writing-app");
const startBtn = document.createElement("div");
startBtn.classList.add("start-btn");

// Sub-structure Containers
const topRow = document.createElement("div");
topRow.classList.add("top-row", "writing-app");
const secondRow = document.createElement("div");
secondRow.classList.add("second-row", "writing-app");
const canvasRow = document.createElement("div");
canvasRow.classList.add("canvas-row", "writing-app");
const bottomRow = document.createElement("div");
bottomRow.classList.add("bottom-row", "writing-app");
const btnContainer2 = document.createElement("div");
btnContainer2.classList.add("btn-container2");
// Buttons (btn)
const repeatBtn = document.createElement("div");
repeatBtn.classList.add("repeat-btn", "btn", "writing-app");
repeatBtn.innerText = "Repeat";
const questionDisplay = document.createElement("div");
questionDisplay.classList.add("question-display", "writing-app");
const checkBtn = document.createElement("div");
checkBtn.classList.add("check-btn", "btn", "writing-app");
checkBtn.innerText = "Check";
const undoBtn = document.createElement("div");
undoBtn.classList.add("undo-btn", "btn", "writing-app");
undoBtn.innerText = "Undo";
const clearBtn = document.createElement("div");
clearBtn.classList.add("clear-btn", "btn", "writing-app");
clearBtn.innerText = "Clear";

// HTML Canvas
const canvas = document.createElement("canvas");
canvas.setAttribute("id", "canvas");
canvas.classList.add("canvas");

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = 800;
canvas.height = 475;

// Appending Items
let canvasController;
// Canvas Custom Properties
const setCanvasController = () => {
  canvasController = new handwriting.Canvas(
    document.getElementById("canvas"),
    3
  );
  canvasController.setLineWidth(10);
  canvasController.setOptions({
    language: "en",
    numOfReturn: 1,
  });
  canvasController.set_Undo_Redo(true, false);

  canvasController.setCallBack(function (input, error) {
    console.log("input ", input);
    if (error) {
      throw error;
    }
    checkAnswer(input);
    // return input;
  });
  return canvasController;
};

clearBtn.addEventListener("pointerdown", (event) => {
  canvasController.erase();
});
undoBtn.addEventListener("pointerdown", (event) => {
  if (canvasController.trace.length === 0) {
    return;
  } else if (canvasController.trace.length === 1) {
    canvasController.erase();
    canvasController.trace.length = 0;
  } else {
    canvasController.undo(event);
  }
});
checkBtn.addEventListener("pointerdown", (event) => {
  canvasController.recognize(event);
});

startBtn.addEventListener("click", () => {
  startRound();
});
const items = ["a", "the", "what", "this"];
let maxNumberOfItems = 10;
let randomItem;
let randomItemArray = [];

const getRandomItem = () => {
  for (let i = 0; i < maxNumberOfItems; ++i) {
    randomItem = items[Math.floor(Math.random() * items.length)];
    console.log(randomItem);

    return randomItemArray.push(randomItem);
  }
};

function displayQuestion() {
  questionDisplay.innerText = "Write the letter!";
}

const correctAnswer = "A";
const letterA = new Howl({
  src: ["v1-alphabet-a.mp3"],
  volume: 0.8,
});
const correct = new Howl({
  src: ["クイズ正解5.mp3"],
  volume: 0.8,
});
const incorrect = new Howl({
  src: ["クイズ不正解2.mp3"],
  volume: 0.8,
});
function playLetter() {
  letterA.play();
}

function checkAnswer(input) {
  if (input[0] === correctAnswer) {
    setTimeout(() => {
      correct.play();
    }, 300);
  } else {
    setTimeout(() => {
      incorrect.play();
    }, 300);
  }
}

export { writingApp, randomItem };
