import {
  menuContainer,
  mainContainer,
  navBar,
  stylesheet,
  body,
} from "../../../utilities/variables.js";
import { matchingSfx } from "./audio.js";
import { alphabetObject } from "../alphabet-audio-object.js";
import {
  checkAllCorrect,
  currentDotId,
  endDotId,
  grid,
  lines,
  numberOfItemsToBeDisplayed,
} from "./alphabet-matching-index.js";
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
  connect(dot1, dot2, line, event) {
    if (!dot1) {
      return;
    }
    dot1.connect(dot1, dot2, line);
    dot2.connect(dot1, dot2, line);
    line.connect(dot1, dot2, line, event);
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
  notify(action, dot1, dot2, line, event) {
    if (action === "disconnect") {
      this.disconnect(dot1, dot2, line, event);
    } else if (action === "connect") {
      if (!dot2 || !dot1) {
        return;
      } else {
        this.connect(dot1, dot2, line, event);
        // if (dot1.contentId === dot2.contentId) {
        //   this.markAsCorrect(dot1);
        // } else {
        //   this.markAsIncorrect(dot1);
        // }
      }
    }
  }
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

      this.connectedTo.disconnect();
      this.disconnect();
    }
    this.element.classList.add("active-dot", "white-ring");
  }
  makeInactive() {
    this.isActive = false;
    this.element.classList.remove("active-dot", "white-ring");
  }
  connect(endDot, startDot, line) {
    if (this.connectedTo) {
      console.log(this.connectedToLine);
      const oldLine = document.querySelectorAll(".final");
      console.log(oldLine);
      console.log(this.connectedToLine.connectedToEnd, startDot);
      oldLine.forEach((item) => {
        if (this.connectedToLine.connectedToEnd === startDot) {
          console.log("test");
          item.remove();
        }
      });
      // this.connectedToLine.removeLine();
      this.connectedTo.disconnect();
      this.connectedTo.removeCorrectPulse();
    }
    this.connected = true;
    this.connectedTo = endDot;
    this.connectedToLine = line;
    if (this.contentId === this.connectedTo.contentId) {
      this.markAsCorrect();
    }
    console.log(this);
  }
  disconnect() {
    this.removeCorrectPulse();
    this.connected = false;
    this.connectedTo = null;
    if (this.connectedToLine) {
      this.connectedToLine.disconnect();
    }
    this.connectedToLine = null;
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
    this.connectedTo.addCorrectPulse();
    matchingSfx.validConnection.play();

    setTimeout(() => {
      alphabetObject[this.contentId.toLowerCase()].sound.play();
    }, 200);

    checkAllCorrect();
  }
  markAsIncorrect() {
    this.disconnect();
    matchingSfx.invalidConnection.play();
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
    this.isActive = true;
    if (this.connectedTo) {
      // this order must be maintained; if 'this' is made 'incorrect', it will no longer have anything connected to it
      this.connectedTo.disconnect();
      this.disconnect();
    }
    this.element.classList.add("active-dot", "white-ring");
  }
  makeInactive() {
    this.isActive = false;
    this.element.classList.remove("active-dot", "white-ring");
  }
  connect(dot1, dot2, line) {
    if (this.connectedTo) {
      console.log(this.connectedToLine);
      console.log("test");
      const oldLine = document.querySelectorAll(".final");
      console.log(oldLine);
      console.log(this.connectedToLine.connectedToEnd, dot2);
      oldLine.forEach((item) => {
        if (this.connectedToLine.connectedToEnd === dot2) {
          item.remove();
        }
      });
      // this.connectedToLine.removeLine();
      this.connectedTo.disconnect();
      this.connectedTo.removeCorrectPulse();
    }
    this.connected = true;
    this.connectedTo = dot1;
    this.connectedToLine = line;
    console.log(this);
  }
  disconnect() {
    if (!this.connectedTo) {
      return;
    }
    this.removeCorrectPulse();
    this.connected = false;
    this.connectedTo = null;
    if (this.connectedToLine) {
      this.connectedToLine.disconnect();
    }
    this.connectedToLine = null;
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
    this.disconnect();
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
  // setLineId(currentDotId) {
  //   this.id = `${currentDotId}-line`;
  // }
  // setLineEndDotId(endDotId) {
  //   this.lineEndId = `${endDotId}-line`;
  // }
  getStartPosition(event) {
    this.start = this.getCenter(event);
  }
  getEndPosition(event) {
    this.end = this.getCenter(event);
  }
  getCenter(event) {
    // let target = event.target.getBoundingClientRect();
    const bodyRect = body.getBoundingClientRect();
    let center = {
      x: event.target.offsetLeft + event.target.offsetWidth / 2,
      y: event.target.offsetTop + event.target.offsetHeight / 2 - 5,
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
    newLine.style.position = `absolute`;
    newLine.style.left = `${this.start.x}px`;
    newLine.style.top = `${this.start.y}px`;
    newLine.style.width = `${this.distance}px`;
    newLine.style.transformOrigin = `-0%`;
    newLine.style.transform = `rotate(${this.slope}deg)`;
    grid.appendChild(newLine);
    this.element = newLine;
    newLine.setAttribute("lineStartId", currentDotId);
    // newLine.setAttribute("lineEndId", currentDotId);
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
  connect(dot1, dot2, line, event) {
    if (!dot1) {
      this.element.classList.remove("unconnected");
      this.element.classList.remove("pulse");
      this.remove();
      return;
    } else {
      this.connected = true;
      this.connectedToStart = dot1;
      this.connectedToEnd = dot2;
      this.contentId = dot1.contentId;
      // if (!line.element.hasAttribute("linestartid")) {
      //   this.element.lineStartId = dot1.id;
      //   // line.element.setAttribute("lineStartId", this.lineStartId);
      //   console.log(line.getAttribute("linestartid"));
      // }
      // if (!line.element.hasAttribute("lineendid")) {
      //   this.element.lineEndId = dot2.id;
      //   line.element.setAttribute("lineendid", this.lineEndId);
      //   console.log(line.element.getAttribute("lineendid"));
      // }
      this.getEndPosition(event);

      this.element.classList.add("final");
      this.element.classList.add("pulse");
      dot1.element.classList.remove("pulse");
      dot1.element.classList.add("pulse");
      const oldLine = document
        .querySelectorAll(".unconnected")
        .forEach((item) => {
          item.remove();
        });

      lines.push(this);
    }
  }
  disconnect(dot1, dot2, line, event) {
    // if (this.connected) {
    //   event.target.connectedToLine.remove();
    // }
    // console.log("line disconnect");
    // if (dot2) {
    //   console.log(dot2.hasOwnProperty("contentId"));
    //   if (dot2.id) {
    //     console.log(dot2.id);
    //   } else console.log("cannot access id");
    // }
    // const lineEndToBeRemoved = document.querySelectorAll("[lineendid]");
    // if (event) {
    //   console.log(lineEndToBeRemoved, event);
    //   lineEndToBeRemoved.forEach((item) => {
    //     if (item.getAttribute("lineendid") === event) {
    //       console.log("line ends are the same");
    //       // item.remove();
    //     }
    //   });
    // }
    // const lineStartToBeRemoved = document.querySelectorAll("[linestartid]");
    // lineStartToBeRemoved.forEach((item) => {
    //   if (
    //     item.getAttribute("linestartid") ===
    //     this.element.getAttribute("linestartid")
    //   ) {
    //     console.log("line starts are the same");
    //     item.remove();
    //   }
    // });
    // const oldLine = document.querySelectorAll(".final");
    // console.log(oldLine);
    // oldLine.forEach((item) => {
    //   item.remove();
    // });
  }
  markAsCorrect() {
    this.element.classList.remove("unconnected");
    this.element.classList.add("connected");
    this.element.classList.add("pulse", "final");
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
