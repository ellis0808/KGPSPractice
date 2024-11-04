import { sessionCheck } from "../login/session-check.js";

const userList = document.querySelector(".div1");
const createUserBtn = document.querySelector(".create-new-user");
const createUserDiv = document.querySelector(".create-user-div");
const updateUserDiv = document.querySelector(".update-user-div");
const userDataDiv = document.querySelector(".user-data-div");
const openCreateUserModalBtn = document.querySelector(".open-modal-btn");
const closeCreateUserModalBtn = document.querySelector(".close-modal-btn");
const openSingleUserDataModalBtn = document.querySelector(".open-modal-btn2");
const closeSingleUserDataModalBtn = document.querySelector(".close-modal-btn2");
const openUpdateUserModalBtn = document.querySelector(".open-modal-btn3");
const closeUpdateUserModalBtn = document.querySelector(".close-modal-btn3");
const createUserFormHeading = document.querySelector(
  ".create-user-form-heading"
);
const createStudentDisplayBtn = document.querySelector(
  ".create-student-display-btn"
);
const createTeacherDisplayBtn = document.querySelector(
  ".create-teacher-display-btn"
);
const createStudentForm = document.querySelector(".create-student-form");
const createTeacherForm = document.querySelector(".create-teacher-form");

// Modal Controls
openCreateUserModalBtn.addEventListener("pointerdown", () => {
  createUserDiv.showModal();
});
closeCreateUserModalBtn.addEventListener("pointerdown", () => {
  createUserDiv.close();
  document.getElementById("createUser").reset();
});
closeSingleUserDataModalBtn.addEventListener("pointerdown", () => {
  userDataDiv.close();
  document.getElementById("createUser").reset();
});
closeUpdateUserModalBtn.addEventListener("pointerdown", () => {
  updateUserDiv.close();
  document.getElementById("updateUser").reset();
});
let form = "student";
createStudentDisplayBtn.addEventListener("pointerdown", () => {
  form = "student";
  createUserFormHeading.innerHTML = `<h2>Create New Student</h2>`;
  createStudentForm.classList.remove("hidden");
  createTeacherForm.classList.add("hidden");
  createStudentDisplayBtn.classList.add("hidden");
  createTeacherDisplayBtn.classList.remove("hidden");
  return form;
});
createTeacherDisplayBtn.addEventListener("pointerdown", () => {
  form = "teacher";

  createUserFormHeading.innerHTML = `<h2>Create New Teacher</h2>`;
  createStudentForm.classList.add("hidden");
  createTeacherForm.classList.remove("hidden");
  createStudentDisplayBtn.classList.remove("hidden");
  createTeacherDisplayBtn.classList.add("hidden");
  return form;
});

// Gets and displays all students in the table made from CSS grid

