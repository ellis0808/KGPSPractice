async function checkSession() {
  try {
    const response = await fetch;
    "/KGPSEnglishPractice-test/api/session-check.php",
      {
        credentials: "include", // sends cookies!
      };

    const sessionData = await response.json();
    if (!sessionData.loggedIn) {
    } else {
      if (
        window.location.pathname !==
        "/KGPSEnglishPractice-test/resources/login/login.html"
      ) {
        window.location.href =
          "/KGPSEnglishPractice-test/resources/login/login.html";
      }
    }
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

export { checkSession };
