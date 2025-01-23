import {
  primaryMenuContainer,
  mainContainer,
  navBar,
  stylesheet,
} from "../../utilities/variables.js";
import { menuItems } from "../general/start-main-app.js";
import { cardTouchAudio } from "./card-touch-audio.js";
import {
  alphabet,
  sightWords1,
  sightWords2,
  sightWords3,
  letterSoundsASMFLetters,
  letterSoundsITRPLetters,
  letterSoundsASMFWords,
  tbVocabulary,
} from "./card-data.js";
import { wobble, spinfade, newRoundCardFlip, particles } from "./fx.js";
import { scoreFunction } from "../../utilities/score.js";
import {
  timer,
  timerFunction,
  toggleTimerHide,
} from "../../utilities/timer.js";
import { sessionCheck, sessionData } from "../../login/session-check.js";
import { user } from "../../utilities/user-object.js";
import {
  style,
  activityId,
  setStyle,
} from "./card-touch-set-style-and-activity-id.js";
import { audio } from "../../utilities/audio.js";
import { images } from "../../utilities/images.js";
import { pauseFunction } from "../../utilities/pause-functions.js";
import { BASE_PATH } from "../../utilities/get-base-path.js";
import { appContainer } from "../../utilities/app-container-class.js";

/* SCORING */

