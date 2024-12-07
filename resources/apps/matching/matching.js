import { score } from "../../utilities/score.js";

import {
  dotAndLineCommand,
  startDot,
  endDot,
  Connector,
} from "./dot-objects-control.js";
import { sessionCheck, sessionData } from "../../login/session-check.js";
import { user } from "../../utilities/user-object.js";
import {
  style,
  activityId,
  setStyle,
} from "./matching-set-style-and-activity-id.js";
import { audio } from "../../utilities/audio.js";
import {
  elements,
  pauseFunction,
  toggleBlur,
  toggleTouchFunction,
} from "../../utilities/pause-functions.js";
import { matchingApp } from "../../utilities/app-class.js";

console.log("matching");
// const matchingApp = new MatchingApp();
// matchingApp.startApp();

// matchingApp.startApp(set, this.createAndSetStructure, matchingAppElements);
/* SCORING */
const correctAnswerPoints = 1;
const incorrectAnswerPoints = 1;

// score.display.textContent = `${score.currentScore}`;
const body = document.body;
let endDotId;
let startDotId;

let numberOfItemsToBeDisplayed = 4;

let currentDotId = null;
const currentDotIdArray = [];

/*
*******
I. MAIN APP
*******
*/
const matchingAppElements = [
  ".dot,.dot-enclosure,.capitals,.lowercase,.btn-container1,.grid",
];

function setUser() {
  user.gradeLevel = sessionData.gradeLevel;
  user.firstName = sessionData.firstName;
  user.lastName = sessionData.lastName;
  user.access = sessionData.access;
  user.id = sessionData.userId;
}

async function updateUserTotalScore() {
  //  For student users; teachers will differ on user type, etc
  const newScore = {
    activity_id: activityId,
    user_id: user.id,
    user_type: user.access,
    correct_answer_count: 0,
    incorrect_answer_count: 0,
    time_to_correct_answer_duration_in_seconds: 0,
    answer_attempts: 0,
    activity_score: score.currentScore,
  };
  try {
    const response = await fetch(
      "/KGPSEnglishPractice-test/api/add_user_activity_record.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newScore),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Network response was not okay");
    }
  } catch (error) {
    console.error("Error adding record:", error);
  }
}

/*
*******
II. SESSIONS & ROUNDS
*******
*/

/*
B. Clearing the Grid & Resetting Arrays
*/

export {
  matchingApp,
  checkAllCorrect,
  currentDotId,
  endDotId,
  startDotId,
  lines,
  numberOfItemsToBeDisplayed,
  elements,
};
