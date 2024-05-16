import {
  abcMenu,
  alphabetCardTouchAppMenuItem,
  alphabetMatchingAppMenuItem,
  spellingMenu,
  div4,
  numbersMenu,
  spellingTouchAppMenuItem,
  spellingWritingAppMenuItem,
  displayGreeting,
  numberFluency1to20AppMenuItem,
} from "../js/general/start-main-app.js";
import {
  body,
  mainContainer,
  menuContainer,
  navBar,
  parentsInfo,
  topContainer,
} from "./variables.js";

function removeMenuPage() {
  alphabetCardTouchAppMenuItem.remove();
  alphabetMatchingAppMenuItem.remove();
  numberFluency1to20AppMenuItem.remove();
  spellingTouchAppMenuItem.remove();
  spellingWritingAppMenuItem.remove();
  // navBar.classList.add("hidden");
  topContainer.classList.add("hidden");
  menuContainer.classList.add("hidden");
  abcMenu.classList.add("hidden");
  numbersMenu.classList.add("hidden");
  spellingMenu.classList.add("hidden");
  div4.classList.add("hidden");

  // document.getElementById("navbar").remove();
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
  displayGreeting();
  menuContainer.classList.remove("hidden");
  abcMenu.classList.remove("hidden");
  numbersMenu.classList.remove("hidden");
  spellingMenu.classList.remove("hidden");
  div4.classList.remove("hidden");
}

export { removeMenuPage, restoreMainMenu };
