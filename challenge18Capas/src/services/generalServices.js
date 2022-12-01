import path from "path";

const getPagePath = (dir, pathFile) => {
  const relativePath = path.join(dir + pathFile);
  return relativePath;
};

export default {
  getPagePath,
};
