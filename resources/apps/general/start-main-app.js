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
********************
Menu Class
********************
*/
class MenuItems {
  constructor() {
    // Main Menu Items
    this.abcMenu = document.createElement("div");
    this.numbersMenu = document.createElement("div");
    this.sightWordsMenu = document.createElement("div");
    this.letterSoundsMenu = document.createElement("div");
    // Sub Menu Items
    this.alphabetCapitalsCardTouchAppMenuItem = document.createElement("div");
    this.alphabetLowercaseCardTouchAppMenuItem = document.createElement("div");
    this.alphabetMatchingAppMenuItem = document.createElement("div");
    this.sightWords1AppMenuItem = document.createElement("div");
    this.sightWords2AppMenuItem = document.createElement("div");
    this.sightWords3AppMenuItem = document.createElement("div");
    this.sightWords1WritingAppMenuItem = document.createElement("div");
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
    this.displayAlphabetSubMenu = this.displayAlphabetSubMenu.bind(this);
    this.displayLetterSoundsMenu = this.displayLetterSoundsMenu.bind(this);
    this.displayMainMenuItems = this.displayMainMenuItems.bind(this);
    this.displayNumbersMenu = this.displayNumbersMenu.bind(this);
    this.displaySightWordsMenu = this.displaySightWordsMenu.bind(this);
    this.restoreMainMenu = this.restoreMainMenu.bind(this);
    this.returnToMainMenu = this.returnToMainMenu.bind(this);
  }

  /******
    Create and Display Main Menu
  ******/

  createMainMenuItems() {
    // Alphabet
    this.abcMenu.setAttribute("id", "div1");
    this.abcMenu.classList.add("div", "div-start-menu1", "primary-menu-div");
    this.abcMenu.innerText = "ABCs";
    this.abcMenu.addEventListener("click", () => {
      menuItems.createAlphabetMenu();
      menuItems.displayAlphabetSubMenu();
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
      menuItems.createNumbersSubMenu();
      menuItems.displayNumbersMenu();
    });

    // Sight Words
    this.sightWordsMenu.setAttribute("id", "div3");
    this.sightWordsMenu.classList.add(
      "div",
      "div-start-menu4",
      "primary-menu-div"
    );
    this.sightWordsMenu.addEventListener("click", () => {
      menuItems.createSightWordsSubMenu();
      menuItems.displaySightWordsMenu();
    });
    this.sightWordsMenu.innerText = "Sight Words";

    // Letter Sounds
    // this.letterSoundsMenu.setAttribute("id", "div5");
    // this.letterSoundsMenu.classList.add(
    //   "div",
    //   "div-start-menu5",
    //   "primary-menu-div"
    // );
    // this.letterSoundsMenu.addEventListener("click", () => menuItems.displayLetterSoundsMenu());
    // this.letterSoundsMenu.innerText = "Letter Sounds";
  }
  displayMainMenuItems() {
    menuContainer.appendChild(this.abcMenu);
    menuContainer.appendChild(this.numbersMenu);
    menuContainer.appendChild(this.sightWordsMenu);
    // menuContainer.appendChild(this.letterSoundsMenu);
  }

  /******
    Create and Display Sub Menus
  ******/

