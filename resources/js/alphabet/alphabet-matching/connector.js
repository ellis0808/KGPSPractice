import {
  menuContainer,
  mainContainer,
  navBar,
  stylesheet,
  body,
} from "../../../utilities/variables.js";
import { StartDot, EndDot, DotCommand } from "./dot-objects-control.js";
import { currentDotId, endDotId, grid } from "./alphabet-matching-index.js";

class Connector {
  constructor() {
    this.isPressed = false;
    this.start = null;
    this.end = null;
    this.distance = null;
    this.slope = null;
    this.element = null;
    this.id = null;
    this.endLineId = null;
    this.contentId = null;
    this.isActive = false;
    this.connectedTo = null;
    this.conncted = false;
  }
  buttonDown() {
    this.isPressed = true;
  }
  buttonUp() {
    this.isPressed = false;
  }
  getStartPosition(event) {
    this.start = this.getCenter(event);
  }
  getEndPosition(event) {
    this.end = this.getCenter(event);
  }
  drawLine(event) {
    const newLine = document.createElement("div");
    newLine.classList.add("line", "unconnected");
    this.distance = this.setDistance();
    this.slope = this.getSlopeInDegrees();
    newLine.setAttribute("id", `${currentDotId}-line`);
    newLine.style.position = `absolute`;
    newLine.style.left = `${this.start.x}px`;
    newLine.style.top = `${this.start.y}px`;
    newLine.style.width = `${this.distance}px`;
    newLine.style.transformOrigin = `-0%`;
    newLine.style.transform = `rotate(${this.slope}deg)`;
    grid.appendChild(newLine);
    this.element = newLine;
    newLine.setAttribute("lineId", `${currentDotId}-line`);
    newLine.setAttribute("endLineId", `${endDotId}-line`);
  }
  removeLine() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }

  getCenter(event) {
    let target = event.target.getBoundingClientRect();
    const bodyRect = body.getBoundingClientRect();
    let center = {
      x: event.target.offsetLeft + event.target.offsetWidth / 2,
      y: event.target.offsetTop + event.target.offsetHeight / 2 - 5,
    };
    return center;
  }
  getSlopeInDegrees() {
    let slopeInRadian = Math.atan2(
      this.end.y - this.start.y,
      this.end.x - this.start.x
    );
    this.slope = (slopeInRadian * 180) / Math.PI;
    return this.slope;
  }
  setLineId(currentDotId) {
    this.id = `${currentDotId}-line`;
  }
  setLineEndDotId(endDotId) {
    this.endLineId = `${endDotId}-line`;
  }
  setDistance() {
    let lineLength = Math.sqrt(
      (this.start.x - this.end.x) ** 2 + (this.start.y - this.end.y) ** 2
    );
    return lineLength;
  }
  connect(endDot) {
    if (!endDot) {
      this.element.classList.remove("unconnected");
      this.element.classList.remove("pulse");
      return;
    } else {
      this.connected = true;
      this.connectedTo = endDot.id;
      if (this.contentId === endDot.contentId) {
        this.element.classList.remove("unconnected");
        this.element.classList.add("connected");
        this.element.classList.add("pulse");
      } else {
        this.element.classList.remove("pulse");
      }
    }
  }
  getId(startDot) {
    this.contentId = startDot.contentId;
  }
}

export { Connector };
