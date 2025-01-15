import {
  body,
  navBar,
  mainContainer,
  primaryMenuContainer,
  stylesheet,
  topContainer,
  // parentsInfo,
} from "../../utilities/variables.js";
import { logout } from "../../utilities/logout.js";
import { sessionCheck, sessionData } from "../../login/session-check.js";
import { user } from "../../utilities/user-object.js";
import { audio } from "../../utilities/audio.js";
import { cardTouchApp } from "../card-touch/card-touch.js";
import { fluencyApp } from "../fluency/fluency.js";
import { matchingApp } from "../matching/matching.js";
import { writingApp } from "../writing/writing.js";
import { BASE_PATH } from "../../utilities/get-base-path.js";
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
    this.rect = null;
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
    this.numbersMenu.innerText = "1, 2, 3...";
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
    this.letterSoundsMenu.setAttribute("id", "div3");
    this.letterSoundsMenu.classList.add(
      "div",
      "div-start-menu3",
      "primary-menu-div"
    );
    this.letterSoundsMenu.addEventListener("click", () => {
      this.section = "letter-sounds";
      menuItems.displaySecondaryMenu(this.section);
    });
    this.letterSoundsMenu.innerText = "Letter Sounds";

    // Seondary Menu

    this.moveMenuRightBtn = document.createElement("button");
    this.moveMenuRightBtn.classList.add("move-menu-right-btn");
    this.moveMenuRightBtn.addEventListener("pointerdown", () => {
      this.scrollRight();
      // this.displayMovementArrows();
    });
    this.moveMenuLeftBtn = document.createElement("button");
    this.moveMenuLeftBtn.classList.add("move-menu-left-btn", "hide");
    this.moveMenuLeftBtn.addEventListener("pointerdown", () => {
      this.scrollLeft();
      // this.displayMovementArrows();
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
    this.letterSoundsTouchAMSFLettersAppMenuItem =
      document.createElement("div");
    this.letterSoundsTouchAMSFWordsAppMenuItem = document.createElement("div");
    this.letterSoundsWritingAMSFLettersAppMenuItem =
      document.createElement("div");
    this.letterSoundsWritingAMSFWordsAppMenuItem =
      document.createElement("div");
    this.sightWords1AppMenuItem = document.createElement("div");
    this.sightWords2AppMenuItem = document.createElement("div");
    this.sightWords3AppMenuItem = document.createElement("div");
    this.sightWords1WritingAppMenuItem = document.createElement("div");
    this.sightWords2WritingAppMenuItem = document.createElement("div");
    this.sightWords3WritingAppMenuItem = document.createElement("div");

    this.numberFluency1to20AppMenuItem = document.createElement("div");
    this.numberFluency21to40AppMenuItem = document.createElement("div");
    this.numberFluency41to60AppMenuItem = document.createElement("div");
    this.numberFluency61to80AppMenuItem = document.createElement("div");
    this.numberFluency81to100AppMenuItem = document.createElement("div");
    this.numberWriting1to10AppMenuItem = document.createElement("div");
    this.numberWriting11to20AppMenuItem = document.createElement("div");
    this.numberWriting21to40AppMenuItem = document.createElement("div");
    this.numberWriting41to60AppMenuItem = document.createElement("div");
    this.numberWriting61to80AppMenuItem = document.createElement("div");
    this.numberWriting81to100AppMenuItem = document.createElement("div");
    this.numberWriting1to50AppMenuItem = document.createElement("div");
    this.numberWriting51to100AppMenuItem = document.createElement("div");
    this.numberWriting1to100AppMenuItem = document.createElement("div");
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
      this.removeMenu();
      audio.navigationSfx.selectMenu.play();
      cardTouchApp("alphabet-capitals");
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
      this.removeMenu();
      audio.navigationSfx.selectMenu.play();
      cardTouchApp("alphabet-lowercase");
    });

    // 3. Alphabet Matching App Menu Item
    this.alphabetMatchingAppMenuItem.setAttribute(
      "id",
      "alphabet-matching-app-menu-item"
    );
    this.alphabetMatchingAppMenuItem.setAttribute("app-type", "matching");
    this.alphabetMatchingAppMenuItem.setAttribute("app-content", "alphabet");
    this.alphabetMatchingAppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.alphabetMatchingAppMenuItem.innerText = "Aーa";
    this.alphabetMatchingAppMenuItem.addEventListener("click", () => {
      this.removeMenu();
      audio.navigationSfx.selectMenu.play();
      matchingApp.run("alphabet", 60);
    });

    // 1. Letter Sounds AMSF Letters Touch App Menu Item
    this.letterSoundsTouchAMSFLettersAppMenuItem.setAttribute(
      "id",
      "letter-sounds-amsf-app-menu-item"
    );
    this.letterSoundsTouchAMSFLettersAppMenuItem.setAttribute(
      "app-type",
      "touch"
    );
    this.letterSoundsTouchAMSFLettersAppMenuItem.setAttribute(
      "app-content",
      "letter-sounds"
    );
    this.letterSoundsTouchAMSFLettersAppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.letterSoundsTouchAMSFLettersAppMenuItem.innerText = "a s m f";
    this.letterSoundsTouchAMSFLettersAppMenuItem.addEventListener(
      "click",
      () => {
        this.removeMenu();
        audio.navigationSfx.selectMenu.play();
        cardTouchApp("letter-sounds-asmf-letters");
      }
    );
    // 2. Letter Sounds AMSF Words Touch App Menu Item
    this.letterSoundsTouchAMSFWordsAppMenuItem.setAttribute(
      "id",
      "letter-sounds-amsf-app-menu-item"
    );
    this.letterSoundsTouchAMSFWordsAppMenuItem.setAttribute(
      "app-type",
      "touch"
    );
    this.letterSoundsTouchAMSFWordsAppMenuItem.setAttribute(
      "app-content",
      "letter-sounds"
    );
    this.letterSoundsTouchAMSFWordsAppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.letterSoundsTouchAMSFWordsAppMenuItem.innerText = "am, aff...";
    this.letterSoundsTouchAMSFWordsAppMenuItem.addEventListener("click", () => {
      this.removeMenu();
      audio.navigationSfx.selectMenu.play();
      cardTouchApp("letter-sounds-asmf-words");
    });

    // 1. Letter Sounds Letters (ASMF) Writing App Menu Item
    this.letterSoundsWritingAMSFLettersAppMenuItem.setAttribute(
      "id",
      "letter-sounds-amsf-letters-app-menu-item"
    );
    this.letterSoundsWritingAMSFLettersAppMenuItem.setAttribute(
      "app-type",
      "writing"
    );
    this.letterSoundsWritingAMSFLettersAppMenuItem.setAttribute(
      "app-content",
      "letter-sounds"
    );
    this.letterSoundsWritingAMSFLettersAppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.letterSoundsWritingAMSFLettersAppMenuItem.innerText = "a s m f";
    this.letterSoundsWritingAMSFLettersAppMenuItem.addEventListener(
      "click",
      () => {
        this.removeMenu();
        audio.navigationSfx.selectMenu.play();
        writingApp.run("letter-sounds-asmf-letters", 0);
      }
    );
    // 2. Letter Sounds Words (ASMF) Writing App Menu Item
    this.letterSoundsWritingAMSFWordsAppMenuItem.setAttribute(
      "id",
      "letter-sounds-amsf-words-app-menu-item"
    );
    this.letterSoundsWritingAMSFWordsAppMenuItem.setAttribute(
      "app-type",
      "writing"
    );
    this.letterSoundsWritingAMSFWordsAppMenuItem.setAttribute(
      "app-content",
      "letter-sounds"
    );
    this.letterSoundsWritingAMSFWordsAppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.letterSoundsWritingAMSFWordsAppMenuItem.innerText = "am, aff...";
    this.letterSoundsWritingAMSFWordsAppMenuItem.addEventListener(
      "click",
      () => {
        this.removeMenu();
        audio.navigationSfx.selectMenu.play();
        writingApp.run("letter-sounds-asmf-words", 0);
      }
    );

    // 1. Sight Words 1 Touch App Menu Item
    this.sightWords1AppMenuItem.setAttribute(
      "id",
      "sight-words-1-app-menu-item"
    );
    this.sightWords1AppMenuItem.setAttribute("app-type", "touch");
    this.sightWords1AppMenuItem.setAttribute("app-content", "sight-words");
    this.sightWords1AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.sightWords1AppMenuItem.innerText = "Group 1";
    this.sightWords1AppMenuItem.addEventListener("click", () => {
      this.removeMenu();
      audio.navigationSfx.selectMenu.play();
      cardTouchApp("sightwords1");
    });

    // 2. Sight Words 2 Touch App Menu Item
    this.sightWords2AppMenuItem.setAttribute(
      "id",
      "sight-words-2-app-menu-item"
    );
    this.sightWords2AppMenuItem.setAttribute("app-type", "touch");
    this.sightWords2AppMenuItem.setAttribute("app-content", "sight-words");
    this.sightWords2AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.sightWords2AppMenuItem.innerText = "Group 2";
    this.sightWords2AppMenuItem.addEventListener("click", () => {
      this.removeMenu();
      audio.navigationSfx.selectMenu.play();
      cardTouchApp("sightwords2");
    });

    // 3. Sight Words 3 Touch App Menu Item
    this.sightWords3AppMenuItem.setAttribute(
      "id",
      "sight-words-3-app-menu-item"
    );
    this.sightWords3AppMenuItem.setAttribute("app-type", "touch");
    this.sightWords3AppMenuItem.setAttribute("app-content", "sight-words");
    this.sightWords3AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.sightWords3AppMenuItem.innerText = "Group 3";
    this.sightWords3AppMenuItem.addEventListener("click", () => {
      this.removeMenu();
      audio.navigationSfx.selectMenu.play();
      cardTouchApp("sightwords3");
    });

    // 4. Sight Words 1 Writing App Menu Item
    this.sightWords1WritingAppMenuItem.setAttribute(
      "id",
      "sight-words-1-writing-app-menu-item"
    );
    this.sightWords1WritingAppMenuItem.setAttribute("app-type", "writing");
    this.sightWords1WritingAppMenuItem.setAttribute(
      "app-content",
      "sight-words"
    );
    this.sightWords1WritingAppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.sightWords1WritingAppMenuItem.innerText = "Group 1";
    this.sightWords1WritingAppMenuItem.addEventListener("click", () => {
      this.removeMenu();
      audio.navigationSfx.selectMenu.play();
      writingApp.run("sightwords1", 0);
    });
    // 4. Sight Words 2 Writing App Menu Item
    this.sightWords2WritingAppMenuItem.setAttribute(
      "id",
      "sight-words-2-writing-app-menu-item"
    );
    this.sightWords2WritingAppMenuItem.setAttribute("app-type", "writing");
    this.sightWords2WritingAppMenuItem.setAttribute(
      "app-content",
      "sight-words"
    );
    this.sightWords2WritingAppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.sightWords2WritingAppMenuItem.innerText = "Group 2";
    this.sightWords2WritingAppMenuItem.addEventListener("click", () => {
      this.removeMenu();
      audio.navigationSfx.selectMenu.play();
      writingApp.run("sightwords2", 0);
    });
    // 4. Sight Words 3 Writing App Menu Item
    this.sightWords3WritingAppMenuItem.setAttribute(
      "id",
      "sight-words-3-writing-app-menu-item"
    );
    this.sightWords3WritingAppMenuItem.setAttribute("app-type", "writing");
    this.sightWords3WritingAppMenuItem.setAttribute(
      "app-content",
      "sight-words"
    );
    this.sightWords3WritingAppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.sightWords3WritingAppMenuItem.innerText = "Group 3";
    this.sightWords3WritingAppMenuItem.addEventListener("click", () => {
      this.removeMenu();
      audio.navigationSfx.selectMenu.play();
      writingApp.run("sightwords3", 0);
    });

    // 1. Number Fluency 1-20 App Menu Item
    this.numberFluency1to20AppMenuItem.setAttribute(
      "id",
      "number-fluency-1-to-20-app-menu-item"
    );
    this.numberFluency1to20AppMenuItem.setAttribute("app-type", "fluency");
    this.numberFluency1to20AppMenuItem.setAttribute("app-content", "numbers");
    this.numberFluency1to20AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.numberFluency1to20AppMenuItem.innerText = "1-20";
    this.numberFluency1to20AppMenuItem.addEventListener("click", () => {
      this.removeMenu();
      audio.navigationSfx.selectMenu.play();
      fluencyApp("numbers1-20");
    });

    // 2. Number Fluency 21-40 App Menu Item
    this.numberFluency21to40AppMenuItem.setAttribute(
      "id",
      "number-fluency-21-to-40-app-menu-item"
    );
    this.numberFluency21to40AppMenuItem.setAttribute("app-type", "fluency");
    this.numberFluency21to40AppMenuItem.setAttribute("app-content", "numbers");
    this.numberFluency21to40AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.numberFluency21to40AppMenuItem.innerText = "21-40";
    this.numberFluency21to40AppMenuItem.addEventListener("click", () => {
      this.removeMenu();
      audio.navigationSfx.selectMenu.play();
      fluencyApp("numbers21-40");
    });

    // 3. Number Fluency 41-60 App Menu Item
    this.numberFluency41to60AppMenuItem.setAttribute(
      "id",
      "number-fluency-41-to-60-app-menu-item"
    );
    this.numberFluency41to60AppMenuItem.setAttribute("app-type", "fluency");
    this.numberFluency41to60AppMenuItem.setAttribute("app-content", "numbers");
    this.numberFluency41to60AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.numberFluency41to60AppMenuItem.innerText = "41-60";
    this.numberFluency41to60AppMenuItem.addEventListener("click", () => {
      this.removeMenu();
      audio.navigationSfx.selectMenu.play();
      fluencyApp("numbers41-60");
    });

    // 4. Number Fluency 61-80 App Menu Item
    this.numberFluency61to80AppMenuItem.setAttribute(
      "id",
      "number-fluency-61-to-80-app-menu-item"
    );
    this.numberFluency61to80AppMenuItem.setAttribute("app-type", "fluency");
    this.numberFluency61to80AppMenuItem.setAttribute("app-content", "numbers");
    this.numberFluency61to80AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.numberFluency61to80AppMenuItem.innerText = "61-80";
    this.numberFluency61to80AppMenuItem.addEventListener("click", () => {
      this.removeMenu();
      audio.navigationSfx.selectMenu.play();
      fluencyApp("numbers61-80");
    });

    // 5. Number Fluency 81-100 App Menu Item
    this.numberFluency81to100AppMenuItem.setAttribute(
      "id",
      "number-fluency-81-to-100-app-menu-item"
    );
    this.numberFluency81to100AppMenuItem.setAttribute("app-type", "fluency");
    this.numberFluency81to100AppMenuItem.setAttribute("app-content", "numbers");
    this.numberFluency81to100AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.numberFluency81to100AppMenuItem.innerText = "81-100";
    this.numberFluency81to100AppMenuItem.addEventListener("click", () => {
      this.removeMenu();
      audio.navigationSfx.selectMenu.play();
      fluencyApp("numbers81-100");
    });
    // 6. Number Writing 1-10 App Menu Item
    this.numberWriting1to10AppMenuItem.setAttribute(
      "id",
      "number-writing-1-to-10-app-menu-item"
    );
    this.numberWriting1to10AppMenuItem.setAttribute("app-type", "writing");
    this.numberWriting1to10AppMenuItem.setAttribute("app-content", "numbers");
    this.numberWriting1to10AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.numberWriting1to10AppMenuItem.innerText = "1-10";
    this.numberWriting1to10AppMenuItem.addEventListener("click", () => {
      this.removeMenu();
      audio.navigationSfx.selectMenu.play();
      writingApp.run("numbers1-10", 0);
    });
    // 7. Number Writing 11-20 App Menu Item
    this.numberWriting11to20AppMenuItem.setAttribute(
      "id",
      "number-writing-11-to-20-app-menu-item"
    );
    this.numberWriting11to20AppMenuItem.setAttribute("app-type", "writing");
    this.numberWriting11to20AppMenuItem.setAttribute("app-content", "numbers");
    this.numberWriting11to20AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.numberWriting11to20AppMenuItem.innerText = "11-20";
    this.numberWriting11to20AppMenuItem.addEventListener("click", () => {
      this.removeMenu();
      audio.navigationSfx.selectMenu.play();
      writingApp.run("numbers11-20", 0);
    });
    // 8. Number Writing 21-40 App Menu Item
    this.numberWriting21to40AppMenuItem.setAttribute(
      "id",
      "number-writing-21-to-40-app-menu-item"
    );
    this.numberWriting21to40AppMenuItem.setAttribute("app-type", "writing");
    this.numberWriting21to40AppMenuItem.setAttribute("app-content", "numbers");
    this.numberWriting21to40AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.numberWriting21to40AppMenuItem.innerText = "21-40";
    this.numberWriting21to40AppMenuItem.addEventListener("click", () => {
      this.removeMenu();
      audio.navigationSfx.selectMenu.play();
      writingApp.run("numbers21-40", 0);
    });
    // 9. Number Writing 41-60 App Menu Item
    this.numberWriting41to60AppMenuItem.setAttribute(
      "id",
      "number-writing-41-to-60-app-menu-item"
    );
    this.numberWriting41to60AppMenuItem.setAttribute("app-type", "writing");
    this.numberWriting41to60AppMenuItem.setAttribute("app-content", "numbers");
    this.numberWriting41to60AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.numberWriting41to60AppMenuItem.innerText = "41-60";
    this.numberWriting41to60AppMenuItem.addEventListener("click", () => {
      this.removeMenu();
      audio.navigationSfx.selectMenu.play();
      writingApp.run("numbers21-40", 0);
    });
    // 10. Number Writing 61-80 App Menu Item
    this.numberWriting61to80AppMenuItem.setAttribute(
      "id",
      "number-writing-61-to-80-app-menu-item"
    );
    this.numberWriting61to80AppMenuItem.setAttribute("app-type", "writing");
    this.numberWriting61to80AppMenuItem.setAttribute("app-content", "numbers");
    this.numberWriting61to80AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.numberWriting61to80AppMenuItem.innerText = "61-80";
    this.numberWriting61to80AppMenuItem.addEventListener("click", () => {
      this.removeMenu();
      audio.navigationSfx.selectMenu.play();
      writingApp.run("numbers21-40", 0);
    });
    // 11. Number Writing 81-100 App Menu Item
    this.numberWriting81to100AppMenuItem.setAttribute(
      "id",
      "number-writing-81-to-100-app-menu-item"
    );
    this.numberWriting81to100AppMenuItem.setAttribute("app-type", "writing");
    this.numberWriting81to100AppMenuItem.setAttribute("app-content", "numbers");
    this.numberWriting81to100AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.numberWriting81to100AppMenuItem.innerText = "81-100";
    this.numberWriting81to100AppMenuItem.addEventListener("click", () => {
      this.removeMenu();
      audio.navigationSfx.selectMenu.play();
      writingApp.run("numbers21-40", 0);
    });

    // 12. Number Writing 1-50 App Menu Item
    this.numberWriting1to50AppMenuItem.setAttribute(
      "id",
      "number-writing-1-to-50-app-menu-item"
    );
    this.numberWriting1to50AppMenuItem.setAttribute("app-type", "writing");
    this.numberWriting1to50AppMenuItem.setAttribute("app-content", "numbers");
    this.numberWriting1to50AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.numberWriting1to50AppMenuItem.innerText = "1-50";
    this.numberWriting1to50AppMenuItem.addEventListener("click", () => {
      this.removeMenu();
      audio.navigationSfx.selectMenu.play();
      writingApp.run("numbers1-50", 0);
    });
    // 13. Number Writing 51-100 App Menu Item
    this.numberWriting51to100AppMenuItem.setAttribute(
      "id",
      "number-writing-51-to-100-app-menu-item"
    );
    this.numberWriting51to100AppMenuItem.setAttribute("app-type", "writing");
    this.numberWriting51to100AppMenuItem.setAttribute("app-content", "numbers");
    this.numberWriting51to100AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.numberWriting51to100AppMenuItem.innerText = "51-100";
    this.numberWriting51to100AppMenuItem.addEventListener("click", () => {
      this.removeMenu();
      audio.navigationSfx.selectMenu.play();
      writingApp.run("numbers51-100", 0);
    });
    // 14. Number Writing 1-100 App Menu Item
    this.numberWriting1to100AppMenuItem.setAttribute(
      "id",
      "number-writing-1-to-100-app-menu-item"
    );
    this.numberWriting1to100AppMenuItem.setAttribute("app-type", "writing");
    this.numberWriting1to100AppMenuItem.setAttribute("app-content", "numbers");
    this.numberWriting1to100AppMenuItem.classList.add(
      "secondary-menu-div",
      "secondary-menu-item"
    );
    this.numberWriting1to100AppMenuItem.innerText = "1-100";
    this.numberWriting1to100AppMenuItem.addEventListener("click", () => {
      this.removeMenu();
      audio.navigationSfx.selectMenu.play();
      writingApp.run("numbers1-100", 0);
    });

    // "this" Bindings
    this.restoreMainMenu = this.restoreMainMenu.bind(this);
    this.returnToMainMenu = this.returnToMainMenu.bind(this);

    // return to main menu btn
    this.returnToMainMenuBtn = document.createElement("div");
    this.returnToMainMenuBtn.innerText = `<- Back`;
    this.returnToMainMenuBtn.classList.add("return-to-main-menu-btn");
    this.returnToMainMenuBtn.addEventListener(
      "pointerdown",
      this.returnToMainMenu
    );
  }

  /******
    Display Main Menu
  ******/
  startMainApp() {
    sessionCheck();
    setTimeout(() => {
      this.resetSecondaryMenuHorizontalScroll();
      stylesheet.setAttribute("href", `${BASE_PATH}resources/css/styles.css`);
      menuItems.displayMainMenuItems();
      this.setUser();
      getCumulativeUserScore();
      setTimeout(this.displayGreeting, 500);
      menuItems.displayMainPage();
    }, 1500);
  }
  displayMainPage() {
    this.hideSecondaryMenu();
    this.showPrimaryMenu();
    this.resetSecondaryMenuPosition();
    this.setPrimaryMenuTrue();
    menuItems.returnToMainMenuToggle();
    let navBarDisplay;
    try {
      if (user.id !== null || user.id !== undefined) {
        navBarDisplay = `${user.firstName} ${user.lastName.slice(0, 1)}.`;
      } else {
        navBarDisplay = "Logout";
      }
    } catch (error) {
      console.error("Could not get user name", error);
    }

    navLogo.innerHTML = `<a href="${BASE_PATH}index.html">KGPS Extra English Practice</a>`;
    navUserName.innerText = navBarDisplay;
    this.enableLogout();
  }
  hideParentsInfoBtn() {
    parentsInfo.classList.add("hidden");
  }
  displayParentsInfoBtn() {
    parentsInfo.classList.remove("hidden");
  }
  enableLogout() {
    if (document.querySelector(".logout")) {
      document.querySelector(".logout").addEventListener("pointerdown", () => {
        logout();
      });
    }
  }
  displayMainMenuItems() {
    primaryMenuContainer.appendChild(this.abcMenu);
    primaryMenuContainer.appendChild(this.numbersMenu);
    primaryMenuContainer.appendChild(this.sightWordsMenu);
    primaryMenuContainer.appendChild(this.letterSoundsMenu);
  }

  /******
    Display Seconday  Menu 
  ******/
  removeSectionColumnMenuItems() {
    this.sectionColumn.childNodes.forEach((menu) => {
      menu.childNodes.forEach((item) => {
        item.classList.add("hide");
      });
    });
  }
  displaySecondaryMenu(section) {
    this.removeSectionColumnMenuItems();
    this.hidePrimaryMenu();
    this.setSecondaryMenuTrue();
    this.returnToMainMenuToggle();
    this.displayMovementArrows();
    mainContainer.appendChild(this.secondaryMenuContainer);
    this.secondaryMenuContainer.appendChild(this.returnToMainMenuBtn);
    this.secondaryMenuContainer.appendChild(this.moveMenuLeftBtn);
    this.secondaryMenuContainer.appendChild(this.moveMenuRightBtn);
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
    this.showSecondaryMenu();

    switch (section) {
      case "alphabet":
        greetingDisplay.innerText = "Alphabet";
        this.touchMenu.appendChild(this.alphabetCapitalsCardTouchAppMenuItem);
        this.touchMenu.appendChild(this.alphabetLowercaseCardTouchAppMenuItem);
        this.matchingMenu.appendChild(this.alphabetMatchingAppMenuItem);
        document
          .querySelectorAll("[app-content='alphabet']")
          .forEach((item) => {
            // if (this.touchMenu

            // )
            // this.touchMenu.appendChild(item);
            if (item.classList.contains("hidden")) {
              item.classList.remove("hidden");
            }
            if (item.classList.contains("hide")) {
              item.classList.remove("hide");
            }
          });
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
        this.writingMenu.appendChild(this.numberWriting21to40AppMenuItem);
        this.writingMenu.appendChild(this.numberWriting41to60AppMenuItem);
        this.writingMenu.appendChild(this.numberWriting61to80AppMenuItem);
        this.writingMenu.appendChild(this.numberWriting81to100AppMenuItem);
        this.writingMenu.appendChild(this.numberWriting1to50AppMenuItem);
        this.writingMenu.appendChild(this.numberWriting51to100AppMenuItem);
        this.writingMenu.appendChild(this.numberWriting1to100AppMenuItem);
        document.querySelectorAll("[app-content='numbers']").forEach((item) => {
          // if (this.touchMenu

          // )
          // this.touchMenu.appendChild(item);
          if (item.classList.contains("hidden")) {
            item.classList.remove("hidden");
          }
          if (item.classList.contains("hide")) {
            item.classList.remove("hide");
          }
        });
        break;
      case "letter-sounds":
        greetingDisplay.innerText = "Letter Sounds";
        this.touchMenu.appendChild(
          this.letterSoundsTouchAMSFLettersAppMenuItem
        );
        this.touchMenu.appendChild(this.letterSoundsTouchAMSFWordsAppMenuItem);
        this.writingMenu.appendChild(
          this.letterSoundsWritingAMSFLettersAppMenuItem
        );
        this.writingMenu.appendChild(
          this.letterSoundsWritingAMSFWordsAppMenuItem
        );
        document
          .querySelectorAll("[app-content='letter-sounds']")
          .forEach((item) => {
            // if (this.touchMenu

            // )
            // this.touchMenu.appendChild(item);
            if (item.classList.contains("hidden")) {
              item.classList.remove("hidden");
            }
            if (item.classList.contains("hide")) {
              item.classList.remove("hide");
            }
          });
        break;
      case "sight-words":
        greetingDisplay.innerText = "Sight Words";
        this.touchMenu.appendChild(this.sightWords1AppMenuItem);
        this.touchMenu.appendChild(this.sightWords2AppMenuItem);
        this.touchMenu.appendChild(this.sightWords3AppMenuItem);
        this.writingMenu.appendChild(this.sightWords1WritingAppMenuItem);
        this.writingMenu.appendChild(this.sightWords2WritingAppMenuItem);
        this.writingMenu.appendChild(this.sightWords3WritingAppMenuItem);
        document
          .querySelectorAll("[app-content='sight-words']")
          .forEach((item) => {
            // if (this.touchMenu

            // )
            // this.touchMenu.appendChild(item);
            if (item.classList.contains("hidden")) {
              item.classList.remove("hidden");
            }
            if (item.classList.contains("hide")) {
              item.classList.remove("hide");
            }
          });
        break;
    }
  }
  getSectionColumnXPosition() {
    this.rect = this.sectionColumn.getBoundingClientRect();
    return this.rect;
  }
  displayMovementArrows() {
    setTimeout(() => {
      if (this.sectionColumn.scrollLeft !== 0) {
        this.moveMenuLeftBtn.classList.remove("hide");
      }
      if (this.sectionColumn.scrollLeft < 300) {
        this.moveMenuLeftBtn.classList.add("hide");
      }
    }, 20);
  }

  /******
    Removing and Restoring Menu
  ******/
  resetGreetingAndPointsDisplay() {
    greetingDisplay.innerText = "";
    pointsDisplay.innerText = "";
  }
  resetTopContainer() {
    topContainer.innerText = "";
  }
  hidePrimaryMenu() {
    audio.navigationSfx.selectMenu.play();
    // this.hideParentsInfoBtn();
    this.resetGreetingAndPointsDisplay();
    primaryMenuContainer.classList.add("hidden");
    this.abcMenu.classList.add("hidden");
    this.numbersMenu.classList.add("hidden");
    this.sightWordsMenu.classList.add("hidden");
  }
  showPrimaryMenu() {
    // this.displayParentsInfoBtn();
    this.resetTopContainer();
    primaryMenuContainer.classList.remove("hidden");
    this.abcMenu.classList.remove("hidden");
    this.numbersMenu.classList.remove("hidden");
    this.sightWordsMenu.classList.remove("hidden");
  }
  hideSecondaryMenu() {
    document
      .querySelectorAll(
        ".secondary-menu-item, .secondary-menu, .secondary-menu-container"
      )
      .forEach((item) => {
        if (!item.classList.contains("hidden")) {
          item.classList.add("hidden");
        }
      });
  }
  showSecondaryMenu() {
    document
      .querySelectorAll(".secondary-menu, .secondary-menu-container")
      .forEach((item) => {
        if (item.classList.contains("hidden")) {
          item.classList.remove("hidden");
        }
      });
  }
  removeSecondaryMenu() {
    document
      .querySelectorAll(
        ".secondary-menu, .secondary-menu-container, .secondary-menu-item, .secondary-menu-div"
      )
      .forEach((item) => {
        item.classList.add("hidden");
        item.remove();
      });
  }
  removeMenu() {
    // remove Primary menu
    if (this.isPrimaryMenu) {
      document.querySelectorAll(".primary-menu-item").forEach((item) => {
        item.classList.add("hidden");
        item.remove();
      });
    } else if (this.isSecondaryMenu) {
      // this.hideSecondaryMenu();
      this.removeSecondaryMenu();
    }
  }
  // removes the ENTIRE menu page when starting an app
  removeMenuPage() {
    document
      .querySelectorAll(".primary-menu,  .secondary-menu")
      .forEach((item) => {
        item.classList.add("hidden");
        item.remove();
      });
  }
  setPrimaryMenuTrue() {
    this.isPrimaryMenu = true;
    this.isSecondaryMenu = false;
  }
  setSecondaryMenuTrue() {
    this.isPrimaryMenu = false;
    this.isSecondaryMenu = true;
  }
  restoreMainMenu() {
    body.appendChild(navBar);
    mainContainer.appendChild(topContainer);
    mainContainer.appendChild(primaryMenuContainer);
    navBar.classList.remove("hidden");
    topContainer.classList.remove("hidden");
    getCumulativeUserScore();
    setTimeout(this.returnToMainMenu, 500);
  }
  returnToMainMenu() {
    audio.navigationSfx.backToPreviousMenu.play();
    this.hideSecondaryMenu();
    this.showPrimaryMenu();
    this.resetSecondaryMenuPosition();
    this.resetTopContainer();
    this.displayGreeting();
    this.resetSecondaryMenuHorizontalScroll();
  }
  returnToMainMenuToggle() {
    if (!this.isPrimaryMenu) {
      this.returnToMainMenuBtn.classList.remove("hidden");
    } else if (this.isPrimaryMenu) {
      this.returnToMainMenuBtn.classList.add("hidden");
    }
  }
  resetSecondaryMenuPosition() {
    this.sectionColumn.style.translate = "0px";
  }
  getUserInfo() {
    try {
      if (
        sessionData &&
        Object.keys(sessionData).length > 0 &&
        sessionData.constructor === Object
      ) {
        user.gradeLevel = sessionData.gradeLevel;
        user.firstName = sessionData.firstName;
        user.lastName = sessionData.lastName;
        user.access = sessionData.access;
        user.id = sessionData.userId;
      }
    } catch (error) {
      console.error(
        "There was a problem getting the user information from the server: ",
        error,
        "However, it is not mandatory information but mostly for display purposes."
      );
      throw error;
    }
  }
  async setUser() {
    const maxRetries = 3;
    for (let attempt = 1; attempt <= maxRetries; ++attempt) {
      try {
        await this.getUserInfo();
        return;
      } catch (error) {
        console.error(
          `Error getting user info failed on attempt #${attempt}`,
          error
        );
        if (attempt < maxRetries) {
          console.log("Beginning next attempt.");
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } else {
          console.error(
            `Attempted to get user info ${maxRetries}, but all attempts failed.`
          );
        }
      }
    }
  }
  displayGreeting() {
    // this.setPrimaryMenuTrue();
    setTimeout(() => {
      let greeting;
      let userScore;
      if (user.id !== null) {
        greeting = `Hi, ${user.firstName}!`;
        userScore = `You have ${user.cumulativeScore} pts`;
        greetingDisplay.textContent = greeting;
        pointsDisplay.textContent = userScore;
      }
      topContainer.appendChild(greetingDisplay);
      topContainer.appendChild(pointsDisplay);
    }, 300);
  }
  scrollRight() {
    let i = 0;
    // let interval = setInterval(() => {
    const step = () => {
      this.sectionColumn.scrollLeft += 5;

      if (i > 275) {
        // clearInterval(interval);
        // return;
      }
      i += 2;
      requestAnimationFrame(step);
    };
    // }, 1);
    // setTimeout(() => {
    //   if (this.sectionColumn.scrollLeft !== 0) {
    //     this.moveMenuLeftBtn.classList.remove("hide");
    //   }
    //   if (this.sectionColumn.scrollLeft < 300) {
    //     this.moveMenuLeftBtn.classList.add("hide");
    //   }
    // }, 20);
  }
  scrollLeft() {
    let i = 0;
    // let interval = setInterval(() => {
    const step = () => {
      this.sectionColumn.scrollLeft += -5;

      if (i > 275) {
        // clearInterval(interval);
        // return;
      }
      i += 2;
      requestAnimationFrame(step);
    };
    // }, 1);
    // setTimeout(() => {
    //   if (this.sectionColumn.scrollLeft !== 0) {
    //     this.moveMenuLeftBtn.classList.remove("hide");
    //   }
    //   if (this.sectionColumn.scrollLeft < 300) {
    //     this.moveMenuLeftBtn.classList.add("hide");
    //   }
    // }, 20);
  }
  resetSecondaryMenuHorizontalScroll() {
    this.sectionColumn.scrollLeft = 0;
  }
}

const menuItems = new MenuItems();

const navLogo = document.querySelector(".nav-logo");
const navUserSpace = document.querySelector(".nav-user");
const navUserName = document.querySelector(".nav-user-name");
const navUserMenu = document.querySelector(".nav-user-menu");

/* Top Page Menu Items Display Functions */

const greetingDisplay = document.createElement("div");
greetingDisplay.classList.add("greeting-display");
const pointsDisplay = document.createElement("div");
pointsDisplay.classList.add("points-display");

let cumulativeUserScore;
async function getCumulativeUserScore() {
  cumulativeUserScore = await user.getCumulativeScore(user.id);
  return cumulativeUserScore;
}

if (navBar) {
  body.appendChild(navBar);
}

export { menuItems, getCumulativeUserScore };
