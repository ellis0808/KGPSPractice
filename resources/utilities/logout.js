async function logout() {
  try {
    const response = await fetch(
      "https://orchidpony8.sakura.ne.jp/KGPSEnglishPractice/api/logout.php"
    );
    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error("Error loggin out", data.error);
    }
    window.location.href = "/resources/login/login.html";
  } catch (error) {
    console.error("Error loging out: ", error);
  }
}

export { logout };
