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
import { removeMenuPage } from "../../utilities/main-menu-display-toggle.js";
import { writingAudio } from "./writing-audio.js";
import { audio } from "../../utilities/audio.js";

function writingApp(set) {
  sessionCheck();
  setStyle(set);
  setTimeout(() => {
    mainContainer.appendChild(appContainer);
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
  if (startBtn.classList.contains("hide")) {
    startBtn.classList.remove("hide");
  }
  btnContainer2.appendChild(startBtn);
};

const startRound = () => {
  writingAudio.writingSfx.startApp.play();
  appContainer.appendChild(topRow);
  appContainer.appendChild(secondRow);
  appContainer.appendChild(canvasRow);
  appContainer.appendChild(bottomRow);
  topRow.appendChild(repeatBtn);
  secondRow.appendChild(questionDisplay);
  canvasRow.appendChild(canvas);
  bottomRow.appendChild(clearBtn);
  bottomRow.appendChild(undoBtn);
  bottomRow.appendChild(checkBtn);
  setCanvasController();
  //   displayQuestion();
  startBtn.classList.add("hide");
  setTimeout(() => {
    // appContainer.removeChild(btnContainer2);
    generateItems();
    setTimeout(getRandomItem, 200);
  }, 500);
  setTimeout(writingAudio.speak, 1000);
};

// Main Structure Containers
const appContainer = document.createElement("div");
appContainer.classList.add("container", "writing-app");
const startBtn = document.createElement("div");
startBtn.classList.add("start-btn");
startBtn.innerText = "Start";

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
repeatBtn.addEventListener("pointerdown", writingAudio.repeat);
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
  if (canvasController.trace.length !== 0) {
    canvasController.recognize(event);
  } else {
    return;
  }
});

startBtn.addEventListener("click", () => {
  startRound();
});

/* -----  Item Generator ----- */
const items = ["a", "the", "what", "this"];

const generateItems = () => {
  items.length = 0;
  Object.keys(audio.audioObject).forEach((item) => {
    items.push(item);
  });
  console.log(items);
};

let maxNumberOfItems = 10;
let randomItem;
let randomItemArray = [];

const getRandomItem = () => {
  let i;
  for (i = 0; i < maxNumberOfItems; ++i) {
    randomItem = items[Math.floor(Math.random() * items.length)];

    randomItemArray.push(randomItem);
  }
};

/* ----- End Item Generator ----- */

function checkAnswer(input) {
  if (input[0] === writingAudio.randomWord) {
    if (canvas.classList.contains("border-error")) {
      canvas.classList.remove("border-error");
    }
    if (canvas.classList.contains("border-correct")) {
      canvas.classList.remove("border-correct");
    }
    canvas.classList.add("border-correct");
    // setTimeout(() => {
    writingAudio.writingSfx.correct.play();
    // }, 300);
    setTimeout(newWord, 1500);
  } else {
    // setTimeout(() => {
    writingAudio.writingSfx.incorrect.play();
    // }, 30);
    canvas.classList.add("border-error");
    setTimeout(() => {
      resetCanvasAndBorder();
      setTimeout(writingAudio.repeat, 700);
    }, 2000);
  }
}
const newWord = () => {
  resetCanvasAndBorder();
  setTimeout(writingAudio.speak, 300);
};
const resetCanvas = () => {
  canvasController.erase();
};
const resetCanvasAndBorder = () => {
  if (canvas.classList.contains("border-error")) {
    canvas.classList.remove("border-error");
    canvasController.erase();
  }
  if (canvas.classList.contains("border-correct")) {
    canvas.classList.remove("border-correct");
    canvasController.erase();
  }
};

export { writingApp, randomItemArray };
