import { score } from "../../utilities/score-object.js";
import {
  body,
  navBar,
  mainContainer,
  menuContainer,
  stylesheet,
  topContainer,
  parentsInfo,
} from "/KGPSEnglishPractice-test/resources/utilities/variables.js";
import { appLauncher } from "./app-launcher.js";
import { logout } from "/KGPSEnglishPractice-test/resources/utilities/logout.js";
import {
  sessionCheck,
  sessionData,
} from "/KGPSEnglishPractice-test/resources/login/session-check.js";
import { user } from "../../utilities/user-object.js";

/*
**********
Enable Audio
**********
*/

const mainMenuSfx = {
  select1: new Howl({
    src: ["/KGPSEPaudio/sfx/sfx-select-2.mp3"],
    volume: 0.8,
    onplayerror: function () {
      sound.once("unlock", function () {
        sound.play();
      });
    },
  }),
  select2: new Howl({
    src: ["/KGPSEPaudio/sfx/sfx-select-1.mp3"],
    volume: 0.5,
    onplayerror: function () {
      sound.once("unlock", function () {
        sound.play();
      });
    },
  }),
  back: new Howl({
    src: ["/KGPSEPaudio/sfx/sfx-select-1-reversed.mp3"],
    volume: 0.5,
    onplayerror: function () {
      sound.once("unlock", function () {
        sound.play();
      });
    },
  }),
};

/*
**********
Main Menu Items
**********
*/

const navLogo = document.querySelector(".nav-logo");
const navUserSpace = document.querySelector(".nav-user");
const navUserName = document.querySelector(".nav-user-name");
const navUserMenu = document.querySelector(".nav-user-menu");

// Alphabet Menu
const abcMenu = document.createElement("div");
abcMenu.setAttribute("id", "div1");
abcMenu.classList.add("div", "div-start-menu1", "main-menu-div");
abcMenu.innerText = "ABCs";
abcMenu.addEventListener("click", displayAbcMenu);

// Numbers Main Menu Button
const numbersMenu = document.createElement("div");
numbersMenu.setAttribute("id", "div2");
numbersMenu.classList.add("div", "div-start-menu2", "main-menu-div");
numbersMenu.innerText = "1,2,3";
numbersMenu.addEventListener("click", displayNumbersMenu);

// Sight Words Main Menu Button
const sightWordsMenu = document.createElement("div");
sightWordsMenu.setAttribute("id", "div3");
sightWordsMenu.classList.add("div", "div-start-menu4", "main-menu-div");
sightWordsMenu.addEventListener("click", displaySightWordsMenu);
sightWordsMenu.innerText = "Sight Words";

// Letter Sounds Main Menu Button
const letterSoundsMenu = document.createElement("div");
letterSoundsMenu.setAttribute("id", "div5");
letterSoundsMenu.classList.add("div", "div-start-menu5", "main-menu-div");
letterSoundsMenu.addEventListener("click", displayLetterSoundsMenu);
letterSoundsMenu.innerText = "Letter Sounds";
const div4 = document.createElement("div");

// Spelling Main Menu Button
const spellingMenu = document.createElement("div");
spellingMenu.setAttribute("id", "div5");
spellingMenu.classList.add("div", "div-start-menu5", "main-menu-div");
spellingMenu.addEventListener("click", displaySpellingMenu);
spellingMenu.innerText = "Spelling";

// div4.setAttribute("id", "div4");

// div4.classList.add("div", "div-start-menu4", "main-menu-div");
// div4.innerText = "4";

/* Top Page Menu Items Display Functions */

let isMainMenu = true;
function startMainApp() {
  sessionCheck();
  setTimeout(() => {
    stylesheet.setAttribute(
      "href",
      "/KGPSEnglishPractice-test/resources/css/styles.css"
    );
    setTopMenuVariables();
    setUser();
    getCumulativeUserScore();
    setTimeout(displayGreeting, 500);
    displayMainPage();
  }, 1000);
}

function setUser() {
  user.gradeLevel = sessionData.gradeLevel;
  user.firstName = sessionData.firstName;
  user.lastName = sessionData.lastName;
  user.access = sessionData.access;
  user.id = sessionData.userId;
}

function setTopMenuVariables() {
  menuContainer.appendChild(abcMenu);
  menuContainer.appendChild(numbersMenu);
  menuContainer.appendChild(sightWordsMenu);
  // menuContainer.appendChild(letterSoundsMenu);
  // menuContainer.appendChild(spellingMenu);
  // menuContainer.appendChild(div4);
}

