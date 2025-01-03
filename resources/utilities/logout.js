import { BASE_PATH } from "./get-base-path.js";
async function logout() {
  try {
    const response = await fetch(`${BASE_PATH}api/logout.php`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Error logging out", data.error);
    } else {
      window.location.href = `${BASE_PATH}resources/login/login.html`;
    }
  } catch (error) {
    console.error("Error loging out: ", error);
  }
}

export { logout };