  createAlphabetMenu() {
    // 1. Alphabet Capitals Touch App Menu Item
    this.alphabetCapitalsCardTouchAppMenuItem.setAttribute(
      "id",
      "alphabet-card-touch-app-menu-item",
      "tertiary-menu-item"
    );
    this.alphabetCapitalsCardTouchAppMenuItem.classList.add("div");
    this.alphabetCapitalsCardTouchAppMenuItem.innerText = "Card Touch!\r\n abc";
    this.alphabetCapitalsCardTouchAppMenuItem.addEventListener("click", () =>
      appLauncher.startCardTouchApp("capitals")
    );

    // 2. Alphabet Lowercase Touch App Menu Item
    this.alphabetLowercaseCardTouchAppMenuItem.setAttribute(
      "id",
      "alphabet-card-touch-app-menu-item",
      "tertiary-menu-item"
    );
    this.alphabetLowercaseCardTouchAppMenuItem.classList.add("div");
    this.alphabetLowercaseCardTouchAppMenuItem.innerText =
      "Card Touch!\r\n abc";
    this.alphabetLowercaseCardTouchAppMenuItem.addEventListener("click", () =>
      appLauncher.startCardTouchApp("lowercase")
    );

    // 3. Alphabet Matching App Menu Item
    this.alphabetMatchingAppMenuItem.setAttribute(
      "id",
      "alphabet-matching-app-menu-item",
      "tertiary-menu-item"
    );
    this.alphabetMatchingAppMenuItem.classList.add("div");
    this.alphabetMatchingAppMenuItem.innerText = "Letter Matching";
    this.alphabetMatchingAppMenuItem.addEventListener("click", () =>
      appLauncher.startMatchingApp("alphabet")
    );
  }
  displayAlphabetSubMenu() {
    isSecondaryMenu = false;
    isTertiaryMenu = true;
    mainMenuSfx.select2.play();
    isPrimaryMenu = false;
    hideParentsInfoBtn();
    topContainer.innerText = "Alphabet";
    this.abcMenu.classList.add("hidden");
    this.numbersMenu.classList.add("hidden");
    this.sightWordsMenu.classList.add("hidden");
    this.letterSoundsMenu.classList.add("hidden");
    menuContainer.appendChild(this.alphabetCapitalsCardTouchAppMenuItem);
    menuContainer.appendChild(this.alphabetLowercaseCardTouchAppMenuItem);
    menuContainer.appendChild(this.alphabetMatchingAppMenuItem);
    menuContainer.appendChild(returnToMainMenuBtn);
    this.alphabetCapitalsCardTouchAppMenuItem.classList.remove("hidden");
    this.alphabetLowercaseCardTouchAppMenuItem.classList.remove("hidden");
    this.alphabetMatchingAppMenuItem.classList.remove("hidden");
    menuItems.returnToMainMenuToggle();
  }
  createSightWordsSubMenu() {
    // 1. Sight Words 1 Touch App Menu Item
    this.sightWords1AppMenuItem.setAttribute(
      "id",
      "sight-words-1-app-menu-item",
      "tertiary-menu-item"
    );
    this.sightWords1AppMenuItem.classList.add("div");
    this.sightWords1AppMenuItem.innerText = "Sight Words 1";
    this.sightWords1AppMenuItem.addEventListener("click", () =>
      appLauncher.startCardTouchApp("sightwords1")
    );

    // 2. Sight Words 2 Touch App Menu Item
    this.sightWords2AppMenuItem.setAttribute(
      "id",
      "sight-words-2-app-menu-item",
      "tertiary-menu-item"
    );
    this.sightWords2AppMenuItem.classList.add("div");
    this.sightWords2AppMenuItem.innerText = "Sight Words 2";
    this.sightWords2AppMenuItem.addEventListener("click", () =>
      appLauncher.startCardTouchApp("sightwords2")
    );

    // 3. Sight Words 3 Matching App Menu Item
    this.sightWords3AppMenuItem.setAttribute(
      "id",
      "sight-words-3-app-menu-item",
      "tertiary-menu-item"
    );
    this.sightWords3AppMenuItem.classList.add("div");
    this.sightWords3AppMenuItem.innerText = "Sight Words 3";
    this.sightWords3AppMenuItem.addEventListener("click", () =>
      appLauncher.startCardTouchApp("sightwords3")
    );
    this.sightWords1WritingAppMenuItem.setAttribute(
      "id",
      "sight-words-1-writing-app-menu-item",
      "tertiary-menu-item"
    );
    this.sightWords1WritingAppMenuItem.classList.add("div");
    this.sightWords1WritingAppMenuItem.innerText = "Sight Words Writing";
    this.sightWords1WritingAppMenuItem.addEventListener("click", () =>
      appLauncher.startWritingApp("sightwords1")
    );
  }
  displaySightWordsMenu() {
    mainMenuSfx.select2.play();
    isPrimaryMenu = false;
    hideParentsInfoBtn();
    topContainer.innerText = "Sight Words";
    this.abcMenu.classList.add("hidden");
    this.numbersMenu.classList.add("hidden");
    this.sightWordsMenu.classList.add("hidden");
    this.letterSoundsMenu.classList.add("hidden");
    menuContainer.appendChild(this.sightWords1AppMenuItem);
    menuContainer.appendChild(this.sightWords2AppMenuItem);
    menuContainer.appendChild(this.sightWords3AppMenuItem);
    menuContainer.appendChild(this.sightWords1WritingAppMenuItem);
    menuContainer.appendChild(returnToMainMenuBtn);
    this.sightWords1AppMenuItem.classList.remove("hidden");
    this.sightWords2AppMenuItem.classList.remove("hidden");
    this.sightWords3AppMenuItem.classList.remove("hidden");
    this.sightWords1WritingAppMenuItem.classList.remove("hidden");
    menuItems.returnToMainMenuToggle();
  }
  createLetterSoundsSubMenu() {
    this.letterSoundsAMSFAppMenuItem.setAttribute(
      "id",
      "amsf-app-menu-item",
      "tertiary-menu-item"
    );
    this.letterSoundsAMSFAppMenuItem.classList.add("div");
    this.letterSoundsAMSFAppMenuItem.innerText = "a, m , s, f";
    this.letterSoundsAMSFAppMenuItem.addEventListener("click", () =>
      appLauncher.startCardTouchApp("letter-sounds-asmf")
    );
  }
  displayLetterSoundsMenu() {
    mainMenuSfx.select2.play();
    isPrimaryMenu = false;
    hideParentsInfoBtn();
    topContainer.innerText = "Sight Words";
    this.abcMenu.classList.add("hidden");
    this.numbersMenu.classList.add("hidden");
    this.sightWordsMenu.classList.add("hidden");
    this.letterSoundsMenu.classList.add("hidden");
    menuContainer.appendChild(this.letterSoundsAMSFAppMenuItem);
    this.letterSoundsAMSFAppMenuItem.classList.remove("hidden");
    menuItems.returnToMainMenuToggle();
  }
  createNumbersSubMenu() {
    // 1. Number Fluency 1-20 App Menu Item
    this.numberFluency1to20AppMenuItem.setAttribute(
      "id",
      "number-fluency-1-to-20-app-menu-item",
      "tertiary-menu-item"
    );
    this.numberFluency1to20AppMenuItem.classList.add("div");
    this.numberFluency1to20AppMenuItem.innerText = "Touch 1-20";
    this.numberFluency1to20AppMenuItem.addEventListener("click", () =>
      appLauncher.startFluencyApp(1)
    );

    // 2. Number Fluency 21-40 App Menu Item
    this.numberFluency21to40AppMenuItem.setAttribute(
      "id",
      "number-fluency-21-to-40-app-menu-item",
      "tertiary-menu-item"
    );
    this.numberFluency21to40AppMenuItem.classList.add("div");
    this.numberFluency21to40AppMenuItem.innerText = "Touch 21-40";
    this.numberFluency21to40AppMenuItem.addEventListener("click", () =>
      appLauncher.startFluencyApp(2)
    );

    // 3. Number Fluency 41-60 App Menu Item
    this.numberFluency41to60AppMenuItem.setAttribute(
      "id",
      "number-fluency-41-to-60-app-menu-item",
      "tertiary-menu-item"
    );
    this.numberFluency41to60AppMenuItem.classList.add("div");
    this.numberFluency41to60AppMenuItem.innerText = "Touch 41-60";
    this.numberFluency41to60AppMenuItem.addEventListener("click", () =>
      appLauncher.startFluencyApp(3)
    );

    // 4. Number Fluency 61-80 App Menu Item
    this.numberFluency61to80AppMenuItem.setAttribute(
      "id",
      "number-fluency-61-to-80-app-menu-item",
      "tertiary-menu-item"
    );
    this.numberFluency61to80AppMenuItem.classList.add("div");
    this.numberFluency61to80AppMenuItem.innerText = "Touch 61-80";
    this.numberFluency61to80AppMenuItem.addEventListener("click", () =>
      appLauncher.startFluencyApp(4)
    );

    // 5. Number Fluency 81-100 App Menu Item
    this.numberFluency81to100AppMenuItem.setAttribute(
      "id",
      "number-fluency-81-to-100-app-menu-item",
      "tertiary-menu-item"
    );
    this.numberFluency81to100AppMenuItem.classList.add("div");
    this.numberFluency81to100AppMenuItem.innerText = "Touch 81-100";
    this.numberFluency81to100AppMenuItem.addEventListener("click", () =>
      appLauncher.startFluencyApp(5)
    );
    // 6. Number Writing 1-10 App Menu Item
    this.numberWriting1to10AppMenuItem.setAttribute(
      "id",
      "number-writing-1-to-10-app-menu-item",
      "tertiary-menu-item"
    );
    this.numberWriting1to10AppMenuItem.classList.add("div");
    this.numberWriting1to10AppMenuItem.innerText = "Writing 1-10";
    this.numberWriting1to10AppMenuItem.addEventListener("click", () =>
      appLauncher.startWritingApp("numbers1-10")
    );
    // 7. Number Writing 11-20 App Menu Item
    this.numberWriting11to20AppMenuItem.setAttribute(
      "id",
      "number-writing-11-to-20-app-menu-item",
      "tertiary-menu-item"
    );
    this.numberWriting11to20AppMenuItem.classList.add("div");
    this.numberWriting11to20AppMenuItem.innerText = "Writing 11-20";
    this.numberWriting11to20AppMenuItem.addEventListener("click", () =>
      appLauncher.startWritingApp("numbers11-20")
    );
    // 8. Number Writing 21-40 App Menu Item
    this.numberWriting21to40AppMenuItem.setAttribute(
      "id",
      "number-writing-21-to-40-app-menu-item",
      "tertiary-menu-item"
    );
    this.numberWriting21to40AppMenuItem.classList.add("div");
    this.numberWriting21to40AppMenuItem.innerText = "Writing 21-40";
    this.numberWriting21to40AppMenuItem.addEventListener("click", () =>
      appLauncher.startWritingApp("numbers21-40")
    );
    // 9. Number Writing 1-50 App Menu Item
    this.numberWriting1to50AppMenuItem.setAttribute(
      "id",
      "number-writing-1-to-50-app-menu-item",
      "tertiary-menu-item"
    );
    this.numberWriting1to50AppMenuItem.classList.add("div");
    this.numberWriting1to50AppMenuItem.innerText = "Writing 1-50";
    this.numberWriting1to50AppMenuItem.addEventListener("click", () =>
      appLauncher.startWritingApp("numbers1-50")
    );
  }
  displayNumbersMenu() {
    mainMenuSfx.select2.play();
    isPrimaryMenu = false;
    hideParentsInfoBtn();
    topContainer.innerText = "Numbers";
    this.abcMenu.classList.add("hidden");
    this.numbersMenu.classList.add("hidden");
    this.sightWordsMenu.classList.add("hidden");
    menuContainer.appendChild(this.numberFluency1to20AppMenuItem);
    menuContainer.appendChild(this.numberFluency21to40AppMenuItem);
    menuContainer.appendChild(this.numberFluency41to60AppMenuItem);
    menuContainer.appendChild(this.numberFluency61to80AppMenuItem);
    menuContainer.appendChild(this.numberFluency81to100AppMenuItem);
    menuContainer.appendChild(this.numberWriting1to10AppMenuItem);
    menuContainer.appendChild(this.numberWriting11to20AppMenuItem);
    menuContainer.appendChild(this.numberWriting21to40AppMenuItem);
    menuContainer.appendChild(this.numberWriting1to50AppMenuItem);
    menuContainer.appendChild(returnToMainMenuBtn);
    this.numberFluency1to20AppMenuItem.classList.remove("hidden");
    this.numberFluency21to40AppMenuItem.classList.remove("hidden");
    this.numberFluency41to60AppMenuItem.classList.remove("hidden");
    this.numberFluency61to80AppMenuItem.classList.remove("hidden");
    this.numberFluency81to100AppMenuItem.classList.remove("hidden");
    menuItems.returnToMainMenuToggle();
  }

