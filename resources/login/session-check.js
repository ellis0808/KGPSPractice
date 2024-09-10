let sessionData;
async function sessionCheck() {
  try {
    const response = await fetch(
      "/KGPSEnglishPractice-test/api/session-check.php",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // sends cookies!
      }
    );

    sessionData = await response.json();
    console.log(sessionData);

    if (!sessionData.loggedIn) {
      // Redirect to login page
      if (
        window.location.pathname !==
        "/KGPSEnglishPractice-test/resources/login/login.html"
      ) {
        window.location.href =
          "/KGPSEnglishPractice-test/resources/login/login.html";
      }
    }
    return sessionData;
  } catch (error) {
    if (
      window.location.pathname !==
      "/KGPSEnglishPractice-test/resources/login/login.html"
    ) {
      window.location.href =
        "/KGPSEnglishPractice-test/resources/login/login.html";
    }
  }
}

export { sessionCheck, sessionData };