const correctAnswerPoints = 2;
const incorrectAnswerPoints = 1;
let stats;
const initializeStats = () => {
  stats = {
    userID: user.id,
    userAccess: user.access,
    activityType: "card touch",
    activityName: null,
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
  return stats;
};
stats = initializeStats();
const resetStats = () => {
  initializeStats();
};
const setActivityName = (set) => {
  return (stats.activityName = set);
};

function cardTouchApp(set) {
  sessionCheck();
  setActivityName(set);
  setStyle(set);
  setGridStyle(style);
  console.log(images.imageObject);

  setTimeout(() => {
    timerFunction.clearTimer();
    mainContainer.appendChild(container);
    container.appendChild(btnContainer1);
    container.appendChild(btnContainer2);
    container.appendChild(btnContainer3);
    container.appendChild(btnContainer4);
  }, 0);

  stylesheet.setAttribute("href", `${BASE_PATH}resources/css/card-touch.css`);
  menuItems.removeMenuPage();

  setTimeout(displayStartBtn, 200);
  timerFunction.setEndRoundFunction(roundOver);
  tryAgainBtn.addEventListener("pointerdown", startSession);
  finishBtn.addEventListener("pointerdown", endApp);
  scoreFunction.resetCurrentScore();
  scoreFunction.display.innerText = scoreFunction.currentScore;
  container.classList.remove("hide");

  setTimeout(setUser, 2000);
}
function setUser() {
  user.gradeLevel = sessionData.gradeLevel;
  user.firstName = sessionData.firstName;
  user.lastName = sessionData.lastName;
  user.access = sessionData.access;
  user.id = sessionData.userId;
  stats.userID = user.id;
  stats.userAccess = user.access;
}

const container = document.createElement("div");
container.classList.add("container", "card-touch-app");

/* Main App Container */
const homeBtnContainer = document.createElement("div");
homeBtnContainer.classList.add("home-btn-container", "hide");
const homeBtn = document.createElement("button");
homeBtn.classList.add("home-btn");
homeBtn.innerHTML = `<i class="fa-solid fa-house fa-1x"></i>`;
homeBtn.addEventListener("click", goHome);
const pauseBtn = document.createElement("div");
pauseBtn.classList.add("pause-btn");
pauseBtn.innerHTML = `<i class="fa-solid fa-pause fa-1x"></i>`;
pauseBtn.addEventListener("click", pause);
container.appendChild(homeBtnContainer);
const btnContainer4 = document.createElement("div");
btnContainer4.classList.add("btn-container4");
const reallyGoHomeContainer = document.createElement("div");
reallyGoHomeContainer.classList.add("go-home-container", "card-touch-app");
const reallyGoHomeMessageContainer = document.createElement("div");
reallyGoHomeMessageContainer.classList.add("go-home-message");
reallyGoHomeMessageContainer.textContent = "Go back to Menu?";
reallyGoHomeContainer.appendChild(reallyGoHomeMessageContainer);
const reallyGoHomeBtn = document.createElement("button");
reallyGoHomeBtn.classList.add("go-home-btn");
reallyGoHomeBtn.textContent = "Yes";
reallyGoHomeBtn.addEventListener("click", endApp);
const cancelGoHomeBtn = document.createElement("button");
cancelGoHomeBtn.classList.add("cancel-go-home-btn");
cancelGoHomeBtn.textContent = "Cancel";
cancelGoHomeBtn.addEventListener("click", returnToApp);

/* Common UI Elements */
const grid = document.createElement("div");
grid.classList.add("grid");
grid.setAttribute("id", "grid");

const btnContainer2 = document.createElement("div");
btnContainer2.classList.add("btn-container2");
const startBtn = document.createElement("button");
startBtn.setAttribute("id", "start-btn");
startBtn.classList.add("card-touch-app");
startBtn.addEventListener("click", startSession);
const exitBtn = document.createElement("div");
exitBtn.setAttribute("id", "exit-btn");
exitBtn.classList.add("card-touch-app", "hide");

exitBtn.addEventListener("click", endApp);
const btnContainer1 = document.createElement("div");
btnContainer1.classList.add("btn-container1", "hide");
btnContainer1.setAttribute("id", "btn-container1");
const btnContainer3 = document.createElement("div");
btnContainer3.classList.add("btn-container3", "hide");
btnContainer3.setAttribute("id", "btn-container3");
const repeatBtn = document.createElement("div");
repeatBtn.classList.add("repeat-btn");
repeatBtn.classList.add("card-touch-app");
repeatBtn.setAttribute("id", "repeat-btn");
repeatBtn.addEventListener("click", cardTouchAudio.repeat);
repeatBtn.textContent = "Repeat";
toggleRepeatBtnHide();
// toggleScoreDisplayHide();
scoreFunction.display.textContent = `${scoreFunction.currentScore}`;

const tryAgainBtn = document.createElement("div");
tryAgainBtn.classList.add("try-again-btn");
tryAgainBtn.innerText = "One More Time";
tryAgainBtn.addEventListener("click", startSession);
const finishBtn = document.createElement("div");
finishBtn.classList.add("finish-btn");
finishBtn.addEventListener("click", endApp);
finishBtn.innerText = "Finish";

let btnContainer5;
let isPaused = false;
let appStarted = false;
let isSessionFinished = false;
let cardText = [];
let newCardText;
let countDown;
// TIMER
let time;
let roundTime;
if (style === 3 || style === 6) {
  roundTime = 30;
} else {
  roundTime = 60;
}

function disableTouch() {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    card.classList.add("no-touch");
  });
  // repeatBtn.classList.add("no-touch");
}
function enableTouch() {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    card.classList.remove("no-touch");
  });
  // repeatBtn.classList.remove("no-touch");
}

const setGridStyle = (style) => {
  if (style === 3 || style === 4 || style === 5) {
    grid.classList.add("sight-word-grid");
  }
};

function displayStartBtn() {
  startBtn.textContent = "Start";
  exitBtn.innerHTML = `<i class="fa-solid fa-house fa-1x"></i>`;
  btnContainer2.appendChild(startBtn);
  btnContainer2.appendChild(exitBtn);
  if (startBtn.classList.contains("no-touch")) {
    startBtn.classList.remove("no-touch");
    startBtn.classList.remove("spinfade");
    startBtn.classList.remove("hide");
    exitBtn.classList.remove("no-touch");
    exitBtn.classList.remove("hide2");
  }
  exitBtn.classList.remove("hide");
  startBtn.addEventListener("click", startSession);
  scoreFunction.resetCurrentScore();
}

