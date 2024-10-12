import { getImages } from "../utilities/images.js";

function startImageFetch() {
  let unit;
  let grouping;
  let grouping2 = null;
  unit = grouping = 1;
  getImages(unit, grouping, grouping2);
}

export { startImageFetch };
