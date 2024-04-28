import {
  abcMenu,
  alphabetCardTouchAppMenuItem,
  alphabetMatchingAppMenuItem,
  div3,
  div4,
  numbersMenu,
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
  // navBar.classList.add("hidden");
  topContainer.classList.add("hidden");
  menuContainer.classList.add("hidden");
  abcMenu.classList.add("hidden");
  numbersMenu.classList.add("hidden");
  div3.classList.add("hidden");
  div4.classList.add("hidden");

  // document.getElementById("navbar").remove();
  document.getElementById("parents-info").remove();
  document.getElementById("top-container").remove();
  document.getElementById("menu-container").remove();
}

function restoreMainMenu() {
  // alphabetCardTouchAppMenuItem.classList.remove("hidden");
  // alphabetMatchingAppMenuItem.classList.remove("hidden");
  // body.appendChild(navBar);
  body.appendChild(parentsInfo);
  mainContainer.appendChild(topContainer);
  mainContainer.appendChild(menuContainer);
  // navBar.classList.remove("hidden");
  topContainer.classList.remove("hidden");
  menuContainer.classList.remove("hidden");
  abcMenu.classList.remove("hidden");
  numbersMenu.classList.remove("hidden");
  div3.classList.remove("hidden");
  div4.classList.remove("hidden");
}

export { removeMenuPage, restoreMainMenu };