// Start Round
function startSession() {
  resetStats();
  audio.navigationSfx.startApp.play();
  removeEndMessagesContainer();
  startBtn.classList.add("no-touch");
  startBtn.classList.add("spinfade");
  startBtn.classList.remove("intro");
  exitBtn.classList.add("no-touch");
  exitBtn.classList.add("hide2");
  exitBtn.classList.remove("intro");
  clearBoardFast();
  setTimeout(() => {
    appStarted = true;
  }, 1);
  setTimeout(timerFunction.clearTimer, 750);
  setTimeout(startNewSession, 2000);
}

function removeEndMessagesContainer() {
  if (document.querySelector(".end-messages-container")) {
    tryAgainBtn.classList.add("no-touch");
    finishBtn.classList.add("no-touch");
    document.querySelector(".end-messages-container").remove();
  }
}

function removeBlur() {
  if (document.querySelector(".blur")) {
    let blurredItems = document.querySelectorAll(".blur").forEach((item) => {
      item.classList.remove("blur");
    });
  }
  if (document.querySelector(".strong-blur")) {
    let stronglyBlurredItems = document
      .querySelectorAll(".strong-blur")
      .forEach((item) => {
        item.classList.remove("strong-blur");
      });
  }
}
function startNewSession() {
  timerFunction.setTimer(roundTime);
  scoreFunction.show();
  timerFunction.show();

  isSessionFinished = false;
  container.appendChild(grid);
  scoreFunction.resetCurrentScore();
  scoreFunction.display.innerText = scoreFunction.currentScore;
  removeBlur();
  homeBtnContainer.classList.remove("no-touch");
  createBoard();
  timerFunction.startTimer(roundTime);
  setTimeout(() => {
    enableTouch();
    tryAgainBtn.classList.remove("no-touch");
    finishBtn.classList.remove("no-touch");
  }, 500);
  btnContainer1.appendChild(timerFunction.timer);
  btnContainer1.appendChild(scoreFunction.display);
  homeBtnContainer.appendChild(homeBtn);
  homeBtnContainer.appendChild(pauseBtn);
  btnContainer1.classList.remove("hide");
  btnContainer3.classList.remove("hide");
  homeBtnContainer.classList.remove("hide");
}
function startNewRound() {
  // reset functions
  setTimeout(createBoard, 200);
}

function roundOver() {
  if (!btnContainer5) {
    btnContainer5 = document.createElement("div");
    btnContainer5.classList.add("btn-container5");
  }
  if (btnContainer5.classList.contains("hide")) {
    btnContainer5.classList.remove("hide");
  }
  // endRoundScreen.displayContainer();
  // btnContainer5.appendChild(endRoundScreen.endMessagesContainer);
  // container.appendChild(btnContainer5);
  displayEndMessagesContainer();
  setTimeout(disableTouch, 500);
  setTimeout(disableTouch, 1000);
  grid.classList.add("blur");
  btnContainer1.classList.add("blur");
  homeBtnContainer.classList.add("blur");
  homeBtnContainer.classList.add("no-touch");
}

// Clear away all cards
function clearBoard() {
  setTimeout(newRoundCardFlip, 1000);

  // remove all cards from grid, then generate new cards
  setTimeout(function (e) {
    grid.classList.toggle("hide");
    repeatBtn.classList.add("hide2");
  }, 1500);
  setTimeout(function (e) {
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
    // reset text to be displayed on cards
    cardText = [];
  }, 2000);
  newCardText;
}

function clearBoardFast() {
  // remove all cards from grid, then generate new cards
  setTimeout(function (e) {
    grid.classList.toggle("hide");
    repeatBtn.classList.add("hide2");
  }, 200);
  setTimeout(function (e) {
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
    // reset text to be displayed on cards
    cardText = [];
  }, 500);
  newCardText;
}

