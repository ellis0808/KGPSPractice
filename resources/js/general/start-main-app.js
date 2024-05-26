import { score } from "../../utilities/score-object.js";
import {
  body,
  navBar,
  mainContainer,
  menuContainer,
  stylesheet,
  topContainer,
  user,
  parentsInfo,
} from "../../utilities/variables.js";
import {
  startAlphabetCardTouchApp,
  startAlphabetMatchingApp,
  startNumberFluency1to20App,
  startSpellingTouchApp,
} from "./app-launcher.js";

/*
**********
Main Menu Items
**********
*/

const abcMenu = document.createElement("div");
abcMenu.setAttribute("id", "div1");
// abcMenu.setAttribute("page-id", "mainMenu");
abcMenu.classList.add("div", "div-start-menu1");
abcMenu.innerText = "ABCs";
abcMenu.addEventListener("click", displayAbcMenu);
const numbersMenu = document.createElement("div");
numbersMenu.setAttribute("id", "div2");
// abcMenu.setAttribute("page-id", "mainMenu");
numbersMenu.classList.add("div", "div-start-menu2");
numbersMenu.innerText = "1,2,3";
numbersMenu.addEventListener("click", displayNumbersMenu);
const spellingMenu = document.createElement("div");
spellingMenu.setAttribute("id", "div3");
// abcMenu.setAttribute("page-id", "mainMenu");
spellingMenu.classList.add("div", "div-start-menu3");
spellingMenu.addEventListener("click", displaySpellingMenu);

spellingMenu.innerText = "Spelling";
const div4 = document.createElement("div");
div4.setAttribute("id", "div4");
// abcMenu.setAttribute("page-id", "mainMenu");

div4.classList.add("div", "div-start-menu4");
div4.innerText = "4";

/* Top Page Menu Items Display Functions */

let isMainMenu = true;
function startMainApp() {
  stylesheet.setAttribute("href", "../resources/css/styles.css");
  displayMainPage();

  setTimeout(() => {
    setTopMenuVariables();
    displayGreeting();
  }, 500);
}

function setTopMenuVariables() {
  menuContainer.appendChild(abcMenu);
  menuContainer.appendChild(numbersMenu);
  menuContainer.appendChild(spellingMenu);
  // menuContainer.appendChild(div4);
}

const greetingDisplay = document.createElement("div");
const pointsDisplay = document.createElement("div");
greetingDisplay.classList.add("greeting-display");
pointsDisplay.classList.add("points-display");

function displayGreeting() {
  isMainMenu = true;
  returnToMainMenuToggle();
  const greeting = `Hi, ${user}!`;
  const userScore = `You have ${score.userScore} pts`;
  topContainer.appendChild(greetingDisplay);
  topContainer.appendChild(pointsDisplay);
  greetingDisplay.textContent = greeting;
  pointsDisplay.textContent = userScore;
}
function displayMainPage() {
  isMainMenu = true;
  const navBarDisplay = `${user}`;
  // const navItem = document.getElementById("nav-item");
  // navItem.innerHTML = ``;

  // navBar.innerHTML = navBarDisplay;
}
function hideParentsInfoBtn() {
  parentsInfo.classList.add("hidden");
}

/*  Return to Main Page  */

const returnToMainMenuBtn = document.createElement("button");
returnToMainMenuBtn.innerText = `<- Back`;
returnToMainMenuBtn.classList.add("returnToMainMenuBtn");
returnToMainMenuBtn.setAttribute("id", "returnToMainMenuBtn");
returnToMainMenuBtn.addEventListener("click", returnToMainMenu);

function returnToMainMenu() {
  topContainer.innerText = "";
  displayGreeting();
  abcMenu.classList.remove("hidden");
  numbersMenu.classList.remove("hidden");
  spellingMenu.classList.remove("hidden");
  div4.classList.remove("hidden");
  alphabetCardTouchAppMenuItem.remove();
  alphabetMatchingAppMenuItem.remove();
  spellingTouchAppMenuItem.remove();
  spellingWritingAppMenuItem.remove();
  numberFluency1to20AppMenuItem.remove();
  displayMainPage();
  returnToMainMenuToggle();
}
// body.appendChild(navBar);

