import { cardTouchSfx } from "./audio.js";

function wobble(e) {
  e.currentTarget.preventDefault;
  e.currentTarget.classList.remove("wobble");
  void e.currentTarget.offsetWidth;
  e.currentTarget.classList.add("wobble");
  cardTouchSfx.incorrectCard.play();
}

function spinfade(e) {
  e.currentTarget.preventDefault;
  e.currentTarget.classList.remove("spinfade");
  void e.currentTarget.offsetWidth;
  e.currentTarget.classList.add("spinfade");

  cardTouchSfx.correcCard.play();
}

function newRoundCardFlip() {
  const remainingCards = document.querySelectorAll(".card").forEach((item) => {
    if (!item.classList.contains("spinfade")) {
      item.classList.toggle("newroundcardflip");
    }
  });
}

function particles(e) {
  const divParticles = document.createElement("div");

  e.currentTarget.appendChild(divParticles);
  divParticles.setAttribute("id", "divparticles");
  divParticles.style.left = `${e.pagex}px`;
  divParticles.style.top = `${e.pagey}px`;
  const maxElements = 30;
  for (let i = 0; i < maxElements; i++) {
    const randomHue = Math.floor(Math.random() * 360);
    const randomSaturation = Math.floor(Math.random() * (65 - 50) + 50);
    const randomLightness = Math.floor(Math.random() * (88 - 50) + 50);
    const span = document.createElement("span");
    const newSpan = divParticles.appendChild(span);
    const degrees = i * (360 / maxElements) + Math.floor(Math.random() * 15);
    const height = 40 + Math.floor(Math.random() * 50);
    const width = 6 + Math.floor(Math.random() * 6);
    newSpan.setAttribute("id", "newspanparticles");
    newSpan.style.height = height + "px";
    newSpan.style.width = width + "px";
    newSpan.style.backgroundColor = `hsl(${randomHue}, ${randomSaturation}%, ${randomLightness}%)`;
    newSpan.style.transform = `rotate(${degrees}deg)`;
  }

  window.requestAnimationFrame(function () {
    Array.from(divParticles.querySelectorAll("span")).forEach((el) => {
      let trasY = -60 - Math.floor(Math.random() * 150);
      el.style.transform += `scaleY(1.2) translateY(${trasY}px)`;
      el.style.opacity = "0";
    });
    window.setTimeout(function () {
      // let divParticles = document.getElementById('divparticles')
      divParticles.remove();
    }, 1000);
  });
}
function particles2() {
  const divParticles = document.createElement("div");
  const bodyRect = document.body.getBoundingClientRect();
  scoreDisplay.appendChild(divParticles);
  divParticles.setAttribute("id", "divparticles");
  divParticles.style.left = `${
    (scoreDisplay.getBoundingClientRect().right -
      scoreDisplay.getBoundingClientRect().left) *
      0.5 -
    bodyRect.left
  }px`;
  divParticles.style.top = `${
    (scoreDisplay.getBoundingClientRect().top -
      scoreDisplay.getBoundingClientRect().bottom) *
      0.5 -
    bodyRect.top
  }px`;
  const maxElements = 30;
  for (let i = 0; i < maxElements; i++) {
    const randomHue = Math.floor(Math.random() * 360);
    const randomSaturation = Math.floor(Math.random() * (65 - 50) + 50);
    const randomLightness = Math.floor(Math.random() * (88 - 50) + 50);
    const span = document.createElement("span");
    const newSpan = divParticles.appendChild(span);
    const degrees = i * (360 / maxElements) + Math.floor(Math.random() * 15);
    const height = 40 + Math.floor(Math.random() * 50);
    const width = 6 + Math.floor(Math.random() * 6);
    newSpan.setAttribute("id", "newspanparticles");
    newSpan.style.height = height + "px";
    newSpan.style.width = width + "px";
    newSpan.style.backgroundColor = `hsl(${randomHue}, ${randomSaturation}%, ${randomLightness}%)`;
    newSpan.style.transform = `rotate(${degrees}deg)`;
  }

  window.requestAnimationFrame(function () {
    Array.from(divParticles.querySelectorAll("span")).forEach((el) => {
      let trasY = -60 - Math.floor(Math.random() * 150);
      el.style.transform += `scaleY(1.2) translateY(${trasY}px)`;
      el.style.opacity = "0";
    });
    window.setTimeout(function () {
      // let divParticles = document.getElementById('divparticles')
      divParticles.remove();
    }, 1000);
  });
}

export { newRoundCardFlip, particles, particles2, spinfade, wobble };