let cumulativeUserScore;
async function getCumulativeUserScore() {
  cumulativeUserScore = await user.getCumulativeScore(user.id);
  return cumulativeUserScore;
}

function displayEndMessagesContainer() {
  sendStats(stats);
  getCumulativeUserScore();

  const btnContainer5 = document.createElement("div");
  btnContainer5.classList.add("btn-container5");
  const endMessagesContainer = document.createElement("div");
  endMessagesContainer.classList.add(
    "end-messages-container",
    "card-touch-app"
  );
  container.appendChild(btnContainer5);
  btnContainer5.appendChild(endMessagesContainer);
  const finalScoreAssessment = document.createElement("div");
  finalScoreAssessment.classList.add("final-score-assessment");
  const finalScoreAlertScore = document.createElement("div");
  finalScoreAlertScore.classList.add("final-score-alert-score");
  const endMessagesContainerInnerBorder = document.createElement("div");
  endMessagesContainerInnerBorder.classList.add("border");

  switch (true) {
    case scoreFunction.currentScore < 5:
      finalScoreAssessment.innerText = "Better Luck\r\nNext Time!";
      break;
    case scoreFunction.currentScore > 31:
      finalScoreAssessment.innerText = "Outstanding!";
      break;
    case scoreFunction.currentScore > 27:
      finalScoreAssessment.innerText = "Amazing!";
      break;
    case scoreFunction.currentScore > 23:
      finalScoreAssessment.innerText = "Excellent!";
      break;
    case scoreFunction.currentScore > 18:
      finalScoreAssessment.innerText = "Great Job!";

      break;
    case scoreFunction.currentScore > 5:
      finalScoreAssessment.innerText = "Good Job!";
      break;
  }
  finalScoreAlertScore.innerText = `${scoreFunction.currentScore}`;
  endMessagesContainer.appendChild(finalScoreAssessment);
  endMessagesContainer.appendChild(finalScoreAlertScore);
  endMessagesContainer.appendChild(endMessagesContainerInnerBorder);
  endMessagesContainer.appendChild(tryAgainBtn);
  endMessagesContainer.appendChild(finishBtn);
  scoreFunction.updateUserScore();
  setTimeout(() => {
    switch (true) {
      case scoreFunction.currentScore <= 8:
        audio.feedbackAudioObject.negativeFeedback.betterLuckNextTime.sound.play();
        break;
      case scoreFunction.currentScore > 31:
        audio.feedbackAudioObject.positiveFeedback.outstanding.sound.play();
        break;
      case scoreFunction.currentScore > 27:
        audio.feedbackAudioObject.positiveFeedback.amazing.sound.play();
        break;
      case scoreFunction.currentScore > 23:
        audio.feedbackAudioObject.positiveFeedback.excellent.sound.play();
        break;
      case scoreFunction.currentScore > 18:
        audio.feedbackAudioObject.positiveFeedback.greatJob.sound.play();
        break;
      case scoreFunction.currentScore > 8:
        audio.feedbackAudioObject.positiveFeedback.goodJob.sound.play();
        break;
    }
  }, 300);
}

function toggleRepeatBtnHide() {
  repeatBtn.classList.toggle("hide2");
}

