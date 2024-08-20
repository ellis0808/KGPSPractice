// import { startMainApp } from "../js/general/start-main-app";

import {
  passwordImageArray,
  passwordImageObject,
} from "./password-image-object.js";

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

let selectedUser = null;
function populateStudentContainer() {
  getUsersForLogin();
}

// Gets students and teachers from database
async function getUsersForLogin() {
  try {
    const response = await fetch("http://localhost/api/read_users.php");

    if (!response.ok) {
      throw new Error("Network response was not okay");
    }
    const data = await response.json();

    if (data.users) {
      displayUsersForLogin(data.users);
    } else {
      console.log("no users found");
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
        };
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
        };
        const teacherUsernameContainer = document.querySelector(
          ".teacher-username-container"
        );
        teacherUsernameContainer.innerText = `${user.firstname} ${user.lastname}`;

        console.log(selectedUser.id);

        teacherPasswordEntryForm.showModal();
      });
      teacherNameContainer.appendChild(userContainer);
    }

    userContainer.appendChild(userInitialsContainer);
    userContainer.appendChild(userNameContainer);
  });
}

const studentPasswordGridContainer = document.createElement("div");
const studentPasswordGridNameHeader = document.createElement("div");
const studentPasswordGrid = document.createElement("div");
const studentPasswordGridCancelBtn = document.createElement("div");
const studentPasswordGridSubmitBtn = document.createElement("div");

studentPasswordGridContainer.appendChild(studentPasswordGridNameHeader);
studentPasswordGridContainer.appendChild(studentPasswordGrid);
studentPasswordGridContainer.appendChild(studentPasswordGridCancelBtn);
studentPasswordGridContainer.appendChild(studentPasswordGridSubmitBtn);
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
passwordImageArray.forEach((image) => {
  passwordImageObject[image].image;
  const gridImage = document.createElement("div");
  gridImage.setAttribute("id", passwordImageObject[image].id);
  gridImage.setAttribute("content", passwordImageObject[image].content);
  // gridImage.style.backgroundImage = `${passwordImageObject[image].image}`;
  gridImage.innerText = `${passwordImageObject[image].content}`;
  console.log(gridImage);

  studentPasswordGrid.appendChild(gridImage);
});

// Student login submission Event Listener
document
  .getElementById("studentPasswordEntryForm")
  .addEventListener("submit", (event) => {
    console.log(selectedUser.id);

    loginUser(selectedUser.id, selectedUser.firstname, selectedUser.lastname);
    document.getElementById("studentPasswordEntryForm").reset();
  });

// Teacher login Event Listener
document
  .getElementById("teacherPasswordEntryForm")
  .addEventListener("submit", (event) => {
    console.log(selectedUser.id);

    loginUser(selectedUser.id, selectedUser.firstname, selectedUser.lastname);
    document.getElementById("teacherPasswordEntryForm").reset();
  });

// Login logic
async function loginUser(id, firstname, lastname) {
  const password = document.getElementById("teacherpassword").value;
  try {
    const response = await fetch("http://localhost/api/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, firstname, lastname, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Login error", data.error);
    } else {
      console.log("login successful:", data);
    }
  } catch (error) {
    console.error("Error loging in:", error);
  }
}
window.addEventListener("load", getUsersForLogin);
closeTeacherLoginModalBtn.addEventListener("click", () => {
  teacherPasswordEntryForm.close();
  teacherPasswordEntryForm.reset();
});
