async function logout() {
  try {
    const response = await fetch("/KGPSEnglishPractice-test/api/logout.php");
    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error("Error loggin out", data.error);
    }
    window.location.href =
      "/KGPSEnglishPractice-test/resources/login/login.html";
  } catch (error) {
    console.error("Error loging out: ", error);
  }
}

export { logout };
