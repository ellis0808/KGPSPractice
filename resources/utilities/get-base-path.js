const BASE_PATH = (() => {
  const href = window.location.href;
  console.log("href: ", href);

  if (href.includes("dev")) {
    return "/KGPSEnglishPractice-dev/";
  } else if (href.includes("preview")) {
    return "/KGPSEnglishPractice-preview/";
  } else {
    return "/KGPSEnglishPractice/";
  }
})();
export { BASE_PATH };
