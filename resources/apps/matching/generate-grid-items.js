import {
  matchingAppStructure,
  numberOfItemsToBeDisplayed,
} from "./matching.js";
import { audio } from "../../utilities/audio.js";
import {
  dotAndLineCommand,
  endDot,
  startDot,
  EndDot,
  StartDot,
} from "./dot-objects-control.js";
import { pauseFunction } from "../../utilities/pause-functions.js";

const gridItems = {
  loadAndGenerateItems(array) {
    itemArrays.loadItemSetArray(array);
    itemGenerator.generateAndShuffle(
      itemArrays.startRowArray,
      itemArrays.endRowArray
    );
    gridGenerator.generateAndSetFullGrid(
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
  generateAndShuffle(array1, array2) {
    this.generate();
    this.shuffle(array1);
    this.shuffle(array2);
  },
};

const gridGenerator = {
  setGrid() {},
  generateAndSetFullGrid(array1, array2) {
    this.generateStartDivs(array1);
    this.generateEndDivs(array2);
    this.createDots(array1, array2);
    // this.setGrid();
  },
  generateEndDivs(array) {
    let divGroup = "endrow-";
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
    let divGroup = "startrow-";
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
    let i = 1;
    let dotNumber;
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
    setTimeout(pauseFunction.disableTouch, 300);

    // }
  },
  createStartDots(array) {
    let i = 0;
    let dotNumber = 0;
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

export { itemGenerator, gridGenerator, gridItems, itemArrays };
