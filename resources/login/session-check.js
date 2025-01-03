import { BASE_PATH } from "../utilities/get-base-path.js";
let sessionData;
async function sessionCheck() {
  try {
    const response = await fetch(`${BASE_PATH}api/session_check.php`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // sends cookies!
    });

    sessionData = await response.json();

    if (!sessionData.loggedIn) {
      // Redirect to login page
      if (
        window.location.pathname !== `${BASE_PATH}resources/login/login.html`
      ) {
        window.location.href = `${BASE_PATH}resources/login/login.html`;
      }
    }
    return sessionData;
  } catch (error) {
    if (window.location.pathname !== `${BASE_PATH}resources/login/login.html`) {
      window.location.href = `${BASE_PATH}resources/login/login.html`;
    }
  }
  return sessionData;
}

export { sessionCheck, sessionData };
