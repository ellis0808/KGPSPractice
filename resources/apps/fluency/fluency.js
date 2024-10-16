/* Imports */
import { mainContainer, stylesheet } from "../../utilities/variables.js";
import { score } from "../../utilities/score-object.js";
import {
  scoreDisplay,
  toggleScoreDisplayHide,
  updateNegativeCount,
  updatePositiveCount,
} from "../../utilities/update-score.js";
import { menuItems } from "../general/start-main-app.js";
import { displayMainPage } from "../general/start-main-app.js";
import { fluencyAudio } from "./fluency-audio.js";
import { feedbackAudioObject } from "../../utilities/feedback-object.js";
import {
  disableTouch,
  enableTouch,
} from "../../utilities/disable-enable-touch.js";
import { sessionCheck, sessionData } from "../../login/session-check.js";
import { user } from "../../utilities/user-object.js";
import { audio } from "../../utilities/audio.js";
import {
  style,
  activityId,
  setStyle,
} from "./fluency-set-style-and-activity-id.js";

let interval = 2500;
let run;
let isPaused = false;
let appStarted = false;
let currentArray = [];
let round = 0;
let maxRounds = 30;
let currentItem;
let randNumber;
let loop = 0;
let arrayItemCounter = 0;
let numberOfWrongAnswers = 0;
let numberOfRightAnswers = 0;
let maxWrongAnswers = 5;
let correctAnswerPoints;
let incorrectAnswerPoints;
let boxes = ".box";

/* 
*****************
GENERAL VARIABLES
*****************
*/

/* SCORING */
function determineCorrectAnswerPoints() {
  if (round >= 1 && round < 10) {
    correctAnswerPoints = 1;
  } else if (round > 9 && round < 13) {
    correctAnswerPoints = 2;
  } else if (round > 12 && round < 16) {
    correctAnswerPoints = 3;
  } else if (round > 15 && round < 20) {
    correctAnswerPoints = 4;
  } else if (round > 19 && round < 23) {
    correctAnswerPoints = 6;
  } else if (round > 22 && round < 27) {
    correctAnswerPoints = 8;
  } else if (round > 26 && round < 28) {
    correctAnswerPoints = 12;
  } else if (round > 27 && round < 29) {
    correctAnswerPoints = 15;
  } else if (round > 28 && round < 30) {
    correctAnswerPoints = 20;
  } else if (round === 30) {
    correctAnswerPoints = 25;
  }
}

/* Main App Container */
const appContainer = document.createElement("div");
appContainer.classList.add("container", "number-fluency-app");
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
reallyGoHomeContainer.classList.add("go-home-container", "number-fluency-app");
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

// toggleScoreDisplayHide();
// scoreDisplay.textContent = `${score.currentScore}`;
const roundDisplay = document.createElement("div");
roundDisplay.classList.add("round-display");
roundDisplay.textContent = `Round 1`;
const grid = document.createElement("div");
grid.classList.add("grid");
const btnContainer1 = document.createElement("div");
btnContainer1.classList.add("btn-container1");
const btnContainer2 = document.createElement("div");
btnContainer2.classList.add("btn-container2");
const btnContainer3 = document.createElement("div");
btnContainer3.classList.add("btn-container3", "hide");
const startBtn = document.createElement("div");
startBtn.setAttribute("id", "start-btn");
const exitBtn = document.createElement("div");
exitBtn.setAttribute("id", "exit-btn");
exitBtn.classList.add("number-fluency-app", "hide");
exitBtn.addEventListener("click", endApp);
const tryAgainBtn = document.createElement("div");
tryAgainBtn.classList.add("try-again-btn");
tryAgainBtn.innerText = "One More Time";
tryAgainBtn.addEventListener("click", startNewSession);
const finishBtn = document.createElement("div");
finishBtn.classList.add("finish-btn");
finishBtn.addEventListener("click", endApp);
finishBtn.innerText = "Finish";

/* App Specific Display Elements */
const answerDisplay = document.createElement("div");
answerDisplay.classList.add("answer-display");

/* Variables */

const gridSize = 20;

