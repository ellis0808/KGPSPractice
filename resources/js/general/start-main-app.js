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
import { startAlphabetCardTouchApp } from "../alphabet/alphabet-card-touch/alphabet-card-touch.js";
import { startAlphabetMatchingApp } from "../alphabet/alphabet-matching/alphabet-matching-launcher.js";

function startMainApp() {
  stylesheet.setAttribute("href", "../resources/css/styles.css");
  displayMainPage();

  setTimeout(() => {
    setTopMenuVariables();
  }, 500);
}

const abcMenu = document.createElement("div");
abcMenu.setAttribute("id", "div1");
abcMenu.setAttribute("page-id", "mainMenu");
abcMenu.classList.add("div", "div-start-menu1");
abcMenu.innerText = "ABCs";
abcMenu.addEventListener("click", displayAbcMenu);
const numbersMenu = document.createElement("div");
numbersMenu.setAttribute("id", "div2");
abcMenu.setAttribute("page-id", "mainMenu");
numbersMenu.classList.add("div", "div-start-menu2");
numbersMenu.innerText = "1,2,3";

const div3 = document.createElement("div");
div3.setAttribute("id", "div3");
abcMenu.setAttribute("page-id", "mainMenu");
div3.classList.add("div", "div-start-menu3");

div3.innerText = "3";
const div4 = document.createElement("div");
div4.setAttribute("id", "div4");
abcMenu.setAttribute("page-id", "mainMenu");

div4.classList.add("div", "div-start-menu4");
div4.innerText = "4";
const alphabetCardTouchAppMenuItem = document.createElement("div");
alphabetCardTouchAppMenuItem.setAttribute(
  "id",
  "alphabet-card-touch-app-menu-item"
);
abcMenu.setAttribute("page-id", "mainMenu");
alphabetCardTouchAppMenuItem.classList.add("div");
alphabetCardTouchAppMenuItem.innerText = "Card Touch!";
alphabetCardTouchAppMenuItem.addEventListener(
  "click",
  startAlphabetCardTouchApp
);
const alphabetMatchingAppMenuItem = document.createElement("div");
alphabetMatchingAppMenuItem.setAttribute(
  "id",
  "alphabet--matching-app-menu-item"
);
abcMenu.setAttribute("page-id", "mainMenu");
alphabetMatchingAppMenuItem.classList.add("div");
alphabetMatchingAppMenuItem.innerText = "Letter Matching";
alphabetMatchingAppMenuItem.addEventListener("click", startAlphabetMatchingApp);

const returnToMainMenuBtn = document.createElement("button");
returnToMainMenuBtn.innerText = `<--`;
returnToMainMenuBtn.classList.add("returnToMainMenuBtn");
returnToMainMenuBtn.setAttribute("id", "returnToMainMenuBtn");
returnToMainMenuBtn.addEventListener("click", returnToMainMenu);
function returnToMainMenu() {
  abcMenu.classList.remove("hidden");
  numbersMenu.classList.remove("hidden");
  div3.classList.remove("hidden");
  div4.classList.remove("hidden");
  alphabetCardTouchAppMenuItem.remove();
  alphabetMatchingAppMenuItem.remove();
  displayMainPage();
}
body.appendChild(navBar);

function displayMainPage() {
  const navBarDisplay = `${user}`;
  const greeting = `Hi, ${user}!`;
  // const navItem = document.getElementById("nav-item");
  // navItem.innerHTML = ``;

  navBar.innerHTML = navBarDisplay;
  topContainer.innerText = greeting;
}

function displayAbcMenu() {
  topContainer.innerText = "Alphabet";
  abcMenu.classList.add("hidden");
  numbersMenu.classList.add("hidden");
  div3.classList.add("hidden");
  div4.classList.add("hidden");
  menuContainer.appendChild(alphabetCardTouchAppMenuItem);
  menuContainer.appendChild(alphabetMatchingAppMenuItem);
  menuContainer.appendChild(returnToMainMenuBtn);
  alphabetCardTouchAppMenuItem.classList.remove("hidden");
  alphabetMatchingAppMenuItem.classList.remove("hidden");
}

function hideParentsInfoBtn() {
  parentsInfo.classList.add("hidden");
}
function setTopMenuVariables() {
  menuContainer.appendChild(abcMenu);
  menuContainer.appendChild(numbersMenu);
  menuContainer.appendChild(div3);
  menuContainer.appendChild(div4);
}

export {
  displayMainPage,
  hideParentsInfoBtn,
  startMainApp,
  setTopMenuVariables,
  abcMenu,
  alphabetCardTouchAppMenuItem,
  alphabetMatchingAppMenuItem,
  numbersMenu,
  div3,
  div4,
};
