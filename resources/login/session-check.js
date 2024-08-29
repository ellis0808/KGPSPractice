async function sessionCheck() {
  try {
    const response = await fetch(
      "https://orchidpony8.sakura.ne.jp/KGPSEnglishPractice/api/session-check.php"
    );

    const data = await response.json;

    if (!data.loggedIn) {
      // Redirect to login page
      window.location.href = "resources/login/login.html";
    }
  } catch (error) {
    console.error("Error checking session:", error);
    window.location.href = "resources/login/login.html";
  }
}

export { sessionCheck };