/* 
*****************
Main App
*****************
*/
// async function getAudio(style) {
//   let category;
//   let grouping;
//   if (style === 1) {
//     category = "numbers";
//     grouping = 1;
//   }
//   if (style === 2) {
//     category = "numbers";
//     grouping = 2;
//   }
//   if (style === 3) {
//     category = "numbers";
//     grouping = 3;
//   }
//   if (style === 4) {
//     category = "numbers";
//     grouping = 4;
//   }
//   if (style === 5) {
//     category = "numbers";
//     grouping = 5;
//   }
//   try {
//     const response = await fetch(
//       `/KGPSEnglishPractice-test/api/load_audio.php?id1=${category}&id2=${grouping}`
//     );
//     if (!response.ok) {
//       throw new Error("Network response was not okay");
//     }
//     const audioData = await response.json();
//   } catch (error) {
//     console.log("There was an error ", error);
//   }
// }
// function loadAudio(audioData) {
//   const audioObject = audioData.map((item) => {
//     return (audioObject[item.content] = {
//       content: item.content,
//       sound: new Howl({
//         src: [item.link],
//         volume: 0.5,
//       }),
//     });
//   });
// }

/* Starts Main App (exported to resources/js/general/app-launcher.js) */
function fluencyApp(set) {
  sessionCheck();
  setStyle(set);
  setTimeout(() => {
    mainContainer.appendChild(appContainer);
    appContainer.appendChild(btnContainer2);
    appContainer.appendChild(btnContainer4);
    appContainer.appendChild(grid);
    grid.classList.add("gridHide");
  }, 0);

  stylesheet.setAttribute(
    "href",
    "/KGPSEnglishPractice-test/resources/css/number-fluency.css"
  );
  menuItems.removeMenuPage();

  setTimeout(displayStartBtn, 200);

  score.resetScore();
  scoreDisplay.innerText = score.currentScore;
  appContainer.classList.remove("hide");

  if (!scoreDisplay.classList.contains("hide2")) {
    toggleScoreDisplayHide();
  }

  setTimeout(setUser, 2000);
}
function setUser() {
  user.gradeLevel = sessionData.gradeLevel;
  user.firstName = sessionData.firstName;
  user.lastName = sessionData.lastName;
  user.access = sessionData.access;
  user.id = sessionData.userId;
}

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

/* Removes Main App and Returns to Main Menu*/
function endApp() {
  endSession();
  setTimeout(() => {
    if (appContainer.contains(btnContainer1 || btnContainer3)) {
      appContainer.removeChild(btnContainer1);
      appContainer.removeChild(btnContainer3);
    }
    stylesheet.setAttribute(
      "href",
      "/KGPSEnglishPractice-test/resources/css/styles.css"
    );
    displayMainPage();
    setTimeout(menuItems.restoreMainMenu, 100);
  }, 500);
  scoreDisplay.innerText = score.currentScore;
}
// pauses app
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

