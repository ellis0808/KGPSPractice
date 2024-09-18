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
      "/KGPSEnglishPractice-test/api/read_users.php"
    );

    if (!response.ok) {
      throw new Error("Network response was not okay");
    }
    const data = await response.json();

    if (data.users) {
      displayUsersForLogin(data.users);
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
    userContainer.setAttribute("userId", user.student_id);
    userContainer.setAttribute("userfirstname", user.first_name);
    userContainer.setAttribute("userlastname", user.last_name);
    const userInitialsContainer = document.createElement("div");
    userInitialsContainer.classList.add("user-initials-container");
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
      selectedUser.first_name,
      selectedUser.last_name,
      selectedUser.access
    );
    document.getElementById("studentPasswordEntryForm").reset();
  });

// Teacher login Event Listener
document
  .getElementById("teacherPasswordEntryForm")
  .addEventListener("submit", (event) => {
    loginUser(
      selectedUser.student_id,
      selectedUser.first_name,
      selectedUser.last_name,
      selectedUser.access
    );
    document.getElementById("teacherPasswordEntryForm").reset();
  });

// Login logic
async function loginUser(id, first_name, last_name, access) {
  let password;
  if (access === "teacher") {
    password = document.getElementById("teacherpassword").value;
  } else if (access === "student") {
    password = studentPasswordEntryArray.join("");
  }

  try {
    const response = await fetch("/KGPSEnglishPractice-test/api/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, first_name, last_name, password }),
      credentials: "include",
    });
    console.log(id);

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
  if (userData.access === "teacher") {
    window.location.href =
      "../resources/teacher-interface/user-management.html";
  } else if (userData.access === "student") {
    window.location.href = "/KGPSEnglishPractice-test/index.html";
  }
}