const greetingDisplay = document.createElement("div");
greetingDisplay.classList.add("greeting-display");
const pointsDisplay = document.createElement("div");
pointsDisplay.classList.add("points-display");

let cumulativeUserScore;
async function getCumulativeUserScore() {
  cumulativeUserScore = await user.getCumulativeScore(user.id);
  return cumulativeUserScore;
}

function displayGreeting() {
  isMainMenu = true;
  setTimeout(() => {
    const greeting = `Hi, ${user.firstName}!`;
    const userScore = `You have ${user.cumulativeScore} pts`;
    topContainer.appendChild(greetingDisplay);
    topContainer.appendChild(pointsDisplay);
    greetingDisplay.textContent = greeting;
    pointsDisplay.textContent = userScore;
  }, 300);
}

function displayMainPage() {
  isMainMenu = true;
  returnToMainMenuToggle();
  const navBarDisplay = `${user.firstName} ${user.lastName.slice(0, 1)}.`;
  navLogo.innerText = `KGPS English Practice`;
  navUserName.innerText = navBarDisplay;
}
function hideParentsInfoBtn() {
  parentsInfo.classList.add("hidden");
}
function displayParentsInfoBtn() {
  parentsInfo.classList.remove("hidden");
}
if (document.querySelector(".logout")) {
  document.querySelector(".logout").addEventListener("click", logout);
}
/*  Return to Main Page  */

const returnToMainMenuBtn = document.createElement("button");
returnToMainMenuBtn.innerText = `<- Back`;
returnToMainMenuBtn.classList.add("returnToMainMenuBtn");
returnToMainMenuBtn.setAttribute("id", "returnToMainMenuBtn");
returnToMainMenuBtn.addEventListener("click", returnToMainMenu);

function returnToMainMenu() {
  mainMenuSfx.back.play();
  topContainer.innerText = "";
  displayParentsInfoBtn();
  displayGreeting();
  abcMenu.classList.remove("hidden");
  numbersMenu.classList.remove("hidden");
  sightWordsMenu.classList.remove("hidden");
  // letterSoundsMenu.classList.remove("hidden");
  // spellingMenu.classList.remove("hidden");
  // div4.classList.remove("hidden");
  alphabetCapitalsCardTouchAppMenuItem.remove();
  alphabetLowercaseCardTouchAppMenuItem.remove();
  alphabetMatchingAppMenuItem.remove();
  sightWords1AppMenuItem.remove();
  sightWords2AppMenuItem.remove();
  sightWords3AppMenuItem.remove();
  sightWords1WritingAppMenuItem.remove();
  // spellingTouchAppMenuItem.remove();
  // spellingWritingAppMenuItem.remove();
  numberFluency1to20AppMenuItem.remove();
  numberFluency21to40AppMenuItem.remove();
  numberFluency41to60AppMenuItem.remove();
  numberFluency61to80AppMenuItem.remove();
  numberFluency81to100AppMenuItem.remove();
  displayMainPage();
  returnToMainMenuToggle();
}
if (navBar) {
  body.appendChild(navBar);
}

/*
**********
Specific Menu Items
**********
*/

/* "Alphabet" Menu Items  (2) */

// 1. Alphabet Capitals Touch App Menu Item
const alphabetCapitalsCardTouchAppMenuItem = document.createElement("div");
alphabetCapitalsCardTouchAppMenuItem.setAttribute(
  "id",
  "alphabet-card-touch-app-menu-item"
);
// abcMenu.setAttribute("page-id", "mainMenu");
alphabetCapitalsCardTouchAppMenuItem.classList.add("div");
alphabetCapitalsCardTouchAppMenuItem.innerText = "Card Touch!\r\n ABC";
alphabetCapitalsCardTouchAppMenuItem.addEventListener("click", () => {
  appLauncher.startCardTouchApp("capitals");
});

// 2. Alphabet Capitals Touch App Menu Item
const alphabetLowercaseCardTouchAppMenuItem = document.createElement("div");
alphabetLowercaseCardTouchAppMenuItem.setAttribute(
  "id",
  "alphabet-card-touch-app-menu-item"
);
alphabetLowercaseCardTouchAppMenuItem.classList.add("div");
alphabetLowercaseCardTouchAppMenuItem.innerText = "Card Touch!\r\n abc";
alphabetLowercaseCardTouchAppMenuItem.addEventListener("click", () => {
  appLauncher.startCardTouchApp("lowercase");
});

