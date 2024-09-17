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

openCreateUserModalBtn.addEventListener("click", () => {
  createUserDiv.showModal();
});
closeCreateUserModalBtn.addEventListener("click", () => {
  createUserDiv.close();
  document.getElementById("createUser").reset();
});
closeSingleUserDataModalBtn.addEventListener("click", () => {
  userDataDiv.close();
  document.getElementById("createUser").reset();
});
closeUpdateUserModalBtn.addEventListener("click", () => {
  updateUserDiv.close();
  document.getElementById("updateUser").reset();
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
    console.log(data.users);

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
    console.log(user);

    const userData = document.createElement("div");
    const number = document.createElement("div");
    const userName = document.createElement("div");
    const userGradeLevel = document.createElement("div");
    const userAccess = document.createElement("div");
    const editUserBtn = document.createElement("button");
    const deleteUserBtn = document.createElement("button");
    userName.setAttribute("userId", user.id);
    userName.classList.add("open-modal-btn2", "user-name");
    userName.addEventListener("click", (event) => {
      const id = event.target.getAttribute("userId");
      getSingleUser2(id);
      // document.getElementById("single-user-data-div").reset();
      userDataDiv.showModal();
    });
    editUserBtn.textContent = "Edit";
    deleteUserBtn.textContent = "Delete";
    editUserBtn.setAttribute("userId", user.id);
    deleteUserBtn.setAttribute("userId", user.id);
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
    userName.textContent = `${user.lastname}, ${user.firstname}`;
    if (user.access === "teacher") {
      userGradeLevel.textContent = ``;
    } else {
      userGradeLevel.textContent = `${user.gradelevel}`;
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
  singleUserData1.setAttribute("userID", data.id);
  if (data.access === "teacher") {
    singleUserData1.innerText = `${data.lastname}, ${data.firstname}\r\nAccess: ${data.access}`;
  } else {
    singleUserData1.innerText = `${data.lastname}, ${data.firstname}\r\nGrade: ${data.gradelevel}\r\nAccess: ${data.access}`;
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
  userName.innerText = `${data.lastname}, ${data.firstname}`;
  if (data.access === "teacher") {
    singleUserData2.innerText = `Access: ${data.access}`;
  } else {
    singleUserData2.innerText = `Grade: ${data.gradelevel}\r\nAccess: ${data.access}`;
  }
}

// Create User
document
  .getElementById("createUser")
  .addEventListener("submit", async function (event) {
    //  prevents default form submission
    event.preventDefault();
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const password = document.getElementById("password").value;
    const gradelevel = parseInt(
      document.querySelector('input[name="gradelevel"]:checked').value
    );
    const access = document.querySelector('input[name="access"]:checked').value;
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
            access: access,
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error("Network response was not okay");
      } else {
        getUsers();
        console.log("success!");
      }
    } catch (error) {
      console.error("Error creating new user:", error);
    }
    document.getElementById("createUser").reset();
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
      console.log("user deleted:", data);

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

    const newData = { id: id };

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
      console.log(newData);

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
        console.log("user updated:", data);
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
  });

window.addEventListener("load", getUsers);

export { getUsers };
