// import {
//   passwordImageArray,
//   passwordImageObject,
// } from "./password-image-object.js";
import { images } from "../utilities/images.js";

const passwordImageNamesArray = [
  "rabbit-silhouette-1",
  "duck-silhouette-2",
  "fish-silhouette-3",
  "turtle-silhouette-2",
  "cat-silhouette-1",
  "lizard-silhouette-2",
  "car-silhouette-1",
  "truck-silhouette-1",
  "rocket-silhouette-1",
  "train-silhouette-1",
  "airplane-silhouette-2",
  "sailboat-silhouette-1",
  "strawberry-silhouette-2",
  "apple-silhouette-2",
  "carrot-silhouette-2",
  "banana-silhouette-1",
  "watermelon-silhouette-2",
  "spoon-silhouette-1",
];

const studentNameContainer = document.querySelector(".student-name-container");
const teacherNameContainer = document.querySelector(".teacher-name-container");
const closeStudentLoginModalBtn = document.querySelector(
  ".close-student-login-modal-btn"
);
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
studentSelectedPasswordImage1.classList.add("chosen-image");
const studentSelectedPasswordImage2 = document.querySelector(
  ".student-selected-password-image-2"
);
studentSelectedPasswordImage2.classList.add("chosen-image");

const studentPasswordEntryArray = [null, null];

let selectedUser = null;

// Gets students and teachers from database
async function getUsersForLogin() {
  try {
    const response = await fetch(
      "/KGPSEnglishPractice-test/api/read_users.php"
    );

    if (!response.ok) {
      throw new Error("Network response was not okay");
    }
    const data = await response.json();

    if (data.users) {
      displayUsersForLogin(data.users);
    } else {
    }
  } catch (error) {
    console.error("Error getting user data:", error);
  }
}
// Displays students and teachers
function displayUsersForLogin(data) {
  studentNameContainer.innerText = "";
  teacherNameContainer.innerText = "";
  let i = 0;
  data.forEach((user) => {
    ++i;
    const userContainer = document.createElement("div");
    userContainer.classList.add("user-container");
    userContainer.setAttribute("userId", user.student_id);
    userContainer.setAttribute("userfirstname", user.first_name);
    userContainer.setAttribute("userlastname", user.last_name);
    const userInitialsContainer = document.createElement("div");
    userInitialsContainer.classList.add(
      "user-initials-container",
      `user-initials-container-${i}`
    );
    userInitialsContainer.setAttribute("userId", user.student_id);
    userInitialsContainer.setAttribute("userfirstname", user.first_name);
    userInitialsContainer.setAttribute("userlastname", user.last_name);
    const userNameContainer = document.createElement("div");
    userNameContainer.classList.add("user-name-container");
    userNameContainer.setAttribute("userId", user.student_id);
    userNameContainer.setAttribute("userfirstname", user.first_name);
    userNameContainer.setAttribute("userlastname", user.last_name);
    userNameContainer.setAttribute("useraccess", user.access);

    if (user.access === "student") {
      userInitialsContainer.innerText = `${user.first_name.slice(
        0,
        1
      )}. ${user.last_name.slice(0, 1)}.`;
      userNameContainer.innerText = `${user.first_name} ${user.last_name.slice(
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

        studentPasswordGridNameHeader.innerText = `${user.first_name} ${user.last_name}`;

        resetStudentPasswordEntryArray();
        studentPasswordEntryForm.showModal();
      });
    } else {
      userInitialsContainer.innerText = `${user.last_name.slice(0, 1)}`;
      userNameContainer.innerText = `${user.first_name} ${user.last_name}`;
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
        teacherUsernameContainer.innerText = `${user.first_name} ${user.last_name}`;

        teacherPasswordEntryForm.showModal();
        console.log(selectedUser);
      });
      teacherNameContainer.appendChild(userContainer);
    }

    userContainer.appendChild(userInitialsContainer);
    userContainer.appendChild(userNameContainer);
  });
}

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
    displaySelectedPasswordImages();
  }
}

// Generate student login grid with images
function loadStudentLoginImageGrid() {
  passwordImageNamesArray.forEach((image) => {
    const gridImage = document.createElement("div");
    gridImage.classList.add("grid-image");
    gridImage.setAttribute("id", images.imageObject[image].id);
    gridImage.setAttribute("content", images.imageObject[image].content);
    gridImage.style.backgroundImage = `url(${images.imageObject[image].link})`;
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
}
studentPasswordGridContainer.appendChild(studentPasswordGrid);

function displaySelectedPasswordImages() {
  if (studentPasswordEntryArray[0] !== null) {
    studentSelectedPasswordImage1.style.backgroundImage = `url(${
      images.imageObject[
        Object.keys(images.imageObject).filter((image) =>
          image.includes(studentPasswordEntryArray[0])
        )
      ].link
    })`;
    // }
  } else {
    studentSelectedPasswordImage1.style.backgroundImage = ``;
  }
  if (studentPasswordEntryArray[1] !== null) {
    studentSelectedPasswordImage2.style.backgroundImage = `url(${
      images.imageObject[
        Object.keys(images.imageObject).filter((image) =>
          image.includes(studentPasswordEntryArray[1])
        )
      ].link
    })`;
  } else {
    studentSelectedPasswordImage2.style.backgroundImage = ``;
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
  if (access === "teacher") {
    password = document.getElementById("teacherpassword").value;
    console.log(document.getElementById("teacherpassword").value);
  } else if (access === "student") {
    password = studentPasswordEntryArray.join("");
  }

  try {
    const response = await fetch("/KGPSEnglishPractice-test/api/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, firstname, lastname, access, password }),
      credentials: "include",
    });

    const rawText = await response.text();
    const data = JSON.parse(rawText);
    console.log(data);

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
window.addEventListener("load", () => {
  images.getImages("login", 1, null);
  getUsersForLogin();
  setTimeout(loadStudentLoginImageGrid, 500);
});
closeStudentLoginModalBtn.addEventListener("click", (event) => {
  // event.preventDefault();
  studentPasswordEntryForm.close();
});
closeTeacherLoginModalBtn.addEventListener("click", (event) => {
  // event.preventDefault();
  teacherPasswordEntryForm.close();
  // teacherPasswordEntryForm.reset();
});

function routing(userData) {
  if (userData.access === "teacher") {
    window.location.href = "../teacher-interface/user-management.html";
  } else if (userData.access === "student") {
    window.location.href = "/KGPSEnglishPractice-test/index.html";
  }
}
