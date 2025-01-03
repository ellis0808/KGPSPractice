const BASE_PATH = () => {
  const host = window.location.hostname;

  if (host.includes("dev")) {
    return "/KGPSEnglishPractice-dev/";
  } else if (host.includes("preview")) {
    return "/KGPSEnglishPracticve-preview/";
  } else {
    return "/KGPSEnglishPractice/";
  }
};
export { BASE_PATH };