// 3. Alphabet Matching App Menu Item
const alphabetMatchingAppMenuItem = document.createElement("div");
alphabetMatchingAppMenuItem.setAttribute(
  "id",
  "alphabet-matching-app-menu-item"
);
alphabetMatchingAppMenuItem.classList.add("div");
alphabetMatchingAppMenuItem.innerText = "Letter Matching";
alphabetMatchingAppMenuItem.addEventListener("click", () => {
  appLauncher.startMatchingApp("alphabet");
});
/* Alphabet menu items fin */

/* Sight Words Menu Items  (3) */

// 1. Sight Words 1 Touch App Menu Item
const sightWords1AppMenuItem = document.createElement("div");
sightWords1AppMenuItem.setAttribute("id", "sight-words-1-app-menu-item");
sightWords1AppMenuItem.classList.add("div");
sightWords1AppMenuItem.innerText = "Sight Words 1";
sightWords1AppMenuItem.addEventListener("click", () => {
  appLauncher.startCardTouchApp("sightwords1");
});

// 2. Sight Words 2 Touch App Menu Item
const sightWords2AppMenuItem = document.createElement("div");
sightWords2AppMenuItem.setAttribute("id", "sight-words-2-app-menu-item");
sightWords2AppMenuItem.classList.add("div");
sightWords2AppMenuItem.innerText = "Sight Words 2";
sightWords2AppMenuItem.addEventListener("click", () => {
  appLauncher.startCardTouchApp("sightwords2");
});

// 3. Sight Words 3 Matching App Menu Item
const sightWords3AppMenuItem = document.createElement("div");
sightWords3AppMenuItem.setAttribute("id", "sight-words-3-app-menu-item");
sightWords3AppMenuItem.classList.add("div");
sightWords3AppMenuItem.innerText = "Sight Words 3";
sightWords3AppMenuItem.addEventListener("click", () => {
  appLauncher.startCardTouchApp("sightwords3");
});
const sightWords1WritingAppMenuItem = document.createElement("div");
sightWords1WritingAppMenuItem.setAttribute(
  "id",
  "sight-words-1-writing-app-menu-item"
);
sightWords1WritingAppMenuItem.classList.add("div");
sightWords1WritingAppMenuItem.innerText = "Sight Words Writing";
sightWords1WritingAppMenuItem.addEventListener("click", () => {
  appLauncher.startWritingApp("sightwords1");
});

/* Sight Words menu items fin */

/* Letter Sounds Menu Items  (1) */

// 1. Letter Sounds Touch App Menu Item
const letterSoundsAMSFAppMenuItem = document.createElement("div");
letterSoundsAMSFAppMenuItem.setAttribute("id", "amsf-app-menu-item");
letterSoundsAMSFAppMenuItem.classList.add("div");
letterSoundsAMSFAppMenuItem.innerText = "a, m , s, f";
letterSoundsAMSFAppMenuItem.addEventListener("click", () => {
  appLauncher.startCardTouchApp("letter-sounds-asmf");
});

// 2. Letter Sounds Touch App Menu Item
// const sightWords2AppMenuItem = document.createElement("div");
// sightWords2AppMenuItem.setAttribute("id", "sight-words-2-app-menu-item");
// sightWords2AppMenuItem.classList.add("div");
// sightWords2AppMenuItem.innerText = "Sight Words 2";
// sightWords2AppMenuItem.addEventListener("click", () => {
//   startCardTouchApp("sightwords2");
// });

// 3. Letter Sounds Matching App Menu Item
// const sightWords3AppMenuItem = document.createElement("div");
// sightWords3AppMenuItem.setAttribute("id", "sight-words-3-app-menu-item");
// sightWords3AppMenuItem.classList.add("div");
// sightWords3AppMenuItem.innerText = "Sight Words 3";
// sightWords3AppMenuItem.addEventListener("click", () => {
//   startCardTouchApp("sightwords3");
// });

/* Letter Sounds menu items fin */

/* Spelling Menu Items  (2) */

// 1. Spelling Touch App menu item
const spellingTouchAppMenuItem = document.createElement("div");
spellingTouchAppMenuItem.setAttribute("id", "spelling-touch-app-menu-item");
spellingTouchAppMenuItem.classList.add("div");
spellingTouchAppMenuItem.innerText = "Touch & Spell";
// spellingTouchAppMenuItem.addEventListener("click", startSpellingTouchApp);

// 2. Spelling Writing App menu item
const spellingWritingAppMenuItem = document.createElement("div");
spellingWritingAppMenuItem.setAttribute(
  "id",
  "spelling-handwriting-app-menu-item"
);
spellingWritingAppMenuItem.classList.add("div");
spellingWritingAppMenuItem.innerText = "Writing";
// spellingWritingAppMenuItem.addEventListener("click", startsSpellingWritingApp);
/* Spelling menu items fin*/