// BOARD GENERATION
function createBoard() {
  cardText = [];
  if (btnContainer5) {
    if (!btnContainer5.classList.contains("hide")) {
      btnContainer5.classList.add("hide");
    }
  }
  if (!startBtn.classList.contains("hide")) {
    startBtn.classList.toggle("hide");
  }
  if (grid.classList.contains("hide")) {
    grid.classList.toggle("hide");
  }

  let targetItemArray = [];
  function cardGenerator() {
    console.log("card generator started...");

    if (style === 1 || style === 2) {
      for (let i = 0; targetItemArray.length < 9; ++i) {
        let letter = `${alphabet[Math.floor(Math.random() * alphabet.length)]}`;
        if (!targetItemArray.includes(letter)) {
          targetItemArray.push(letter);
        }
      }
    } else if (style === 3 || style === 4 || style === 5) {
      grid.classList.add("word-grid");
      let sightWord;
      if (style === 3) {
        grid.classList.add("word-grid-4x4");
        sightWords1.forEach((item) => {
          targetItemArray.push(item);
        });
      } else if (style === 4 || style === 5) {
        grid.classList.remove("word-grid-4x4");
        for (let i = 0; targetItemArray.length < 6; ++i) {
          if (style === 4) {
            sightWord = `${
              sightWords2[Math.floor(Math.random() * sightWords2.length)]
            }`;
          } else if (style === 5) {
            sightWord = `${
              sightWords3[Math.floor(Math.random() * sightWords3.length)]
            }`;
          }
          if (!targetItemArray.includes(sightWord)) {
            targetItemArray.push(sightWord);
          }
        }
      }
    } else if (style === 6) {
      if (style === 6) {
        grid.classList.add("word-grid-4x4");
        letterSoundsASMFLetters.forEach((item) => {
          targetItemArray.push(item);
        });
      }
    } else if (style === 7) {
      let letterSoundWord;
      grid.classList.add("word-grid");
      for (let i = 0; targetItemArray.length < 6; ++i) {
        if (style === 7) {
          const randomItem =
            letterSoundsASMFWords[
              Math.floor(Math.random() * letterSoundsASMFWords.length)
            ];

          if (Array.isArray(randomItem)) {
            letterSoundWord =
              randomItem[Math.floor(Math.random() * randomItem.length)];
          } else {
            letterSoundWord = randomItem;
          }
        }

        if (!targetItemArray.includes(letterSoundWord)) {
          targetItemArray.push(letterSoundWord);
        }
      }
    } else if (style === 8) {
      console.log("generating words...");

      let vocabularyWord;
      grid.classList.add("vocabulary-grid-4x4");
      for (let i = 0; targetItemArray.length < 4; ++i) {
        vocabularyWord =
          tbVocabulary.unit1[
            Math.floor(Math.random() * tbVocabulary.unit1.length)
          ];
        if (!targetItemArray.includes(vocabularyWord)) {
          targetItemArray.push(vocabularyWord);
        }
      }
    }
  }
  if (!isSessionFinished) {
    if (!isPaused) {
      cardGenerator();
      let i = 0;
      if (style === 1 || style === 2) {
        targetItemArray.forEach(() => {
          const card = document.createElement("div");
          card.setAttribute("contentId", targetItemArray[i]);
          card.setAttribute("data-id", i);
          if (style === 1) {
            newCardText = card.getAttribute("contentId").toUpperCase();
          } else {
            newCardText = card.getAttribute("contentId");
          }
          card.textContent = newCardText;
          card.classList.add("card", "letter");
          grid.append(card);
          card.addEventListener("pointerdown", touchCard);
          if (style === 1) {
            cardText.push(newCardText.toLowerCase());
          } else {
            cardText.push(newCardText);
          }
          ++i;
        });
      } else if (style === 3 || style === 4 || style === 5) {
        targetItemArray.forEach(() => {
          const card = document.createElement("div");
          card.setAttribute("contentID", targetItemArray[i]);
          card.setAttribute("data-id", i);
          newCardText = card.getAttribute("contentID");
          card.textContent = newCardText;
          card.classList.add("card", "sight-word");
          grid.append(card);
          card.addEventListener("pointerdown", touchCard);
          cardText.push(newCardText);
          ++i;
        });
      } else if (style === 6 || style === 7) {
        targetItemArray.forEach((item) => {
          const card = document.createElement("div");
          card.setAttribute("contentID", item);
          card.setAttribute("data-id", i);
          newCardText = card.getAttribute("contentID");
          card.textContent = newCardText;
          card.classList.add("card", "sight-word");
          grid.append(card);
          card.addEventListener("pointerdown", touchCard);
          cardText.push(newCardText);
          ++i;
        });
      } else if (style === 8) {
        console.log("logic for style 8...");
        console.log(images.imageObject);

        targetItemArray.forEach((item) => {
          console.log(item);
          let link;
          const card = document.createElement("img");
          card.setAttribute("contentID", item);
          newCardText = card.getAttribute("contentID");
          images.imageObject.forEach((image) => {
            if (image.content === item) {
              link = image.link;
            }
          });

          card.src = link;
          card.classList.add("card", "vocabulary-image");
          grid.append(card);
          card.addEventListener("pointerdown", touchCard);
          cardText.push(newCardText);
          console.log(card);
        });
        console.log(cardText);
      }
      btnContainer3.appendChild(repeatBtn);
      btnContainer1.appendChild(scoreFunction.display);
      if (!isSessionFinished) {
        if (!isPaused) {
          ++stats.questionCount;
          cardTouchAudio.speak();
        }
      }
      setTimeout(toggleRepeatBtnHide, 1500);
    }
  }
}

