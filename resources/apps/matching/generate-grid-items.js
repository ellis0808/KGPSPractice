import {
  matchingAppStructure,
  numberOfItemsToBeDisplayed,
} from "./matching.js";
import { alphabet } from "../card-touch/card-data.js";
import { audio } from "../../utilities/audio.js";
import {
  dotAndLineCommand,
  endDot,
  startDot,
  EndDot,
  StartDot,
} from "./dot-objects-control.js";
import { pauseFunction } from "../../utilities/pause-functions.js";
import { body } from "../../utilities/variables.js";

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

const gridItems = {
  loadAndGenerateItems(array) {
    itemArrays.loadItemSetArray(array);
    itemGenerator.generateAndShuffle();
    gridGenerator.generateAndSetFullGrid(
      itemArrays.setArray,
      itemArrays.startRowArray,
      itemArrays.endRowArray
    );
  },
};

const itemArrays = {
  startRowArray: [],
  endRowArray: [],
  setArray: null,
  loadItemSetArray(array) {
    this.setArray = array;
  },
  async getItemsForSet(set) {
    try {
      const response = await fetch("");
      if (!response.ok) {
        throw new Error("Network response was not okay");
      }
      const data = await response.json();
      this.loadItemSetArray(data);
    } catch (error) {
      console.error("Error getting items for set: ", error);
    }
  },
};

const itemGenerator = {
  generate() {
    for (
      let i = 0;
      itemArrays.startRowArray.length < numberOfItemsToBeDisplayed;
      ++i
    ) {
      let item = `${
        itemArrays.setArray[
          Math.floor(Math.random() * itemArrays.setArray.length)
        ]
      }`;
      if (!itemArrays.endRowArray.includes(item)) {
        itemArrays.endRowArray.push(item);
        itemArrays.startRowArray.push(item.toUpperCase());
      }
    }
  },
  shuffle(array) {
    for (let i = array.length - 1; i > 0; --i) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },
  generateAndShuffle(array) {
    this.generate();
    this.shuffle(itemArrays.setArray);
  },
};

const gridGenerator = {
  setGrid() {},
  generateAndSetFullGrid(array1, array3, array4) {
    this.generateStartDivs(array1);
    this.generateEndDivs(array3);
    this.createDots(array3, array4);
    // this.setGrid();
  },
  generateEndDivs(array) {
    let divGroup = "endRow-";
    array.forEach((thing) => {
      const item = document.createElement("div");
      item.setAttribute("contentId", `${thing}`);
      item.setAttribute("data-id", `${divGroup}${thing}`);
      item.classList.add(divGroup, "matching-app");
      item.innerText = `${item.getAttribute("contentId")}`;
      if (Object.keys(audio.audioObject).length !== 0) {
        item.addEventListener("click", () => {
          audio.audioObject[thing].sound.play();
        });
      }
      matchingAppStructure.endRowContainer.appendChild(item);
    });
    return;
  },
  generateStartDivs(array) {
    let divGroup = "start-row";
    array.forEach((thing) => {
      const item = document.createElement("div");
      item.setAttribute("contentId", thing);
      item.setAttribute("data-id", `${divGroup}${thing}`);
      item.classList.add(divGroup, "matching-app");
      item.innerText = `${item.getAttribute("contentId")}`;
      if (Object.keys(audio.audioObject).length !== 0) {
        item.addEventListener("click", () => {
          audio.audioObject[thing.toLowerCase()].sound.play();
        });
      }
      matchingAppStructure.startRowContainer.appendChild(item);
    });
  },
  createDots(array1, array2) {
    this.createStartDots(array1);
    this.createEndDots(array2);
  },
  createEndDots(array) {
    let dotNumber;
    let i = 1;
    if (array === itemGenerator.endRowArray) {
      dotNumber = numberOfItemsToBeDisplayed + 1;
      array.forEach((item) => {
        // Create dot Enclosures for a wider hit-map
        const endDotEnclosure = document.createElement("div");
        endDotEnclosure.setAttribute("id", dotNumber);
        endDotEnclosure.setAttribute("contentId", item.toUpperCase());
        endDotEnclosure.classList.add(
          "dot-enclosure",
          "end-target",
          "matching-app"
        );
        matchingAppStructure.endDotsContainer.appendChild(endDotEnclosure);
        // Create dot for each Enclosure
        endDot[i] = new EndDot(`endDot${[i]}`);
        endDot[i].id = i + numberOfItemsToBeDisplayed;
        endDot[i].contentId = item.toUpperCase();
        endDot[i].element.setAttribute("id", dotNumber);
        endDot[i].element.classList.add(
          "end-dot",
          "dot",
          "end-target",
          "matching-app"
        );
        endDot[i].element.style.zIndex = "30";
        endDotEnclosure.appendChild(endDot[i].element);
        dotAndLineCommand.registerEndDot(endDot[i]);
        ++dotNumber;
        ++i;
      });
      return;
    }
  },
  createStartDots() {
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
        "matching-app"
      );
      matchingAppStructure.startDotsContainer.appendChild(startDotEnclosure);
      startDot[i] = new StartDot(`startDot${[i]}`);
      startDot[i].id = i;
      startDot[i].contentId = item;
      startDot[i].element.setAttribute("id", i);
      startDot[i].element.classList.add(
        "start-dot",
        "dot",
        "start-target",
        "matching-app"
      );
      startDotEnclosure.appendChild(startDot[i].element);
      dotAndLineCommand.registerStartDot(startDot[i]);
      ++dotNumber;
      ++i;
    });
    setTimeout(pauseFunction.disableTouch, 300);
  },
};

/*
  A.1. Shuffling Letter Arrays
    --> This function shuffles an array input as a parameter.
    --> This is to keep the letters from appearing right across from another every time.
  */

/*
B. Generating Letter Divs for Matching
  --> A div 'card' is created for each of the letters in the two letter arrays.
  --> They are given two dataset ids, then attached to their respective group.
*/

/*
C. Generating Start Dots, End Dots, and their Enclosures
  --> One dot is generate for each letter in the two letter arrays.
  --> If the dot is lowercase, it is an end-dot, and if capital, a start-dot.
  --> The dots are numbered from 0-7, with start-dots being 0-4, and end-dots 4-9. This is done dynamically.
  --> The dots are given several classes and ids, and given a zIndex of 30, to ensure they are on top when the lines are drawn.
*/

export { itemGenerator, gridGenerator, gridItems, itemArrays };