// Displays the Alphabet Menu
function displayAbcMenu() {
  mainMenuSfx.select2.play();
  isMainMenu = false;
  hideParentsInfoBtn();
  topContainer.innerText = "Alphabet";
  abcMenu.classList.add("hidden");
  numbersMenu.classList.add("hidden");
  sightWordsMenu.classList.add("hidden");
  letterSoundsMenu.classList.add("hidden");
  spellingMenu.classList.add("hidden");
  div4.classList.add("hidden");
  menuContainer.appendChild(alphabetCapitalsCardTouchAppMenuItem);
  menuContainer.appendChild(alphabetLowercaseCardTouchAppMenuItem);
  menuContainer.appendChild(alphabetMatchingAppMenuItem);
  menuContainer.appendChild(returnToMainMenuBtn);
  alphabetCapitalsCardTouchAppMenuItem.classList.remove("hidden");
  alphabetLowercaseCardTouchAppMenuItem.classList.remove("hidden");
  alphabetMatchingAppMenuItem.classList.remove("hidden");
  returnToMainMenuToggle();
}
function displaySightWordsMenu() {
  mainMenuSfx.select2.play();
  isMainMenu = false;
  hideParentsInfoBtn();
  topContainer.innerText = "Sight Words";
  abcMenu.classList.add("hidden");
  numbersMenu.classList.add("hidden");
  sightWordsMenu.classList.add("hidden");
  letterSoundsMenu.classList.add("hidden");
  spellingMenu.classList.add("hidden");
  div4.classList.add("hidden");
  menuContainer.appendChild(sightWords1AppMenuItem);
  menuContainer.appendChild(sightWords2AppMenuItem);
  menuContainer.appendChild(sightWords3AppMenuItem);
  menuContainer.appendChild(sightWords1WritingAppMenuItem);
  menuContainer.appendChild(returnToMainMenuBtn);
  sightWords1AppMenuItem.classList.remove("hidden");
  sightWords2AppMenuItem.classList.remove("hidden");
  sightWords3AppMenuItem.classList.remove("hidden");
  sightWords1WritingAppMenuItem.classList.remove("hidden");
  returnToMainMenuToggle();
}
function displayLetterSoundsMenu() {
  mainMenuSfx.select2.play();
  isMainMenu = false;
  hideParentsInfoBtn();
  topContainer.innerText = "Sight Words";
  abcMenu.classList.add("hidden");
  numbersMenu.classList.add("hidden");
  sightWordsMenu.classList.add("hidden");
  letterSoundsMenu.classList.add("hidden");
  spellingMenu.classList.add("hidden");
  div4.classList.add("hidden");
  menuContainer.appendChild(letterSoundsAMSFAppMenuItem);
  // menuContainer.appendChild(sightWords2AppMenuItem);
  // menuContainer.appendChild(sightWords3AppMenuItem);
  // menuContainer.appendChild(returnToMainMenuBtn);
  letterSoundsAMSFAppMenuItem.classList.remove("hidden");
  // sightWords2AppMenuItem.classList.remove("hidden");
  // sightWords3AppMenuItem.classList.remove("hidden");
  returnToMainMenuToggle();
}

// Displays the Spelling Menu
function displaySpellingMenu() {
  mainMenuSfx.select2.play();
  hideParentsInfoBtn();
  isMainMenu = false;
  topContainer.innerText = "Spelling";
  abcMenu.classList.add("hidden");
  numbersMenu.classList.add("hidden");
  sightWordsMenu.classList.add("hidden");
  spellingMenu.classList.add("hidden");
  div4.classList.add("hidden");
  menuContainer.appendChild(spellingTouchAppMenuItem);
  // menuContainer.appendChild(spellingWritingAppMenuItem);
  menuContainer.appendChild(returnToMainMenuBtn);
  spellingTouchAppMenuItem.classList.remove("hidden");
  // spellingWritingAppMenuItem.classList.remove("hidden");
  returnToMainMenuToggle();
}

/* "Number" Menu Items  (1) */

// 1. Number Fluency 1-20 App Menu Item
const numberFluency1to20AppMenuItem = document.createElement("div");
numberFluency1to20AppMenuItem.setAttribute(
  "id",
  "number-fluency-1-to-20-app-menu-item"
);
numberFluency1to20AppMenuItem.classList.add("div");
numberFluency1to20AppMenuItem.innerText = "Touch 1-20";
numberFluency1to20AppMenuItem.addEventListener("click", () => {
  startFluencyApp(0);
});

