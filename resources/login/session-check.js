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

    const sessionData = await response.json();
    console.log(sessionData);

    if (sessionData.loggedIn) {
      console.log(`user id: ${sessionData.user_id}`);
      console.log(`first name: ${sessionData.firstname}`);
      console.log(`last name: ${sessionData.lastname}`);
    } else {
      // Redirect to login page
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

export { sessionCheck };