// async function getUsers() {
// try {
//   const response = await fetch(
//     "/KGPSEnglishPractice-test/api/read_users.php"
//   );
//   if (!response.ok) {
//     throw new Error("Network response was not okay");
//   }
//   const data = await response.json();
//   if (data.users) {
//     displayUsers.displayAllUsers(data.users);
//   } else {
//     console.log("No students found");
//   }
// } catch (error) {
//   console.error("Error getting user data:", error);
// }
// }
const displayUsers = {
  createUserElementsForDisplay() {
    this.userDataHeader = document.createElement("div");
    this.numberHeader = document.createElement("div");
    this.nameHeader = document.createElement("div");
    this.gradeLevelHeader = document.createElement("div");
    this.accessHeader = document.createElement("div");
    this.numberHeader.classList.add("number", "table-header");
    this.gradeLevelHeader.classList.add("number", "table-header");
    this.nameHeader.classList.add("table-header");
    this.accessHeader.classList.add("table-header");
    this.numberHeader.textContent = "";
    this.nameHeader.textContent = "Last Name, First Name";
    this.accessHeader.textContent = "Access";
    this.gradeLevelHeader.textContent = "Grade";
    this.userDataHeader.classList.add("user-data-header");
  },
  appendUserDataHeaders() {
    this.userDataHeader.appendChild(this.numberHeader);
    this.userDataHeader.appendChild(this.nameHeader);
    this.userDataHeader.appendChild(this.gradeLevelHeader);
    this.userDataHeader.appendChild(this.accessHeader);
    userList.appendChild(this.userDataHeader);
  },
  setUserDataInRows(data) {
    let i = 0;
    data.forEach((user) => {
      ++i;
      this.userData = document.createElement("div");
      this.number = document.createElement("div");
      this.userName = document.createElement("div");
      this.userGradeLevel = document.createElement("div");
      this.userAccess = document.createElement("div");
      this.editUserBtn = document.createElement("button");
      this.deleteUserBtn = document.createElement("button");
      this.userName.setAttribute("userId", user.student_id);
      this.userName.classList.add("open-modal-btn2", "user-name");
      this.userName.addEventListener("click", (event) => {
        const id = event.target.getAttribute("userId");
        getSingleUser2(id);
        // document.getElementById("single-user-data-div").reset();
        userDataDiv.showModal();
      });
      this.editUserBtn.textContent = "Edit";
      this.deleteUserBtn.textContent = "Delete";
      this.editUserBtn.setAttribute("userId", user.student_id);
      this.editUserBtn.setAttribute("type", user.access);
      this.deleteUserBtn.setAttribute("userId", user.student_id);
      this.deleteUserBtn.setAttribute("type", user.access);
      this.editUserBtn.classList.add("open-modal-btn3");
      this.editUserBtn.addEventListener("click", (event) => {
        const id = event.target.getAttribute("userId");
        const type = event.target.getAttribute("type");
        const funct = "edit"; // funct is short for 'function', but it's a reserved word
        getUserInfo.getSingleUser(id, type, funct);
        document.getElementById("updateUser").reset();
        updateUserDiv.showModal();
      });
      this.deleteUserBtn.addEventListener("click", (event) => {
        const id = event.target.getAttribute("userId");
        const type = event.target.getAttribute("type");
        deleteUser(id, type);
      });
      this.number.classList.add("number");
      this.userGradeLevel.classList.add("number");
      this.number.textContent = `${i}`;
      this.userName.textContent = `${user.last_name}, ${user.first_name}`;
      if (user.access === "teacher") {
        this.userGradeLevel.textContent = ``;
      } else {
        this.userGradeLevel.textContent = `${user.grade_level}`;
      }
      if (user.access !== "student") {
        if (user.access === "1") {
          this.userAccess.textContent = `Admin`;
        } else this.userAccess.textContent = `Teacher`;
      } else {
        this.userAccess.textContent = `${user.access}`;
      }
      this.userData.classList.add("user-slot");
      this.userData.classList.add("user-slot");
      this.userData.appendChild(this.number);
      this.userData.appendChild(this.userName);
      this.userData.appendChild(this.userGradeLevel);
      this.userData.appendChild(this.userAccess);
      this.userData.appendChild(this.editUserBtn);
      this.userData.appendChild(this.deleteUserBtn);
      userList.appendChild(this.userData);
    });
  },
  displayAllUsers(data) {
    userList.textContent = "";
    this.createUserElementsForDisplay();
    this.appendUserDataHeaders();
    this.setUserDataInRows(data);
  },
  displaySingleUserInfoForEditing(data, type) {
    const singleUserData1 = document.querySelector(".single-user-data1");
    singleUserData1.setAttribute("userID", data.student_id);
    if (data.access === "teacher") {
      singleUserData1.innerText = `${data.last_name}, ${data.first_name}\r\nAccess: ${data.access}`;
    } else {
      singleUserData1.innerText = `${data.last_name}, ${data.first_name}\r\nGrade: ${data.grade_level}\r\nAccess: ${data.access}`;
    }
  },
  displaySingleUserInfo(data) {
    const userName = document.querySelector(".user-data-modal-name");
    const singleUserData2 = document.querySelector(".single-user-data2");
    userName.innerText = `${data.last_name}, ${data.first_name}`;
    if (data.access === "teacher") {
      singleUserData2.innerText = `Access: ${data.access}`;
    } else {
      singleUserData2.innerText = `Grade: ${data.grade_level}\r\nAccess: ${data.access}`;
    }
  },
};
function appendItems(items, intermediateTarget, finalTarget) {
  if (intermediateTarget) {
    items.forEach((item) => {
      intermediateTarget.appendChild(item);
    });
    finalTarget.appendChild(intermediateTarget);
  } else {
    items.forEach((item) => {
      finalTarget.appendChild(item);
    });
  }
}

