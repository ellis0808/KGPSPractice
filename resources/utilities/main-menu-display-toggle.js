import {
  abcMenu,
  alphabetCapitalsCardTouchAppMenuItem,
  alphabetLowercaseCardTouchAppMenuItem,
  alphabetMatchingAppMenuItem,
  spellingMenu,
  div4,
  numbersMenu,
  sightWords1AppMenuItem,
  sightWords2AppMenuItem,
  sightWords3AppMenuItem,
  spellingTouchAppMenuItem,
  spellingWritingAppMenuItem,
  displayGreeting,
  numberFluency1to20AppMenuItem,
  numberFluency21to40AppMenuItem,
  numberFluency41to60AppMenuItem,
  numberFluency61to80AppMenuItem,
  numberFluency81to100AppMenuItem,
  sightWordsMenu,
} from "../apps/general/start-main-app.js";
import {
  body,
  mainContainer,
  menuContainer,
  navBar,
  parentsInfo,
  topContainer,
} from "./variables.js";

function removeMenuPage() {
  alphabetCapitalsCardTouchAppMenuItem.remove();
  alphabetLowercaseCardTouchAppMenuItem.remove();
  alphabetMatchingAppMenuItem.remove();
  numberFluency1to20AppMenuItem.remove();
  numberFluency21to40AppMenuItem.remove();
  numberFluency41to60AppMenuItem.remove();
  numberFluency61to80AppMenuItem.remove();
  numberFluency81to100AppMenuItem.remove();
  sightWords1AppMenuItem.remove();
  sightWords2AppMenuItem.remove();
  sightWords3AppMenuItem.remove();
  spellingTouchAppMenuItem.remove();
  spellingWritingAppMenuItem.remove();
  topContainer.classList.add("hidden");
  menuContainer.classList.add("hidden");
  abcMenu.classList.add("hidden");
  numbersMenu.classList.add("hidden");
  sightWordsMenu.classList.add("hidden");
  spellingMenu.classList.add("hidden");
  div4.classList.add("hidden");

  document.getElementById("parents-info").remove();
  document.getElementById("top-container").remove();
  document.getElementById("menu-container").remove();
}

function restoreMainMenu() {
  // body.appendChild(navBar);
  topContainer.innerText = "";
  body.appendChild(parentsInfo);
  mainContainer.appendChild(topContainer);
  mainContainer.appendChild(menuContainer);
  // navBar.classList.remove("hidden");
  topContainer.classList.remove("hidden");
  getCumulativeUserScore();
  setTimeout(displayGreeting, 500);
  menuContainer.classList.remove("hidden");
  abcMenu.classList.remove("hidden");
  numbersMenu.classList.remove("hidden");
  sightWordsMenu.classList.remove("hidden");
  spellingMenu.classList.remove("hidden");
  div4.classList.remove("hidden");
}

export { removeMenuPage, restoreMainMenu };