// TOUCH FUNCTIONALITY
let currentCardID;

// functions
function touchCard(e) {
  ++stats.answerAttempts;
  currentCardID = this.getAttribute("contentId");
  if (currentCardID === cardText[cardTouchAudio.correctCardID]) {
    correctCard(e);
    scoreFunction.updatePositiveCount(correctAnswerPoints);
    ++stats.correctAnswerCount;
    if (currentCardID.length === 1) {
      stats.questionsShort.push(cardText[cardTouchAudio.correctCardID]);
      stats.correctAnswersShort.push(currentCardID);
    } else {
      stats.questionsMedium.push(cardText[cardTouchAudio.correctCardID]);
      stats.correctAnswersMedium.push(currentCardID);
    }
    let delay = 300;
    setTimeout(() => {
      switch (scoreFunction.currentScore) {
        case 6:
          audio.feedbackAudioObject.positiveFeedback.goodJob.sound.play();
          break;
        case 14:
          audio.feedbackAudioObject.positiveFeedback.greatJob.sound.play();
          break;
        case 20:
          audio.feedbackAudioObject.positiveFeedback.greatJob.sound.play();
          break;
        case 26:
          audio.feedbackAudioObject.positiveFeedback.excellent.sound.play();
          break;
        case 30:
          audio.feedbackAudioObject.positiveFeedback.amazing.sound.play();
          break;
        case 32:
          audio.feedbackAudioObject.positiveFeedback.outstanding.sound.play();
          break;
      }
    }, 650);

    disableTouch();
  } else {
    wobble(e);
    ++stats.incorrectAnswerCount;
    if (currentCardID.length === 1) {
      stats.incorrectAnswersShort.push(currentCardID);
    } else {
      stats.incorrectAnswersMedium.push(currentCardID);
    }
    setTimeout(() => {
      cardTouchAudio.repeat();
    }, 200);
  }
  console.log(stats);
}

function correctCard(e) {
  spinfade(e);
  particles(e);
  clearBoard();
  setTimeout(createBoard, 2000);
  enableTouch();
}

function startCardTouchApp() {
  alphabetCardTouchApp();
}

document.addEventListener("keydown", (event) => {
  if (appStarted) {
    if (event.key === "Escape") {
      if (homeBtnIsGoHome) {
        goHome();
      } else {
        returnToApp();
      }
    }
  } else {
    return;
  }
});

const sendStats = () => {
  scoreFunction.updateUserTotalScore(stats);
};

function endSession() {
  unpause2();
  homeBtnReturnToNormal();
  resetNavigationBtns();
  container.classList.add("hide");
  homeBtnContainer.classList.add("hide");
  document.querySelectorAll(".box, .card-touch-app").forEach((item) => {
    item.remove();
  });
  removeEndMessagesContainer();
  if (document.querySelector(".end-messages-container")) {
    document.querySelector(".end-messages-container").remove();
  }
  if (document.querySelector(".go-home-container")) {
    document.querySelector(".go-home-container").remove();
  }
  appStarted = false;
  removeBlur();
  grid.remove();
  resetStats();
  return style;
}

