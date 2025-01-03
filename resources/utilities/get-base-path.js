const BASE_PATH = (() => {
  const href = window.location.href;
  console.log("href: ", href);

  if (href.includes("dev")) {
    return "https://orchidpony8.sakura.ne.jp/KGPSEnglishPractice-dev/";
  } else if (href.includes("preview")) {
    return "https://orchidpony8.sakura.ne.jp/KGPSEnglishPractice-preview/";
  } else {
    return "https://orchidpony8.sakura.ne.jp/KGPSEnglishPractice/";
  }
})();
export { BASE_PATH };