const getUserInfo = {
  async getAllUsers() {
    try {
      const response = await fetch(
        "/KGPSEnglishPractice-test/api/read_users.php"
      );

      if (!response.ok) {
        throw new Error("Network response was not okay");
      }
      const data = await response.json();

      if (data.users) {
        displayUsers.displayAllUsers(data.users);
      } else {
        console.log("No students found");
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  },
  async getSingleUser(id, type, funct) {
    try {
      const response = await fetch(
        `/KGPSEnglishPractice-test/api/read_users.php?id=${id}`
      );

      if (!response.ok) {
        throw new Error("Network response was not okay");
      }
      const data = await response.json();
      if (data) {
        if ((funct = "edit")) {
          displayUsers.displaySingleUserInfoForEditing(data, type);
        } else {
          displayUsers.displaySingleUserInfo(data);
        }
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  },
};

// Get and Display data for single user when clicking on name
// async function getSingleUser2(id) {
//   try {
//     const response = await fetch(
//       `/KGPSEnglishPractice-test/api/read_users.php?id=${id}`
//     );

//     if (!response.ok) {
//       throw new Error("Network response was not okay");
//     }
//     const data = await response.json();

//     if (data) {
//       displayUsers.displaySingleUserInfo(data);
//     } else {
//       console.log("No students found");
//     }
//   } catch (error) {
//     console.error("Error getting user data:", error);
//   }
// }

// Create Student
document
  .getElementById("createStudent")
  .addEventListener("submit", async function (event) {
    //  prevents default form submission
    event.preventDefault();

    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("studentlastname").value;
    const password = document.getElementById("password").value;
    const gradelevel = parseInt(
      document.querySelector('input[name="gradelevel"]:checked').value
    );
    try {
      const response = await fetch(
        "/KGPSEnglishPractice-test/api/create_user.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            last_name: lastname,
            first_name: firstname,
            password: password,
            grade_level: gradelevel,
            access: form,
          }),
        }
      );
    } catch (error) {
      console.error("Error creating new user:", error);
    }
    document.getElementById("createStudent").reset();
    setTimeout(() => {
      createUserDiv.close();
    }, 1000);
  });
// Create Teacher
document
  .getElementById("createTeacher")
  .addEventListener("submit", async function (event) {
    //  prevents default form submission
    event.preventDefault();

    const title = document
      .querySelector('input[name="title"]:checked')
      .value.toLowerCase();
    const lastname = document.getElementById("teacherlastname").value;
    const admin = document.getElementById("admin").checked ? "true" : "false";

    const password = document.getElementById("password").value;
    const access = "teacher";
    try {
      const response = await fetch(
        "/KGPSEnglishPractice-test/api/create_user.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title,
            last_name: lastname,
            admin: admin,
            password: password,
            access: form,
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Network response was not okay");
      } else {
        getUserInfo.getAllUsers();
      }
    } catch (error) {
      console.error("Error creating new user:", error);
    }
    document.getElementById("createTeacher").reset();
    setTimeout(() => {
      createUserDiv.close();
    }, 1000);
  });

// Delete User
async function deleteUser(id) {
  try {
    const response = await fetch(
      "/KGPSEnglishPractice-test/api/delete_user.php",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Network response was not okay");
    } else {
      getUserInfo.getAllUsers();
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

// Update User
document
  .getElementById("updateUser")
  .addEventListener("submit", async function (event) {
    //  prevents default form submission
    event.preventDefault();
    const id = document
      .querySelector(".single-user-data1")
      .getAttribute("userId");
    updateUser(id);
  });
async function updateUser(id) {
  getUserInfo.getSingleUser(id, type, funct);
  const firstname = document.getElementById("updatefirstname").value;

  const lastname = document.getElementById("updatelastname").value;
  const password = document.getElementById("updatepassword").value;

  const gradelevelElement = document.querySelector(
    'input[name="updategradelevel"]:checked'
  );
  const gradelevel = gradelevelElement
    ? parseInt(gradelevelElement.value)
    : null;
  const accessElement = document.querySelector(
    'input[name="updateaccess"]:checked'
  );
  const access = accessElement ? accessElement.value : null;

  const newData = { student_id: id };

  if (firstname) {
    newData.first_name = firstname;
  }
  if (lastname) {
    newData.last_name = lastname;
  }
  if (password) {
    newData.password = password;
  }
  if (gradelevel) {
    newData.grade_level = gradelevel;
  }
  if (access) {
    newData.access = access;
  }
  try {
    const response = await fetch(
      "/KGPSEnglishPractice-test/api/update_user.php",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Network response was not okay");
    } else {
      getUserInfo.getSingleUser(id, type, funct);
      getUserInfo.getAllUsers();
    }
  } catch (error) {
    console.error("Error updating user:", error);
  }
  document.getElementById("updateUser").reset();
  // updateUserDiv.innerText = "User information updated.";
  setTimeout(() => {
    updateUserDiv.close();
  }, 1000);
}

window.addEventListener("load", getUserInfo.getAllUsers);
