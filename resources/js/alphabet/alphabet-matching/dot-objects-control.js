import { speak, matchingSfx } from "./audio.js";
import { Connector } from "./connector.js";
import { checkAllCorrect } from "./alphabet-matching-index.js";
class DotCommand {
  constructor() {
    this.startDots = [];
    this.endDots = [];
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
  makeActive(dot1) {
    dot1.makeActive();
  }
  makeinactive(dot1) {
    dot1.makeInctive();
  }
  connect(dot1, dot2) {
    if (!dot1) {
      return;
    }
    dot1.connect(dot1, dot2);
  }
  disconnect(dot1, dot2) {
    if (!dot1) {
      return;
    } else {
      dot1.disconnect();
      dot2.disconnect();
    }
  }
  markAsCorrect(dot1) {
    dot1.markAsCorrect();
    matchingSfx.validConnection.play();
  }
  markAsIncorrect(dot1) {
    dot1.markAsIncorrect();
    matchingSfx.invalidConnection.play();
  }
  notify(action, dot1, dot2) {
    if (action === "connect") {
      if (!dot2 || !dot1) {
        return;
      } else {
        this.connect(dot1, dot2);
        if (dot1.contentId === dot2.contentId) {
          this.markAsCorrect(dot1);
        } else {
          this.markAsIncorrect(dot1);
        }
      }
    }
  }
}
const dotCommand = new DotCommand();
const startDot = [];
const endDot = [];

class StartDot {
  constructor(contentId) {
    this.contentId = contentId;
    this.id = null;
    this.isActive = false;
    this.connectedTo = null;
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
  makeInctive() {
    this.isActive = false;
    this.element.classList.remove("active-dot", "white-ring");
  }
  connect(sDot, endDot) {
    this.connected = true;
    if (this.connectedTo) {
      this.connectedTo.removeCorrectPulse();
      this.connectedTo.disconnect();
    }
    this.connectedTo = endDot;
  }
  disconnect(sDot, endDot) {
    this.removeCorrectPulse();
    this.connected = false;
    this.connectedTo = null;
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

    setTimeout(() => {
      speak(this.contentId);
    }, 100);

    checkAllCorrect();
  }
  markAsIncorrect() {
    this.disconnect();
  }
}
class EndDot {
  constructor(contentId) {
    this.contentId = contentId;
    this.id = null;
    this.isActive = false;
    this.connectedTo = null;
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
  makeInctive() {
    this.isActive = false;
    this.element.classList.remove("active-dot", "white-ring");
  }
  connect(endDot, sDot) {
    this.connected = true;
    if (this.connectedTo) {
      this.connectedTo.disconnect();
      this.connectedTo.removeCorrectPulse();
    }
    this.connectedTo = sDot;
  }
  disconnect() {
    this.removeRed();
    this.removeCorrectPulse();
    this.connected = false;
    this.connectedTo = null;
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
  addRed() {
    this.element.classList.add("red-dot");
  }
  removeRed() {
    this.element.classList.remove("red-dot");
  }
  markAsCorrect() {
    this.addCorrectPulse();
  }
  markAsIncorrect() {
    this.disconnect();
  }
}

export { dotCommand, endDot, startDot, StartDot, EndDot, DotCommand };