// 2. Number Fluency 21-40 App Menu Item
const numberFluency21to40AppMenuItem = document.createElement("div");
numberFluency21to40AppMenuItem.setAttribute(
  "id",
  "number-fluency-21-to-40-app-menu-item"
);
numberFluency21to40AppMenuItem.classList.add("div");
numberFluency21to40AppMenuItem.innerText = "Touch 21-40";
numberFluency21to40AppMenuItem.addEventListener("click", () => {
  startFluencyApp(1);
});

// 3. Number Fluency 41-60 App Menu Item
const numberFluency41to60AppMenuItem = document.createElement("div");
numberFluency41to60AppMenuItem.setAttribute(
  "id",
  "number-fluency-41-to-60-app-menu-item"
);
numberFluency41to60AppMenuItem.classList.add("div");
numberFluency41to60AppMenuItem.innerText = "Touch 41-60";
numberFluency41to60AppMenuItem.addEventListener("click", () => {
  startFluencyApp(2);
});

// 4. Number Fluency 61-80 App Menu Item
const numberFluency61to80AppMenuItem = document.createElement("div");
numberFluency61to80AppMenuItem.setAttribute(
  "id",
  "number-fluency-61-to-80-app-menu-item"
);
numberFluency61to80AppMenuItem.classList.add("div");
numberFluency61to80AppMenuItem.innerText = "Touch 61-80";
numberFluency61to80AppMenuItem.addEventListener("click", () => {
  startFluencyApp(3);
});

// 5. Number Fluency 81-100 App Menu Item
const numberFluency81to100AppMenuItem = document.createElement("div");
numberFluency81to100AppMenuItem.setAttribute(
  "id",
  "number-fluency-81-to-100-app-menu-item"
);
numberFluency81to100AppMenuItem.classList.add("div");
numberFluency81to100AppMenuItem.innerText = "Touch 81-100";
numberFluency81to100AppMenuItem.addEventListener("click", () => {
  startFluencyApp(4);
});

/* Number menu items fin */

// Displays the Numbers Menu
function displayNumbersMenu() {
  mainMenuSfx.select2.play();
  isMainMenu = false;
  hideParentsInfoBtn();
  topContainer.innerText = "Numbers";
  abcMenu.classList.add("hidden");
  numbersMenu.classList.add("hidden");
  sightWordsMenu.classList.add("hidden");
  spellingMenu.classList.add("hidden");
  div4.classList.add("hidden");
  menuContainer.appendChild(numberFluency1to20AppMenuItem);
  menuContainer.appendChild(numberFluency21to40AppMenuItem);
  menuContainer.appendChild(numberFluency41to60AppMenuItem);
  menuContainer.appendChild(numberFluency61to80AppMenuItem);
  menuContainer.appendChild(numberFluency81to100AppMenuItem);
  menuContainer.appendChild(returnToMainMenuBtn);
  numberFluency1to20AppMenuItem.classList.remove("hidden");
  numberFluency21to40AppMenuItem.classList.remove("hidden");
  numberFluency41to60AppMenuItem.classList.remove("hidden");
  numberFluency61to80AppMenuItem.classList.remove("hidden");
  numberFluency81to100AppMenuItem.classList.remove("hidden");
  returnToMainMenuToggle();
}

function returnToMainMenuToggle() {
  if (!isMainMenu) {
    returnToMainMenuBtn.classList.remove("hidden");
  } else if (isMainMenu) {
    returnToMainMenuBtn.classList.add("hidden");
  }
}

export {
  displayGreeting,
  displayMainPage,
  getCumulativeUserScore,
  hideParentsInfoBtn,
  startMainApp,
  setTopMenuVariables,
  abcMenu,
  alphabetLowercaseCardTouchAppMenuItem,
  alphabetCapitalsCardTouchAppMenuItem,
  alphabetMatchingAppMenuItem,
  numberFluency1to20AppMenuItem,
  numberFluency21to40AppMenuItem,
  numberFluency41to60AppMenuItem,
  numberFluency61to80AppMenuItem,
  numberFluency81to100AppMenuItem,
  sightWords1AppMenuItem,
  sightWords2AppMenuItem,
  sightWords3AppMenuItem,
  sightWords1WritingAppMenuItem,
  spellingTouchAppMenuItem,
  spellingWritingAppMenuItem,
  numbersMenu,
  sightWordsMenu,
  spellingMenu,
  div4,
  mainMenuSfx,
};