/*
**********
Specific Menu Items
**********
*/

/* "Alphabet" Menu Items  (2) */

// 1. Alphabet Touch App Menu Item
const alphabetCardTouchAppMenuItem = document.createElement("div");
alphabetCardTouchAppMenuItem.setAttribute(
  "id",
  "alphabet-card-touch-app-menu-item"
);
// abcMenu.setAttribute("page-id", "mainMenu");
alphabetCardTouchAppMenuItem.classList.add("div");
alphabetCardTouchAppMenuItem.innerText = "Card Touch!";
alphabetCardTouchAppMenuItem.addEventListener(
  "click",
  startAlphabetCardTouchApp
);

// 2. Alphabet Matching App Menu Item
const alphabetMatchingAppMenuItem = document.createElement("div");
alphabetMatchingAppMenuItem.setAttribute(
  "id",
  "alphabet--matching-app-menu-item"
);
alphabetMatchingAppMenuItem.classList.add("div");
alphabetMatchingAppMenuItem.innerText = "Letter Matching";
alphabetMatchingAppMenuItem.addEventListener("click", startAlphabetMatchingApp);
/* Alphabet menu items fin */

/* Spelling Menu Items  (2) */

// 1. Spelling Touch App menu item
const spellingTouchAppMenuItem = document.createElement("div");
spellingTouchAppMenuItem.setAttribute("id", "spelling-touch-app-menu-item");
spellingTouchAppMenuItem.classList.add("div");
spellingTouchAppMenuItem.innerText = "Touch & Spell";
spellingTouchAppMenuItem.addEventListener("click", startSpellingTouchApp);

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
  isMainMenu = false;
  topContainer.innerText = "Alphabet";
  abcMenu.classList.add("hidden");
  numbersMenu.classList.add("hidden");
  spellingMenu.classList.add("hidden");
  div4.classList.add("hidden");
  menuContainer.appendChild(alphabetCardTouchAppMenuItem);
  menuContainer.appendChild(alphabetMatchingAppMenuItem);
  menuContainer.appendChild(returnToMainMenuBtn);
  alphabetCardTouchAppMenuItem.classList.remove("hidden");
  alphabetMatchingAppMenuItem.classList.remove("hidden");
  returnToMainMenuToggle();
}

// Displays the Spelling Menu
function displaySpellingMenu() {
  isMainMenu = false;
  topContainer.innerText = "Spelling";
  abcMenu.classList.add("hidden");
  numbersMenu.classList.add("hidden");
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
numberFluency1to20AppMenuItem.addEventListener(
  "click",
  startNumberFluency1to20App
);

// 2. Alphabet Matching App Menu Item

/* Number menu items fin */

// Displays the Numbers Menu
function displayNumbersMenu() {
  isMainMenu = false;
  topContainer.innerText = "Numbers";
  abcMenu.classList.add("hidden");
  numbersMenu.classList.add("hidden");
  spellingMenu.classList.add("hidden");
  div4.classList.add("hidden");
  menuContainer.appendChild(numberFluency1to20AppMenuItem);
  // menuContainer.appendChild(alphabetMatchingAppMenuItem);
  menuContainer.appendChild(returnToMainMenuBtn);
  numberFluency1to20AppMenuItem.classList.remove("hidden");
  // alphabetMatchingAppMenuItem.classList.remove("hidden");
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
  hideParentsInfoBtn,
  startMainApp,
  setTopMenuVariables,
  abcMenu,
  alphabetCardTouchAppMenuItem,
  alphabetMatchingAppMenuItem,
  numberFluency1to20AppMenuItem,
  spellingTouchAppMenuItem,
  spellingWritingAppMenuItem,
  numbersMenu,
  spellingMenu,
  div4,
};
