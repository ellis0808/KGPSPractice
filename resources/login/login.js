// import {
//   passwordImageArray,
//   passwordImageObject,
// } from "./password-image-object.js";
import { images } from "../utilities/images.js";
import { userObjects } from "../teacher-interface/user-objects.js";

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
    const students = data.students;
    const teachers = data.teachers;
    students.map((student) => {
      return (userObjects.studentObjects[student.student_id] = {
        id: student.student_id,
        firstName: student.first_name,
        lastName: student.last_name,
        access: student.access,
      });
    });
    teachers.map((teacher) => {
      return (userObjects.teacherObjects[teacher.teacher_id] = {
        id: teacher.teacher_id,
        title: teacher.title,
        lastName: teacher.last_name,
        access: teacher.access,
      });
    });
    if (data) {
      displayUsersForLogin();
    } else {
    }
  } catch (error) {
    console.error("Error getting user data:", error);
  }
}
// Displays students and teachers
function displayUsersForLogin() {
  studentNameContainer.innerText = "";
  teacherNameContainer.innerText = "";

  const students = userObjects.studentObjects;
  const teachers = userObjects.teacherObjects;
  const studentIds = Object.keys(students);
  const teacherIds = Object.keys(teachers);

  let i = 0;
  let q = 0;
  for (i; i < studentIds.length + teacherIds.length; ++i) {
    const userNameContainer = document.createElement("div");
    const userContainer = document.createElement("div");
    const userInitialsContainer = document.createElement("div");
    if (i < studentIds.length) {
      userContainer.classList.add("user-container");
      userContainer.setAttribute("userId", students[studentIds[i]].id);
      userContainer.setAttribute(
        "userfirstname",
        students[studentIds[i]].firstName
      );
      userContainer.setAttribute(
        "userlastname",
        students[studentIds[i]].lastName
      );
      userContainer.setAttribute("useraccess", students[studentIds[i]].access);
      userInitialsContainer.classList.add(
        "user-initials-container",
        `user-initials-container-${i}`
      );
      userInitialsContainer.setAttribute("userId", students[studentIds[i]].id);
      userInitialsContainer.setAttribute(
        "userfirstname",
        students[studentIds[i]].firstName
      );
      userInitialsContainer.setAttribute(
        "userlastname",
        students[studentIds[i]].lastName
      );
      userInitialsContainer.setAttribute(
        "useraccess",
        students[studentIds[i]].access
      );
      userNameContainer.classList.add("user-name-container");
      userNameContainer.setAttribute("userId", students[studentIds[i]].id);
      userNameContainer.setAttribute(
        "userfirstname",
        students[studentIds[i]].firstName
      );
      userNameContainer.setAttribute(
        "userlastname",
        students[studentIds[i]].lastName
      );
      userNameContainer.setAttribute(
        "useraccess",
        students[studentIds[i]].access
      );

      userInitialsContainer.innerText = `${students[
        studentIds[i]
      ].firstName.slice(0, 1)}. ${students[studentIds[i]].lastName.slice(
        0,
        1
      )}.`;
      userNameContainer.innerText = `${
        students[studentIds[i]].firstName
      } ${students[studentIds[i]].lastName.slice(0, 1)}.`;
      studentNameContainer.appendChild(userContainer);
      userContainer.addEventListener("click", (event) => {
        selectedUser = {
          id: event.target.getAttribute("userId"),
          firstName: event.target.getAttribute("userfirstname"),
          lastName: event.target.getAttribute("userlastname"),
          access: event.target.getAttribute("useraccess"),
        };

        studentPasswordGridNameHeader.innerText = `${selectedUser.firstName} ${selectedUser.lastName}`;

        resetStudentPasswordEntryArray();
        studentPasswordEntryForm.showModal();
      });
    }
    if (i >= studentIds.length) {
      userContainer.setAttribute(
        "userfirstname",
        teachers[teacherIds[q]].title
      );
      userContainer.setAttribute(
        "userlastname",
        teachers[teacherIds[q]].lastName
      );
      userContainer.setAttribute("useraccess", teachers[teacherIds[q]].access);
      userInitialsContainer.classList.add(
        "user-initials-container",
        `user-initials-container-${i}`
      );
      userInitialsContainer.setAttribute("userId", teachers[teacherIds[q]].id);
      userInitialsContainer.setAttribute(
        "userfirstname",
        teachers[teacherIds[q]].title
      );
      userInitialsContainer.setAttribute(
        "userlastname",
        teachers[teacherIds[q]].lastName
      );
      userInitialsContainer.setAttribute(
        "useraccess",
        teachers[teacherIds[q]].access
      );
      userNameContainer.classList.add("user-name-container");
      userNameContainer.setAttribute("userId", teachers[teacherIds[q]].id);
      userNameContainer.setAttribute(
        "userfirstname",
        teachers[teacherIds[q]].title
      );
      userNameContainer.setAttribute(
        "userlastname",
        teachers[teacherIds[q]].lastName
      );
      userNameContainer.setAttribute(
        "useraccess",
        teachers[teacherIds[q]].access
      );
      userInitialsContainer.innerText = `${teachers[
        teacherIds[q]
      ].lastName.slice(0, 1)}`;
      userNameContainer.innerText = `${teachers[teacherIds[q]].title} ${
        teachers[teacherIds[q]].lastName
      }`;
      userContainer.addEventListener("click", (event) => {
        selectedUser = {
          id: event.target.getAttribute("userId"),
          title: event.target.getAttribute("userfirstname"),
          lastName: event.target.getAttribute("userlastname"),
          access: event.target.getAttribute("useraccess"),
        };
        const teacherUsernameContainer = document.querySelector(
          ".teacher-username-container"
        );
        teacherUsernameContainer.innerText = `${selectedUser.firstName} ${selectedUser.lastName}`;

        teacherPasswordEntryForm.showModal();
      });
      teacherNameContainer.appendChild(userContainer);
      ++q;
    }

    userContainer.appendChild(userInitialsContainer);
    userContainer.appendChild(userNameContainer);
  }
}

function removeSelectedClassFromPasswordEntryArrayImage(item) {
  document.querySelector(`[content='${item}']`).classList.remove("selected");
}
function resetStudentPasswordEntryArray() {
  if (
    studentPasswordEntryArray[0] !== null ||
    studentPasswordEntryArray[1] !== null
  ) {
    console.log(studentPasswordEntryArray[0]);
    studentPasswordEntryArray.forEach((item) => {
      if (item) {
        removeSelectedClassFromPasswordEntryArrayImage(item);
      }
    });
    // studentPasswordEntryArray.forEach((item) => {
    //   if (item) {
    //     item.classList.remove("selected");
    //   }
    // });
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
    loginUser();
    document.getElementById("studentPasswordEntryForm").reset();
  });

// Teacher login Event Listener
document
  .getElementById("teacherPasswordEntryForm")
  .addEventListener("submit", (event) => {
    console.log(selectedUser);
    loginUser();
    document.getElementById("teacherPasswordEntryForm").reset();
  });

// Login logic
async function loginUser() {
  let password;
  if (access === "teacher") {
    selectedUser.password = document.getElementById("teacherpassword").value;
  } else if (access === "student") {
    selectedUser.password = studentPasswordEntryArray.join("");
  }
  console.log(selectedUser);

  try {
    const response = await fetch("/KGPSEnglishPractice-test/api/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selectedUser }),
      credentials: "include",
    });

    const data = await response.json();
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
  resetStudentPasswordEntryArray();
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
