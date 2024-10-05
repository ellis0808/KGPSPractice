import {
  menuContainer,
  mainContainer,
  navBar,
  stylesheet,
} from "../../utilities/variables.js";
import {
  cardTouchSfx,
  correctCardID,
  randomNumber,
  speak,
  getAudio,
  loadAudio,
} from "./audio.js";
import {
  alphabet,
  sightWords1,
  sightWords2,
  sightWords3,
} from "./card-data.js";
import { wobble, spinfade, newRoundCardFlip, particles } from "./fx.js";
import { score } from "../../utilities/score-object.js";
import {
  scoreDisplay,
  toggleScoreDisplayHide,
  updateNegativeCount,
  updatePositiveCount,
} from "../../utilities/update-score.js";
import { displayMainPage, startMainApp } from "../general/start-main-app.js";
import {
  removeMenuPage,
  restoreMainMenu,
} from "../../utilities/main-menu-display-toggle.js";
import { feedbackAudioObject } from "../../utilities/feedback-object.js";
import { timer, toggleTimerHide } from "../../utilities/timer-object.js";
import { sessionCheck, sessionData } from "../../login/session-check.js";
import { user } from "../../utilities/user-object.js";
import { setStyle } from "./set-style.js";

let style;
let activityId;

// This function sets the activity id. The activity id is used in recording the score obtained in a given activity. (Separate scores are kept for each activity; the number the user sees score is the total of all activity scores combined.)
export function setActivityId(style) {
  if (style === 0) {
    activityId = 1;
    return activityId;
  } else if (style === 1) {
    activityId = 2;
    return activityId;
  } else if (style === 2) {
    activityId = 4;
    return activityId;
  } else if (style === 3) {
    activityId = 5;
    return activityId;
  } else if (style === 4) {
    activityId = 6;
    return activityId;
  } else if (style === 5) {
    activityId = 7;
    return activityId;
  } else if (style === 6) {
    activityId = 8;
    return activityId;
  } else if (style === 7) {
    activityId = 9;
    return activityId;
  }
}

/* SCORING */
const correctAnswerPoints = 2;
const incorrectAnswerPoints = 1;

function cardTouchApp(set) {
  sessionCheck();
  setTimeout(() => {
    resetTimer();
    mainContainer.appendChild(appContainer);
    appContainer.appendChild(btnContainer1);
    appContainer.appendChild(btnContainer2);
    appContainer.appendChild(btnContainer3);
    appContainer.appendChild(btnContainer4);
  }, 0);

  stylesheet.setAttribute(
    "href",
    "/KGPSEnglishPractice-test/resources/css/card-touch.css"
  );
  removeMenuPage();

  setTimeout(displayStartBtn, 200);

  score.resetScore();
  scoreDisplay.innerText = score.currentScore;
  appContainer.classList.remove("hide");
  appContainer.classList.remove("hide");
  if (!scoreDisplay.classList.contains("hide2")) {
    toggleScoreDisplayHide();
  }
  if (!timer.classList.contains("hide2")) {
    toggleTimerHide();
  }
  setTimeout(setUser, 2000);

  setStyle(set);
}
function setUser() {
  user.gradeLevel = sessionData.gradeLevel;
  user.firstName = sessionData.firstName;
  user.lastName = sessionData.lastName;
  user.access = sessionData.access;
  user.id = sessionData.userId;
}

const appContainer = document.createElement("div");
appContainer.classList.add("container", "card-touch-app");

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
appContainer.appendChild(homeBtnContainer);
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
if (style === 2 || style === 3 || style === 4) {
  grid.classList.add("sight-word-grid");
}
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
repeatBtn.addEventListener("click", repeat);
repeatBtn.textContent = "Repeat";
toggleRepeatBtnHide();
// toggleScoreDisplayHide();
scoreDisplay.textContent = `${score.currentScore}`;