  /******
    Removing and Restoring Menu
  ******/

  removeMenu() {
    //remove current menu
    if (isPrimaryMenu) {
      //remove main menu
      document.querySelectorAll("primary-menu-item").forEach((item) => {
        item.remove();
      });
    }
    if (isSecondaryMenu) {
      //remove main menu
      const items = document.querySelectorAll("secondary-menu-item");
      console.log(items);

      items.forEach((item) => {
        item.remove();
      });
    }
    if (isTertiaryMenu) {
      //remove tertiary menu
      const items = document.querySelectorAll("tertiary-menu-item");
      console.log(items);

      items.forEach((item) => {
        item.remove();
      });
    }
  }
  removeMenuPage() {
    navBar.remove();
    this.alphabetCapitalsCardTouchAppMenuItem.remove();
    this.alphabetLowercaseCardTouchAppMenuItem.remove();
    this.alphabetMatchingAppMenuItem.remove();
    this.numberFluency1to20AppMenuItem.remove();
    this.numberFluency21to40AppMenuItem.remove();
    this.numberFluency41to60AppMenuItem.remove();
    this.numberFluency61to80AppMenuItem.remove();
    this.numberFluency81to100AppMenuItem.remove();
    this.sightWords1AppMenuItem.remove();
    this.sightWords2AppMenuItem.remove();
    this.sightWords3AppMenuItem.remove();
    this.sightWords1WritingAppMenuItem.remove();
    navBar.classList.add("hidden");
    topContainer.classList.add("hidden");
    menuContainer.classList.add("hidden");
    this.abcMenu.classList.add("hidden");
    this.numbersMenu.classList.add("hidden");
    this.sightWordsMenu.classList.add("hidden");
    parentsInfo.remove();
    topContainer.remove();
    menuContainer.remove();
  }
  restoreMainMenu() {
    body.appendChild(navBar);
    topContainer.innerText = "";
    body.appendChild(parentsInfo);
    mainContainer.appendChild(topContainer);
    mainContainer.appendChild(menuContainer);
    navBar.classList.remove("hidden");
    topContainer.classList.remove("hidden");
    getCumulativeUserScore();
    setTimeout(displayGreeting, 500);
    menuContainer.classList.remove("hidden");
    this.abcMenu.classList.remove("hidden");
    this.numbersMenu.classList.remove("hidden");
    this.sightWordsMenu.classList.remove("hidden");
  }
  returnToMainMenu() {
    mainMenuSfx.back.play();
    topContainer.innerText = "";
    displayParentsInfoBtn();
    displayGreeting();
    this.abcMenu.classList.remove("hidden");
    this.numbersMenu.classList.remove("hidden");
    this.sightWordsMenu.classList.remove("hidden");
    // this.letterSoundsMenu.classList.remove("hidden");
    this.alphabetCapitalsCardTouchAppMenuItem.remove();
    this.alphabetLowercaseCardTouchAppMenuItem.remove();
    this.alphabetMatchingAppMenuItem.remove();
    this.sightWords1AppMenuItem.remove();
    this.sightWords2AppMenuItem.remove();
    this.sightWords3AppMenuItem.remove();
    this.sightWords1WritingAppMenuItem.remove();
    this.numberFluency1to20AppMenuItem.remove();
    this.numberFluency21to40AppMenuItem.remove();
    this.numberFluency41to60AppMenuItem.remove();
    this.numberFluency61to80AppMenuItem.remove();
    this.numberFluency81to100AppMenuItem.remove();
    displayMainPage();
    menuItems.returnToMainMenuToggle();
  }
  returnToMainMenuToggle() {
    if (!isPrimaryMenu) {
      returnToMainMenuBtn.classList.remove("hidden");
    } else if (isPrimaryMenu) {
      returnToMainMenuBtn.classList.add("hidden");
    }
  }
}

const menuItems = new MenuItems();

const navLogo = document.querySelector(".nav-logo");
const navUserSpace = document.querySelector(".nav-user");
const navUserName = document.querySelector(".nav-user-name");
const navUserMenu = document.querySelector(".nav-user-menu");

/* Top Page Menu Items Display Functions */

let isPrimaryMenu = true;
let isSecondaryMenu = false;
let isTertiaryMenu = false;
function startMainApp() {
  sessionCheck();
  setTimeout(() => {
    stylesheet.setAttribute(
      "href",
      "/KGPSEnglishPractice-test/resources/css/styles.css"
    );
    menuItems.createMainMenuItems();
    menuItems.displayMainMenuItems();
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
  isPrimaryMenu = true;
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
  isPrimaryMenu = true;
  menuItems.returnToMainMenuToggle();
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
returnToMainMenuBtn.addEventListener("click", menuItems.removeMenu);

if (navBar) {
  body.appendChild(navBar);
}

export {
  menuItems,
  displayGreeting,
  displayMainPage,
  getCumulativeUserScore,
  hideParentsInfoBtn,
  startMainApp,
  mainMenuSfx,
};
