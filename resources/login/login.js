import { startMainApp } from "../apps/general/start-main-app.js";

import {
  passwordImageArray,
  passwordImageObject,
} from "./password-image-object.js";

// const mainMenuSfx = {
//   select1: new Howl({
//     src: [
//       "https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/sfx-select-2.mp3",
//     ],
//     volume: 0.8,
//     onplayerror: function () {
//       sound.once("unlock", function () {
//         sound.play();
//       });
//     },
//   }),
//   select2: new Howl({
//     src: [
//       "https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/sfx-select-1.mp3",
//     ],
//     volume: 0.5,
//     onplayerror: function () {
//       sound.once("unlock", function () {
//         sound.play();
//       });
//     },
//   }),
//   back: new Howl({
//     src: [
//       "https://orchidpony8.sakura.ne.jp/KGPSEPaudio/sfx/sfx-select-1-reversed.mp3",
//     ],
//     volume: 0.5,
//     onplayerror: function () {
//       sound.once("unlock", function () {
//         sound.play();
//       });
//     },
//   }),
// };

const studentNameContainer = document.querySelector(".student-name-container");
const teacherNameContainer = document.querySelector(".teacher-name-container");
const closeTeacherLoginModalBtn = document.querySelector(
  ".close-teacher-login-modal-btn"
);
const studentPasswordEntryForm = document.querySelector(
  ".student-password-entry-form-container"
);
const teacherPasswordEntryForm = document.querySelector(
  ".teacher-password-entry-form-container"
);

const studentPasswordGridContainer = document.querySelector(
  ".student-password-grid-container"
);
const studentPasswordGridNameHeader = document.querySelector(
  ".student-username-container"
);
const studentPasswordGrid = document.querySelector(".student-password-grid");
const studentSelectedPasswordImagesContainer = document.querySelector(
  ".student-selected-password-images"
);
const studentSelectedPasswordImage1 = document.querySelector(
  ".student-selected-password-image-1"
);
const studentSelectedPasswordImage2 = document.querySelector(
  ".student-selected-password-image-2"
);

const studentPasswordEntryArray = [null, null];

let selectedUser = null;
function populateStudentContainer() {
  getUsersForLogin();
}

// Gets students and teachers from database
async function getUsersForLogin() {
  try {
    const response = await fetch(
      "https://orchidpony8.sakura.ne.jp/KGPSEnglishPractice-test/api/read_users.php"
    );

    if (!response.ok) {
      throw new Error("Network response was not okay");
    }
    const data = await response.json();

    if (data.students) {
      displayUsersForLogin(data.students);
    } else {
      console.log("no students found");
    }
  } catch (error) {
    console.error("Error getting user data:", error);
  }
}
// Displays students and teachers
function displayUsersForLogin(data) {
  studentNameContainer.innerText = "";
  teacherNameContainer.innerText = "";
  data.forEach((user) => {
    const userContainer = document.createElement("div");
    userContainer.classList.add("user-container");
    userContainer.setAttribute("userId", user.id);
    userContainer.setAttribute("userfirstname", user.firstname);
    userContainer.setAttribute("userlastname", user.lastname);
    const userInitialsContainer = document.createElement("div");
    userInitialsContainer.classList.add("user-initials-container");
    userInitialsContainer.setAttribute("userId", user.id);
    userInitialsContainer.setAttribute("userfirstname", user.firstname);
    userInitialsContainer.setAttribute("userlastname", user.lastname);
    const userNameContainer = document.createElement("div");
    userNameContainer.classList.add("user-name-container");
    userNameContainer.setAttribute("userId", user.id);
    userNameContainer.setAttribute("userfirstname", user.firstname);
    userNameContainer.setAttribute("userlastname", user.lastname);
    userNameContainer.setAttribute("useraccess", user.access);

    if (user.access === "Student") {
      userInitialsContainer.innerText = `${user.firstname.slice(
        0,
        1
      )}. ${user.lastname.slice(0, 1)}.`;
      userNameContainer.innerText = `${user.firstname} ${user.lastname.slice(
        0,
        1
      )}.`;
      studentNameContainer.appendChild(userContainer);
      userContainer.addEventListener("click", (event) => {
        selectedUser = {
          id: event.target.getAttribute("userId"),
          firstname: event.target.getAttribute("userfirstname"),
          lastname: event.target.getAttribute("userlastname"),
          access: user.access,
        };

        studentPasswordGridNameHeader.innerText = `${user.firstname} ${user.lastname}`;

        resetStudentPasswordEntryArray();
        studentPasswordEntryForm.showModal();
      });
    } else {
      userInitialsContainer.innerText = `${user.lastname.slice(0, 1)}`;
      userNameContainer.innerText = `${user.firstname} ${user.lastname}`;
      userContainer.addEventListener("click", (event) => {
        selectedUser = {
          id: event.target.getAttribute("userId"),
          firstname: event.target.getAttribute("userfirstname"),
          lastname: event.target.getAttribute("userlastname"),
          access: user.access,
        };
        const teacherUsernameContainer = document.querySelector(
          ".teacher-username-container"
        );
        teacherUsernameContainer.innerText = `${user.firstname} ${user.lastname}`;

        teacherPasswordEntryForm.showModal();
      });
      teacherNameContainer.appendChild(userContainer);
    }

    userContainer.appendChild(userInitialsContainer);
    userContainer.appendChild(userNameContainer);
  });
}