const tryAgainBtn = document.createElement("div");
tryAgainBtn.classList.add("try-again-btn");
tryAgainBtn.innerText = "One More Time";
tryAgainBtn.addEventListener("click", startSession);
const finishBtn = document.createElement("div");
finishBtn.classList.add("finish-btn");
finishBtn.addEventListener("click", endApp);
finishBtn.innerText = "Finish";

let isPaused = false;
let appStarted = false;
let isSessionFinished = false;
let cardText = [];
let newCardText;
let countDown;
// TIMER
let time;
let roundTime;
if (style === 2) {
  roundTime = 30;
  timer.innerText = "0:30";
} else {
  roundTime = 60;
  timer.innerText = "1:00";
}
function startTimer() {
  time = roundTime;
  setTimeout(displayTimer, 500);
}
function displayTimer() {
  countDown = setInterval(() => {
    if (!isPaused) {
      --time;
      if (time < 10) {
        timer.textContent = `0:0${time}`;
      } else {
        timer.textContent = `0:${time}`;
      }
      if (time < 0) {
        isSessionFinished = true;
        timer.textContent = "0:00";
        clearInterval(countDown);
        disableTouch();
        timer.classList.add("wobble");
        timer.classList.remove("wobble");
        timer.classList.add("wobble");
        timer.classList.remove("wobble");
        timer.classList.add("wobble");
        roundOver();
      }
    }
  }, 1000);
  return countDown;
}
function resetTimer() {
  timer.innerText = "1:00";
  timer.classList.remove("wobble");
  time = roundTime;
  clearInterval(countDown);
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
  score.resetScore();
}

// Start Round
function startSession() {
  cardTouchSfx.startApp.play();
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
  setTimeout(resetTimer, 750);
  setTimeout(startNewSession, 1000);
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
  if (scoreDisplay.classList.contains("hide2")) {
    toggleScoreDisplayHide();
  }
  if (timer.classList.contains("hide2")) {
    toggleTimerHide();
  }
  isSessionFinished = false;
  appContainer.appendChild(grid);
  score.resetScore();
  scoreDisplay.innerText = score.currentScore;
  removeBlur();
  homeBtnContainer.classList.remove("no-touch");
  createBoard();
  setTimeout(() => {
    enableTouch();
    startTimer();
    tryAgainBtn.classList.remove("no-touch");
    finishBtn.classList.remove("no-touch");
  }, 500);
  btnContainer1.appendChild(timer);
  btnContainer1.appendChild(scoreDisplay);
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
  updateUserTotalScore();
  getCumulativeUserScore();
  const btnContainer5 = document.createElement("div");
  btnContainer5.classList.add("btn-container5");
  const endMessagesContainer = document.createElement("div");
  endMessagesContainer.classList.add(
    "end-messages-container",
    "card-touch-app"
  );
  appContainer.appendChild(btnContainer5);
  btnContainer5.appendChild(endMessagesContainer);
  const finalScoreAssessment = document.createElement("div");
  finalScoreAssessment.classList.add("final-score-assessment");
  const finalScoreAlertScore = document.createElement("div");
  finalScoreAlertScore.classList.add("final-score-alert-score");
  const endMessagesContainerInnerBorder = document.createElement("div");
  endMessagesContainerInnerBorder.classList.add("border");

  switch (true) {
    case score.currentScore < 5:
      finalScoreAssessment.innerText = "Better Luck\r\nNext Time!";
      break;
    case score.currentScore > 31:
      finalScoreAssessment.innerText = "Outstanding!";
      break;
    case score.currentScore > 27:
      finalScoreAssessment.innerText = "Amazing!";
      break;
    case score.currentScore > 23:
      finalScoreAssessment.innerText = "Excellent!";
      break;
    case score.currentScore > 18:
      finalScoreAssessment.innerText = "Great Job!";

      break;
    case score.currentScore > 13:
      finalScoreAssessment.innerText = "Good Job!";
      break;
  }
  finalScoreAlertScore.innerText = `${score.currentScore}`;
  endMessagesContainer.appendChild(finalScoreAssessment);
  endMessagesContainer.appendChild(finalScoreAlertScore);
  endMessagesContainer.appendChild(endMessagesContainerInnerBorder);
  endMessagesContainer.appendChild(tryAgainBtn);
  endMessagesContainer.appendChild(finishBtn);
  score.updateUserScore();
  setTimeout(() => {
    switch (true) {
      case score.currentScore < 5:
        feedbackAudioObject.negativeFeedback.betterLuckNextTime.sound.play();
        break;
      case score.currentScore > 31:
        feedbackAudioObject.positiveFeedback.outstanding.sound.play();
        break;
      case score.currentScore > 27:
        feedbackAudioObject.positiveFeedback.amazing.sound.play();
        break;
      case score.currentScore > 23:
        feedbackAudioObject.positiveFeedback.excellent.sound.play();
        break;
      case score.currentScore > 18:
        feedbackAudioObject.positiveFeedback.greatJob.sound.play();
        break;
      case score.currentScore > 13:
        feedbackAudioObject.positiveFeedback.goodJob.sound.play();
        break;
    }
  }, 300);
}

