import {
  body,
  mainContainer,
  primaryMenuContainer,
  navBar,
  parentsInfo,
  topContainer,
} from "./variables.js";

function removeMenuPage() {
  navBar.remove();
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
  sightWords1WritingAppMenuItem.remove();
  navBar.classList.add("hidden");
  topContainer.classList.add("hidden");
  primaryMenuContainer.classList.add("hidden");
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
  body.appendChild(navBar);
  topContainer.innerText = "";
  body.appendChild(parentsInfo);
  mainContainer.appendChild(topContainer);
  mainContainer.appendChild(primaryMenuContainer);
  navBar.classList.remove("hidden");
  topContainer.classList.remove("hidden");
  getCumulativeUserScore();
  setTimeout(displayGreeting, 500);
  primaryMenuContainer.classList.remove("hidden");
  abcMenu.classList.remove("hidden");
  numbersMenu.classList.remove("hidden");
  sightWordsMenu.classList.remove("hidden");
  spellingMenu.classList.remove("hidden");
  div4.classList.remove("hidden");
}

export { removeMenuPage, restoreMainMenu };
