import { images } from "../utilities/images.js";
import { BASE_PATH } from "../utilities/get-base-path.js";

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

const userObjects = {
  studentObjects: {},
  teacherObjects: {},
};

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
    const response = await fetch(`${BASE_PATH}api/read_users.php`);

    if (!response.ok) {
      throw new Error("Network response was not okay");
    }

    const data = await response.json();
    console.log(data);
    console.log(response);
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
    userContainer.classList.add("user-container");
    userInitialsContainer.classList.add("user-initials-container");
    userNameContainer.classList.add("user-name-container");

    if (i < studentIds.length) {
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
        teacherUsernameContainer.innerText = `${selectedUser.title} ${selectedUser.lastName}`;

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

const setImages = () => {
  gridImage.setAttribute("id", images.imageObject[image].id);
  gridImage.setAttribute("content", images.imageObject[image].content);
  gridImage.src = `${images.imageObject[image].link}`;
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
};
// Generate student login grid with images
function loadStudentLoginImageGrid() {
  passwordImageNamesArray.forEach((image) => {
    const gridImage = document.createElement("img");
    gridImage.classList.add("grid-image");
    if (images.imageObject[image]) {
      setImages();
    } else {
      setTimeout(setImages, 500);
    }

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
    loginUser();
    document.getElementById("teacherPasswordEntryForm").reset();
  });

// Login logic
async function loginUser() {
  let response;
  try {
    if (selectedUser.access === "student") {
      selectedUser.password = studentPasswordEntryArray.join("");
    } else if (selectedUser.access === "teacher") {
      selectedUser.password = document.getElementById("teacherpassword").value;
    }
    response = await fetch(`${BASE_PATH}api/login.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selectedUser }),
      credentials: "include",
    });

    const data = await response.json();

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
window.addEventListener("DOMContentLoaded", () => {
  images.getImages("login", 1, null);
  getUsersForLogin();
  try {
    setTimeout(loadStudentLoginImageGrid, 400);
  } catch {
    setTimeout(loadStudentLoginImageGrid, 300);
  } finally {
    setTimeout(loadStudentLoginImageGrid, 400);
  }
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
const getImages = () => {
  const ref = "http://orchidpony8.sakura.ne.jp/images/clipart/";
  const imgRabbit = document.createElement("img");
  const imgDuck = document.createElement("img");
  const imgFish = document.createElement("img");
  const imgTurtle = document.createElement("img");
  const imgCat = document.createElement("img");
  const imgLizard = document.createElement("img");
  const imgCar = document.createElement("img");
  const imgTruck = document.createElement("img");
  const imgRocket = document.createElement("img");
  const imgTrain = document.createElement("img");
  const imgAirplane = document.createElement("img");
  const imgBoat = document.createElement("img");
  const imgStrawberry = document.createElement("img");
  const imgApple = document.createElement("img");
  const imgCarrot = document.createElement("img");
  const imgBanana = document.createElement("img");
  const imgWatermelon = document.createElement("img");
  const imgSpoon = document.createElement("img");
  imgRabbit.src = `${ref}animal-rabbit-silhouette-1.svg`;
  imgRabbit.role = "img";
  imgRabbit;
  imgDuck.src = `${ref}animal-duck-silhouette-2.svg`;
  imgDuck.role = "img";
  imgDuck;
  imgFish.src = `${ref}animal-fish-silhouette-3.svg`;
  imgFish.role = "img";
  imgFish;
  imgTurtle.src = `${ref}animal-turtle-silhouette-2.svg`;
  imgTurtle.role = "img";
  imgTurtle;
  imgCat.src = `${ref}animal-cat-silhouette-1.svg`;
  imgCat.role = "img";
  imgCat;
  imgLizard.src = `${ref}animal-lizard-silhouette-2.svg`;
  imgLizard.role = "img";
  imgLizard;
  imgCar.src = `${ref}transportation-car-silhouette-1.svg`;
  imgCar.role = "img";
  imgCar;
  imgTruck.src = `${ref}transportation-truck-silhouette-1.svg`;
  imgTruck.role = "img";
  imgTruck;
  imgRocket.src = `${ref}transportation-rocket-silhouette-1.svg`;
  imgRocket.role = "img";
  imgRocket;
  imgTrain.src = `${ref}transportation-train-silhouette-1.svg`;
  imgTrain.role = "img";
  imgTrain;
  imgAirplane.src = `${ref}transportation-airplane-silhouette-2.svg`;
  imgAirplane.role = "img";
  imgAirplane;
  imgBoat.src = `${ref}transportation-sailboat-silhouette-1.svg`;
  imgBoat.role = "img";
  imgBoat;
  imgStrawberry.src = `${ref}food-strawberry-silhouette-2.svg`;
  imgStrawberry.role = "img";
  imgStrawberry;
  imgApple.src = `${ref}food-apple-silhouette-2.svg`;
  imgApple.role = "img";
  imgApple;
  imgCarrot.src = `${ref}food-carrot-silhouette-1.svg`;
  imgCarrot.role = "img";
  imgCarrot;
  imgBanana.src = `${ref}food-banana-silhouette-2.svg`;
  imgBanana.role = "img";
  imgBanana;
  imgWatermelon.src = `${ref}food-watermelon-silhouette-2.svg`;
  imgWatermelon.role = "img";
  imgWatermelon;
  imgSpoon.src = `${ref}object-spoon-silhouette-1.svg`;
  imgSpoon.role = "img";
  imgSpoon;
};
function routing(userData) {
  if (userData.access === "teacher") {
    window.location.href = `${BASE_PATH}resources/teacher-interface/user-management.html`;
  } else if (userData.access === "student") {
    window.location.href = `${BASE_PATH}index.html`;
  }
}