function toggleRepeatBtnHide() {
  repeatBtn.classList.toggle("hide2");
}
function repeat() {
  const synth = window.speechSynthesis;
  const randomItem = cardText[randomNumber];

  setTimeout(function () {
    if (!isPaused) {
      // if (style === 0 || style === 1) {
      audioObject[randomItem].sound.play();
      // } else if (style === 2 || style === 3 || style === 4) {
      // sightWordsAudioObject[randomItem].sound.play();
      // }
    }
  }, 30);
}

// BOARD GENERATION
function createBoard() {
  cardText = [];
  if (!startBtn.classList.contains("hide")) {
    startBtn.classList.toggle("hide");
  }
  if (grid.classList.contains("hide")) {
    grid.classList.toggle("hide");
  }

  let lettersArray = [];
  let sightWordArray = [];
  function cardGenerator() {
    if (style === 0 || style === 1) {
      for (let i = 0; lettersArray.length < 9; ++i) {
        let letter = `${alphabet[Math.floor(Math.random() * alphabet.length)]}`;
        if (!lettersArray.includes(letter)) {
          lettersArray.push(letter);
        }
      }
    } else if (style === 2 || style === 3 || style === 4) {
      grid.classList.add("sight-word-grid");
      let sightWord;
      if (style === 2) {
        grid.classList.add("sight-word-grid-4x4");
        sightWords1.forEach((item) => {
          sightWordArray.push(item);
        });
      } else if (style === 3 || style === 4) {
        grid.classList.remove("sight-word-grid-4x4");
        for (let i = 0; sightWordArray.length < 6; ++i) {
          if (style === 3) {
            sightWord = `${
              sightWords2[Math.floor(Math.random() * sightWords2.length)]
            }`;
          } else if (style === 4) {
            sightWord = `${
              sightWords3[Math.floor(Math.random() * sightWords3.length)]
            }`;
          }
          if (!sightWordArray.includes(sightWord)) {
            sightWordArray.push(sightWord);
          }
        }
      }
    }
  }
  if (!isSessionFinished) {
    if (!isPaused) {
      cardGenerator();
      let i = 0;
      if (style === 0 || style === 1) {
        lettersArray.forEach(() => {
          const card = document.createElement("div");
          card.setAttribute("contentId", lettersArray[i]);
          card.setAttribute("data-id", i);
          if (style === 0) {
            newCardText = card.getAttribute("contentId").toUpperCase();
          } else {
            newCardText = card.getAttribute("contentId");
          }
          card.textContent = newCardText;
          card.classList.add("card");
          grid.append(card);
          card.addEventListener("click", touchCard);
          if (style === 0) {
            cardText.push(newCardText.toLowerCase());
          } else {
            cardText.push(newCardText);
          }
          ++i;
        });
      } else if (style === 2 || style === 3 || style === 4) {
        sightWordArray.forEach(() => {
          const card = document.createElement("div");
          card.setAttribute("contentID", sightWordArray[i]);
          card.setAttribute("data-id", i);
          newCardText = card.getAttribute("contentID");
          card.textContent = newCardText;
          card.classList.add("card", "sight-word");
          grid.append(card);
          card.addEventListener("click", touchCard);
          cardText.push(newCardText);
          ++i;
        });
      }
      btnContainer3.appendChild(repeatBtn);
      btnContainer1.appendChild(scoreDisplay);
      if (!isSessionFinished) {
        if (!isPaused) {
          speak();
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
  currentCardID = this.getAttribute("contentId");
  if (currentCardID === cardText[correctCardID]) {
    correctCard(e);
    updatePositiveCount(correctAnswerPoints);
    let delay = 300;
    setTimeout(() => {
      switch (score.currentScore) {
        case 6:
          feedbackAudioObject.positiveFeedback.goodJob.sound.play();
          break;
        case 14:
          feedbackAudioObject.positiveFeedback.greatJob.sound.play();
          break;
        case 20:
          feedbackAudioObject.positiveFeedback.greatJob.sound.play();
          break;
        case 26:
          feedbackAudioObject.positiveFeedback.excellent.sound.play();
          break;
        case 30:
          feedbackAudioObject.positiveFeedback.amazing.sound.play();
          break;
        case 32:
          feedbackAudioObject.positiveFeedback.outstanding.sound.play();
          break;
      }
    }, 650);

    disableTouch();
  } else {
    wobble(e);
    updateNegativeCount(incorrectAnswerPoints);
  }
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

async function updateUserTotalScore() {
  //  For student users; teachers will differ on user type, etc

  const newScore = {
    activity_id: activityId,
    user_id: user.id,
    user_type: user.access,
    correct_answer_count: 0,
    incorrect_answer_count: 0,
    time_to_correct_answer_duration_in_seconds: 0,
    answer_attempts: 0,
    activity_score: score.currentScore,
  };
  try {
    const response = await fetch(
      "/KGPSEnglishPractice-test/api/add_user_activity_record.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newScore),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Network response was not okay");
    }
  } catch (error) {
    console.error("Error adding record:", error);
  }
}
function endSession() {
  style = 0;
  unpause2();
  homeBtnReturnToNormal();
  resetNavigationBtns();
  appContainer.classList.add("hide");
  homeBtnContainer.classList.add("hide");
  document.querySelectorAll(".box, .card-touch-app").forEach((item) => {
    item.remove();
  });
  if (document.querySelector(".end-messages-container")) {
    document.querySelector(".end-messages-container").remove();
  }
  if (document.querySelector(".go-home-container")) {
    document.querySelector(".go-home-container").remove();
  }
  appStarted = false;
  removeBlur();
  grid.remove();
  return style;
}

function endApp() {
  endSession();
  setTimeout(() => {
    document.querySelectorAll(".card-touch-app").forEach((item) => {
      item.remove();
    });
    setTimeout(() => {
      stylesheet.setAttribute(
        "href",
        "/KGPSEnglishPractice-test/resources/css/styles.css"
      );
      displayMainPage();
      setTimeout(restoreMainMenu, 100);
    }, 500);
  }, 500);
  scoreDisplay.innerText = score.currentScore;
  resetTimer();
}
// pauses app
function pause() {
  isPaused = true;
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
    if (grid.hasChildNodes()) {
      setTimeout(repeat, 200);
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

export {
  cardTouchApp,
  getAudio,
  startCardTouchApp,
  cardText,
  audioObject,
  style,
  sightWordsAudioObject,
};
