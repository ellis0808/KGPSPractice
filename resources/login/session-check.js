async function sessionCheck() {
  try {
    const response = await fetch(
      "https://orchidpony8.sakura.ne.jp/KGPSEnglishPractice/api/session-check.php",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    console.log("Session Check Response:", response);

    const data = await response.json();
    console.log(data);

    if (data.loggedIn) {
      console.log(`user id: ${data.user_id}`);
      console.log(`first name: ${data.firstname}`);
      console.log(`last name: ${data.lastname}`);
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
    // console.log(data);

    console.error("Error checking session:", error);
    window.location.href = "/resources/login/error.html";
  }
}

export { sessionCheck };
