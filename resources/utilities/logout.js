async function logout() {
  try {
    const response = await fetch("/KGPSEnglishPractice-test/api/logout.php");
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Error logging out", data.error);
    } else {
      window.location.href =
        "/KGPSEnglishPractice-test/resources/login/login.html";
    }
  } catch (error) {
    console.error("Error loging out: ", error);
  }
}

export { logout };
