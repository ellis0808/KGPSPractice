import { matchingApp } from "./matching.js";
import { audio } from "../../utilities/audio.js";
console.log("dot-objects-control");

class DotAndLineCommand {
  constructor() {
    this.startDots = [];
    this.endDots = [];
    this.connectors = [];
  }
  clearArrays() {
    this.startDots.length = 0;
    this.endDots.length = 0;
  }
  registerStartDot(sDot) {
    this.startDots.push(sDot);
    sDot.setMediator(this);
  }
  registerEndDot(eDot) {
    this.endDots.push(eDot);
    eDot.setMediator(this);
  }
  registerConnector(line) {
    this.connectors.push(line);
    line.setMediator(this);
  }
  makeActive(dot1) {
    dot1.makeActive();
  }
  makeInactive(dot1) {
    dot1.makeInactive();
  }
  connectStartToEnd(startDot, endDot, line, event) {
    if (!startDot) {
      return;
    }
    startDot.connect(startDot, endDot, line);
    line.connectFromStartToEnd(startDot, endDot, line, event);
  }
  connectEndToStart(startDot, endDot, line, event) {
    if (!endDot) {
      return;
    }
    endDot.connect(endDot, startDot, line);
    line.connectFromEndToStart(startDot, endDot, line, event);
  }
  disconnect(dot1, dot2, line, event) {
    if (!dot1) {
      return;
    } else {
      line.disconnect(dot1, dot2, line, event);
      dot1.disconnect();
      dot2.disconnect();
    }
  }
  markAsCorrect(dot1) {
    dot1.markAsCorrect();
  }
  markAsIncorrect(dot1) {
    dot1.markAsIncorrect();
  }
  // notifyEndToStart(action, startDot, endDot, line, event) {
  //   if (action === "connectEndToStart") {
  //     if (!endDot || !startDot) {
  //       return;
  //     } else {
  //       this.connectEndToStart(startDot, endDot, line, event);
  //     }
  //   }
  // }
  // notifyStartToEnd(action, startDot, endDot, line, event) {
  //   if (action === "connectStartToEnd") {
  //     if (!endDot || !startDot) {
  //       return;
  //     } else {
  //       this.connectStartToEnd(startDot, endDot, line, event);
  //     }
  //   }
  // }
}
const dotAndLineCommand = new DotAndLineCommand();
const startDot = [];
const endDot = [];

class StartDot {
  constructor(contentId) {
    this.contentId = contentId;
    this.id = null;
    this.isActive = false;
    this.connectedTo = null;
    this.connectedToLine = null;
    this.connected = false;
    this.locked = false;
    this.element = document.createElement("div");
    this.mediator = null;
  }
  setMediator(mediator) {
    this.mediator = mediator;
  }
  makeActive() {
    this.isActive = true;

    if (this.connectedTo) {
      // this order must be maintained; if 'this' is made 'incorrect', it will no longer have anything connected to it
      this.disconnect();
    }
    this.element.classList.add("active-dot", "white-ring");
  }
  makeInactive() {
    this.isActive = false;
    this.element.classList.remove("active-dot", "white-ring");
  }
  connect(endDot, line) {
    if (this.connectedTo) {
      if (this.connectedToLine) {
        this.connectedToLine.element.remove();
      }
    }
    this.connected = true;
    this.connectedTo = endDot;
    endDot.connectedTo = this;
    this.connectedTo.connected = true;
    this.connectedToLine = line;
    this.connectedTo.connectedToLine = line;
  }
  disconnect() {
    this.removeCorrectPulse();
    if (this.connectedTo) {
      this.connectedTo.removeCorrectPulse();
      this.connectedTo.connected = false;
      this.connectedTo.connectedTo = null;
      this.connectedTo.connectedToLine = null;
      this.connectedTo = null;
    }
    this.connected = false;
    if (this.connectedToLine) {
      this.connectedToLine.connectedToEnd = null;
      this.connectedToLine.connectedToStart = null;
      this.connectedToLine = null;
      if (this.connectedToLine) {
      }
    }
  }
  addCorrectPulse() {
    this.element.classList.add("pulse", "white-ring");

    // Force Reflow
    void this.element.offsetWidth;
  }
  removeCorrectPulse() {
    this.element.classList.remove("pulse", "white-ring");

    // Force Reflow
    void this.element.offsetWidth;
  }
  markAsCorrect() {
    this.addCorrectPulse();
    audio.appSfx.poppop.play();

    setTimeout(() => {
      audio.audioObject[this.contentId.toLowerCase()].sound.play();
    }, 200);

    matchingApp.checkAllCorrect();
  }
  markAsIncorrect() {
    audio.appSfx.cancel.play();
  }
}
class EndDot {
  constructor(contentId) {
    this.contentId = contentId;
    this.id = null;
    this.isActive = false;
    this.connectedTo = null;
    this.connectedToLine = null;
    this.connected = false;
    this.locked = false;
    this.element = document.createElement("div");
    this.mediator = null;
  }
  setMediator(mediator) {
    this.mediator = mediator;
  }
  makeActive() {
    if (this.connectedToLine) {
    }
    this.isActive = true;
    if (this.connectedTo) {
      // this order must be maintained; if 'this' is made 'incorrect', it will no longer have anything connected to it
      this.disconnect();
    }
    this.element.classList.add("active-dot", "white-ring");
  }
  makeInactive() {
    this.isActive = false;
    this.element.classList.remove("active-dot", "white-ring");
  }
  connect(startDot, line) {
    if (this.connectedTo) {
      if (this.connectedToLine) {
        this.connectedToLine.element.remove();
      }
    }
    this.connected = true;
    this.connectedTo = startDot;
    startDot.connectedTo = this;
    this.connectedTo.connected = true;
    this.connectedToLine = line;
    this.connectedTo.connectedToLine = line;
  }
  disconnect() {
    this.removeCorrectPulse();
    if (this.connectedTo) {
      this.connectedTo.removeCorrectPulse();
      this.connectedTo.connected = false;
      this.connectedTo.connectedTo = null;
      this.connectedTo.connectedToLine = null;
      this.connectedTo = null;
    }
    this.connected = false;
    if (this.connectedToLine) {
      this.connectedToLine.connectedToEnd = null;
      this.connectedToLine.connectedToStart = null;
      this.connectedToLine = null;
      if (this.connectedToLine) {
        this.connectedToLine.element.remove();
      }
    }
  }
  addCorrectPulse() {
    this.element.classList.add("pulse", "white-ring");

    // Force Reflow
    void this.element.offsetWidth;
  }
  removeCorrectPulse() {
    this.element.classList.remove("pulse", "white-ring");

    // Force Reflow
    void this.element.offsetWidth;
  }

