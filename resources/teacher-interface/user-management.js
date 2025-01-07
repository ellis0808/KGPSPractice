import { sessionCheck } from "../login/session-check.js";
import { logout } from "../utilities/logout.js";
import { BASE_PATH } from "../utilities/get-base-path.js";

setTimeout(() => {
  sessionCheck();
}, 1000);

let form = "student";

const userObjects = {
  studentObjects: {},
  teacherObjects: {},
};

const userManagementStartup = {
  startup() {
    window.addEventListener("load", () => {
      userManagementStructure.setPageElements();
      userManagementStructure.setModalControls();
      userManagementStructure.setEventListeners();
      getUserInfo.getAllUsers();
    });
  },
};

const userManagementStructure = {
  userList: null,
  createUserBtn: null,
  createUserDiv: null,
  updateUserDiv: null,
  userDataDiv: null,
  openCreateUserModalBtn: null,
  closeCreateUserModalBtn: null,
  openSingleUserDataModalBtn: null,
  closeSingleUserDataModalBtn: null,
  openUpdateUserModalBtn: null,
  closeUpdateUserModalBtn: null,
  createUserFormHeading: null,
  createStudentDisplayBtn: null,
  createTeacherDisplayBtn: null,
  createStudentForm: null,
  createTeacherForm: null,
  setPageElements() {
    this.userList = document.querySelector(".users-list");
    this.createUserBtn = document.querySelector(".create-new-user");
    this.createUserDiv = document.querySelector(".create-user-div");
    this.updateUserDiv = document.querySelector(".update-user-div");
    this.userDataDiv = document.querySelector(".user-data-div");
    this.openCreateUserModalBtn = document.querySelector(".open-modal-btn");
    this.closeCreateUserModalBtn = document.querySelector(".close-modal-btn");
    this.openSingleUserDataModalBtn =
      document.querySelector(".open-modal-btn2");
    this.closeSingleUserDataModalBtn =
      document.querySelector(".close-modal-btn2");
    this.openUpdateUserModalBtn = document.querySelector(".open-modal-btn3");
    this.closeUpdateUserModalBtn = document.querySelector(".close-modal-btn3");
    this.createUserFormHeading = document.querySelector(
      ".create-user-form-heading"
    );
    this.createStudentDisplayBtn = document.querySelector(
      ".create-student-display-btn"
    );
    this.createTeacherDisplayBtn = document.querySelector(
      ".create-teacher-display-btn"
    );
    this.createStudentForm = document.querySelector(".create-student-form");
    this.createTeacherForm = document.querySelector(".create-teacher-form");
  },
  setModalControls() {
    this.openCreateUserModalBtn.addEventListener("pointerdown", () => {
      this.createUserDiv.showModal();
    });
    this.closeCreateUserModalBtn.addEventListener("pointerdown", () => {
      this.createUserDiv.close();
      document.getElementById("createStudent").reset();
      document.getElementById("createTeacher").reset();
    });
    this.closeSingleUserDataModalBtn.addEventListener("pointerdown", () => {
      this.userDataDiv.close();
      // document.getElementById("single-user-data-div").reset();
    });
    this.closeUpdateUserModalBtn.addEventListener("pointerdown", () => {
      this.updateUserDiv.close();
      document.getElementById("updateUser").reset();
    });
  },
  setEventListeners() {
    createUser.activateCreateUserEventListeners();
    updateUser.activateUpdateUserEventListeners();
    this.createStudentDisplayBtn.addEventListener("pointerdown", () => {
      form = "student";
      this.createUserFormHeading.innerHTML = `<h2>Create New Student</h2>`;
      this.createStudentForm.classList.remove("hidden");
      this.createTeacherForm.classList.add("hidden");
      this.createStudentDisplayBtn.classList.add("hidden");
      this.createTeacherDisplayBtn.classList.remove("hidden");
      return form;
    });
    this.createTeacherDisplayBtn.addEventListener("pointerdown", () => {
      form = "teacher";

      this.createUserFormHeading.innerHTML = `<h2>Create New Teacher</h2>`;
      this.createStudentForm.classList.add("hidden");
      this.createTeacherForm.classList.remove("hidden");
      this.createStudentDisplayBtn.classList.remove("hidden");
      this.createTeacherDisplayBtn.classList.add("hidden");
      return form;
    });
  },
};

// Logout
document.querySelector(".logout-btn").addEventListener("pointerdown", logout);