function pause() {
  isPaused = true;
  disableTouch(boxes);
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
  enableTouch(boxes);
  removeBlur();
  setTimeout(() => {
    isPaused = false;
  }, 500);
  pauseBtn.addEventListener("click", pause);
}
function unpause2() {
  pauseBtn.removeEventListener("click", unpause);
  enableTouch(boxes);
  btnContainer1.classList.remove("strong-blur");
  btnContainer3.classList.remove("strong-blur");
  grid.classList.remove("strong-blur");
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
/* 
*****************
Sessions & Rounds
*****************
*/

function displayStartBtn() {
  btnContainer2.appendChild(startBtn);
  startBtn.textContent = "Start";
  exitBtn.innerHTML = `<i class="fa-solid fa-house fa-1x"></i>`;
  btnContainer2.appendChild(exitBtn);
  if (startBtn.classList.contains("no-touch")) {
    startBtn.classList.remove("no-touch");
    startBtn.classList.remove("spinfade");
    exitBtn.classList.remove("no-touch");
    exitBtn.classList.remove("hide2");
  }
  exitBtn.classList.remove("hide");
  startBtn.addEventListener("click", startSession);
  score.resetScore();
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

function endSession() {
  removeHearts();
  appContainer.classList.add("hide");
  homeBtnContainer.classList.add("hide");
  clearInterval(run);
  removeBlur();
  document.querySelectorAll(".box, .number-fluency-app").forEach((item) => {
    item.remove();
  });
  if (document.querySelector(".end-messages-container")) {
    document.querySelector(".end-messages-container").remove();
  }
  if (document.querySelector(".go-home-container")) {
    document.querySelector(".go-home-container").remove();
  }
  appStarted = false;
  resetPenalties();
  resetInterval();
  resetRoundNumberAndRoundDisplay();
  resetLoop();
  resetCorrectAnswerPoints();
  resetNavigationBtns();
  grid.remove();
}
function startSession() {
  fluencyAudio.numbersFluencySfx.startApp.play();
  startBtn.classList.add("no-touch");
  startBtn.classList.remove("intro");
  startBtn.classList.add("spinfade");
  exitBtn.classList.add("no-touch");
  exitBtn.classList.add("hide2");
  exitBtn.classList.remove("intro");
  setTimeout(startNewRound, 950);
  setTimeout(() => {
    appStarted = true;
  }, 1);
}
function startNewSession() {
  score.currentScore = 0;
  tryAgainBtn.classList.add("no-touch");
  finishBtn.classList.add("no-touch");
  resetRoundNumberAndRoundDisplay();
  setTimeout(() => {
    document.querySelector(".end-messages-container").remove();
    score.resetScore();
    scoreDisplay.innerText = score.currentScore;
    grid.classList.remove("blur");
    roundDisplay.classList.remove("blur");
    scoreDisplay.classList.remove("blur");
  }, 50);
  resetPenalties();
  resetInterval();
  resetRoundNumberAndRoundDisplay();
  resetLoop();
  resetCorrectAnswerPoints();
  setTimeout(newRound, 300);
  setTimeout(() => {
    tryAgainBtn.classList.remove("no-touch");
    finishBtn.classList.remove("no-touch");
  }, 4000);
}

function resetRoundNumberAndRoundDisplay() {
  round = 0;
  roundDisplay.textContent = "Round 1";
}
function newRound() {
  clearInterval(run);

  if (numberOfRightAnswers === 10) {
    feedbackAudioObject.positiveFeedback.greatJob.sound.play();
  } else if (numberOfRightAnswers > 7 && numberOfRightAnswers < 10) {
    feedbackAudioObject.positiveFeedback.goodJob.sound.play();
  } else if (round !== 0 && numberOfRightAnswers < 5) {
    sessionOver();
    return;
  }
  // disableTouch(boxes);
  setTimeout(() => {
    resetArrayItemCounter();
    resetLoop();
    ++round;
    determineInterval();
    determineCorrectAnswerPoints();
    setHeartsArrayForRoundOne();
    // if (!isPaused) {
    displayHeartsArray();
    if (round === 1) {
      fluencyAudio.numbersFluencySfx.restoreHeartSFX.play();
    }
    if (numberOfRightAnswers > 5) {
      restoreOneHeart();
    }
    numberOfRightAnswers = 0;
    if (round > maxRounds) {
      sessionOver();
      return;
    }
    // if (!isPaused) {
    displayRound(round);
    // }
    // }
    currentArray.length = 0;
    arrayGenerator();
    startInterval();
  }, 1000);
}

function startNewRound() {
  if (scoreDisplay.classList.contains("hide2")) {
    toggleScoreDisplayHide();
  }
  removeBlur();
  appContainer.appendChild(btnContainer1);
  btnContainer1.appendChild(scoreDisplay);
  btnContainer1.appendChild(roundDisplay);
  appContainer.appendChild(btnContainer3);
  btnContainer3.appendChild(answerDisplay);
  createGrid();
  disableTouch(boxes);
  setTimeout(newRound, 1000);
  if (isPaused) {
    unpause2();
  }

  setTimeout(() => {
    grid.classList.remove("gridHide");
    homeBtnContainer.appendChild(homeBtn);
    homeBtnContainer.appendChild(pauseBtn);
    homeBtnContainer.classList.remove("hide");
    btnContainer3.classList.remove("hide");
  }, 300);
}

function sessionOver() {
  disableTouch(boxes);
  displayEndMessagesContainer();
  grid.classList.add("blur");
  roundDisplay.classList.add("blur");
  scoreDisplay.classList.add("blur");
}
function gameOver() {
  if (heartsArray.length === 0) {
    setTimeout(() => {
      disableTouch(boxes);
    }, 300);
    clearInterval(run);
    setTimeout(() => {
      displayEndMessagesContainer();
    }, 500);
  }
}

function displayEndMessagesContainer() {
  score.updateUserScore();
  updateUserTotalScore();
  const btnContainer5 = document.createElement("div");
  btnContainer5.classList.add("btn-container5");
  const endMessagesContainer = document.createElement("div");
  endMessagesContainer.classList.add(
    "end-messages-container",
    "number-fluency-app"
  );
  appContainer.appendChild(btnContainer5);
  btnContainer5.appendChild(endMessagesContainer);
  const finalScoreAssessment = document.createElement("div");
  finalScoreAssessment.classList.add("final-score-assessment");
  const finalScoreAlertScore = document.createElement("div");
  finalScoreAlertScore.classList.add("final-score-alert-score");

  switch (true) {
    case score.currentScore < 10:
      finalScoreAssessment.innerText = "Better Luck\r\nNext Time!";
      break;
    case score.currentScore >= 150:
      finalScoreAssessment.innerText = "Outstanding!";
      break;
    case score.currentScore >= 90:
      finalScoreAssessment.innerText = "Amazing!";
      break;
    case score.currentScore >= 50:
      finalScoreAssessment.innerText = "Excellent!";
      break;
    case score.currentScore >= 30:
      finalScoreAssessment.innerText = "Great Job!";
      break;
    case score.currentScore >= 10:
      finalScoreAssessment.innerText = "Good Job!";
      break;
  }
  finalScoreAlertScore.innerText = `${score.currentScore}`;
  endMessagesContainer.appendChild(finalScoreAssessment);
  endMessagesContainer.appendChild(finalScoreAlertScore);
  endMessagesContainer.appendChild(tryAgainBtn);
  endMessagesContainer.appendChild(finishBtn);
  score.updateUserScore();
  setTimeout(() => {
    switch (true) {
      case score.currentScore < 10:
        feedbackAudioObject.negativeFeedback.betterLuckNextTime.sound.play();
        break;
      case score.currentScore >= 150:
        feedbackAudioObject.positiveFeedback.outstanding.sound.play();
        break;
      case score.currentScore >= 90:
        feedbackAudioObject.positiveFeedback.amazing.sound.play();
        break;
      case score.currentScore >= 50:
        feedbackAudioObject.positiveFeedback.excellent.sound.play();
        break;
      case score.currentScore >= 30:
        feedbackAudioObject.positiveFeedback.greatJob.sound.play();
        break;
      case score.currentScore >= 10:
        feedbackAudioObject.positiveFeedback.goodJob.sound.play();
        break;
    }
  }, 300);
}

/* 
*******
ROUND DISPLAY
*******
*/
let bannerDisplayed = false;
function displayRound(round) {
  // if (!isPaused) {
  setTimeout(() => {
    bannerDisplayed = true;
  }, 1);

  let bannerContainer = document.createElement("div");
  let roundBanner = document.createElement("div");
  bannerContainer.classList.add("banner-container", "number-fluency-app");
  roundBanner.classList.add("round-banner", "banner-in");
  setTimeout(() => {
    appContainer.appendChild(bannerContainer);
    bannerContainer.appendChild(roundBanner);
    fluencyAudio.numbersFluencySfx.newRound.play();
    roundBanner.textContent = `Round ${round}`;
    roundDisplay.textContent = `Round ${round}`;
  }, 1500);
  setTimeout(() => {
    roundBanner.classList.remove("banner-in");
    roundBanner.classList.add("banner-out");
  }, 3000);
  setTimeout(() => {
    bannerContainer.remove();
    roundBanner.remove();
    bannerDisplayed = false;
  }, 4000);
  // }
}

function roundEffect() {
  roundDisplay.classList.add("wobble-pulse");
  setTimeout(() => {
    roundDisplay.classList.remove("wobble-pulse");
  }, 500);
}

function userTouch(event) {
  let currentAnswer = event.target.getAttribute("item");
  checkAnswer(currentAnswer, event);
}

function checkAnswer(currentAnswer, event) {
  if (currentAnswer === currentItem) {
    fluencyAudio.numbersFluencySfx.correct.play();
    updatePositiveCount(correctAnswerPoints);
    ++numberOfRightAnswers;
    disableTouch(boxes);
  } else {
    fluencyAudio.numbersFluencySfx.incorrect.play();
    heartsArray.pop();
    displayHeartsArray();
    gameOver();
  }
}
function addWrongAnswerRed(event) {
  event.target.classList.add("red");
  event.target.classList.add("fast-wobble");
}
function removeWrongAnswerRed(event) {
  setTimeout(() => {
    event.target.classList.remove("red");
    event.target.classList.remove("fast-wobble");
  }, 200);
}

let wrongAnswerCountArray = [];
let maxNumberOfHearts = 5;
const heartsArray = [];

function displayHeartsArray() {
  answerDisplay.classList.remove("pulse");
  answerDisplay.innerHTML = `${heartsArray.join("")}`;
  answerDisplay.classList.add("pulse");
}
function setHeartsArrayForRoundOne() {
  if (round === 1) {
    heartsArray.length = 0;
    let i;
    for (i = 0; i < maxNumberOfHearts; ++i) {
      heartsArray.push(`<i class="fa-solid fa-heart fa-1x"></i>`);
    }
  }
}
function restoreOneHeart() {
  if (heartsArray.length < maxNumberOfHearts) {
    heartsArray.push(`<i class="fa-solid fa-heart fa-1x"></i>`);
    fluencyAudio.numbersFluencySfx.restoreHeartSFX.play();
    displayHeartsArray();
  }
}
function removeHearts() {
  if (heartsArray.length !== 0) {
    heartsArray.length = 0;
    displayHeartsArray();
  }
}

function startInterval() {
  if (!bannerDisplayed) {
    if (!isPaused) {
      run = setInterval(speakingInterval, interval); // start setInterval as "run"
    }
  }
  return run;
}
function determineInterval() {
  if (round === 1) {
    interval = interval;
  } else if (round > 1 && round < 6) {
    interval = interval * 0.9;
  } else if (round > 5 && round < 11) {
    interval = interval * 0.95;
  } else if (round > 10 && round < 16) {
    interval = interval * 0.97;
  } else if (round > 16 && round < 21) {
    interval = interval * 0.98;
  }
}
function arrayGenerator() {
  currentArray.length = 0;
  // if (round === 1) {
  currentArray.length = 0;
  for (let i = 0; i < 10; ++i) {
    if (style === 1) {
      randNumber = Math.floor(Math.random() * 20 + 1);
    } else if (style === 2) {
      randNumber = Math.floor(Math.random() * (40 - 20) + 21);
    } else if (style === 3) {
      randNumber = Math.floor(Math.random() * (60 - 40) + 41);
    } else if (style === 4) {
      randNumber = Math.floor(Math.random() * (80 - 60) + 61);
    } else if (style === 5) {
      randNumber = Math.floor(Math.random() * (100 - 80) + 81);
    }
    currentArray.push(randNumber);
  }
  return;
}
function speakingInterval() {
  if (!bannerDisplayed) {
    if (!isPaused) {
      getCurrentItem();
      if (!isPaused) {
        enableTouch(boxes);
        fluencyAudio.speak(currentItem);

        ++loop;

        //stop interval
        if (loop === currentArray.length) {
          clearInterval(run);
          setTimeout(newRound, 3000);
        }
      }
    }
  }
}

// Reset Functions
function resetLoop() {
  loop = 0;
  return loop;
}
function resetArrayItemCounter() {
  arrayItemCounter = 0;
  return arrayItemCounter;
}
function resetPenalties() {
  numberOfWrongAnswers = 0;
  return numberOfWrongAnswers;
}
function resetInterval() {
  interval = 2500;
  return interval;
}
function resetCorrectAnswerPoints() {
  correctAnswerPoints = 0;
  return correctAnswerPoints;
}

/* AUDIO */

function getCurrentItem() {
  currentItem = currentArray[arrayItemCounter].toString();
  ++arrayItemCounter;
  return currentItem;
}

/* GRID */

function createGrid() {
  for (let i = 0; i < gridSize; ++i) {
    const box = document.createElement("div");
    box.classList.add("box", "btn");
    box.setAttribute("id", `box${i}`);
    if (style === 1) {
      if (i < 10) {
        box.classList.add("item", "under11");
      } else {
        box.classList.add("item", "under21");
      }
      box.setAttribute("item", `${i + 1}`);
      box.textContent = `${i + 1}`;
    } else if (style === 2) {
      if (i < 10) {
        box.classList.add("item", "under31");
      } else {
        box.classList.add("item", "under41");
      }
      box.setAttribute("item", `${i + 21}`);
      box.textContent = `${i + 21}`;
    } else if (style === 3) {
      if (i < 10) {
        box.classList.add("item", "under51");
      } else {
        box.classList.add("item", "under61");
      }
      box.setAttribute("item", `${i + 41}`);
      box.textContent = `${i + 41}`;
    } else if (style === 4) {
      if (i < 10) {
        box.classList.add("item", "under71");
      } else {
        box.classList.add("item", "under81");
      }
      box.setAttribute("item", `${i + 61}`);
      box.textContent = `${i + 61}`;
    } else if (style === 5) {
      if (i < 10) {
        box.classList.add("item", "under91");
      } else {
        box.classList.add("item", "under101");
      }
      box.setAttribute("item", `${i + 81}`);
      box.textContent = `${i + 81}`;
    }
    box.addEventListener("click", userTouch);
    grid.appendChild(box);
  }
}

export { fluencyApp };
