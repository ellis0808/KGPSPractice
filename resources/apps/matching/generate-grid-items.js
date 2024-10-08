import {
  alphabetCapitals,
  alphabetLowercase,
  capitalLettersDiv,
  endDotsDiv,
  startDotsDiv,
  lowercaseLetterDiv,
  numberOfItemsToBeDisplayed,
} from "./matching-index.js";
import { alphabet } from "../card-touch/card-data.js";
import { audioObject } from "../../utilities/audio.js";
import { dotAndLineCommand, endDot, startDot } from "./dot-objects-control.js";

/*
V. GRID POPULATION
*/

/*
A. Generating Letters
  --> This function chooses letters at random from the alphabet array used for the card touch app
  --> The number of letters is limited to the 'numberOfItemsToBeDisplayed' variable, which is currently set to 4.
  --> The four letters are then sent to the lowercase and capital (after being converted to uppercase) letter arrays.
  --> If one of the letters already exists in the array, it is rejected and a new one is chosen
*/
function letterSetGenerator() {
  for (let i = 0; alphabetCapitals.length < numberOfItemsToBeDisplayed; ++i) {
    let letter = `${alphabet[Math.floor(Math.random() * alphabet.length)]}`;
    if (!alphabetLowercase.includes(letter)) {
      alphabetLowercase.push(letter);
      alphabetCapitals.push(letter.toUpperCase());
    }
  }
}

/*
  A.1. Shuffling Letter Arrays
    --> This function shuffles an array input as a parameter.
    --> This is to keep the letters from appearing right across from another every time.
  */
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; --i) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/*
B. Generating Letter Divs for Matching
  --> A div 'card' is created for each of the letters in the two letter arrays.
  --> They are given two dataset ids, then attached to their respective group.
*/

function generateLetterDivsForMatching(array) {
  let divGroup = "capitals-";
  if (array === alphabetLowercase) {
    divGroup = "lowercase-";
    array.forEach((item) => {
      const letter = document.createElement("div");
      letter.setAttribute("contentId", `${item}`);
      letter.setAttribute("data-id", `${divGroup}${item}`);
      letter.classList.add(divGroup, "letter-matching-app");
      letter.innerText = `${letter.getAttribute("contentId")}`;
      letter.addEventListener("click", () => {
        audioObject[item].sound.play();
      });
      lowercaseLetterDiv.appendChild(letter);
    });
    return;
  }
  array.forEach((item) => {
    const letter = document.createElement("div");
    letter.setAttribute("contentId", item);
    letter.setAttribute("data-id", `${divGroup}${item}`);
    letter.classList.add(divGroup, "letter-matching-app");
    letter.innerText = `${letter.getAttribute("contentId")}`;
    letter.addEventListener("click", () => {
      audioObject[item.toLowerCase()].sound.play();
    });
    capitalLettersDiv.appendChild(letter);
  });
  console.log(audioObject);
}
/*
C. Generating Start Dots, End Dots, and their Enclosures
  --> One dot is generate for each letter in the two letter arrays.
  --> If the dot is lowercase, it is an end-dot, and if capital, a start-dot.
  --> The dots are numbered from 0-7, with start-dots being 0-4, and end-dots 4-9. This is done dynamically.
  --> The dots are given several classes and ids, and given a zIndex of 30, to ensure they are on top when the lines are drawn.
*/

function createDots(array) {
  let dotNumber;
  let i = 1;
  if (array === alphabetLowercase) {
    dotNumber = numberOfItemsToBeDisplayed + 1;
    array.forEach((item) => {
      // Create dot Enclosures for a wider hit-map
      const endDotEnclosure = document.createElement("div");
      endDotEnclosure.setAttribute("id", dotNumber);
      endDotEnclosure.setAttribute("contentId", item.toUpperCase());
      endDotEnclosure.classList.add(
        "dot-enclosure",
        "end-target",
        "letter-matching-app"
      );
      endDotsDiv.appendChild(endDotEnclosure);
      // Create dot for each Enclosure
      endDot[i] = new EndDot(`endDot${[i]}`);
      endDot[i].id = i + numberOfItemsToBeDisplayed;
      endDot[i].contentId = item.toUpperCase();
      endDot[i].element.setAttribute("id", dotNumber);
      endDot[i].element.classList.add(
        "end-dot",
        "dot",
        "end-target",
        "letter-matching-app"
      );
      endDot[i].element.style.zIndex = "30";
      endDotEnclosure.appendChild(endDot[i].element);
      dotAndLineCommand.registerEndDot(endDot[i]);
      ++dotNumber;
      ++i;
    });
    return;
  }
  i = 0;
  dotNumber = 0;
  array.forEach((item) => {
    // Create dot Enclosures for a wider hit-map
    const startDotEnclosure = document.createElement("div");
    startDotEnclosure.setAttribute("id", dotNumber);
    startDotEnclosure.setAttribute("contentId", item);
    startDotEnclosure.classList.add(
      "dot-enclosure",
      "start-target",
      "letter-matching-app"
    );
    startDotsDiv.appendChild(startDotEnclosure);
    startDot[i] = new StartDot(`startDot${[i]}`);
    startDot[i].id = i;
    startDot[i].contentId = item;
    startDot[i].element.setAttribute("id", i);
    startDot[i].element.classList.add(
      "start-dot",
      "dot",
      "start-target",
      "letter-matching-app"
    );
    startDotEnclosure.appendChild(startDot[i].element);
    dotAndLineCommand.registerStartDot(startDot[i]);
    ++dotNumber;
    ++i;
  });
  setTimeout(disableTouch, 300);
}

export {
  createDots,
  generateLetterDivsForMatching,
  letterSetGenerator,
  shuffle,
};