// Object.entries(passwordImageObject).forEach((item) => {
//   Object.values(item).forEach((thing) => {
//     Object.keys(thing).forEach((substance) => {
//       console.log(substance);
//     });
//   });
// });

// const iterate = (obj) => {
//   const stack = [obj];
//   while (stack?.length > 0) {
//     const currentObj = stack.pop();
//     Object.keys(currentObj).forEach((key) => {
//       console.log(`key: ${key}, value: ${currentObj[key]}`);
//       if (typeof currentObj[key] === "object" && currentObj[key] !== null) {
//         stack.push(currentObj[key]);
//       }
//     });
//   }
// };
// iterate(passwordImageObject);

function resetStudentPasswordEntryArray() {
  if (
    studentPasswordEntryArray[0] !== null ||
    studentPasswordEntryArray[1] !== null
  ) {
    studentPasswordEntryArray.forEach((item) => {
      document
        .querySelector(`[content='${item}']`)
        .classList.remove("selected");
    });
    studentPasswordEntryArray[0] = null;
    studentPasswordEntryArray[1] = null;
  }
}

passwordImageArray.forEach((image) => {
  passwordImageObject[image].image;
  const gridImage = document.createElement("div");
  gridImage.setAttribute("id", passwordImageObject[image].id);
  gridImage.setAttribute("content", passwordImageObject[image].content);
  // gridImage.style.backgroundImage = `${passwordImageObject[image].image}`;
  gridImage.classList.add("grid-image");
  gridImage.innerText = `${passwordImageObject[image].content}`;
  gridImage.addEventListener("click", (event) => {
    // deselects previously selected grid image
    const content = gridImage.getAttribute("content");
    if (studentPasswordEntryArray.includes(content)) {
      document
        .querySelector(`[content='${content}']`)
        .classList.remove("selected");
      studentPasswordEntryArray.splice(
        studentPasswordEntryArray.indexOf(content),
        1,
        null
      );
      displaySelectedPasswordImages();
    } else {
      if (
        studentPasswordEntryArray[0] !== null &&
        studentPasswordEntryArray[1] === null
      ) {
        studentPasswordEntryArray.splice(1, 1, content);
        displaySelectedPasswordImages();
      }
      if (studentPasswordEntryArray[0] === null) {
        studentPasswordEntryArray.splice(0, 1, content);
        displaySelectedPasswordImages();
      }

      if (studentPasswordEntryArray.length > 2) {
        // document
        //   .querySelector(`[content='${studentPasswordEntryArray[0]}']`)
        //   .classList.remove("selected");
        studentPasswordEntryArray.splice(0, 1);
      }
      studentPasswordEntryArray.forEach((item) => {
        if (item !== null) {
          document
            .querySelector(`[content = '${item}']`)
            .classList.add("selected");
        }
      });
    }
  });

  studentPasswordGrid.appendChild(gridImage);
});

studentPasswordGridContainer.appendChild(studentPasswordGrid);

function displaySelectedPasswordImages() {
  if (studentPasswordEntryArray[0] !== null) {
    studentSelectedPasswordImage1.innerText = `${
      passwordImageObject[studentPasswordEntryArray[0]].content
    }`;
  } else {
    studentSelectedPasswordImage1.innerText = ``;
  }
  if (studentPasswordEntryArray[1] !== null) {
    studentSelectedPasswordImage2.innerText = `${
      passwordImageObject[studentPasswordEntryArray[1]].content
    }`;
  } else {
    studentSelectedPasswordImage2.innerText = ``;
  }
}

// Student login submission Event Listener
document
  .getElementById("studentPasswordEntryForm")
  .addEventListener("submit", (event) => {
    loginUser(
      selectedUser.id,
      selectedUser.firstname,
      selectedUser.lastname,
      selectedUser.access
    );
    document.getElementById("studentPasswordEntryForm").reset();
  });

// Teacher login Event Listener
document
  .getElementById("teacherPasswordEntryForm")
  .addEventListener("submit", (event) => {
    loginUser(
      selectedUser.id,
      selectedUser.firstname,
      selectedUser.lastname,
      selectedUser.access
    );
    document.getElementById("teacherPasswordEntryForm").reset();
  });

// Login logic
async function loginUser(id, firstname, lastname, access) {
  let password;
  if (access === "Teacher") {
    password = document.getElementById("teacherpassword").value;
  } else if (access === "Student") {
    password = studentPasswordEntryArray.join("");
  }

  try {
    const response = await fetch("/KGPSEnglishPractice-test/api/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, firstname, lastname, password }),
      credentials: "include",
    });

    const rawText = await response.text();
    console.log("Raw response text: ", rawText);

    const data = JSON.parse(rawText);
    console.log("Parsed response data: ", data);

    if (!response.ok) {
      resetStudentPasswordEntryArray();
      throw new Error("Login error", data.error);
    } else {
      routing(data);
    }
  } catch (error) {
    console.error("Error loging in: ", error);
  }
}
window.addEventListener("load", getUsersForLogin);
closeTeacherLoginModalBtn.addEventListener("click", () => {
  teacherPasswordEntryForm.close();
  // teacherPasswordEntryForm.reset();
});

function routing(userData) {
  if (userData.access === "Teacher") {
    window.location.href =
      "/KGPSEnglishPractice-test/resources/teacher-interface/user-management.html";
  } else if (userData.access === "Student") {
    window.location.href = "/KGPSEnglishPractice-test/index.html";
  }
}
