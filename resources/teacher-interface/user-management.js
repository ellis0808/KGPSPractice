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
  console.log(form);

  createUserFormHeading.innerHTML = `<h2>Create New Teacher</h2>`;
  createStudentForm.classList.add("hidden");
  createTeacherForm.classList.remove("hidden");
  createStudentDisplayBtn.classList.remove("hidden");
  createTeacherDisplayBtn.classList.add("hidden");
  return form;
});

// Gets and displays all students in the table made from CSS grid
async function getUsers() {
  try {
    const response = await fetch(
      "/KGPSEnglishPractice-test/api/read_users.php"
    );

    if (!response.ok) {
      throw new Error("Network response was not okay");
    }
    const data = await response.json();

    if (data.users) {
      displayUsers(data.users);
    } else {
      console.log("No students found");
    }
  } catch (error) {
    console.error("Error getting user data:", error);
  }
}
function displayUsers(data) {
  userList.textContent = "";
  const userDataHeader = document.createElement("div");
  const numberHeader = document.createElement("div");
  const nameHeader = document.createElement("div");
  const gradeLevelHeader = document.createElement("div");
  const accessHeader = document.createElement("div");
  numberHeader.classList.add("number", "table-header");
  gradeLevelHeader.classList.add("number", "table-header");
  nameHeader.classList.add("table-header");
  accessHeader.classList.add("table-header");
  numberHeader.textContent = "";
  nameHeader.textContent = "Last Name, First Name";
  accessHeader.textContent = "Access";
  gradeLevelHeader.textContent = "Grade";
  userDataHeader.classList.add("user-data-header");
  userDataHeader.appendChild(numberHeader);
  userDataHeader.appendChild(nameHeader);
  userDataHeader.appendChild(gradeLevelHeader);
  userDataHeader.appendChild(accessHeader);
  userList.appendChild(userDataHeader);
  let i = 0;
  data.forEach((user) => {
    ++i;
    const userData = document.createElement("div");
    const number = document.createElement("div");
    const userName = document.createElement("div");
    const userGradeLevel = document.createElement("div");
    const userAccess = document.createElement("div");
    const editUserBtn = document.createElement("button");
    const deleteUserBtn = document.createElement("button");
    userName.setAttribute("userId", user.student_id);
    userName.classList.add("open-modal-btn2", "user-name");
    userName.addEventListener("click", (event) => {
      const id = event.target.getAttribute("userId");
      getSingleUser2(id);
      // document.getElementById("single-user-data-div").reset();
      userDataDiv.showModal();
    });
    editUserBtn.textContent = "Edit";
    deleteUserBtn.textContent = "Delete";
    editUserBtn.setAttribute("userId", user.student_id);
    deleteUserBtn.setAttribute("userId", user.student_id);
    editUserBtn.classList.add("open-modal-btn3");
    editUserBtn.addEventListener("click", (event) => {
      const id = event.target.getAttribute("userId");
      getSingleUser(id);
      document.getElementById("updateUser").reset();
      updateUserDiv.showModal();
    });
    deleteUserBtn.addEventListener("click", (event) => {
      const id = event.target.getAttribute("userId");
      deleteUser(id);
    });
    number.classList.add("number");
    userGradeLevel.classList.add("number");
    number.textContent = `${i}`;
    userName.textContent = `${user.last_name}, ${user.first_name}`;
    if (user.access === "teacher") {
      userGradeLevel.textContent = ``;
    } else {
      userGradeLevel.textContent = `${user.grade_level}`;
    }
    if (user.access !== "student") {
      if (user.access === "1") {
        userAccess.textContent = `Admin`;
      } else userAccess.textContent = `Teacher`;
    } else {
      userAccess.textContent = `${user.access}`;
    }
    userData.classList.add("user-slot");
    userData.appendChild(number);
    userData.appendChild(userName);
    userData.appendChild(userGradeLevel);
    userData.appendChild(userAccess);
    userData.appendChild(editUserBtn);
    userData.appendChild(deleteUserBtn);
    userList.appendChild(userData);
  });
}

// Get and Display data for single user when editing a user
async function getSingleUser(id) {
  try {
    const response = await fetch(
      `/KGPSEnglishPractice-test/api/read_users.php?id=${id}`
    );

    if (!response.ok) {
      throw new Error("Network response was not okay");
    }
    const data = await response.json();

    if (data) {
      displaySingleUser(data);
    } else {
      console.log("No students found");
    }
  } catch (error) {
    console.error("Error getting user data:", error);
  }
}
function displaySingleUser(data) {
  const singleUserData1 = document.querySelector(".single-user-data1");
  singleUserData1.setAttribute("userID", data.student_id);
  if (data.access === "teacher") {
    singleUserData1.innerText = `${data.last_name}, ${data.first_name}\r\nAccess: ${data.access}`;
  } else {
    singleUserData1.innerText = `${data.last_name}, ${data.first_name}\r\nGrade: ${data.grade_level}\r\nAccess: ${data.access}`;
  }
}

// Get and Display data for single user when clicking on name
async function getSingleUser2(id) {
  try {
    const response = await fetch(
      `/KGPSEnglishPractice-test/api/read_users.php?id=${id}`
    );

    if (!response.ok) {
      throw new Error("Network response was not okay");
    }
    const data = await response.json();

    if (data) {
      displaySingleUser2(data);
    } else {
      console.log("No students found");
    }
  } catch (error) {
    console.error("Error getting user data:", error);
  }
}
function displaySingleUser2(data) {
  const userName = document.querySelector(".user-data-modal-name");
  const singleUserData2 = document.querySelector(".single-user-data2");
  userName.innerText = `${data.last_name}, ${data.first_name}`;
  if (data.access === "teacher") {
    singleUserData2.innerText = `Access: ${data.access}`;
  } else {
    singleUserData2.innerText = `Grade: ${data.grade_level}\r\nAccess: ${data.access}`;
  }
}

// Create Student
document
  .getElementById("createStudent")
  .addEventListener("submit", async function (event) {
    //  prevents default form submission
    event.preventDefault();
    console.log(form);

    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
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
    console.log(form);

    console.log("test");

    const title = document
      .querySelector('input[name="title"]:checked')
      .value.toLowerCase();
    const lastname = document.getElementById("lastname").value;
    console.log(document.getElementById("admin").checked ? "true" : "false");
    const admin = document.getElementById("admin").checked ? "true" : "false";

    const password = document.getElementById("password").value;
    const access = "teacher";
    try {
      console.log("test 2");
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
      console.log(data);

      if (!response.ok) {
        throw new Error("Network response was not okay");
      } else {
        getUsers();
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
      getUsers();
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
    console.log(id);
    updateUser(id);
  });
async function updateUser(id) {
  getSingleUser(id);
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
  console.log(newData);

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
    console.log(data);

    if (!response.ok) {
      throw new Error("Network response was not okay");
    } else {
      getSingleUser(id);
      getUsers();
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

window.addEventListener("load", getUsers);

export { getUsers };