const getUserInfo = {
  async getAllUsers() {
    try {
      const response = await fetch(`${BASE_PATH}api/read_users.php`);

      if (!response.ok) {
        throw new Error("Network response was not okay");
      }
      const data = await response.json();
      const students = data.students;
      const teachers = data.teachers;

      if (data) {
        students.map((student) => {
          return (userObjects.studentObjects[student.student_id] = {
            id: student.student_id,
            firstName: student.first_name,
            lastName: student.last_name,
            gradeLevel: student.grade_level,
            access: student.access,
          });
        });
        teachers.map((teacher) => {
          return (userObjects.teacherObjects[teacher.teacher_id] = {
            id: teacher.teacher_id,
            title: teacher.title,
            lastName: teacher.last_name,
            admin: teacher.admin,
            access: teacher.access,
          });
        });
        displayUsers.displayAllUsers();
      } else {
        console.log("No students found");
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  },
  async getSingleUser(id, type, funct) {
    const singleUserData1 = document.querySelector(".single-user-data1");
  },
};

const displayUsers = {
  createTableHeaders() {
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
    userManagementStructure.userList.appendChild(this.userDataHeader);
  },
  displayAllUsers() {
    const students = userObjects.studentObjects;
    const teachers = userObjects.teacherObjects;
    const studentIds = Object.keys(students);
    const teacherIds = Object.keys(teachers);

    userManagementStructure.userList.textContent = "";

    this.createTableHeaders();
    this.appendUserDataHeaders();

    let i = 0;
    let q = 0;
    for (i; i < studentIds.length + teacherIds.length; ++i) {
      const userData = document.createElement("div");
      const number = document.createElement("div");
      const userName = document.createElement("div");
      const userGradeLevel = document.createElement("div");
      const userAccess = document.createElement("div");
      const editUserBtn = document.createElement("button");
      editUserBtn.classList.add("open-modal-btn3");
      editUserBtn.textContent = "Edit";
      const deleteUserBtn = document.createElement("button");
      deleteUserBtn.textContent = "Delete";
      userName.classList.add("open-modal-btn2", "user-name");
      userName.addEventListener("click", (event) => {
        const type = event.target.getAttribute("type");
        const id = event.target.getAttribute("userId");
        displayUsers.displaySingleUserInfo(id, type);
        // document.getElementById("single-user-data-div").reset();
        userManagementStructure.userDataDiv.showModal();
      });
      if (i < studentIds.length) {
        number.textContent = `${i + 1}`;
        number.classList.add("number");
        userGradeLevel.classList.add("number");

        userData.classList.add("user-slot");
        userData.setAttribute("data-id", students[studentIds[i]].id);
        userName.setAttribute("userId", students[studentIds[i]].id);
        userName.setAttribute("type", students[studentIds[i]].access);
        userName.textContent = `${students[studentIds[i]].lastName}, ${
          students[studentIds[i]].firstName
        }`;
        userGradeLevel.textContent = `${students[studentIds[i]].gradeLevel}`;
        userAccess.textContent = `${students[studentIds[i]].access}`;

        editUserBtn.setAttribute("userId", students[studentIds[i]].id);
        editUserBtn.setAttribute("type", students[studentIds[i]].access);
        deleteUserBtn.setAttribute("userId", students[studentIds[i]].id);
        deleteUserBtn.setAttribute("type", students[studentIds[i]].access);
        editUserBtn.addEventListener("click", (event) => {
          this.displayEditModal(event);
        });
        deleteUserBtn.addEventListener("click", (event) => {
          const id = event.target.getAttribute("userId");
          const type = event.target.getAttribute("type");
          deleteUser.deleteUser(id, type);
        });
      }
      if (i >= studentIds.length) {
        number.textContent = `${i + 1}`;
        number.classList.add("number");
        userGradeLevel.classList.add("number");
        userData.classList.add("user-slot");
        userData.setAttribute("data-id", teachers[teacherIds[q]].id);
        userName.setAttribute("userId", teachers[teacherIds[q]].id);
        userName.setAttribute("type", teachers[teacherIds[q]].access);
        userName.textContent = `${teachers[teacherIds[q]].title} ${
          teachers[teacherIds[q]].lastName
        }`;
        userGradeLevel.textContent = ``;
        userAccess.textContent = `${teachers[teacherIds[q]].access}`;
        editUserBtn.setAttribute("userId", teachers[teacherIds[q]].id);
        editUserBtn.setAttribute("type", teachers[teacherIds[q]].access);
        deleteUserBtn.setAttribute("userId", teachers[teacherIds[q]].id);
        deleteUserBtn.setAttribute("type", teachers[teacherIds[q]].access);
        editUserBtn.addEventListener("click", (event) => {
          this.displayEditModal(event);
        });
        deleteUserBtn.addEventListener("click", (event) => {
          const id = event.target.getAttribute("userId");
          const type = event.target.getAttribute("type");
          deleteUser.deleteUser(id, type);
        });
        ++q;
      }
      userData.appendChild(number);
      userData.appendChild(userName);
      userData.appendChild(userGradeLevel);
      userData.appendChild(userAccess);
      userData.appendChild(editUserBtn);
      userData.appendChild(deleteUserBtn);
      userManagementStructure.userList.appendChild(userData);
    }
  },
  displayEditModal(event) {
    const id = event.target.getAttribute("userId");
    const type = event.target.getAttribute("type");
    this.displaySingleUserInfoInEditModal(id, type);
  },
  displaySingleUserInfoInEditModal(id, type) {
    document.getElementById("updateUser").reset();

    const singleUserData1 = document.querySelector(".single-user-data1");
    if (type === "teacher") {
      singleUserData1.innerText = `${userObjects[`${type}Objects`][id].title} ${
        userObjects[`${type}Objects`][id].lastName
      }, \r\nAccess: ${userObjects[`${type}Objects`][id].access}`;
    } else {
      singleUserData1.innerText = `${
        userObjects[`${type}Objects`][id].lastName
      }, ${userObjects[`${type}Objects`][id].firstName}\r\nGrade: ${
        userObjects[`${type}Objects`][id].gradeLevel
      }\r\nAccess: ${userObjects[`${type}Objects`][id].access}`;
    }
    userManagementStructure.updateUserDiv.showModal();
  },
  displaySingleUserInfo(id, type) {
    const modalUserName = document.querySelector(".user-data-modal-name");
    const singleUserData2 = document.querySelector(".single-user-data2");

    if (type === "teacher") {
      modalUserName.innerText = `${userObjects[`${type}Objects`][id].title}, ${
        userObjects[`${type}Objects`][id].lastName
      }`;
      singleUserData2.innerText = `Access: ${
        userObjects[`${type}Objects`][id].access
      }`;
    } else {
      modalUserName.innerText = `${
        userObjects[`${type}Objects`][id].lastName
      }, ${userObjects[`${type}Objects`][id].firstName}`;
      singleUserData2.innerText = `Grade: ${
        userObjects[`${type}Objects`][id].gradeLevel
      }\r\nAccess: ${userObjects[`${type}Objects`][id].access}`;
    }
  },
};

// Create Users
const createUser = {
  createStudentSubmitBtn: document.getElementById("createStudent"),
  createTeacherSubmitBtn: document.getElementById("createTeacher"),
  activateCreateUserEventListeners() {
    this.createStudentSubmitBtn.addEventListener("submit", (event) => {
      createUser.createStudent(event);
    });
    this.createTeacherSubmitBtn.addEventListener("submit", (event) => {
      createUser.createTeacher(event);
    });
  },
  async createStudent(event) {
    //  prevents default form submission
    event.preventDefault();
    console.log("test");

    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("studentlastname").value;
    const password = document.getElementById("student-password").value;
    const gradelevel = parseInt(
      document.querySelector('input[name="gradelevel"]:checked').value
    );
    try {
      const response = await fetch(`${BASE_PATH}api/create_user.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          last_name: lastname,
          first_name: firstname,
          password: password,
          grade_level: gradelevel,
          access: "student",
        }),
      });
    } catch (error) {
      console.error("Error creating new user:", error);
    }
    document.getElementById("createStudent").reset();
    setTimeout(() => {
      userManagementStructure.createUserDiv.close();
    }, 1000);
  },
  async createTeacher(event) {
    // Create Teacher
    //  prevents default form submission
    event.preventDefault();
    console.log("test");

    const title = document
      .querySelector('input[name="title"]:checked')
      .value.toLowerCase();
    const lastname = document.getElementById("teacherlastname").value;
    const admin = document.getElementById("admin").checked ? "true" : "false";

    const password = document.getElementById("teacher-password").value;
    const access = "teacher";
    try {
      const response = await fetch(`${BASE_PATH}api/create_user.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          last_name: lastname,
          admin: admin,
          password: password,
          access: access,
        }),
      });

      const data = await response.json();
      console.log(data);

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
      userManagementStructure.createUserDiv.close();
    }, 1000);
  },
};

// Delete User
const deleteUser = {
  async deleteUser(id, type) {
    try {
      const response = await fetch(`${BASE_PATH}api/delete_user.php`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, type: type }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Network response was not okay");
      } else {
        getUserInfo.getAllUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  },
};

// Update User
const updateUser = {
  updateUserSubmitBtn: document.getElementById("updateUser"),
  activateUpdateUserEventListeners() {
    this.updateUserSubmitBtn.addEventListener("submit", (event) => {
      this.submitUpdateUserInfo(event);
    });
  },
  async submitUpdateUserInfo(event) {
    //  prevents default form submission
    event.preventDefault();
    const id = document
      .querySelector(".single-user-data1")
      .getAttribute("userId");
    updateUser.updateUser(id);
  },
  async updateUser() {
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
      const response = await fetch(`${BASE_PATH}api/update_user.php`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error("Network response was not okay");
      } else {
        // getUserInfo.getSingleUser(id, type, funct);
        getUserInfo.getAllUsers();
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
    document.getElementById("updateUser").reset();
    setTimeout(() => {
      userManagementStructure.updateUserDiv.close();
    }, 1000);
  },
};

userManagementStartup.startup();

export { userObjects };
