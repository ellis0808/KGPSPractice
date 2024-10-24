import {
  body,
  navBar,
  mainContainer,
  primaryMenuContainer,
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
import { audio } from "../../utilities/audio.js";

/*
**********
Enable Audio
**********
*/

const mainMenuSfx = {
  select1: new Howl({
    src: ["/KGPSEPaudio/sfx/sfx-select-2.mp3"],
    volume: 0.0,
    onplayerror: function () {
      sound.once("unlock", function () {
        sound.play();
      });
    },
  }),
};

/*
********************
Menu Class
********************
*/
class MenuItems {
  constructor() {
    this.isPrimaryMenu = true;
    this.isSecondaryMenu = false;
    this.section = null;
    // Primary Menu
    this.abcMenu = document.createElement("div");
    this.numbersMenu = document.createElement("div");
    this.sightWordsMenu = document.createElement("div");
    this.letterSoundsMenu = document.createElement("div");

    // Alphabet
    this.abcMenu.setAttribute("id", "div1");
    this.abcMenu.classList.add("div", "div-start-menu1", "primary-menu-div");
    this.abcMenu.innerText = "ABCs";
    this.abcMenu.addEventListener("click", () => {
      this.section = "alphabet";
      menuItems.displaySecondaryMenu(this.section);
    });
    // Numbers
    this.numbersMenu.setAttribute("id", "div2");
    this.numbersMenu.classList.add(
      "div",
      "div-start-menu2",
      "primary-menu-div"
    );
    this.numbersMenu.innerText = "1,2,3";
    this.numbersMenu.addEventListener("click", () => {
      this.section = "numbers";
      menuItems.displaySecondaryMenu(this.section);
    });

    // Sight Words
    this.sightWordsMenu.setAttribute("id", "div3");
    this.sightWordsMenu.classList.add(
      "div",
      "div-start-menu4",
      "primary-menu-div"
    );
    this.sightWordsMenu.addEventListener("click", () => {
      this.section = "sight-words";
      menuItems.displaySecondaryMenu(this.section);
    });
    this.sightWordsMenu.innerText = "Sight Words";

    // Letter Sounds
    // this.letterSoundsMenu.setAttribute("id", "div5");
    // this.letterSoundsMenu.classList.add(
    //   "div",
    //   "div-start-menu5",
    //   "primary-menu-div"
    // );
    // this.letterSoundsMenu.addEventListener("click", () => menuItems.this.this.section = "letter-sounds";
    // menuItems.displaySecondaryMenu(this.section);
    // this.letterSoundsMenu.innerText = "Letter Sounds";

    // Seondary Menu
    this.moveMenuBtnContainer = document.createElement("div");
    this.moveMenuBtnContainer.classList.add(
      "move-menu-btn-container",
      "secondary-menu-item"
    );
    this.moveMenuRightBtn = document.createElement("button");
    this.moveMenuRightBtn.classList.add("move-menu-right-btn");
    this.moveMenuRightBtn.innerText = "Right";
    this.moveMenuRightBtn.addEventListener("pointerdown", () => {
      this.sectionColumn.style.translate = "-520px";
    });
    this.moveMenuLeftBtn = document.createElement("button");
    this.moveMenuLeftBtn.classList.add("move-menu-left-btn");
    this.moveMenuLeftBtn.innerText = "Left";
    this.moveMenuLeftBtn.addEventListener("pointerdown", () => {
      this.sectionColumn.style.translate = "0px";
    });
    this.secondaryMenuContainer = document.createElement("div");
    this.secondaryMenuContainer.classList.add(
      "secondary-menu-container",
      "secondary-menu"
    );
    this.headersColumn = document.createElement("div");
    this.headersColumn.classList.add("menu-headers", "secondary-menu");
    this.sectionColumn = document.createElement("div");
    this.sectionColumn.classList.add("menu-apps-container", "secondary-menu");
    this.touchMenu = document.createElement("div");
    this.touchMenu.classList.add(
      "secondary-menu-row",
      "secondary-menu",
      "touch-menu"
    );
    this.matchingMenu = document.createElement("div");
    this.matchingMenu.classList.add(
      "secondary-menu-row",
      "secondary-menu",
      "matching-menu"
    );
    this.fluencyMenu = document.createElement("div");
    this.fluencyMenu.classList.add(
      "secondary-menu-row",
      "secondary-menu",
      "fluency-menu"
    );
    this.writingMenu = document.createElement("div");
    this.writingMenu.classList.add(
      "secondary-menu-row",
      "secondary-menu",
      "writing-menu"
    );
    this.touchMenuHeader = document.createElement("div");
    this.matchingMenuHeader = document.createElement("div");
    this.fluencyMenuHeader = document.createElement("div");
    this.writingMenuHeader = document.createElement("div");
    this.touchMenuHeader.classList.add(
      "secondary-menu-header",
      "secondary-menu"
    );
    this.matchingMenuHeader.classList.add(
      "secondary-menu-header",
      "secondary-menu"
    );
    this.fluencyMenuHeader.classList.add(
      "secondary-menu-header",
      "secondary-menu"
    );
    this.writingMenuHeader.classList.add(
      "secondary-menu-header",
      "secondary-menu"
    );
    this.touchMenuHeader.innerText = "Touch";
    this.matchingMenuHeader.innerText = "Matching";
    this.fluencyMenuHeader.innerText = "Fluency";
    this.writingMenuHeader.innerText = "Writing";

    // Secondary Menu Items
    this.alphabetCapitalsCardTouchAppMenuItem = document.createElement("div");
    this.alphabetLowercaseCardTouchAppMenuItem = document.createElement("div");
    this.alphabetMatchingAppMenuItem = document.createElement("div");
    this.sightWords1AppMenuItem = document.createElement("div");
    this.sightWords2AppMenuItem = document.createElement("div");
    this.sightWords3AppMenuItem = document.createElement("div");
    this.sightWords1WritingAppMenuItem = document.createElement("div");
    this.sightWords2WritingAppMenuItem = document.createElement("div");
    this.sightWords3WritingAppMenuItem = document.createElement("div");
    this.letterSoundsAMSFAppMenuItem = document.createElement("div");
    this.numberFluency1to20AppMenuItem = document.createElement("div");
    this.numberFluency21to40AppMenuItem = document.createElement("div");
    this.numberFluency41to60AppMenuItem = document.createElement("div");
    this.numberFluency61to80AppMenuItem = document.createElement("div");
    this.numberFluency81to100AppMenuItem = document.createElement("div");
    this.numberWriting1to10AppMenuItem = document.createElement("div");
    this.numberWriting11to20AppMenuItem = document.createElement("div");
    this.numberWriting21to40AppMenuItem = document.createElement("div");
    this.numberWriting1to50AppMenuItem = document.createElement("div");
    // 1. Alphabet Capitals Touch App Menu Item
    this.alphabetCapitalsCardTouchAppMenuItem.setAttribute(
      "id",
      "alphabet-card-touch-app-menu-item"
    );
    this.alphabetCapitalsCardTouchAppMenuItem.setAttribute("app-type", "touch");
    this.alphabetCapitalsCardTouchAppMenuItem.setAttribute(
      "app-content",
      "alphabet"
    );
    this.alphabetCapitalsCardTouchAppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.alphabetCapitalsCardTouchAppMenuItem.innerText = "ABC";
    this.alphabetCapitalsCardTouchAppMenuItem.addEventListener("click", () => {
      appLauncher.startCardTouchApp("capitals");
      this.removeMenu();
    });
    // 2. Alphabet Lowercase Touch App Menu Item
    this.alphabetLowercaseCardTouchAppMenuItem.setAttribute(
      "id",
      "alphabet-card-touch-app-menu-item"
    );
    this.alphabetLowercaseCardTouchAppMenuItem.setAttribute(
      "app-type",
      "touch"
    );
    this.alphabetLowercaseCardTouchAppMenuItem.setAttribute(
      "app-content",
      "alphabet"
    );
    this.alphabetLowercaseCardTouchAppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.alphabetLowercaseCardTouchAppMenuItem.innerText = "abc";
    this.alphabetLowercaseCardTouchAppMenuItem.addEventListener("click", () => {
      appLauncher.startCardTouchApp("lowercase");
      this.removeMenu();
    });

    // 3. Alphabet Matching App Menu Item
    this.alphabetMatchingAppMenuItem.setAttribute(
      "id",
      "alphabet-matching-app-menu-item"
    );
    this.alphabetMatchingAppMenuItem.setAttribute("app-type", "touch");
    this.alphabetMatchingAppMenuItem.setAttribute("app-content", "alphabet");
    this.alphabetMatchingAppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.alphabetMatchingAppMenuItem.innerText = "Aーa";
    this.alphabetMatchingAppMenuItem.addEventListener("click", () => {
      appLauncher.startMatchingApp("alphabet");
      this.removeMenu();
    });

    // 1. Sight Words 1 Touch App Menu Item
    this.sightWords1AppMenuItem.setAttribute(
      "id",
      "sight-words-1-app-menu-item"
    );
    this.sightWords1AppMenuItem.setAttribute("app-type", "sight-words-app");
    this.sightWords1AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.sightWords1AppMenuItem.innerText = "Group 1";
    this.sightWords1AppMenuItem.addEventListener("click", () => {
      appLauncher.startCardTouchApp("sightwords1");
      this.removeMenu();
    });

    // 2. Sight Words 2 Touch App Menu Item
    this.sightWords2AppMenuItem.setAttribute(
      "id",
      "sight-words-2-app-menu-item"
    );
    this.sightWords2AppMenuItem.setAttribute("app-type", "sight-words-app");
    this.sightWords2AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.sightWords2AppMenuItem.innerText = "Group 2";
    this.sightWords2AppMenuItem.addEventListener("click", () => {
      appLauncher.startCardTouchApp("sightwords2");
      this.removeMenu();
    });

    // 3. Sight Words 3 Touch App Menu Item
    this.sightWords3AppMenuItem.setAttribute(
      "id",
      "sight-words-3-app-menu-item"
    );
    this.sightWords3AppMenuItem.setAttribute("app-type", "sight-words-app");
    this.sightWords3AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.sightWords3AppMenuItem.innerText = "Group 3";
    this.sightWords3AppMenuItem.addEventListener("click", () => {
      appLauncher.startCardTouchApp("sightwords3");
      this.removeMenu();
    });

    // 4. Sight Words 1 Writing App Menu Item
    this.sightWords1WritingAppMenuItem.setAttribute(
      "id",
      "sight-words-1-writing-app-menu-item"
    );
    this.sightWords1WritingAppMenuItem.setAttribute(
      "app-type",
      "sight-words-app"
    );
    this.sightWords1WritingAppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.sightWords1WritingAppMenuItem.innerText = "Group 1";
    this.sightWords1WritingAppMenuItem.addEventListener("click", () => {
      appLauncher.startWritingApp("sightwords1");
      this.removeMenu();
    });
    // 4. Sight Words 2 Writing App Menu Item
    this.sightWords2WritingAppMenuItem.setAttribute(
      "id",
      "sight-words-2-writing-app-menu-item"
    );
    this.sightWords2WritingAppMenuItem.setAttribute(
      "app-type",
      "sight-words-app"
    );
    this.sightWords2WritingAppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.sightWords2WritingAppMenuItem.innerText = "Group 2";
    this.sightWords2WritingAppMenuItem.addEventListener("click", () => {
      appLauncher.startWritingApp("sightwords2");
      this.removeMenu();
    });
    // 4. Sight Words 3 Writing App Menu Item
    this.sightWords3WritingAppMenuItem.setAttribute(
      "id",
      "sight-words-3-writing-app-menu-item"
    );
    this.sightWords3WritingAppMenuItem.setAttribute(
      "app-type",
      "sight-words-app"
    );
    this.sightWords3WritingAppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.sightWords3WritingAppMenuItem.innerText = "Group 3";
    this.sightWords3WritingAppMenuItem.addEventListener("click", () => {
      appLauncher.startWritingApp("sightwords3");
      this.removeMenu();
    });

    // 1. Number Fluency 1-20 App Menu Item
    this.numberFluency1to20AppMenuItem.setAttribute(
      "id",
      "number-fluency-1-to-20-app-menu-item"
    );
    this.numberFluency1to20AppMenuItem.setAttribute("app-style", "numbers");
    this.numberFluency1to20AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.numberFluency1to20AppMenuItem.innerText = "1-20";
    this.numberFluency1to20AppMenuItem.addEventListener("click", () => {
      appLauncher.startFluencyApp(1);
      this.removeMenu();
    });

    // 2. Number Fluency 21-40 App Menu Item
    this.numberFluency21to40AppMenuItem.setAttribute(
      "id",
      "number-fluency-21-to-40-app-menu-item"
    );
    this.numberFluency21to40AppMenuItem.setAttribute("app-style", "numbers");
    this.numberFluency21to40AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.numberFluency21to40AppMenuItem.innerText = "21-40";
    this.numberFluency21to40AppMenuItem.addEventListener("click", () => {
      appLauncher.startFluencyApp(2);
      this.removeMenu();
    });

    // 3. Number Fluency 41-60 App Menu Item
    this.numberFluency41to60AppMenuItem.setAttribute(
      "id",
      "number-fluency-41-to-60-app-menu-item"
    );
    this.numberFluency41to60AppMenuItem.setAttribute("app-style", "numbers");
    this.numberFluency41to60AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.numberFluency41to60AppMenuItem.innerText = "41-60";
    this.numberFluency41to60AppMenuItem.addEventListener("click", () => {
      appLauncher.startFluencyApp(3);
      this.removeMenu();
    });

    // 4. Number Fluency 61-80 App Menu Item
    this.numberFluency61to80AppMenuItem.setAttribute(
      "id",
      "number-fluency-61-to-80-app-menu-item"
    );
    this.numberFluency61to80AppMenuItem.setAttribute("app-style", "numbers");
    this.numberFluency61to80AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.numberFluency61to80AppMenuItem.innerText = "61-80";
    this.numberFluency61to80AppMenuItem.addEventListener("click", () => {
      appLauncher.startFluencyApp(4);
      this.removeMenu();
    });

    // 5. Number Fluency 81-100 App Menu Item
    this.numberFluency81to100AppMenuItem.setAttribute(
      "id",
      "number-fluency-81-to-100-app-menu-item"
    );
    this.numberFluency81to100AppMenuItem.setAttribute("app-style", "numbers");
    this.numberFluency81to100AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.numberFluency81to100AppMenuItem.innerText = "81-100";
    this.numberFluency81to100AppMenuItem.addEventListener("click", () => {
      appLauncher.startFluencyApp(5);
      this.removeMenu();
    });
    // 6. Number Writing 1-10 App Menu Item
    this.numberWriting1to10AppMenuItem.setAttribute(
      "id",
      "number-writing-1-to-10-app-menu-item"
    );
    this.numberWriting1to10AppMenuItem.setAttribute("app-style", "numbers");
    this.numberWriting1to10AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.numberWriting1to10AppMenuItem.innerText = "1-10";
    this.numberWriting1to10AppMenuItem.addEventListener("click", () => {
      appLauncher.startWritingApp("numbers1-10");
      this.removeMenu();
    });
    // 7. Number Writing 11-20 App Menu Item
    this.numberWriting11to20AppMenuItem.setAttribute(
      "id",
      "number-writing-11-to-20-app-menu-item"
    );
    this.numberWriting11to20AppMenuItem.setAttribute("app-style", "numbers");
    this.numberWriting11to20AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.numberWriting11to20AppMenuItem.innerText = "11-20";
    this.numberWriting11to20AppMenuItem.addEventListener("click", () => {
      appLauncher.startWritingApp("numbers11-20");
      this.removeMenu();
    });
    // 8. Number Writing 21-40 App Menu Item
    this.numberWriting21to40AppMenuItem.setAttribute(
      "id",
      "number-writing-21-to-40-app-menu-item"
    );
    this.numberWriting21to40AppMenuItem.setAttribute("app-style", "numbers");
    this.numberWriting21to40AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.numberWriting21to40AppMenuItem.innerText = "21-40";
    this.numberWriting21to40AppMenuItem.addEventListener("click", () => {
      appLauncher.startWritingApp("numbers21-40");
      this.removeMenu();
    });
    // 9. Number Writing 1-50 App Menu Item
    this.numberWriting1to50AppMenuItem.setAttribute(
      "id",
      "number-writing-1-to-50-app-menu-item"
    );
    this.numberWriting1to50AppMenuItem.setAttribute("app-style", "numbers");
    this.numberWriting1to50AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.numberWriting1to50AppMenuItem.innerText = "1-50";
    this.numberWriting1to50AppMenuItem.addEventListener("click", () => {
      appLauncher.startWritingApp("numbers1-50");
      this.removeMenu();
    });

    // "this" Bindings
    this.restoreMainMenu = this.restoreMainMenu.bind(this);
    this.returnToMainMenu = this.returnToMainMenu.bind(this);
  }

  /******
    Display Main Menu
  ******/
  displayMainPage() {
    menuItems.isPrimaryMenu = true;
    menuItems.isSecondaryMenu = false;
    menuItems.returnToMainMenuToggle();
    const navBarDisplay = `${user.firstName} ${user.lastName.slice(0, 1)}.`;
    navLogo.innerText = `KGPS English Practice`;
    navUserName.innerText = navBarDisplay;
  }
  hideParentsInfoBtn() {
    parentsInfo.classList.add("hidden");
  }
  displayParentsInfoBtn() {
    parentsInfo.classList.remove("hidden");
  }
  enableLogout() {
    if (document.querySelector(".logout")) {
      document.querySelector(".logout").addEventListener("click", logout);
    }
  }
  displayMainMenuItems() {
    primaryMenuContainer.appendChild(this.abcMenu);
    primaryMenuContainer.appendChild(this.numbersMenu);
    primaryMenuContainer.appendChild(this.sightWordsMenu);
    // primaryMenuContainer.appendChild(this.letterSoundsMenu);
  }

  /******
    Display Seconday Menu
  ******/

  displaySecondaryMenu(section) {
    this.hidePrimaryMenu();
    this.isPrimaryMenu = false;
    this.isSecondaryMenu = true;
    this.returnToMainMenuToggle();
    mainContainer.appendChild(this.secondaryMenuContainer);
    this.secondaryMenuContainer.appendChild(returnToMainMenuBtn);
    this.secondaryMenuContainer.appendChild(returnToMainMenuBtn);
    this.secondaryMenuContainer.appendChild(this.headersColumn);
    this.secondaryMenuContainer.appendChild(this.sectionColumn);
    this.headersColumn.appendChild(this.touchMenuHeader);
    this.headersColumn.appendChild(this.matchingMenuHeader);
    this.headersColumn.appendChild(this.fluencyMenuHeader);
    this.headersColumn.appendChild(this.writingMenuHeader);
    this.sectionColumn.appendChild(this.touchMenu);
    this.sectionColumn.appendChild(this.matchingMenu);
    this.sectionColumn.appendChild(this.fluencyMenu);
    this.sectionColumn.appendChild(this.writingMenu);
    this.sectionColumn.appendChild(this.moveMenuLeftBtn);
    this.sectionColumn.appendChild(this.moveMenuRightBtn);
    // this.moveMenuBtnContainer.appendChild(this.moveMenuLeftBtn);
    // this.moveMenuBtnContainer.appendChild(this.moveMenuRightBtn);
    // mainContainer.appendChild(this.moveMenuBtnContainer);

    switch (section) {
      case "alphabet":
        greetingDisplay.innerText = "Alphabet";
        this.alphabetCapitalsCardTouchAppMenuItem.classList.remove("hidden");
        this.alphabetLowercaseCardTouchAppMenuItem.classList.remove("hidden");
        this.alphabetMatchingAppMenuItem.classList.remove("hidden");
        this.touchMenu.appendChild(this.alphabetCapitalsCardTouchAppMenuItem);
        this.touchMenu.appendChild(this.alphabetLowercaseCardTouchAppMenuItem);
        this.matchingMenu.appendChild(this.alphabetMatchingAppMenuItem);
        break;
      case "numbers":
        greetingDisplay.innerText = "Numbers";
        this.fluencyMenu.appendChild(this.numberFluency1to20AppMenuItem);
        this.fluencyMenu.appendChild(this.numberFluency21to40AppMenuItem);
        this.fluencyMenu.appendChild(this.numberFluency41to60AppMenuItem);
        this.fluencyMenu.appendChild(this.numberFluency61to80AppMenuItem);
        this.fluencyMenu.appendChild(this.numberFluency81to100AppMenuItem);
        this.writingMenu.appendChild(this.numberWriting1to10AppMenuItem);
        this.writingMenu.appendChild(this.numberWriting11to20AppMenuItem);
        this.writingMenu.appendChild(this.numberWriting1to50AppMenuItem);
        break;
      case "sight-words":
        greetingDisplay.innerText = "Sight Words";
        this.touchMenu.appendChild(this.sightWords1AppMenuItem);
        this.touchMenu.appendChild(this.sightWords2AppMenuItem);
        this.touchMenu.appendChild(this.sightWords3AppMenuItem);
        this.writingMenu.appendChild(this.sightWords1WritingAppMenuItem);
        this.writingMenu.appendChild(this.sightWords2WritingAppMenuItem);
        this.writingMenu.appendChild(this.sightWords3WritingAppMenuItem);
        break;
      case "letter-sounds":
        greetingDisplay.innerText = "Letter Sounds";
        break;
    }
  }

  /******
    Removing and Restoring Menu
  ******/

  hidePrimaryMenu() {
    audio.navigationSfx.selectMenu.play();
    this.hideParentsInfoBtn();
    greetingDisplay.innerText = "";
    pointsDisplay.innerText = "";
    primaryMenuContainer.classList.add("hidden");
    this.abcMenu.classList.add("hidden");
    this.numbersMenu.classList.add("hidden");
    this.sightWordsMenu.classList.add("hidden");
  }
  unhidePrimaryMenu() {
    this.displayParentsInfoBtn();
    topContainer.innerText = "";
    primaryMenuContainer.classList.remove("hidden");
    this.abcMenu.classList.remove("hidden");
    this.numbersMenu.classList.remove("hidden");
    this.sightWordsMenu.classList.remove("hidden");
  }
  removeMenu() {
    // remove Primary menu
    if (this.isPrimaryMenu) {
      document.querySelectorAll(".primary-menu-item").forEach((item) => {
        item.classList.add("hide");
        item.remove();
      });
    }
    if (this.isSecondaryMenu) {
      // remove Secondary Menu
      document.querySelectorAll(".secondary-menu-item").forEach((item) => {
        item.classList.add("hide");
        item.remove();
      });
      document.querySelectorAll(".secondary-menu").forEach((item) => {
        item.classList.add("hide");
        item.remove();
      });
    }
  }
  removeMenuPage() {
    document.querySelectorAll(".secondary-menu");
    navBar.remove();
    navBar.classList.add("hidden");
    topContainer.remove();
    primaryMenuContainer.remove();
  }
  restoreMainMenu() {
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
    this.abcMenu.classList.remove("hidden");
    this.numbersMenu.classList.remove("hidden");
    this.sightWordsMenu.classList.remove("hidden");
  }
  returnToMainMenu() {
    audio.navigationSfx.backToPreviousMenu.play();
    this.removeMenu();
    this.unhidePrimaryMenu();
    this.resetSecondaryMenuPosition();
    this.displayParentsInfoBtn();
    topContainer.innerText = "";
    displayGreeting();
  }
  returnToMainMenuToggle() {
    if (!this.isPrimaryMenu) {
      returnToMainMenuBtn.classList.remove("hidden");
    } else if (this.isPrimaryMenu) {
      returnToMainMenuBtn.classList.add("hidden");
    }
  }
  resetSecondaryMenuPosition() {
    this.sectionColumn.style.translate = "0px";
  }
}

const menuItems = new MenuItems();

const navLogo = document.querySelector(".nav-logo");
const navUserSpace = document.querySelector(".nav-user");
const navUserName = document.querySelector(".nav-user-name");
const navUserMenu = document.querySelector(".nav-user-menu");

/* Top Page Menu Items Display Functions */

function startMainApp() {
  sessionCheck();
  setTimeout(() => {
    stylesheet.setAttribute(
      "href",
      "/KGPSEnglishPractice-test/resources/css/styles.css"
    );
    menuItems.displayMainMenuItems();
    setUser();
    getCumulativeUserScore();
    setTimeout(displayGreeting, 500);
    menuItems.displayMainPage();
  }, 1000);
}

function setUser() {
  user.gradeLevel = sessionData.gradeLevel;
  user.firstName = sessionData.firstName;
  user.lastName = sessionData.lastName;
  user.access = sessionData.access;
  user.id = sessionData.userId;
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
  menuItems.isPrimaryMenu = true;
  setTimeout(() => {
    const greeting = `Hi, ${user.firstName}!`;
    const userScore = `You have ${user.cumulativeScore} pts`;
    topContainer.appendChild(greetingDisplay);
    topContainer.appendChild(pointsDisplay);
    greetingDisplay.textContent = greeting;
    pointsDisplay.textContent = userScore;
  }, 300);
}

/*  Return to Main Page  */

const returnToMainMenuBtn = document.createElement("button");
returnToMainMenuBtn.innerText = `<- Back`;
returnToMainMenuBtn.classList.add("returnToMainMenuBtn");
returnToMainMenuBtn.setAttribute("id", "returnToMainMenuBtn");
returnToMainMenuBtn.addEventListener("click", menuItems.returnToMainMenu);

if (navBar) {
  body.appendChild(navBar);
}

export { menuItems, displayGreeting, getCumulativeUserScore, startMainApp };