function endApp() {
  endSession();
  setTimeout(() => {
    document.querySelectorAll(".card-touch-app").forEach((item) => {
      item.remove();
    });
    setTimeout(() => {
      stylesheet.setAttribute("href", `${BASE_PATH}resources/css/styles.css`);
      setTimeout(() => {
        menuItems.restoreMainMenu();
      }, 100);
    }, 500);
  }, 500);
  scoreFunction.display.innerText = scoreFunction.currentScore;
  scoreFunction.hide();
  timerFunction.clearTimer();
  timerFunction.hide();
  removeEndMessagesContainer();
}
// pauses app
function pause() {
  isPaused = true;
  pauseFunction.isPaused = true;
  disableTouch();
  pauseBtn.removeEventListener("click", pause);
  setTimeout(() => {
    btnContainer1.classList.add("strong-blur");
    btnContainer3.classList.add("strong-blur");
    grid.classList.add("strong-blur");
  }, 50);
  pauseBtn.addEventListener("click", unpause);
}
function unpause() {
  pauseBtn.removeEventListener("click", unpause);
  enableTouch();
  removeBlur();
  setTimeout(() => {
    isPaused = false;
    pauseFunction.isPaused = false;
    if (grid.hasChildNodes()) {
      setTimeout(cardTouchAudio.repeat, 200);
    }
    //displays a new board in case the app is paused after a correct answer, but before a new board is generated
    if (!grid.hasChildNodes()) {
      createBoard();
    }
  }, 500);
  pauseBtn.addEventListener("click", pause);
}
function unpause2() {
  pauseBtn.removeEventListener("click", unpause);
  enableTouch();
  removeBlur();
  setTimeout(() => {
    isPaused = false;
    pauseFunction.isPaused = false;
  }, 500);
  pauseBtn.addEventListener("click", pause);
}
let homeBtnIsGoHome = true;
let pauseBtnPauses = true;

function resetNavigationBtns() {
  homeBtnIsGoHome = true;
  pauseBtnPauses = true;
  homeBtn.removeEventListener("click", returnToApp);
  homeBtn.addEventListener("click", goHome);
  pauseBtn.removeEventListener("click", returnToApp);
  pauseBtn.addEventListener("click", pause);
  homeBtnReturnToNormal();
}
function goHome() {
  pause();
  homeBtnEnlarge();
  displayGoHomeConfirmation();
  if (homeBtnIsGoHome) {
    homeBtnIsGoHome = false;
    pauseBtnPauses = false;
    homeBtn.removeEventListener("click", goHome);
    homeBtn.addEventListener("click", returnToApp);
    pauseBtn.removeEventListener("click", unpause);
    pauseBtn.addEventListener("click", returnToApp);
  }
}
function homeBtnEnlarge() {
  homeBtn.classList.add("home-btn-enlarge");
}
function homeBtnReturnToNormal() {
  homeBtn.classList.remove("home-btn-enlarge");
}
function displayGoHomeConfirmation() {
  btnContainer4.appendChild(reallyGoHomeContainer);
  reallyGoHomeContainer.appendChild(reallyGoHomeBtn);
  reallyGoHomeContainer.appendChild(cancelGoHomeBtn);
}
function returnToApp() {
  btnContainer4.removeChild(reallyGoHomeContainer);
  homeBtnReturnToNormal();
  unpause();
  homeBtnIsGoHome = true;
  pauseBtnPauses = true;
  homeBtn.removeEventListener("click", returnToApp);
  homeBtn.addEventListener("click", goHome);
  pauseBtn.removeEventListener("click", returnToApp);
  pauseBtn.addEventListener("click", pause);
}

export { cardTouchApp, startCardTouchApp, cardText, isPaused };