  markAsCorrect() {
    this.addCorrectPulse();
  }
  markAsIncorrect() {
    // this.disconnect();
    this.removeCorrectPulse();
  }
}

class Connector {
  constructor() {
    this.isPressed = false;
    this.start = null;
    this.end = null;
    this.distance = null;
    this.slope = null;
    this.element = null;
    this.lineStartId = null;
    this.lineEndId = null;
    this.contentId = null;
    this.isActive = false;
    this.connectedToStart = null;
    this.connectedToEnd = null;
    this.connected = false;
    this.match = false;
  }
  setMediator(mediator) {
    this.mediator = mediator;
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
  getStartPosition2(dot) {
    this.start = this.getCenter2(dot);
  }
  getEndPosition2(dot) {
    this.end = this.getCenter2(dot);
  }
  getCenter(event) {
    let center = {
      x: event.target.offsetLeft + event.target.offsetWidth / 2,
      y: event.target.offsetTop + event.target.offsetHeight / 2 - 5,
    };
    return center;
  }
  getCenter2(dot) {
    let center = {
      x: dot.element.offsetLeft + dot.element.offsetWidth / 2,
      y: dot.element.offsetTop + dot.element.offsetHeight / 2 - 5,
    };
    return center;
  }
  getContentId(dot) {
    this.contentId = dot.contentId;
  }
  drawLine(event) {
    const newLine = document.createElement("div");
    newLine.classList.add("line", "unconnected");
    this.distance = this.setDistance();
    this.slope = this.getSlopeInDegrees();
    newLine.style.position = `absolute`;
    newLine.style.left = `${this.start.x}px`;
    newLine.style.top = `${this.start.y}px`;
    newLine.style.width = `${this.distance}px`;
    newLine.style.transformOrigin = `-0%`;
    newLine.style.transform = `rotate(${this.slope}deg)`;
    matchingApp.grid.appendChild(newLine);
    this.element = newLine;
    newLine.setAttribute("startDotId", matchingApp.startDotId);
    newLine.setAttribute("endDotId", matchingApp.endDotId);
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
  connectFromStartToEnd(startDot, endDot, event) {
    if (!startDot) {
      this.element.classList.remove("unconnected");
      this.element.classList.remove("pulse");
      this.remove();
      return;
    } else {
      this.connected = true;
      this.connectedToStart = startDot;
      this.connectedToEnd = endDot;
      this.contentId = startDot.contentId;

      this.getEndPosition(event);
      this.removeOldLines();
    }
    if (startDot.contentId === endDot.contentId) {
      startDot.markAsCorrect();
      endDot.markAsCorrect();
      this.match = true;
    } else {
      startDot.markAsIncorrect();
      endDot.markAsIncorrect();
      this.match = false;
    }
  }
  connectFromEndToStart(startDot, endDot, event) {
    if (!startDot) {
      this.element.classList.remove("unconnected");
      this.element.classList.remove("pulse");
      this.remove();
      return;
    } else {
      this.connected = true;
      this.connectedToStart = endDot;
      this.connectedToEnd = startDot;
      this.getContentId(endDot);
      this.getEndPosition(event);
      this.removeOldLines();
    }
    if (startDot.contentId === endDot.contentId) {
      startDot.markAsCorrect();
      endDot.markAsCorrect();
      this.match = true;
    } else {
      startDot.markAsIncorrect();
      endDot.markAsIncorrect();
      this.match = false;
    }
  }
  disconnect(dot1, dot2, line, event) {
    this.connectedToEnd = null;
    this.connectedToStart = null;
    this.element.remove();
  }
  markAsCorrect() {
    this.element.classList.remove("unconnected");
    this.element.classList.add("connected");
    this.element.classList.add("pulse", "final");
  }
  removeOldLines() {
    this.element.classList.add("final");
    this.element.classList.add("pulse");
    const oldLine = document
      .querySelectorAll(".unconnected")
      .forEach((item) => {
        item.remove();
      });
    this.element.classList.remove("unconnected");
    this.element.classList.add("final");
    matchingApp.lines.push(this);
  }
}

export {
  dotAndLineCommand,
  endDot,
  startDot,
  StartDot,
  EndDot,
  DotAndLineCommand,
  Connector,
};
