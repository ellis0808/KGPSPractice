import {
  primaryMenuContainer,
  mainContainer,
  navBar,
  stylesheet,
  body,
} from "../../../utilities/variables.js";
import { StartDot, EndDot, DotCommand } from "./dot-objects-control.js";
import {
  currentDotId,
  endDotId,
  grid,
  numberOfItemsToBeDisplayed,
} from "./alphabet-matching-index.js";

class Connector {
  constructor() {
    this.isPressed = false;
    this.start = null;
    this.end = null;
    this.distance = null;
    this.slope = null;
    this.element = null;
    this.startLineId = null;
    this.endLineId = null;
    this.contentId = null;
    this.isActive = false;
    this.connectedToStartDot = null;
    this.connectedToEndDot = null;
    this.conncted = false;
  }
  buttonDown() {
    this.isPressed = true;
  }
  buttonUp() {
    this.isPressed = false;
  }
  // setLineId(currentDotId) {
  //   this.id = `${currentDotId}-line`;
  // }
  // setLineEndDotId(endDotId) {
  //   this.endLineId = `${endDotId}-line`;
  // }
  getStartPosition(event) {
    this.start = this.getCenter(event);
  }
  getEndPosition(event) {
    this.end = this.getCenter(event);
  }
  getCenter(event) {
    let target = event.target.getBoundingClientRect();
    const bodyRect = body.getBoundingClientRect();
    let center = {
      x: event.target.offsetLeft + event.target.offsetWidth / 2,
      y: event.target.offsetTop + event.target.offsetHeight / 2,
    };
    return center;
  }
  getContentId(startDot) {
    this.contentId = startDot.contentId;
  }
  drawLine(event) {
    const newLine = document.createElement("div");
    newLine.classList.add("line", "unconnected");
    this.distance = this.setDistance();
    this.slope = this.getSlopeInDegrees();
    // newLine.setAttribute("startLineId", currentDotId);
    newLine.style.position = `absolute`;
    newLine.style.left = `${this.start.x}px`;
    newLine.style.top = `${this.start.y}px`;
    newLine.style.width = `${this.distance}px`;
    newLine.style.transformOrigin = `-0%`;
    newLine.style.transform = `rotate(${this.slope}deg)`;
    grid.appendChild(newLine);
    this.element = newLine;
    newLine.setAttribute("startLineId", currentDotId);
    newLine.setAttribute("endLineId", endDotId);
  }
  removeLine() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }

  getSlopeInDegrees() {
    let slopeInRadian = Math.atan2(
      this.end.y - this.start.y,
      this.end.x - this.start.x
    );
    this.slope = (slopeInRadian * 180) / Math.PI;
    return this.slope;
  }

  setDistance() {
    let lineLength = Math.sqrt(
      (this.start.x - this.end.x) ** 2 + (this.start.y - this.end.y) ** 2
    );
    return lineLength;
  }
  connectStart(dot) {
    if (!dot) {
      // this.element.classList.remove("unconnected");
      // this.element.classList.remove("pulse");
      // this.remove();
      return;
    } else {
      this.connected = true;
      this.connectedToStartDot = dot.id;
      this.contentId = dot.contentId;
      this.setStartLineId(dot);
    }
  }
  connectEnd(dot) {
    if (!dot) {
      this.element.classList.remove("unconnected");
      this.element.classList.remove("pulse");
      this.remove();
      return;
    } else {
      this.connected = true;
      this.connectedToStartDot = dot.id;
      if (this.contentId === dot.contentId) {
        this.setEndLineId(dot);
        this.markAsCorrect();
        const oldLine = document
          .querySelectorAll(".unconnected")
          .forEach((item) => {
            console.log(item);
            item.remove();
          });
      } else {
        this.element.classList.remove("pulse");
      }
    }
  }

  markAsCorrect() {
    this.element.classList.remove("unconnected");
    this.element.classList.add("connected");
    this.element.classList.add("pulse", "final");
    // this.remove();
  }
  setEndLineId(dot) {
    this.endLineId = dot.id + numberOfItemsToBeDisplayed;
  }
  setStartLineId(dot) {
    this.startLineId = dot.id;
  }
}
